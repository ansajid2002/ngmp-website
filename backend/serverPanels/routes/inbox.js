const express = require('express');
const app = express();
const pool = require('../config'); // Make sure you've configured your database connection pool
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Middleware to set the database connection pool on the request object
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

app.post('/getConversationMessages', async (req, res) => {
    try {
        const { customerId, vendorId, type = "" } = req.body;

        // Fetch total number of messages in the conversation
        const getTotalMessagesQuery = `
        SELECT COUNT(*) as total_messages
        FROM messages m
        JOIN conversations c ON m.conversation_id = c.conversation_id
        WHERE (c.customer_id = $1 AND c.vendor_id = $2) OR (c.vendor_id = $2 AND c.customer_id = $1);
      `;

        const totalMessagesResult = await pool.query(getTotalMessagesQuery, [customerId, vendorId]);

        const totalMessages = totalMessagesResult.rows[0].total_messages;

        // Fetch conversation messages based on customer and vendor IDs with pagination
        const getMessagesQuery = `
        SELECT m.*
        FROM messages m
        WHERE m.conversation_id IN (
          SELECT c.conversation_id
          FROM conversations c
            WHERE (c.customer_id = $1 AND c.vendor_id = $2) OR (c.vendor_id = $2 AND c.customer_id = $1)
        )
        ORDER BY m.timestamp ASC
      `;

        const messagesResult = await pool.query(getMessagesQuery, [customerId, vendorId]);

        // Transform the fetched messages into the desired format
        const formattedMessages = messagesResult.rows.map((message) => ({
            id: message.message_id,
            text: message.content,
            sender: message.user_type,
            timestamp: new Date(message.timestamp).toISOString(),
        }));

        // Respond with the formatted messages
        res.status(200).json({ messages: formattedMessages, totalMessages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/conversations', async (req, res) => {
    const { customerId } = req.body;

    if (!customerId) {
        return res.status(400).json({ error: 'Missing customer_id in the request body' });
    }

    try {
        // Fetch conversations based on customer ID
        const conversationsQuery = 'SELECT * FROM conversations WHERE customer_id = $1';
        const conversationsResult = await pool.query(conversationsQuery, [customerId]);
        const customerConversations = conversationsResult.rows;

        // Extract vendor IDs from conversations
        const vendorIds = customerConversations.map(conversation => conversation.vendor_id);

        // Check if vendorIds is empty
        if (vendorIds.length === 0) {
            return res.status(200).json({ error: 'No Conversation Started Yet' });
        }

        // Fetch vendor details based on vendor IDs
        const vendorDetailsQuery = 'SELECT id, brand_name, brand_logo FROM vendors WHERE id = $1';
        const lastMessagesQuery = `
                SELECT DISTINCT ON (conversation_id) *
                FROM messages
                WHERE conversation_id = $1
                ORDER BY conversation_id, timestamp DESC;
            `;

        const data = [];

        for (const conversation of customerConversations) {
            const vendorDetailsResult = await pool.query(vendorDetailsQuery, [conversation.vendor_id]);
            const vendorDetails = vendorDetailsResult.rows[0]; // Assuming there's only one vendor for each ID

            const lastMessagesResult = await pool.query(lastMessagesQuery, [conversation.conversation_id]);
            const lastMessage = lastMessagesResult.rows[0]; // Assuming there's only one last message for each conversation

            data.push({
                ...conversation,
                vendorDetails,
                lastMessage
            });
        }

        res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/conversationsListforVendors', async (req, res) => {
    const { vendorId } = req.body;

    if (!vendorId) {
        return res.status(400).json({ error: 'Missing vendorId in the request body' });
    }

    try {
        // Fetch conversations based on customer ID
        const conversationsQuery = 'SELECT * FROM conversations WHERE vendor_id = $1';
        const conversationsResult = await pool.query(conversationsQuery, [vendorId]);
        const vendorConversation = conversationsResult.rows;

        // Extract vendor IDs from conversations
        const customerIds = vendorConversation.map(conversation => conversation.customer_id);

        // Check if customerIds is empty
        if (customerIds.length === 0) {
            return res.status(200).json({ error: 'No Conversation Started Yet' });
        }

        const placeholders = customerIds.map((id, index) => `$${index + 1}`).join(', ');

        // Fetch vendor details based on vendor IDs
        const CustomerDetailsQuery = `SELECT customer_id, given_name, family_name, picture FROM customers WHERE customer_id IN (${placeholders})`;
        const CustomerDetailsResult = await pool.query(CustomerDetailsQuery, customerIds);
        const CustomerDetails = CustomerDetailsResult.rows;

        // Fetch the last message for each conversation
        const lastMessagesQuery = `
            SELECT DISTINCT ON (conversation_id) *
            FROM messages
            WHERE conversation_id IN (${vendorConversation.map((_, index) => `$${index + 1}`).join(', ')})
            ORDER BY conversation_id, timestamp DESC;
        `;

        const lastMessagesResult = await pool.query(lastMessagesQuery, [...vendorConversation.map(conversation => conversation.conversation_id)]);
        const lastMessages = lastMessagesResult.rows;


        // Associate each conversation with its vendor details and last message
        const data = vendorConversation.map(conversation => {
            const associatedVendor = CustomerDetails.find(customer => customer.customer_id === conversation.customer_id);
            return {
                ...conversation,
                CustomerDetails: associatedVendor,
                lastMessages
            };
        });

        res.json(data);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/sendInboxMessages', async (req, res) => {
    try {
        const { senderId, recipientId, content, timestamp, userType } = req.body;

        // Check if the conversation exists
        const conversationCheckQuery = 'SELECT * FROM conversations WHERE (customer_id = $1 AND vendor_id = $2) OR (customer_id = $2 AND vendor_id = $1)';
        const conversationCheckResult = await pool.query(conversationCheckQuery, [senderId, recipientId]);

        if (conversationCheckResult.rows.length === 0) {
            // Conversation doesn't exist, create one
            const createConversationQuery = 'INSERT INTO conversations (customer_id, vendor_id, conversation_user_type) VALUES ($1, $2, $3)';
            await pool.query(createConversationQuery, [recipientId, senderId, userType]);
        }

        // Get the conversation_id
        const getConversationIdQuery = 'SELECT conversation_id FROM conversations WHERE (customer_id = $1 AND vendor_id = $2) OR (customer_id = $2 AND vendor_id = $1)';
        const conversationIdResult = await pool.query(getConversationIdQuery, [senderId, recipientId]);
        const conversationId = conversationIdResult.rows[0].conversation_id;

        // Insert the message into the messages table
        const insertMessageQuery = 'INSERT INTO messages (conversation_id, sender_id, recipient_id, content, timestamp, user_type) VALUES ($1, $2, $3, $4, $5, $6)';
        await pool.query(insertMessageQuery, [conversationId, senderId, recipientId, content, timestamp, userType]);

        // Respond with success or other relevant information
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});




module.exports = app;
