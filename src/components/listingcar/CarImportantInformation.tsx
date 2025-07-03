import ImportantInfoForm from "../ui/ImportantInfoForm";

interface CarImportantInformationProps {
  onNext: () => void;
  onBack: () => void;
}

const CarImportantInformation: React.FC<CarImportantInformationProps> = ({
  onNext,
  onBack,
}) => {
  return (
    <ImportantInfoForm
      heading="Important Information"
      onBack={onBack}
      onNext={onNext}
      sections={[{ title: "Additional details" }]}
    />
  );
};

export default CarImportantInformation;
