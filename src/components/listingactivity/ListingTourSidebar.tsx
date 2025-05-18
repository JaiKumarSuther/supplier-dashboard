import ListingSidebar from "../ui/ListingSidebar";

const steps = [
  "Activity Media & Basics",
  "Title & Overview",
  "Itinerary",
  "Inclusions & Exclusions",
  "FAQs",
  "Pricing & Add Ons",
  "Important Information",
];

const ListingTourSidebar = ({
  activeStep = 0,
  onStepClick = (_index: number) => {},
}) => {
  return <ListingSidebar steps={steps} activeStep={activeStep} onStepClick={onStepClick} />;
};

export default ListingTourSidebar;
