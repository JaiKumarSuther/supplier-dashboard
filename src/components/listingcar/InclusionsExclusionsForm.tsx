import InclusionExclusionForm from "../ui/InclusionExclusionForm";

interface CarInclusionsExclusionsFormProps {
  onNext: () => void;
  onBack: () => void;
}

const CarInclusionsExclusionsForm: React.FC<CarInclusionsExclusionsFormProps> = ({
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

export default CarInclusionsExclusionsForm;
