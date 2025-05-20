'use client';

import { useState } from "react";
import AboutTheRoomForm from "./AboutTheRoomForm";
import HostelPricingAvailability from "./HostelPricingAvailability";
import HostelListingSidebar from "./ListingSidebar";


export default function ListingHotel() {
  const [activeStep, setActiveStep] = useState(0);

  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <AboutTheRoomForm />;
      case 1:
        return <HostelPricingAvailability />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="flex">
      <HostelListingSidebar
        activeStep={activeStep}
        onStepClick={setActiveStep}
      />
      <div className="flex-1 p-6">{renderStepComponent()}</div>
    </div>
  );
}
