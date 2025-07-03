import InclusionExclusionForm from "../ui/InclusionForm";

interface InclusionsExclusionsPageProps {
  onBack: () => void;
  onNext: () => void;
}

const InclusionsExclusionsPage: React.FC<InclusionsExclusionsPageProps> = ({ onBack, onNext }) => {
  return (
    <InclusionExclusionForm
      onBack={onBack}
      onNext={onNext}
    />
  );
};

export default InclusionsExclusionsPage;
