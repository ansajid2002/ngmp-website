import React from "react";

const Page = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Liability and Dispute Resolution</h2>

        <ol className="list-decimal pl-8">
          <li>
            <h3 className="font-bold mb-2">Role and Responsibility:</h3>
            <p>Nile Global Marketplace serves as an intermediary platform connecting buyers and sellers. We facilitate transactions but are not a party to the contract of sale executed between buyers and sellers.</p>
          </li>
          <li>
            <h3 className="font-bold mb-2">User Conduct:</h3>
            <p>Users are expected to engage in transactions responsibly and in good faith. The platform prohibits the listing and exchange of illegal items, counterfeit goods, and services that violate intellectual property rights or local laws.</p>
          </li>
          <li>
            <h3 className="font-bold mb-2">Initial Dispute Resolution:</h3>
            <p>In the event of a dispute (e.g., item not received, item not as described), buyers and sellers are initially encouraged to communicate directly to seek a resolution. The platform provides tools to assist in this communication and resolution process.</p>
          </li>
          <li>
            <h3 className="font-bold mb-2">Platform Intervention and Investigation:</h3>
            <p>If the dispute cannot be resolved directly between the parties, users can escalate the issue to Nile Global Marketplace. Our team will review the case, requiring both parties to submit evidence, such as transaction records, communication logs, and any other relevant documentation.</p>
          </li>
          <li>
            <h3 className="font-bold mb-2">Decision-Making Process:</h3>
            <p>Decisions will be based on the evidence provided, adhering to our policies and guidelines. We aim to resolve disputes impartially and fairly, considering all available information.</p>
          </li>
          <li>
            <h3 className="font-bold mb-2">Liability of Nile Global Marketplace:</h3>
            <p>While we facilitate a platform for transactions, we are not liable for the actions of users, including the sellers’ ability to sell items or buyers’ ability to pay for them. Nile Global Marketplace is not responsible for the assessment or guarantee of the quality, safety, or legality of items listed.</p>
          </li>
          <li>
            <h3 className="font-bold mb-2">Restocking and Refund Policy:</h3>
            <p>Depending on the seller's policies, refunds may be subject to a restocking fee. Refunds, when processed, are provided in Nile Money and reflect the value of the transaction.</p>
          </li>
          <li>
            <h3 className="font-bold mb-2">User Violations and Sanctions:</h3>
            <p>Users who violate platform policies, including listing prohibited items or engaging in fraudulent activities, will face actions ranging from warnings to account suspension or permanent bans. We maintain the right to enforce these sanctions to ensure platform integrity and user safety.</p>
          </li>
          <li>
            <h3 className="font-bold mb-2">Resolution of Liability Disputes:</h3>
            <p>In cases where users dispute the platform's liability or decision, we offer further review processes, but our decisions are generally final and binding, considering the platform's role as an intermediary.</p>
          </li>
          <li>
            <h3 className="font-bold mb-2">Updates to Terms and Conditions:</h3>
            <p>Nile Global Marketplace reserves the right to modify these terms, including the dispute resolution and liability procedures. Users will be notified of significant changes.</p>
          </li>
          <li>
            <h3 className="font-bold mb-2">Legal Compliance:</h3>
            <p>In all actions, particularly in dispute resolution, Nile Global Marketplace complies with local and international laws. We cooperate with legal authorities when required and work to maintain a legally compliant platform.</p>
          </li>
        </ol>
      </div>

    </div>

  );
};

export default Page;
