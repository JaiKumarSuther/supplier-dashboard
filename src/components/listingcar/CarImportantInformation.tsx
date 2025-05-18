import ImportantInfoForm from "../ui/ImportantInfoForm";

export default function CarImportantInformation() {
  const handleBack = () => {
    window.location.href = "inclusion.html";
  };

  const handleNext = () => {
    window.location.href = "listing-submitted.html";
  };

  return (
    <ImportantInfoForm
      heading="Important Information"
      onBack={handleBack}
      onNext={handleNext}
      sections={[{ title: "Additional details" }]}
    />
  );
}
