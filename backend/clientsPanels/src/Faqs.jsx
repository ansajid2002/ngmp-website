import React, { useState } from 'react';

const FAQ = () => {
    const faqData = [
        {
            question: 'How much does it cost to sell?',
            answer:
                'Once your item sells, we generally charge 10-15% of the final value. Your first 250 listings each month are free and, after, there’s a $0.35 insertion fee per listing. Learn more about fees- opens in new window or tab..',
        },
        {
            question: 'What’s the best way to ship my item?',
            answer:
                'Nile Market-place provides recommendations, but you can choose a preferred shipping carrier. Can’t make it to your local dropoff? Some offer free “ship from home” pickup. Print your shipping labels with Nile Market-place to receive a discount from the carriers we work with. If you don’t have a printer, we also offer QR codes for Nile Market-place labels.',
        },
        {
            question: 'Can I sell locally on Nile Market-place?',
            answer:
                'When creating your listing, you can offer local pickup by selecting it in shipping details. Once the buyer pays, they’ll receive a QR code and a 6-digit code, which you can scan or enter with the app to confirm the sale.',
        },
        {
            question: 'How much will it cost to ship my item?',
            answer:
                'You can choose the shipping option that offers the greatest value and convenience for you. Learn more about shipping- opens in new window or tab..',
        },
        {
            question: 'Where can I get shipping supplies?',
            answer:
                'You can use any packaging supplies you may already have at home or get free boxes from carriers. For an added touch, Nile Market-place branded supplies are available to purchase. Buy Nile Market-place branded packaging- opens in new window or tab..',
        },
        {
            question: 'How should I choose my listing price?',
            answer:
                'For most items, we can provide a price recommendation for you based on recently sold, similar items. How you price your item can depend on how you prefer to sell it—Auction or Buy It Now. Choose a lower starting price for auctions to create more interest.',
        },
        {
            question: 'How does Nile Market-place protect sellers?',
            answer:
                'We understand that things can happen that are out of your control as a seller. When they do, we have your back. Learn more about seller protection- opens in new window or tab..',
        },
        {
            question: 'What can I sell on Nile Market-place?',
            answer:
                'You can sell almost anything, from homemade goods to used or unused items from your closet. We restrict items that violate any laws or infringe on intellectual property.',
        },
        {
            question: 'How do I create an account?',
            answer:
                'To get started, select List an item. We’ll help you create and verify your account and set up payment information during your first listing. Have your preferred payment account details on hand and be ready to receive a call or text on your phone for verification.',
        },
        {
            question: 'When will I get paid?',
            answer:
                'After we confirm the buyer\'s payment has been received, payouts are sent directly to your bank account, Monday through Friday (excluding bank holidays), within two business days. Once a payout is initiated, funds are typically available within 1-3 business days depending on your bank\'s normal processing time.',
        },
        {
            question: 'Do I have to pay federal income tax on my sales?',
            answer:
                'Starting on Jan 1, 2022, IRS regulations require all businesses that process payments, including online marketplaces like Nile Market-place, to issue a Form 1099-K for all sellers who receive $600 or more in sales. The new tax reporting requirement may impact your 2022 tax return that you may file in 2023. However, just because you receive a 1099-K doesn’t automatically mean that you’ll owe taxes on the amount reported on your 1099-K. Only goods that are sold for a profit are considered taxable, so you won’t owe any taxes on something you sell for less than what you paid for it. For example, if you bought a bike for $1,000 last year and then sold it on Nile Market-place today for $700, that $700 you made would generally not be subject to income tax. Check out our 1099-K FAQ- opens in new window or tab. to learn more about these changes.',
        },
        {
            question: 'How does Nile Market-place Ads work?',
            answer:
                'Nile Market-place Ads can help you build your business on Nile Market-place with effective advertising tools that create a meaningful connection between you and Nile Market-place’s global community of passionate buyers - and help you sell your items faster. Stand out among billions of listings on Nile Market-place by putting your items in front of interested buyers no matter the size of your budget.',
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const handleAccordionClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqData.map((faq, index) => (
                    <div key={index} className="border rounded p-4">
                        <button
                            className="w-full text-left font-semibold"
                            onClick={() => handleAccordionClick(index)}
                        >
                            {faq.question}
                        </button>
                        {activeIndex === index && (
                            <div className="mt-2 text-gray-700">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
