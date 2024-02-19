import React from 'react'

const Page = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Introduction</h2>
                <p className="mb-4">This Refund Policy outlines the procedures and conditions under which refunds are processed on the Nile Global Marketplace (NGMP).</p>

                <h2 className="text-xl font-bold mb-2">Refund Eligibility</h2>
                <ul className="list-disc pl-8 mb-4">
                    <li>Refund eligibility is primarily determined by the seller’s policy, which can vary from no returns accepted to 15, 30, or 60 days return options.</li>
                    <li>In cases where an item is not as described, NGMP mandates the seller to accept the return, regardless of their stated policy.</li>
                    <li>NGMP acts as an intermediary, ensuring fair practices and protecting against misuse of the platform.</li>
                </ul>

                <h2 className="text-xl font-bold mb-2">Refund Process</h2>
                <p className="mb-4">Customers can initiate a refund by selecting the return option for their order, filling out the required details such as the reason for the return, and submitting the request.</p>

                <h2 className="text-xl font-bold mb-2">Time Frame for Refunds</h2>
                <p className="mb-4">The time frame for requesting a refund depends on the seller’s return policy, which should be clearly stated in their store.</p>

                <h2 className="text-xl font-bold mb-2">Restocking Fees</h2>
                <p className="mb-4">Restocking fees may apply depending on the seller’s policy. Sellers are responsible for specifying if such fees are charged.</p>

                <h2 className="text-xl font-bold mb-2">Refund Method</h2>
                <p className="mb-4">All refunds on NGMP are issued in Nile Money, regardless of the transaction's nature or the seller's individual policy. This is a universal policy across the platform, without exceptions.</p>

                <h2 className="text-xl font-bold mb-2">Dispute Resolution</h2>
                <p className="mb-4">In case of disputes over refunds, buyers can reach out to NGMP through the contact us page. NGMP will mediate between the buyer and the seller to resolve the issue. In certain instances, NGMP may offer a Nile Guarantee, issuing a refund to the buyer from the platform's end.</p>

                <h2 className="text-xl font-bold mb-2">Policy Amendments</h2>
                <p className="mb-4">NGMP reserves the right to modify this Refund Policy. Changes will be communicated to users and will take effect immediately.</p>
            </div>

        </div>
    )
}

export default Page