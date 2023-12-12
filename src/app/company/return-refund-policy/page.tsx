import React from "react";

const Page = () => {
  return (
    <div className="px-40 p-10 space-y-12">
      <h1 className="text-5xl font-semibold text-[#063b69]">
        Return & Refund Policy
      </h1>

      <div className="space-y-1">
        <h2 className="text-3xl font-semibold">Introduction</h2>
        <p className="text-lg">
          This Refund Policy outlines the procedures and conditions under which
          refunds are processed on the Nile Global Marketplace (NGMP).
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-3xl font-semibold">Refund Eligibility</h2>
        <p className="text-lg">
          Refund eligibility is primarily determined by the seller’s policy,
          which can vary from no returns accepted to 15, 30, or 60 days return
          options.
          <br />
          In cases where an item is not as described, NGMP mandates the seller
          to accept the return, regardless of their stated policy.
          <br />
          NGMP acts as an intermediary, ensuring fair practices and protecting
          against misuse of the platform.
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-3xl font-semibold">Refund Process</h2>
        <p className="text-lg">
          Customers can initiate a refund by selecting the return option for
          their order, filling out the required details such as the reason for
          the return, and submitting the request.
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-3xl font-semibold">Time Frame for Refunds</h2>
        <p className="text-lg">
          The time frame for requesting a refund depends on the seller’s return
          policy, which should be clearly stated in their store.
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-3xl font-semibold">Restocking Fees</h2>
        <p className="text-lg">
          Restocking fees may apply depending on the seller’s policy. Sellers
          are responsible for specifying if such fees are charged.
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-3xl font-semibold">Refund Method</h2>
        <p className="text-lg">
          All refunds on NGMP are issued in Nile Money, regardless of the
          transaction's nature or the seller's individual policy. This is a
          universal policy across the platform, without exceptions.
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-3xl font-semibold">Dispute Resolution</h2>
        <p className="text-lg">
          In case of disputes over refunds, buyers can reach out to NGMP through
          the contact us Page.
          <br />
          NGMP will mediate between the buyer and the seller to resolve the
          issue.
          <br />- In certain instances, NGMP may offer a Nile Guarantee, issuing
          a refund to the buyer from the platform's end.
        </p>
      </div>

      <div className="space-y-1">
        <h2 className="text-3xl font-semibold">Policy Amendments</h2>
        <p className="text-lg">
          NGMP reserves the right to modify this Refund Policy. Changes will be
          communicated to users and will take effect immediately.
        </p>
      </div>
    </div>
  );
};

export default Page;
