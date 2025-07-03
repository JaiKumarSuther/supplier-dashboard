import ImportantInfoForm from "../ui/ImportantInfoForm";

interface BikeImportantInformationProps {
  onNext: () => void;
  onBack: () => void;
}

const BikeImportantInformation: React.FC<BikeImportantInformationProps> = ({
  onNext,
  onBack,
}) => {
  return (
    <ImportantInfoForm
      heading="Important Information"
      onBack={onBack}
      onNext={onNext}
      sections={[{ title: "Additional details" }]} // ✅ REQUIRED
    />
  );
};

export default BikeImportantInformation;
