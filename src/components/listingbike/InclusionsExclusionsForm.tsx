import InclusionExclusionForm from "../ui/InclusionExclusionForm";

const InclusionsExclusionsForm = () => {
  return (
    <InclusionExclusionForm
      heading="Inclusions & Exclusions"
      onBack={() => (window.location.href = "inclusion.html")}
      onNext={() => (window.location.href = "pricing.html")}
      useImageIcon={false}
    />
  );
};

export default InclusionsExclusionsForm;
