import ImportantInfoForm from "../ui/ImportantInfoForm";

const ImportantInformationListing = () => {
  const handleBack = () => {
    window.location.href = "pricing.html";
  };

  const handleNext = () => {
    window.location.href = "listing-submitted.html";
  };

  return (
    <ImportantInfoForm
      heading="Important Information"
      onBack={handleBack}
      onNext={handleNext}
      sections={[
        { title: "Additional details" },
        { title: "Not suitable for" },
        { title: "What to bring" },
      ]}
    />
  );
};

export default ImportantInformationListing;
