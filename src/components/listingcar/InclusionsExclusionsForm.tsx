import InclusionExclusionForm from "../ui/InclusionExclusionForm";

export default function CarInclusionsExclusionsForm() {
  return (
    <InclusionExclusionForm
      heading="Inclusions & Exclusions"
      onBack={() => (window.location.href = "pricing.html")}
      onNext={() => (window.location.href = "information.html")}
      useImageIcon={true}
    />
  );
}
