import React from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const DiversifiedOptions = ({ homepageData }) => {
  const diversifiedOptions =
    homepageData?.investment_options?.map((option) => ({
      category: option.category,
      label: option.title,
      icon: `${apiUrl}backend/storage/app/public/${option.icon}`,
    })) || [];

  const categories = [
    { key: "insurance", title: "INSURANCE" },
    { key: "mutual_fund", title: "MUTUAL FUND" },
    { key: "real_estate", title: "REAL ESTATE" },
  ];

  return (
    <div className="bg-black text-white py-8 sm:py-10 md:py-12 px-3 sm:px-4 md:px-6">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 jaini-regular">
        DIVERSIFIED OPTIONS
      </h2>

      {/* Desktop view */}
      <div className="hidden lg:block max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12 lg:gap-16">
          {categories.map(({ key, title }) => {
            const categoryItems = diversifiedOptions.filter(
              (item) => item.category === key
            );

            return (
              <div key={key} className="flex flex-col items-center mb-8">
                <div className="text-center font-bold text-lg sm:text-xl mb-4 sm:mb-6">
                  {title}
                </div>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  {categoryItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col w-24 sm:w-28 md:w-32 rounded-md overflow-hidden shadow-md"
                    >
                      <div className="bg-[#55A276] rounded-b-md flex justify-center items-center h-20 sm:h-24 md:h-27">
                        <img
                          src={item.icon}
                          alt={item.label}
                          loading="lazy"
                          className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
                        />
                      </div>
                      <div className="bg-[#231F20] py-2 sm:py-3 text-center text-sm sm:text-base md:text-xl">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/Tablet view with precisely 3px horizontal gap between items */}
      <div className="block lg:hidden max-w-md sm:max-w-2xl md:max-w-3xl mx-auto px-3">
        <div className="space-y-15 sm:space-y-24 md:space-y-28">
          {categories.map(({ key, title }) => {
            const categoryItems = diversifiedOptions.filter(
              (item) => item.category === key
            );

            return (
              <div key={key}>
                <h3 className="text-white text-base sm:text-lg font-bold mb-4 sm:mb-6 text-center">
                  {title}
                </h3>
                <div className="flex flex-wrap justify-center" style={{ columnGap: '60px', rowGap: '2.25rem' }}>
                  {categoryItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col w-24 sm:w-28 md:w-32 rounded-md overflow-hidden shadow-md"
                    >
                      <div className="bg-[#55A276] flex rounded-b-md justify-center items-center h-20 sm:h-24 md:h-27">
                        <img
                          src={item.icon}
                          alt={item.label}
                          loading="lazy"
                          className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
                        />
                      </div>
                      <div className="bg-[#231F20] py-2 sm:py-3 text-center text-xs sm:text-sm md:text-base">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default DiversifiedOptions;