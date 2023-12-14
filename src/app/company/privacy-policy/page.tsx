import Divider from "@/components/divider/Divider";
import React from "react";

const Page = () => {
  return (
    <div className="px-5 lg:px-40 p-10 space-y-6 lg:space-y-12">
      <h1 className="text-3xl lg:text-5xl font-semibold text-[#063b69]">
        Privacy Policy
      </h1>

      <div className="space-y-1">
        <h2 className="text-xl lg:text-3xl font-semibold">Introduction</h2>
        <p className="lg:text-lg">
          This Privacy Policy outlines how Nile Global Marketplace (NGMP)
          collects, uses, shares, and protects user information obtained through
          the NGMP app and website.
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl lg:text-3xl font-semibold">Data Collection</h2>
        <p className="lg:text-lg">
          NGMP collects personal details such as first and last names, shipping
          and billing addresses, payment information (EVC Plus), browsing
          history, and other information necessary for providing our services.
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl lg:text-3xl font-semibold">Data Usage</h2>
        <p className="lg:text-lg flex flex-col gap-2">
          <span>
            1. To enhance the user experience and communicate about purchases
            and services.
          </span>
          <span>2. To improve and personalize the NGMP experience.</span>
          <span>3. To comply with legal obligations.</span>
          <span>
            4. For displaying interest-based ads for features, products, and
            services that might be of interest to the user.
          </span>
          <span>
            5. Use of cookies and other identifiers to recognize browsers or
            devices.
          </span>
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl lg:text-3xl font-semibold">
          User Rights and Choices
        </h2>
        <p className="lg:text-lg flex flex-col gap-2">
          <span>
            1. Users have the option not to provide certain information, which
            might limit their ability to use some NGMP services.
          </span>

          <span>
            2. Users can add or update certain information on specific pages.
          </span>

          <span>
            3. Users can adjust their Customer Communication Preferences to
            opt-out of email or other communications from us.
          </span>

          <span>
            4. For web browsing without linking to an account, users may log out
            and block cookies on their browser.
          </span>
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl lg:text-3xl font-semibold">
          Data Sharing and Disclosure
        </h2>
        <p className="lg:text-lg flex flex-col gap-2">
          <span>
            1. Transactions Involving Third Parties: Customer personal
            information related to transactions with third parties is shared.
          </span>
          <span>
            2. Third-Party Service Providers: Third parties perform functions on
            our behalf but are not allowed to use personal information for other
            purposes.
          </span>
          <span>
            3. Business Transfers: In transactions involving business transfers,
            customer information is generally one of the transferred assets.
          </span>
          <span>
            4. Protection of NGMP and Others: We release personal information
            when necessary to comply with the law; enforce agreements; or
            protect the rights, property, or safety of NGMP, our users, or
            others.
          </span>
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl lg:text-3xl font-semibold">
          Data Retention and Security Measures
        </h2>
        <p className="lg:text-lg flex flex-col gap-2">
          <span>
            1. We design our systems with user security and privacy in mind.
          </span>
          <span>
            2. We use encryption protocols and software to protect personal
            information during transmission.
          </span>
          <span>
            3. We adhere to the Payment Card Industry Data Security Standard
            (PCI DSS) when handling credit card data.
          </span>
          <span>
            4. We maintain physical, electronic, and procedural safeguards for
            customer information.
          </span>
          <span>
            5. Our security procedures may require us to verify your identity
            before disclosing personal information.
          </span>
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl lg:text-3xl font-semibold">
          Updates to Our Privacy Policy
        </h2>
        <p className="lg:text-lg">
          This policy may be updated periodically. We will notify you of any
          significant changes to our Privacy Policy.
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl lg:text-3xl font-semibold">
          Contact Information
        </h2>
        <p className="lg:text-lg">
          For any questions about this Privacy Policy, please contact us through
          our support channels.
        </p>
      </div>
    </div>
  );
};

export default Page;
