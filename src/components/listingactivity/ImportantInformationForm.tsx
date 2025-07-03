import ImportantInfoForm from "../ui/ImportantInfoForm";

interface ImportantInformationFormProps {
  onNext: () => void;
  onBack: () => void;
}

const ImportantInformationForm: React.FC<ImportantInformationFormProps> = ({
  onNext,
  onBack,
}) => {
  return (
    <ImportantInfoForm
      heading="Important Information"
      onBack={onBack}
      onNext={onNext}
      sections={[
        { title: "Additional details" },
        { title: "Not suitable for" },
        { title: "What to bring" },
      ]}
    />
  );
};

export default ImportantInformationForm;
