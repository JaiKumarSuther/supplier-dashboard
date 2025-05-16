import { useState } from "react";

import InclusionsExclusionsForm from "./InclusionsExclusionsForm";
import ListingBikeSidebar from "./ListingBikeSiderbar";
import AboutTheBike from "./AboutTheBike";
import ImportantInformationForm from "./ImportantInformationForm";
import PricingAvailability from "./PricingAvailability";

export default function BikeListingActivity() {
  const [activeStep, setActiveStep] = useState(0);

  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <AboutTheBike />;
      case 1:
        return <PricingAvailability />;
      case 2:
        return <InclusionsExclusionsForm />;
      case 3:
        return <ImportantInformationForm />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="flex">
      <ListingBikeSidebar activeStep={activeStep} onStepClick={setActiveStep} />
      <div className="flex-1 p-6">{renderStepComponent()}</div>
    </div>
  );
}
