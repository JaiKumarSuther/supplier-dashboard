import InclusionExclusionForm from "../ui/InclusionForm";

export default function InclusionsExclusionsPage() {
  return (
    <InclusionExclusionForm
      onBack={() => (window.location.href = "itinerary.html")}
      onNext={() => (window.location.href = "faq.html")}
    />
  );
}
