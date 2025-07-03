'use client';

import { useState } from 'react';
import ListingSidebar from '../ui/ListingSidebar';

const steps = [
  'Trek Media & Basics',
  'Title & Overview',
  'Destinations & Highlights',
  'Itinerary',
  'Inclusions & Exclusions',
  'FAQs',
  'Pricing & Add Ons',
  'Important Information',
];

const TrekSidebarWrapper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <div className="flex">
      <ListingSidebar
        steps={steps}
        activeStep={activeStep}
        onStepClick={handleStepClick}
      />
      <div className="flex-1 p-5">
        <h1 className="text-xl font-bold">{steps[activeStep]}</h1>
        <p className="mt-2">Display content for step {activeStep + 1}</p>
      </div>
    </div>
  );
};

export default TrekSidebarWrapper;
