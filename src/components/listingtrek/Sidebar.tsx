'use client';

interface ListingSidebarProps {
  steps: string[];
  activeStep: number;
  onStepClick: (index: number) => void;
}

const ListingSidebar = ({ steps, activeStep, onStepClick }: ListingSidebarProps) => {
  return (
    <div className="w-[240px] py-8 px-6 listing-tour-left bg-white border-r border-gray-200">
      <ul className="space-y-4">
        {steps.map((step, index) => (
          <li
            key={index}
            onClick={() => onStepClick(index)}
            className={`cursor-pointer text-sm transition font-medium ${
              index === activeStep
                ? 'text-[#1e2a49] font-bold bg-[#f9fffd] px-2 py-1 rounded-md shadow-sm'
                : 'text-[#1e2a49] opacity-50 hover:opacity-80'
            }`}
            id={index === activeStep ? 'list-tour-active' : undefined}
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingSidebar;
