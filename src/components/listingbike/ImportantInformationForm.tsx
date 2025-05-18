import ImportantInfoForm from "../ui/ImportantInfoForm";

const BikeImportantInformation = () => {
  const handleBack = () => {
    window.location.href = "itinerary.html";
  };

  const handleNext = () => {
    window.location.href = "faq.html";
  };

  return (
    <ImportantInfoForm
      heading="Important Information"
      onBack={handleBack}
      onNext={handleNext}
      sections={[{ title: "Additional details" }]} // ✅ REQUIRED
    />
  );
};

export default BikeImportantInformation;
