import React, { useEffect } from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components/SectionPromo1";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
import SectionPromo3 from "@/components/SectionPromo3";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import Heading from "@/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import SectionMagazine5 from "@/app/blog/SectionMagazine5";
import { AdminUrl } from "./layout";

export  async function getCategoryData() {
  const categoryResponse = await fetch(`${AdminUrl}/api/getAllProductCatgeory`);
  const categoryData = await categoryResponse.json()
  return categoryData
}


export async function getsubCategoryData() {
  const subcategoryResponse = await fetch(`${AdminUrl}/api/getAllSubcategories`); 
const subcategoryData = await subcategoryResponse.json()   
  return subcategoryData
}


export async function getProducts() {
  const productresponse =  await fetch(`${AdminUrl}/api/AllProductsVendors`)
  const productData = await productresponse.json()
  return productData
}


export async function getcustomerData(vendorId:any) {
  try {
    const response = await fetch(`${AdminUrl}/api/getCouponsByVendorId?vendorId=${vendorId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch customer data: ${response.status}`);
    }
    const customerData = await response.json();
    console.log("Successfully fetched customer data:", customerData);
    return customerData;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
}

 async function PageHome() {

  const categoryDatas =await  getCategoryData()


  return (
    <div className="nc-PageHome relative overflow-hidden">
       {/* <div className="">
        {
          categoryDatas?.map((d:any) => {
            return (
              <h1 className=" line-clamp-1 mx-4">{d.category_name}</h1>
            )
          })
        }
      </div> */}

      <SectionHero2/>

      <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionSliderProductCard
          data={[
            PRODUCTS[4],
            SPORT_PRODUCTS[5],
            PRODUCTS[7],
            SPORT_PRODUCTS[1],
            PRODUCTS[6],
          ]}
        />

        <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>
        <SectionPromo1 />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
        />

        <SectionPromo2 />

        <SectionSliderLargeProduct cardStyle="style2" />

        <SectionSliderCategories />

        <SectionPromo3 />

        <SectionGridFeatureItems />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div>
        <SectionClientSay />
      </div>
    </div>
  );
}

export default PageHome;
