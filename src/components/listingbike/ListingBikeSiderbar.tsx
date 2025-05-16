const steps = [
  "About the bike",
  "Pricing & Availability",
  "Inclusions & Exclusions",
  "Important Information",
];

const ListingBikeSidebar = ({ activeStep = 0, onStepClick = (_index: number) => {} }) => {
  return (
    <div className="w-[250px] p-10 rounded-lg hidden lg:block">
      <ul className="list-none space-y-2">
        {steps.map((step, index) => (
          <li
            key={index}
            onClick={() => onStepClick(index)}
            className={`cursor-pointer transition-colors text-sm py-1 ${
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

export default ListingBikeSidebar;
