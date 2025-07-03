'use client';

import ListingSidebar from "../ui/ListingSidebar";

const steps = [
  "About the room",
  "Pricing & Availability",
];

interface HostelListingSidebarProps {
  activeStep: number;
  onStepClick: (index: number) => void;
}

const HostelListingSidebar: React.FC<HostelListingSidebarProps> = ({
  activeStep,
  onStepClick,
}) => {
  return (
    <ListingSidebar
      steps={steps}
      activeStep={activeStep}
      onStepClick={onStepClick}
    />
  );
};

export default HostelListingSidebar;
