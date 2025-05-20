import ImportantInfoForm from "../ui/ImportantInfoForm";


export default function ImportantInfo() {
  return (
    <div className="listing-tour-right active">
      <ImportantInfoForm
        heading="Important Information"
        onBack={() => (window.location.href = "pricing.html")}
        onNext={() => (window.location.href = "listing-submitted.html")}
        sections={[
          { title: "Additional details" },
          { title: "Not suitable for" },
        ]}
      />
    </div>
  );
}
