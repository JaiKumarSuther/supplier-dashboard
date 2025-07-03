  // components/ListingSidebar.tsx
  interface ListingSidebarProps {
    steps: string[];
    activeStep: number;
    onStepClick: (index: number) => void;
  }

  const ListingSidebar: React.FC<ListingSidebarProps> = ({
    steps,
    activeStep,
    onStepClick,
  }) => {
    return (
      <div className="w-[250px] pt-10 p-5 pl-14 rounded-lg hidden lg:block">
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

  export default ListingSidebar;
