import VerifiedGif from '../../../public/images/verified_8948320.gif';
import ListingSubmissionMessage from '../ui/ListingSubmissionMessage';

const ActivityListingSubmitted = () => {
  return (
    <ListingSubmissionMessage
      image={VerifiedGif}
      title="Your Activity Has Been Submitted"
      description="Thank you for adding your activity to travelninja. Our team is currently reviewing your listing to ensure it meets our quality standards."
      sections={[
        {
          heading: 'Approval Process',
          content: 'This typically takes 6-12 hours.',
        },
        {
          heading: 'Notifications',
          content: 'We’ll notify you via email and dashboard once your activity is approved and live.',
        },
        {
          heading: 'Updates & Edits',
          content: 'Need to make changes? You can edit your listing anytime from your dashboard.',
        },
      ]}
      buttonLabel="go to home"
      onButtonClick={() => (window.location.href = '/dashboard.html')}
    />
  );
};

export default ActivityListingSubmitted;
