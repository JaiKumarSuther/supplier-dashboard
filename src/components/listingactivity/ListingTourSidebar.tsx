import React from "react";

const steps = [
  "Activity Media & Basics",
  "Title & Overview",
  "Itinerary",
  "Inclusions & Exclusions",
  "FAQs",
  "Pricing & Add Ons",
  "Important Information",
];

const ListingTourSidebar = ({ activeStep = 0, onStepClick = (index: number) => {} }) => {
  return (
    <div className="w-[250px] p-5 rounded-lg hidden lg:block">
      <ul className="list-none">
        {steps.map((step, index) => (
          <li
            key={index}
            onClick={() => onStepClick(index)}
            className={`py-2 cursor-pointer font-medium transition-colors ${
              activeStep === index
                ? "text-[#283456] font-semibold"
                : "text-[#bfddd7] font-normal"
            }`}
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingTourSidebar;
