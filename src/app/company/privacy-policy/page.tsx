"use client"

import React from "react";
import { useTranslation } from "react-i18next";

const Page = () => {
const {t} = useTranslation()
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t("Privacy Policy")}</h1>
      <p className="mb-4">{t("This Privacy Policy outlines how Nile Global Marketplace (NGMP) collects, uses, shares, and protects user information obtained through the NGMP app and website.")}</p>

      <h2 className="text-xl font-bold mb-2">{t("Data Collection")}</h2>
      <p className="mb-4">{t("NGMP collects personal details such as first and last names, shipping and billing addresses, payment information (EVC Plus), browsing history, and other information necessary for providing our services.")}</p>

      <h2 className="text-xl font-bold mb-2">{t("Data Usage")}</h2>
      <ul className="list-disc pl-8 mb-4">
        <li>{t("To enhance the user experience and communicate about purchases and services.")}</li>
        <li>{t("To improve and personalize the NGMP experience.")}</li>
        <li>{t("To comply with legal obligations.")}</li>
        <li>{t("For displaying interest-based ads for features, products, and services that might be of interest to the user.")}</li>
        <li>{t("Use of cookies and other identifiers to recognize browsers or devices.")}</li>
      </ul>

      <h2 className="text-xl font-bold mb-2">{t("User Rights and Choices")}</h2>
      <ul className="list-disc pl-8 mb-4">
        <li>{t("Users have the option not to provide certain information, which might limit their ability to use some NGMP services.")}</li>
        <li>{t("Users can add or update certain information on specific pages.")}</li>
        <li>{t("Users can adjust their Customer Communication Preferences to opt-out of email or other communications from us.")}</li>
        <li>{t("For web browsing without linking to an account, users may log out and block cookies on their browser.")}</li>
      </ul>

      <h2 className="text-xl font-bold mb-2">{t("Data Sharing and Disclosure")}</h2>
      <ul className="list-disc pl-8 mb-4">
        <li><strong>{t("Transactions Involving Third Parties:")}</strong> {t("Customer personal information related to transactions with third parties is shared.")}</li>
        <li><strong>{t("Third-Party Service Providers:")}</strong> {t("Third parties perform functions on our behalf but are not allowed to use personal information for other purposes.")}</li>
        <li><strong>{t("Business Transfers:")}</strong> {t("In transactions involving business transfers, customer information is generally one of the transferred assets.")}</li>
        <li><strong>{t("Protection of NGMP and Others:")}</strong> {t("We release personal information when necessary to comply with the law; enforce agreements; or protect the rights, property, or safety of NGMP, our users, or others.")}</li>
      </ul>

      <h2 className="text-xl font-bold mb-2">{t("Data Retention and Security Measures")}</h2>
      <ul className="list-disc pl-8 mb-4">
        <li>{t("We design our systems with user security and privacy in mind.")}</li>
        <li>{t("We use encryption protocols and software to protect personal information during transmission.")}</li>
        <li>{t("We adhere to the Payment Card Industry Data Security Standard (PCI DSS) when handling credit card data.")}</li>
        <li>{t("We maintain physical, electronic, and procedural safeguards for customer information.")}</li>
        <li>{t("Our security procedures may require us to verify your identity before disclosing personal information.")}</li>
      </ul>

      <h2 className="text-xl font-bold mb-2">{t("Updates to Our Privacy Policy")}</h2>
      <p className="mb-4">{t("This policy may be updated periodically. We will notify you of any significant changes to our Privacy Policy.")}</p>

      <h2 className="text-xl font-bold mb-2">{t("Contact Information")}</h2>
      <p className="mb-4">{t("For any questions about this Privacy Policy, please contact us through our support channels.")}</p>
    </div>
  );
};

export default Page;
