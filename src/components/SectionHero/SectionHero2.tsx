"use client";
// @ts-ignore 
import React, { FC, useState } from "react";
import Next from "@/shared/NextPrev/Next";
import Prev from "@/shared/NextPrev/Prev";
import useInterval from "react-use/lib/useInterval";
import useBoolean from "react-use/lib/useBoolean";
import Image from "next/image";
// import { HERO2_DEMO_DATA as DATA } from "./data";
import { bannerData } from "@/data/data";
import { AdminUrl } from "@/app/layout";

export interface SectionHero2Props {
  className?: string;
  data?: bannerData[];
}

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "", data }) => {
  if (!data || data.length === 0) {
    return null; // Or render a loading state or default content when data is not available
  }
  // ================= 
  const [indexActive, setIndexActive] = useState<number | null>(0);
  const [isRunning, toggleIsRunning] = useBoolean(true);

  useInterval(
    () => {
      handleAutoNext();
    },
    isRunning ? 1000000 : null
  );
  //

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (state >= data.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= data.length - 1) {
        return 0;
      }
      return state + 1;
    });
    handleAfterClick();
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return data.length - 1;
      }
      return state - 1;
    });
    handleAfterClick();
  };

  const handleAfterClick = () => {
    toggleIsRunning(false);
    if (TIME_OUT) {
      clearTimeout(TIME_OUT);
    }
    TIME_OUT = setTimeout(() => {
      toggleIsRunning(true);
    }, 1000);
  };
  // =================

  const renderItem = (index: number) => {
    const isActive = indexActive === index;
    const item = data[index];
    if (!isActive) {
      return null;
    }

    return (
      <div
        className={`bg-gray-200 nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden ${className}`}
        key={index}
      >
        <div className="absolute bottom-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-20 flex justify-center">
          {data.length > 1 && data.map((_, index) => {
            const isActive = indexActive === index;
            return (
              <div
                key={index}
                onClick={() => {
                  setIndexActive(index);
                  handleAfterClick();
                }}
                className={`relative px-1 py-1.5 cursor-pointer`}
              >
                <div
                  className={`relative w-20 h-1 shadow-sm rounded-md bg-white`}
                >
                  {isActive && (
                    <div
                      className={`nc-SectionHero2Item__dot absolute inset-0 bg-slate-900 rounded-md ${isActive ? " " : " "
                        }`}
                    ></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {
          data?.length > 1 && <>
            <Prev
              className="absolute start-1 sm:start-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-900  rounded-md"
              btnClassName="w-14 h-14 hover:border-slate-400 dark:hover:border-slate-400 bg-[#fb7701]"
              svgSize="w-8 h-8"
              onClickPrev={handleClickPrev}
            />
            <Next
              className="absolute end-1 sm:end-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-900 rounded-md"
              btnClassName="w-14 h-14 hover:border-slate-400 dark:hover:border-slate-400 bg-[#fb7701] "
              svgSize="w-8 h-8"
              onClickNext={handleClickNext}
            />
          </>
        }

        {/* BG */}
        <div className="relative pb-0 pt-0 sm:pt-0 ">
          <div className="md:h-[300px]">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <Image
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                className="w-full h-[216px] nc-SectionHero2Item__image"
                src={`${AdminUrl}/uploads/Banners${item.banner_url.startsWith('/') ? '' : '/'}${item.banner_url}`}
                alt="home banner"
                priority
              />
            </a>
          </div>
        </div>

      </div>
    );
  };

  return <>{data.map((_, index) => renderItem(index))}</>;
};

export default SectionHero2;
