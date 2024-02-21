import React from "react";

const Page = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Return & Refund Policy
      </h1>
      <p class="mb-2">Thanks for purchasing our product from our marketplace (NGMP).</p>
    <p class="mb-2">Our returns policy commonly lasts 7 days. But it depends upon the nature of the product and merchant offers. If 7 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange.</p>
    <p class="">If you receive a product which is not as per the details given ordered by you, you will be eligible for a refund. Refund is applicable in the following cases:</p>
    <ul class="list-disc pl-8 mb-4">
        <li>Wrong color</li>
        <li>Wrong size</li>
        <li>Wrong quantity</li>
        <li>Defective</li>
        <li>Damaged</li>
        <li>Significantly different from the description given by the merchant</li>
    </ul>
    <p class="mb-4 font-semibold">You are completely secured. NGMP offers 7 days return guarantee for all such items.</p>
    <p class="mb-4 font-semibold">To complete your return, we require a receipt or proof of purchase.</p>
    <p class="mb-4 font-semibold">There are certain situations in which refunds couldn’t be granted (if applicable):</p>
    <ul class="list-disc pl-8 mb-4">
        <li>Any item not in its original condition, is damaged or missing parts for reasons not due to our error.</li>
        <li>For some products, the sale is a final sale and the merchant does not accept any return. Some healthcare products, customized products, undergarments, swimsuits, socks etc and perishables including flowers, edible products cannot be returned due to health & hygiene reasons.</li>
        <li>Any item that is returned more than 7 days after delivery.</li>
        <li>Serial Number is tampered</li>
    </ul>
    <h2 class="text-xl font-bold mb-4">REFUNDS (IF APPLICABLE)</h2>
    <p class="mb-4">Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
    <p class="mb-4">If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days (approx. 1 week).</p>
    <h2 class="text-xl font-bold mb-4">LATE OR MISSING REFUNDS (IF APPLICABLE)</h2>
    <p class="mb-4">If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted.</p>
    <p class="mb-4">Next contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet, please contact us at <a href="mailto:Info@nilegmp.com" class="text-blue-500">Info@nilegmp.com</a>.</p>
    <h2 class="text-xl font-bold mb-4">EXCHANGES (IF APPLICABLE)</h2>
    <p class="mb-4">We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at <a href="mailto:Info@nilegmp.com" class="text-blue-500">Info@nilegmp.com</a></p>
    <h2 class="text-xl font-bold mb-4">SHIPPING</h2>
    <p class="mb-4">You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
    <p class="mb-4">Depending on where you live, the time it may take for your exchanged product to reach you, may vary.</p>
    </div>
  );
};

export default Page;
