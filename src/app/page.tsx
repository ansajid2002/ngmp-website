import React from "react";
import ItemsInCart from "@/components/ItemsInCart/ItemsInCart";
// import CategoriesSlider from "@/components/categoriesslider/Categoriesslider";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import { AdminUrl } from "./layout";
import Category from "@/components/CategoryPageSlick";
import TabsCategory from "@/components/TabsInterest/TabsCategory";
import Heading from "@/components/Heading";
import NewCategorySlider from "../components/categoriesslider/NewCategorySlider";
import Safety from "@/components/Safety";
import DealBar from "@/components/DealBar";
import { Zap } from "lucide-react";
import NewHeroSection from "@/components/SectionHero/NewHeroSection";
import NewHeroSectionMobile from "@/components/SectionHero/NewHeroSectionMobile";
import { NextSeo } from 'next-seo';
import { t } from "i18next";

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
    const response = await fetch(
      `${AdminUrl}/api/getCouponsByVendorId?vendorId=${vendorId}`,
      { next: { revalidate: 30 } }
    );
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
export async function getBannerdata() {
  try {
    const response = await fetch(`${AdminUrl}/api/getBanners`, {
      next: { revalidate: 30 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch banner data: ${response.status}`);
    }
    const bannersData = await response.json();
    return bannersData;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
}
export async function getBannerdataMobile() {
  try {
    const response = await fetch(`${AdminUrl}/api/getBannersMobile`, {
      next: { revalidate: 30 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch banner data: ${response.status}`);
    }
    const bannersData = await response.json();
    return bannersData;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
}

export const fetchCategoriesAndSubcategories = async (): Promise<
  Category[] | null
> => {
  try {
    const categoryResponse = await fetch(
      `${AdminUrl}/api/getAllProductCatgeory`,
      { next: { revalidate: 30 } }
    );
    const subcategoryResponse = await fetch(
      `${AdminUrl}/api/getAllSubcategories`,
      { next: { revalidate: 30 } }
    );

    if (categoryResponse.ok && subcategoryResponse.ok) {
      const categoryData: Category[] = await categoryResponse.json();
      const subcategoryData: Subcategory[] = await subcategoryResponse.json();

      // Map each category to add a 'subcategories' array containing its associated subcategories
      const categoriesWithSubcategories: Category[] = categoryData.map(
        (cat) => ({
          ...cat,
          subcategories: subcategoryData.filter(
            (subcat) => subcat.parent_category_id === cat.category_id
          ),
        })
      );

      // Sort the categories by their 'category_id' before updating the state
      const sortedCategories = categoriesWithSubcategories.sort(
        (a, b) => a.category_id - b.category_id
      );

      return sortedCategories;
    } else {
      // Handle error responses
      console.error("Error fetching categories:", categoryResponse.statusText);
      console.error(
        "Error fetching subcategories:",
        subcategoryResponse.statusText
      );
    }
  } catch (error) {
    // Handle error
    console.error("Error fetching data:", error);
  }

  return null;
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(
      `${AdminUrl}/api/recommendedProducts/null`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
    // Log the data
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getnewArrivals = async () => {
  try {
    const response = await fetch(
      `${AdminUrl}/api/newArrivals/null`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
    // Log the data
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getFeaturedData = async () => {
  try {
    const response = await fetch(
      `${AdminUrl}/api/getFeaturedSubcategories`,
      { next: { revalidate: 30 } }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllVendors = async () => {
  try {
    const response = await fetch(`${AdminUrl}/api/allVendors?pageNumber=1&pageSize=10`, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data?.vendors;
    // Log the data
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getReviewData = async (product_id: any, vendorId: any) => {
  try {
    const response = await fetch(`${AdminUrl}/api/fetchRatings?product_id=${product_id}&vendorid=${vendorId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
// getReviewData(644106)
async function PageHome() {
  const getAllProductsData_Recommended = await getAllProducts();
  const getAllProductsData_newArrivals = await getnewArrivals();
  const bannersData = await getBannerdata();
  const bannersDataMobile = await getBannerdataMobile();
  const vendors = await getAllVendors();

  const fetchCategoriesAndSubcategoriesdata = await fetchCategoriesAndSubcategories();

  return (
    <div className="relative overflow-hidden">

      {/* <SectionHero2 data={bannersData} /> */}
      <div className="hidden md:block">
        <NewHeroSection data={bannersData} />
      </div>
      <div className="md:hidden">
        <NewHeroSectionMobile data={bannersDataMobile} />
      </div>

      {/* <div className="mt-5 px-1 md:px-10 py-0 md:py-2">
        <Safety />
      </div> */}

      {/* <div className="mt-1 px-1 md:px-10 py-0 md:py-2">
        <DealBar
          title={"Lightning deals"}
          bgimage={
            "https://aimg.kwcdn.com/upload_aimg/commodity/e4b8aee4-b205-4a0d-845e-62d36d532518.png?imageView2/2/w/800/q/70/format/webp"
          }
          icon={<Zap size={30} fill="white" />}
        />
      </div> */}

      <div className=" px-5 md:px-10 relative space-y-24 my-8 md:my-16">
        {

          getAllProductsData_Recommended && getAllProductsData_Recommended?.length > 0 &&
          <SectionSliderProductCard
            heading="Recommended"
            data={getAllProductsData_Recommended}
          />
        }

        {
          vendors && vendors?.length > 0 && <div className="mt-24 lg:mt-32">
            <DiscoverMoreSlider data={vendors} />
          </div>
        }

        {/* <div className="space-y-10 mt-4">
          <CategoriesSlider categoriesdata={fetchCategoriesAndSubcategoriesdata} />
        </div> */}

        <div className="space-y-10 px-5 mt-4">
          <NewCategorySlider
            newcategoriesdata={fetchCategoriesAndSubcategoriesdata}
          />
        </div>

        <div className=" ">
          <ItemsInCart label1={"Items"} label2={"In Your Cart"} />
        </div>

        {
          getAllProductsData_newArrivals && getAllProductsData_newArrivals?.length > 0 && <SectionSliderProductCard
            ShowProduct={false}
            heading="New Arrivals"
            subHeading={t("Introducing Our Newest Selections")}
            data={getAllProductsData_newArrivals}
          />

        }

        <div className=" my-5 lg:my-32">
          <Heading title="EXPLORE YOUR INTEREST" />
          <TabsCategory categoriesdata={fetchCategoriesAndSubcategoriesdata} />
        </div>

        {/* <SectionPromo1 /> */}

        {/* <div className="relative py-24 lg:py-24">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div> */}

        {/* <SectionPromo2 /> */}

        {/* <SectionSliderLargeProduct cardStyle="style2" /> */}

        {/* <SectionSliderCategories /> */}

        {/* <SectionPromo3 /> */}

        {/* <SectionGridFeatureItems /> */}

        {/* <div className="relative py-24 lg:py-32">
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
        </div> */}
        {/* <SectionClientSay /> */}
      </div>

      <div>{/* <Category /> */}</div>
    </div>
  );
}

export default PageHome;
