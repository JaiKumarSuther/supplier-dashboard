'use client';

import { useState } from "react";
import ListingSidebar from "../ui/ListingSidebar";
import AboutTheExperience from "./TourMediaBasics";
import TitleOverview from "./TitleOverview";
import HighlightsForm from "./DestinationsHighlightsForm";
import ItineraryForm from "./ItineraryForm";
import InclusionsForm from "./InclusionsExclusionsPage";
import FaqsForm from "./FaqsForm";
import PricingAddOns from "./PricingAddOns";
import ImportantInfo from "./ImportantInfo";


// Import your step components here


const steps = [
  'Tour Media & Basics',
  'Title & Overview',
  'Destinations & Highlights',
  'Itinerary',
  'Inclusions & Exclusions',
  'FAQs',
  'Pricing & Add Ons',
  'Important Information',
];

export default function Tour() {
  const [activeStep, setActiveStep] = useState(0);

  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <AboutTheExperience />;
      case 1:
        return <TitleOverview />;
      case 2:
        return <HighlightsForm />;
      case 3:
        return <ItineraryForm />;
      case 4:
        return <InclusionsForm />;
      case 5:
        return <FaqsForm />;
      case 6:
        return <PricingAddOns />;
      case 7:
        return <ImportantInfo />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="flex">
      <ListingSidebar
        steps={steps}
        activeStep={activeStep}
        onStepClick={setActiveStep}
      />
      <div className="flex-1">{renderStepComponent()}</div>
    </div>
  );
}
