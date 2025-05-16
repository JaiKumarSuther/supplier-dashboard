import VerifiedGif from '../../../public/images/verified_8948320.gif'

const ListingSubmitted = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
      <div className="bg-white w-full max-w-[480px] p-8 rounded-xl text-[#283456]">
        <div className="flex justify-start mb-6">
          <img
            src={VerifiedGif}
            alt="submission success"
            className="w-16 h-16"
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-left">
          Your Activity Has Been Submitted
        </h2>

        <p className="text-sm mb-6 text-left">
          Thank you for adding your activity to travelninja. Our team is currently reviewing
          your listing to ensure it meets our quality standards.
        </p>

        <div className="mb-4 text-left">
          <p className="font-semibold text-sm mb-1">Approval Process</p>
          <p className="text-sm">This typically takes 6-12 hours.</p>
        </div>

        <div className="mb-4 text-left">
          <p className="font-semibold text-sm mb-1">Notifications</p>
          <p className="text-sm">
            We’ll notify you via email and dashboard once your activity is approved and live.
          </p>
        </div>

        <div className="mb-6 text-left">
          <p className="font-semibold text-sm mb-1">Updates & Edits</p>
          <p className="text-sm">
            Need to make changes? You can edit your listing anytime from your dashboard.
          </p>
        </div>

        <div className="flex justify-start">
          <button
            onClick={() => (window.location.href = "/dashboard.html")}
            className="px-6 py-2 border border-gray-300 rounded-full text-sm text-[#707D99] hover:bg-gray-100"
          >
            go to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingSubmitted;