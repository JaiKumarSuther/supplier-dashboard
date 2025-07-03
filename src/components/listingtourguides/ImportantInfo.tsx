import ImportantInfoForm from "../ui/ImportantInfoForm";

interface ImportantInfoProps {
  onBack: () => void;
  onNext: () => void;
}

export default function ImportantInfo({ onBack, onNext }: ImportantInfoProps) {
  return (
    <div className="listing-tour-right active">
      <ImportantInfoForm
        heading="Important Information"
        onBack={onBack}
        onNext={onNext}
        sections={[
          { title: "Additional details" },
          { title: "Not suitable for" },
        ]}
      />
    </div>
  );
}
