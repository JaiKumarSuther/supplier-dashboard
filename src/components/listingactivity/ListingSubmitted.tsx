import ListingSubmissionMessage from "../ui/ListingSubmissionMessage";

interface ListingSubmittedProps {
  onButtonClick: () => void;
}

const ListingSubmitted: React.FC<ListingSubmittedProps> = ({ onButtonClick }) => {
  return (
    <ListingSubmissionMessage
      image="/images/verified_8948320.gif"
      title="Your Activity Has Been Submitted"
      description="Thank you for adding your activity to TravelNinja. Our team is currently reviewing your listing to ensure it meets our quality standards."
      sections={[
        {
          heading: "Approval Process",
          content: "This typically takes 6–12 hours.",
        },
        {
          heading: "Notifications",
          content:
            "We’ll notify you via email and dashboard once your activity is approved and live.",
        },
        {
          heading: "Updates & Edits",
          content:
            "Need to make changes? You can edit your listing anytime from your dashboard.",
        },
      ]}
      buttonLabel="Go to Home"
      onButtonClick={onButtonClick}
    />
  );
};

export default ListingSubmitted;
