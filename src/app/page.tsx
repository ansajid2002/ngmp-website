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
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import SectionMagazine5 from "@/app/blog/SectionMagazine5";
import { AdminUrl } from "./layout";


interface Subcategory {
  subcategory_id: number;
  subcategory_name: string;
  parent_category_id: number;
}

interface Category {
  category_id: number;
  category_name: string;
  subcategories: Subcategory[];
}


export async function getcustomerData(vendorId: any) {
  try {
    const response = await fetch(`${AdminUrl}/api/getCouponsByVendorId?vendorId=${vendorId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch customer data: ${response.status}`);
    }
    const customerData = await response.json();
    return customerData;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
}

export const fetchCategoriesAndSubcategories = async (): Promise<Category[] | null> => {
  try {
    const categoryResponse = await fetch(`${AdminUrl}/api/getAllProductCatgeory`);
    const subcategoryResponse = await fetch(`${AdminUrl}/api/getAllSubcategories`);

    if (categoryResponse.ok && subcategoryResponse.ok) {
      const categoryData: Category[] = await categoryResponse.json();
      const subcategoryData: Subcategory[] = await subcategoryResponse.json();

      // Map each category to add a 'subcategories' array containing its associated subcategories
      const categoriesWithSubcategories: Category[] = categoryData.map((cat) => ({
        ...cat,
        subcategories: subcategoryData.filter((subcat) => subcat.parent_category_id === cat.category_id),
      }));

      // Sort the categories by their 'category_id' before updating the state
      const sortedCategories = categoriesWithSubcategories.sort((a, b) => a.category_id - b.category_id);

      return sortedCategories;
    } else {
      // Handle error responses
      console.error("Error fetching categories:", categoryResponse.statusText);
      console.error("Error fetching subcategories:", subcategoryResponse.statusText);
    }
  } catch (error) {
    // Handle error
    console.error("Error fetching data:", error);
  }

  return null;
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${AdminUrl}/api/AllProductsVendors?currency=USD}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data
    // Log the data
  } catch (error) {
    console.error('Error:', error);
  }
};

async function PageHome() {
  const getAllProductsData = await getAllProducts()

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

      <SectionHero2 />

      <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionSliderProductCard
          heading="Recommended"
          data={getAllProductsData}
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
