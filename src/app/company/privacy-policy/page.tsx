import React from "react";

const Page = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">This Privacy Policy outlines how Nile Global Marketplace (NGMP) collects, uses, shares, and protects user information obtained through the NGMP app and website.</p>

      <h2 className="text-xl font-bold mb-2">Data Collection</h2>
      <p className="mb-4">NGMP collects personal details such as first and last names, shipping and billing addresses, payment information (EVC Plus), browsing history, and other information necessary for providing our services.</p>

      <h2 className="text-xl font-bold mb-2">Data Usage</h2>
      <ul className="list-disc pl-8 mb-4">
        <li>To enhance the user experience and communicate about purchases and services.</li>
        <li>To improve and personalize the NGMP experience.</li>
        <li>To comply with legal obligations.</li>
        <li>For displaying interest-based ads for features, products, and services that might be of interest to the user.</li>
        <li>Use of cookies and other identifiers to recognize browsers or devices.</li>
      </ul>

      <h2 className="text-xl font-bold mb-2">User Rights and Choices</h2>
      <ul className="list-disc pl-8 mb-4">
        <li>Users have the option not to provide certain information, which might limit their ability to use some NGMP services.</li>
        <li>Users can add or update certain information on specific pages.</li>
        <li>Users can adjust their Customer Communication Preferences to opt-out of email or other communications from us.</li>
        <li>For web browsing without linking to an account, users may log out and block cookies on their browser.</li>
      </ul>

      <h2 className="text-xl font-bold mb-2">Data Sharing and Disclosure</h2>
      <ul className="list-disc pl-8 mb-4">
        <li><strong>Transactions Involving Third Parties:</strong> Customer personal information related to transactions with third parties is shared.</li>
        <li><strong>Third-Party Service Providers:</strong> Third parties perform functions on our behalf but are not allowed to use personal information for other purposes.</li>
        <li><strong>Business Transfers:</strong> In transactions involving business transfers, customer information is generally one of the transferred assets.</li>
        <li><strong>Protection of NGMP and Others:</strong> We release personal information when necessary to comply with the law; enforce agreements; or protect the rights, property, or safety of NGMP, our users, or others.</li>
      </ul>

      <h2 className="text-xl font-bold mb-2">Data Retention and Security Measures</h2>
      <ul className="list-disc pl-8 mb-4">
        <li>We design our systems with user security and privacy in mind.</li>
        <li>We use encryption protocols and software to protect personal information during transmission.</li>
        <li>We adhere to the Payment Card Industry Data Security Standard (PCI DSS) when handling credit card data.</li>
        <li>We maintain physical, electronic, and procedural safeguards for customer information.</li>
        <li>Our security procedures may require us to verify your identity before disclosing personal information.</li>
      </ul>

      <h2 className="text-xl font-bold mb-2">Updates to Our Privacy Policy</h2>
      <p className="mb-4">This policy may be updated periodically. We will notify you of any significant changes to our Privacy Policy.</p>

      <h2 className="text-xl font-bold mb-2">Contact Information</h2>
      <p className="mb-4">For any questions about this Privacy Policy, please contact us through our support channels.</p>
    </div>
  );
};

export default Page;
