import ListingSubmissionMessage from '../ui/ListingSubmissionMessage';

interface HostelListingSubmittedProps {
  onButtonClick: () => void;
}

const HostelListingSubmitted: React.FC<HostelListingSubmittedProps> = ({
  onButtonClick,
}) => {
  return (
    <ListingSubmissionMessage
      image="/images/verified_8948320.gif"
      title="Your Room Has Been Submitted"
      description="Thank you for adding your room to TravelNinja. Our team is currently reviewing your listing to ensure it meets our quality standards."
      sections={[
        {
          heading: 'Approval Process',
          content: 'This typically takes 6–12 hours.',
        },
        {
          heading: 'Notifications',
          content: 'We’ll notify you via email and dashboard once your room is approved and live.',
        },
        {
          heading: 'Updates & Edits',
          content: 'Need to make changes? You can edit your listing anytime from your dashboard.',
        },
      ]}
      buttonLabel="Go to Home"
      onButtonClick={onButtonClick}
    />
  );
};

export default HostelListingSubmitted;
