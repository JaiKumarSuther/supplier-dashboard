import ListingSidebar from "../ui/ListingSidebar";

const steps = [
  "About the bike",
  "Pricing & Availability",
  "Inclusions & Exclusions",
  "Important Information",
];

const BikeListingSidebar = ({
  activeStep = 0,
  onStepClick = (_index: number) => {},
}) => {
  return <ListingSidebar steps={steps} activeStep={activeStep} onStepClick={onStepClick} />;
};

export default BikeListingSidebar;
