import ListingSidebar from "../ui/ListingSidebar";

const steps = [
  "About the car",
  "Pricing & Availability",
  "Inclusions & Exclusions",
  "Important Information",
];

const CarListingSidebar = ({
  activeStep = 0,
  onStepClick = (_index: number) => {},
}) => {
  return <ListingSidebar steps={steps} activeStep={activeStep} onStepClick={onStepClick} />;
};

export default CarListingSidebar;
