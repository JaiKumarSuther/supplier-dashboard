'use client';

import ListingSidebar from "../ui/ListingSidebar";

const steps = [
  "About the room",
  "Pricing & Availability",
];

const HostelListingSidebar = ({
  activeStep = 0,
  onStepClick = (_index: number) => {},
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
