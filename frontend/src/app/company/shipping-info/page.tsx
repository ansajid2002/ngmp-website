import React from "react";

const Page = () => {
  return (
    <div className="p-5 lg:p-12 space-y-10">
      <h1 className="lg:text-center text-4xl font-semibold">
        Nile Shipping Info
      </h1>

      <div>
        <h2>We provide FREE STANDARD SHIPPING on almost all orders.</h2>
      </div>

      <div className="grid lg:grid-cols-3">
        <ul className="space-y-2 border border-gray-200 p-2">
          <li className="text-lg border-b border-gray-200 font-medium py-2">
            Shipping Method
          </li>
          <li>Standard Shipping</li>
          <li>Express Shipping</li>
        </ul>
        <ul className="space-y-2 border border-gray-200 p-2">
          <li className="text-lg border-b border-gray-200 font-medium py-2">
            Costs
          </li>
          <li>FREE on all orders</li>
          <li>
            <span>{"$12.90 - orders < $129.00"}</span>
            <span>{"Free - order ≥ $129.00"}</span>
          </li>
        </ul>
        <ul className="space-y-2 border border-gray-200 p-2">
          <li className="text-lg border-b border-gray-200 font-medium py-2">
            Shipping Time
          </li>
          <li>6 - 20 days</li>
          <li>4 - 9 days</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-medium pb-2">Shipping options</h2>
        <p className="text-sm lg:text-base text-gray-700">
          You may choose standard shipping or express shipping depending on the
          items in your order and your location. As your orders may be handed
          over to local carriers for the final leg of delivery, tracking may not
          be available every step of the way.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-medium pb-2">Shipping address</h2>
        <p className="text-sm lg:text-base text-gray-700">
          Please make sure that you have provided the correct and current
          address for shipping and delivery. You may use P.O. boxes as your
          shipping address. But certain items can only be delivered to physical
          addresses. Large products, valuables, perishables, products with
          age-based restrictions, or items shipped via private carriers may
          require a physical mailing address or signature confirmation to be
          successfully delivered. Sellers may also indicate in the product
          listings that they are unable to ship products to P.O. boxes. Items
          cannot be delivered to security-restricted areas such as military
          bases.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-medium pb-2">Shipping time and cost</h2>
        <p className="text-sm lg:text-base text-gray-700">
          1) After an order has been successfully paid and confirmed, you will
          see the estimated delivery time and cost for shipping on your order
          confirmation page. You will also receive an order confirmation message
          that will outline the estimated processing time for your order.
          <br />
          2) The warehouse may take 1-3 days to process your order. You will
          receive a message once your order has been shipped.
          <br />
          3) You'll receive a shipment notification message that will provide
          you with the estimated delivery time for each package once it is
          shipped. We will also provide you the tracking number when it is
          ready. You can view this estimated delivery time under each package in
          your order history at the same time.
          <br />
          4) In most cases, your order will be delivered within the estimated
          time of delivery. However, the actual delivery date may be affected by
          flight arrangements, weather conditions, and other external factors.
          Please refer to the tracking information for the most up to date
          delivery date.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-medium pb-2">Issues regarding delivery</h2>
        <p className="text-sm lg:text-base text-gray-700">
          If your package has not been delivered or your tracking information
          shows that your package has been delivered but you have not received
          it, please contact our customer service immediately and within 90 days
          of the order date.
        </p>
      </div>
    </div>
  );
};

export default Page;
