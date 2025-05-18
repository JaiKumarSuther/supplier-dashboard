import InclusionExclusionForm from "../ui/InclusionExclusionForm";

export default function InclusionsExclusionsPage() {
  return (
    <InclusionExclusionForm
      heading="Inclusions & Exclusions"
      onBack={() => (window.location.href = "itinerary.html")}
      onNext={() => (window.location.href = "faq.html")}
    />
  );
}
