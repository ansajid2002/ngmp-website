// "use client";
// import { useParams, useSearchParams } from "next/navigation";
// import { HomeUrl } from "@/app/layout";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import {
//   Archive,
//   CircleDollarSign,
//   CreditCard,
//   FileStack,
//   FileText,
//   GanttChartSquare,
//   ShieldCheck,
//   Truck,
// } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import BuyingOnNile from "./BuyingOnNile";
// import Checkout from "./Checkout";
// import FindMyOrder from "./FindMyOrder";
// import OrderChanges from "./OrderChanges";
// import Reviews from "./Reviews";
// import Shipping from "./Shipping";
// import Delivery from "./Delivery";
// import Returns from "./Returns";
// import Refunds from "./Refunds";
// import Stock from "./Stock";
// import SizeAndFit from "./SizeAndFit";
// import AccountPreferences from "./AccountPreferences";
// import SigningIn from "./SigningIn";
// import Payments from "./Payments";
// import NileCredit from "./NileCredit";
// import Promos from "./Promos";
// import Policies from "./Policies";
// import FeedbacksAndCollabInquiries from "./FeedbacksAndCollabInquiries";
// import SecurityAndPrivacy from "./SecurityAndPrivacy";

// const AccordionTab = () => {
//   const [query, setQuery] = useState<any | null>();

//   const params = useSearchParams();

//   const search = params.get("query");
//   useEffect(() => {
//     setQuery(search);
//   }, []);

//   const SetRightComp = (data) => {
//     setQuery(data);
//   };

//   console.log(query);

//   const AccordionData = [
//     {
//       id: 1,
//       value: "item-1",
//       icon: <FileText />,
//       title: "Order issues",
//       content: [
//         {
//           list: "Buying on Nile",
//           link: `${HomeUrl}/SupportCenter?querys=BuyingOnNile`,
//           slug: "BuyingOnNile",
//           components: <BuyingOnNile />,
//         },
//         {
//           list: "Checkout",
//           link: `${HomeUrl}/SupportCenter?query=Checkout`,
//           slug: "Checkout",
//           components: <Checkout />,
//         },
//         {
//           list: "Find My Order",
//           link: `${HomeUrl}/SupportCenter?query=FindMyOrder`,
//           slug: "FindMyOrder",
//           components: <FindMyOrder />,
//         },
//         {
//           list: "Order Changes",
//           link: `${HomeUrl}/SupportCenter?query=OrderChanges`,
//           slug: "OrderChanges",
//           components: <OrderChanges />,
//         },
//         {
//           list: "Reviews",
//           link: `${HomeUrl}/SupportCenter?query=Reviews`,
//           slug: "Reviews",
//           components: <Reviews />,
//         },
//       ],
//     },
//     {
//       id: 2,
//       value: "item-2",
//       icon: <Truck />,
//       title: "Shipping & delivery",
//       content: [
//         {
//           list: "Shipping",
//           link: `${HomeUrl}/SupportCenter?query=Shipping`,
//           slug: "Shipping",
//           components: <Shipping />,
//         },
//         {
//           list: "Delivery",
//           link: `${HomeUrl}/SupportCenter?query=Delivery`,
//           slug: "Delivery",
//           components: <Delivery />,
//         },
//       ],
//     },
//     {
//       id: 3,
//       value: "item-3",
//       icon: <CircleDollarSign />,
//       title: "Return & refund",
//       content: [
//         {
//           list: "Returns",
//           link: `${HomeUrl}/SupportCenter?query=Returns`,
//           slug: "Returns",
//           components: <Returns />,
//         },
//         {
//           list: "Refunds",
//           link: `${HomeUrl}/SupportCenter?query=Refunds`,
//           slug: "Refunds",
//           components: <Refunds />,
//         },
//       ],
//     },
//     {
//       id: 4,
//       value: "item-4",
//       icon: <Archive />,
//       title: "Product & stock",
//       content: [
//         {
//           list: "Stock",
//           link: `${HomeUrl}/SupportCenter?query=Stock`,
//           slug: "Stock",
//           components: <Stock />,
//         },
//         {
//           list: "Size & fit",
//           link: `${HomeUrl}/SupportCenter?query=SizeAndFit`,
//           slug: "SizeAndFit",
//           components: <SizeAndFit />,
//         },
//       ],
//     },
//     {
//       id: 5,
//       value: "item-5",
//       icon: <GanttChartSquare />,
//       title: "Managing my account",
//       content: [
//         {
//           list: "Account preferences",
//           link: `${HomeUrl}/SupportCenter?query=AccountPreferences`,
//           slug: "AccountPreferences",
//           components: <AccountPreferences />,
//         },
//         {
//           list: "Signing in",
//           link: `${HomeUrl}/SupportCenter?query=SigningIn`,
//           slug: "SigningIn",
//           components: <SigningIn />,
//         },
//       ],
//     },
//     {
//       id: 6,
//       value: "item-6",
//       icon: <CreditCard />,
//       title: "Payment & promos",
//       content: [
//         {
//           list: "Payments",
//           link: `${HomeUrl}/SupportCenter?query=Payments`,
//           slug: "Payments",
//           components: <Payments />,
//         },
//         {
//           list: "Nile credit",
//           link: `${HomeUrl}/SupportCenter?query=NileCredits`,
//           slug: "NileCredits",
//           components: <NileCredit />,
//         },
//         {
//           list: "Promos",
//           link: `${HomeUrl}/SupportCenter?query=Promos`,
//           slug: "Promos",
//           components: <Promos />,
//         },
//       ],
//     },
//     {
//       id: 7,
//       value: "item-7",
//       icon: <ShieldCheck />,
//       title: "Your security",
//       content: [
//         {
//           list: "Security and Privacy",
//           link: `${HomeUrl}/SupportCenter?query=SecurityAndPrivacy`,
//           slug: "SecurityAndPrivacy",
//           components: <SecurityAndPrivacy />,
//         },
//       ],
//     },
//     {
//       id: 8,
//       value: "item-8",
//       icon: <FileStack />,
//       title: "Policies & others",
//       content: [
//         {
//           list: "Policies",
//           link: `${HomeUrl}/SupportCenter?query=Policies`,
//           slug: "Policies",
//           components: <Policies />,
//         },
//         {
//           list: "Feedbacks & collab inquiries",
//           link: `${HomeUrl}/SupportCenter?query=FeedbacksAndCollabInquiries`,
//           slug: "FeedbacksAndCollabInquiries",
//           components: <FeedbacksAndCollabInquiries />,
//         },
//       ],
//     },
//   ];

