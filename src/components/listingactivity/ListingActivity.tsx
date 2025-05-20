import { useState } from "react";
import ListingTourSidebar from "./ListingTourSidebar";

import ActivityMediaBasics from "./ActivityMediaBasics";
import TitleOverview from "./TitleOverview";
import ItineraryForm from "./ItineraryForm";
import InclusionsExclusionsForm from "./InclusionsExclusionsForm";
import FaqForm from "./FaqForm";
import PricingAddonsSection from "./PricingAddonsSection";
import ImportantInformationForm from "./ImportantInformationForm";
import ListingSubmitted from "./ListingSubmitted";

export default function ListingActivity() {
  const [activeStep, setActiveStep] = useState(0);

  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <ActivityMediaBasics />;
      case 1:
        return <TitleOverview />;
      case 2:
        return <ItineraryForm />;
      case 3:
        return <InclusionsExclusionsForm />;
      case 4:
        return <FaqForm />;
      case 5:
        return <PricingAddonsSection />;
      case 6:
        return <ImportantInformationForm />;
      default:
        return <ListingSubmitted />;
    }
  };

  return (
    <div className="flex">
      <ListingTourSidebar activeStep={activeStep} onStepClick={setActiveStep} />
      <div className="flex-1">{renderStepComponent()}</div>
    </div>
  );
}
