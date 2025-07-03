import InclusionExclusionForm from "../ui/InclusionExclusionForm";

interface InclusionsExclusionsFormProps {
  onNext: () => void;
  onBack: () => void;
}

const InclusionsExclusionsForm: React.FC<InclusionsExclusionsFormProps> = ({
  onNext,
  onBack,
}) => {
  return (
    <InclusionExclusionForm
      heading="Inclusions & Exclusions"
      onBack={onBack}
      onNext={onNext}
    />
  );
};

export default InclusionsExclusionsForm;
