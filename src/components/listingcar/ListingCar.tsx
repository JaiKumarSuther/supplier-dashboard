import { useState } from "react";

import CarListingSidebar from "./CarListingSidebar";
import AboutTheCarForm from "./AboutTheCarForm";
import InclusionsExclusionsForm from "./InclusionsExclusionsForm";
import ImportantInformationForm from "./CarImportantInformation";
import CarPricingAvailability from "./CarPricingAvailability";

export default function CarListingActivity() {
  const [activeStep, setActiveStep] = useState(0);

  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <AboutTheCarForm />;
      case 1:
        return <CarPricingAvailability />;
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
      <CarListingSidebar activeStep={activeStep} onStepClick={setActiveStep} />
      <div className="flex-1 p-6">{renderStepComponent()}</div>
    </div>
  );
}
