import ListingSidebar from "../ui/ListingSidebar";

const steps = [
  "About the car",
  "Pricing & Availability",
  "Inclusions & Exclusions",
  "Important Information",
];

interface CarListingSidebarProps {
  activeStep: number;
  onStepClick: (index: number) => void;
}

const CarListingSidebar: React.FC<CarListingSidebarProps> = ({
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

export default CarListingSidebar;
