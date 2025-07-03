const uploadIcon = "/images/upload-icon.svg";

export default function OpenTicketForm() {
  return (
    <main className="w-full min-h-screen bg-white px-4 py-10 flex justify-center">
      <div className="w-full max-w-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a49] text-center mb-10">
          What do you need help with?
        </h2>
        <form className="w-full flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-semibold text-[#1e2a49] mb-1">
              Write a descriptive title
            </label>
            <input
              type="text"
              id="title"
              maxLength={100}
              required
              placeholder="I'm having trouble with..."
              className="border border-[#e2e2e2] rounded-lg py-3 px-4 focus:outline-none focus:border-[#6d6d6d] text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="related" className="text-sm font-semibold text-[#1e2a49] mb-1">
              Related to
            </label>
            <select
              id="related"
              className="border border-[#e2e2e2] rounded-lg py-3 px-4 text-sm text-gray-500 focus:outline-none focus:border-[#6d6d6d]"
              required
            >
              <option value="">Select</option>
              <option value="billing">Billing</option>
              <option value="technical">Technical Issue</option>
              <option value="account">Account Access</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="issue" className="text-sm font-semibold text-[#1e2a49] mb-1">
              Explain the issue
            </label>
            <textarea
              id="issue"
              rows={6}
              required
              className="border border-[#e2e2e2] rounded-lg py-3 px-4 focus:outline-none focus:border-[#6d6d6d] text-sm"
            ></textarea>
          </div>

          <div className="flex items-center gap-2 w-fit text-sm text-[#1e2a49] px-5 py-2 bg-[#f6f6f6] rounded-full cursor-pointer">
            <img src={uploadIcon} alt="upload" className="w-4 h-4" />
            attach photo
          </div>
        </form>

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className="bg-[#008558] text-white text-sm font-semibold px-8 py-2.5 rounded-full hover:bg-[#00714a] transition"
          >
            Open Ticket
          </button>
        </div>
      </div>
    </main>
  );
}