//   const findComponentByQueryAndSlug = (slug: any) => {
//     const item = AccordionData.find((accordionItem) =>
//       accordionItem.content.some((contentItem) => contentItem.slug === slug)
//     );

//     if (item) {
//       const component = item.content.find(
//         (contentItem) => contentItem.slug === slug
//       )?.components;

//       if (component) {
//         // Assuming your components are React components, you can render them like this
//         return <div>{component}</div>;
//       }
//     }

//     // Return a default component or handle the case when no match is found
//     return <div>No matching component found</div>;
//   };

//   const component = findComponentByQueryAndSlug(query);

//   console.log(component);

//   return (
//     <div className="w-full">
//       <h2 className="text-2xl font-bold mb-5">All help topics</h2>
//       <div className="w-full flex">
//         <div className="w-[25%] pr-10">
//           {AccordionData?.map((item, index) => (
//             <Accordion type="single" key={index} collapsible>
//               <AccordionItem className="" value={item.value}>
//                 <AccordionTrigger>
//                   <span className="flex gap-2 ">
//                     {item.icon}
//                     <h3 className="text-[0.9rem]">{item.title}</h3>
//                   </span>
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <ul className="">
//                     {item.content.map((citem, cindex) => (
//                       <Link href={citem.link}>
//                         <li
//                           className="font-medium text-[0.8rem] px-8 py-1 text-gray-500 hover:bg-gray-100 rounded-lg hover:text-black"
//                           key={cindex}
//                           onClick={() => SetRightComp(citem.slug)}
//                         >
//                           {citem.list}
//                         </li>
//                       </Link>
//                     ))}
//                   </ul>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           ))}
//         </div>

//         <div className="w-[70%] px-2">{component}</div>
//       </div>
//     </div>
//   );
// };

// export default AccordionTab;
