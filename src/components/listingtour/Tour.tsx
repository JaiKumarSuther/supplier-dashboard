import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import SelectBox from "../ui/SelectBox";
import TitleOverviewForm from "../ui/TitleOverviewForm";
import InclusionExclusionForm from "../ui/InclusionExclusionForm";
import ImportantInfoForm from "../ui/ImportantInfoForm";
import ListingSubmissionMessage from "../ui/ListingSubmissionMessage";
import ListingButtons from "../ListingButtons";
import ListingSidebar from "../ui/ListingSidebar";

// Types
interface ItineraryItem {
  time: string;
  title: string;
  overview: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface InclusionExclusionItem {
  text: string;
}

interface ImportantInfoItem {
  text: string;
}

interface PriceGroup {
  price: string;
  minAge: number;
  maxAge: number;
  ageGroup: string;
}

interface AddOn {
  name: string;
  price: string;
  type: "person" | "booking";
}

const TourForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { listingId } = useParams();

  useEffect(() => {
    if (listingId) {
      setIsEditMode(true);
      fetchListing();
    }
  }, [listingId]);

  const fetchListing = async () => {
    if (!listingId) return;

    setLoading(true);

    try {
      const storedToken = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:9000/api/v1/listings/${listingId}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch listing");
      }

      const data = await res.json();
      const meta = data.meta_data;

      console.log("Listing fetched successfully:", meta);

      // 🖼️ Images
      setPhotos(meta.photos || []);

      // 📝 Basic info
      setTitle(meta.title || "");
      setOverview(meta.overview || "");
      setTourType(meta.type || "private");

      // ⏱️ Duration
      const [durValue, durUnit] = (meta.duration || "3 days").split(" ");
      setDuration(durValue || "3");
      setDurationType((durUnit as "days" | "hours") || "days");

      // 👥 Min people
      setMinPeople((meta.min_people || 4).toString());

      // 👶 Age range
      const [minAge, maxAge] = (meta.age_range || "0-11").split("-");
      setAgeRange({ min: minAge, max: maxAge });

      // 🌍 Language, City, Locations
      setLanguage(meta.languages?.[0] || "");
      setCity(meta.starts_in || "");
      setLocations(meta.places_covered?.[0] || "");

      // ✨ Highlights
      setHighlights(meta.highlights?.split(", ") || [""]);

      // 🧭 Itinerary
      setItineraries(meta.itinerary || []);

      // ❓ FAQs
      setFaqs(
        (meta.faqs || []).map((faq: string) => {
          const [q, a] = faq.split(" - ");
          return { question: q || "", answer: a || "" };
        })
      );

      // 💰 Pricing
      setBasePrice((meta.base_price || 450000).toLocaleString());

      setPriceGroups(
        (meta.secondary_prices || []).map((p: any) => ({
          price: p.price?.toLocaleString?.() || "0",
          minAge: 2,
          maxAge: 12,
          ageGroup: p.label || "",
        }))
      );

      // ➕ Add-ons
      setAddOns(meta.add_ons || []);

      // 🚗 Pickup
      setPickupIncluded(meta.pickup_included || "yes");

      // 📍 Meeting info
      setMeetingAddress(meta.meeting_address || "");
      setMeetingTime(meta.meeting_time || "");

      // ✅ Done
      toast.success("Listing data loaded successfully");
    } catch (error) {
      console.error("❌ Failed to fetch listing data:", error);
      toast.error("Failed to load listing data");
    } finally {
      setLoading(false);
    }
  };

  // Tour Media & Basics State
  const [forTourists, setForTourists] = useState<"local" | "international">(
    "international"
  );
  const [tourType, setTourType] = useState<"group" | "private">("private");
  const [duration, setDuration] = useState("3");
  const [durationType, setDurationType] = useState<"days" | "hours">("days");
  const [minPeople, setMinPeople] = useState("4");
  const [ageRange, setAgeRange] = useState({ min: "0", max: "11" });
  const [language, setLanguage] = useState("");
  const [city, setCity] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [spots, setSpots] = useState("");
  const [availability, setAvailability] = useState("");
  const [theme, setTheme] = useState("");
  const [pickupIncluded, setPickupIncluded] = useState<"yes" | "no">("yes");
  const [meetingAddress, setMeetingAddress] = useState("");
  const [meetingTime, setMeetingTime] = useState("");

  // Title & Overview State
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");

  // Destinations & Highlights State
  const [locations, setLocations] = useState("");
  const [highlights, setHighlights] = useState(["", "", ""]);

  // Itinerary State
  const [itineraries, setItineraries] = useState<ItineraryItem[]>([
    { time: "", title: "", overview: "" },
  ]);

  // Inclusions & Exclusions State
  const [inclusions] = useState<InclusionExclusionItem[]>([{ text: "" }]);
  const [exclusions] = useState<InclusionExclusionItem[]>([{ text: "" }]);

  // FAQs State
  const [faqs, setFaqs] = useState<FaqItem[]>([{ question: "", answer: "" }]);

  // Pricing & Add Ons State
  const [basePrice, setBasePrice] = useState("450,000");
  const [priceGroups, setPriceGroups] = useState<PriceGroup[]>([
    { price: "450,000", minAge: 2, maxAge: 12, ageGroup: "" },
  ]);
  const [addOns, setAddOns] = useState<AddOn[]>([
    { name: "", price: "450,000", type: "person" },
  ]);

  // Important Information State
  const [additionalDetails] = useState<ImportantInfoItem[]>([{ text: "" }]);
  const [notSuitableFor] = useState<ImportantInfoItem[]>([{ text: "" }]);

  const steps = [
    "Tour Media & Basics",
    "Title & Overview",
    "Destinations & Highlights",
    "Itinerary",
    "Inclusions & Exclusions",
    "FAQs",
    "Pricing & Add Ons",
    "Important Information",
    "Submitted",
  ];

  // const addMoreIcon = "/images/add-more-icon.svg";

  // Handler functions for different sections
  const handleHighlightChange = (index: number, value: string) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const addMoreHighlight = () => {
    setHighlights([...highlights, ""]);
  };

  const handleItineraryChange = (
    index: number,
    field: keyof ItineraryItem,
    value: string
  ) => {
    setItineraries((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addMoreItinerary = () => {
    setItineraries((prev) => [...prev, { time: "", title: "", overview: "" }]);
  };

  const handleFaqChange = (
    index: number,
    field: keyof FaqItem,
    value: string
  ) => {
    setFaqs((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addMoreFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleAddOnChange = (
    index: number,
    field: keyof AddOn,
    value: string
  ) => {
    setAddOns((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addMoreAddOn = () => {
    setAddOns((prev) => [
      ...prev,
      { name: "", price: "450,000", type: "person" },
    ]);
  };

  const storedToken = localStorage.getItem("token");
  const partnerId = localStorage.getItem("user_id");

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotosChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    await uploadFiles(fileArray);
  };

  const uploadFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("http://localhost:9000/api/v1/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setPhotos((prev) => [...prev, ...data.urls]);
      toast.success("Photos uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Failed to upload photos");
    }
  };

  const handleSubmit = async () => {
    if (!storedToken || !partnerId) {
      toast.error("Missing authentication details.");
      return;
    }

    setLoading(true);

    const payload = {
      partner_id: partnerId,
      listing_type: "tour",
      title,
      description: overview,
      price: parseInt(basePrice.replace(/,/g, "")),
      meta_data: {
        photos,
        title,
        overview,
        type: tourType,
        duration: `${duration} ${durationType}`,
        min_people: parseInt(minPeople),
        age_range: `${ageRange.min}-${ageRange.max}`,
        languages: language ? [language] : [],
        starts_in: city,
        places_covered: [locations],
        highlights: highlights.filter((h) => h).join(", "),
        itinerary: itineraries,
        inclusions: inclusions.filter((i) => i.text).map((i) => i.text),
        exclusions: exclusions.filter((e) => e.text).map((e) => e.text),
        faqs: faqs
          .filter((f) => f.question || f.answer)
          .map((f) => `${f.question} - ${f.answer}`),
        base_price: parseInt(basePrice.replace(/,/g, "")),
        secondary_prices: priceGroups.map((pg) => ({
          label: pg.ageGroup || "Group",
          price: parseInt(pg.price.replace(/,/g, "")),
        })),
        add_ons: Array.isArray(addOns)
          ? addOns
              .filter((a) => a.name)
              .map((a) => ({
                name: a.name,
                price: parseInt(a.price.replace(/,/g, "")),
                type: a.type,
              }))
          : [],
        important_info: additionalDetails.map((i) => i.text).join("\n"),
        not_suitable_for: notSuitableFor.map((n) => n.text).filter(Boolean),
        pickup_included: pickupIncluded === "yes",
        meeting_address: meetingAddress,
        meeting_time: meetingTime,
      },
    };

    console.log("📤 Submitting payload:", JSON.stringify(payload, null, 2));

    try {
      const url = isEditMode
        ? `http://localhost:9000/api/v1/listings/${listingId}`
        : "http://localhost:9000/api/v1/listings";

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(
          "❌ Error submitting listing:",
          JSON.stringify(errorData)
        );

        const errorMessage =
          errorData.message +
          (errorData.errors
            ?.map((e: any) => `${e.field}: ${e.message}`)
            .join(", ") || "");

        toast.error(errorMessage);
        return;
      }

      const data = await res.json();
      console.log("✅ Listing saved:", data);
      toast.success(
        isEditMode
          ? "Tour updated successfully!"
          : "Tour submitted successfully!"
      );
      handleNext(); // Show success message
    } catch (err) {
      console.error("❌ Submission failed:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const isLastStep: boolean = currentStep === steps.length - 2;

  if (loading && isEditMode && currentStep === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing data...</p>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Tour Media & Basics
        return (
          <form className="max-w-5xl md:w-[650px] py-2">
            <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
              {isEditMode ? "Edit Tour Media & Basics" : "Tour Media & Basics"}
            </h2>

            {/* Upload Section */}
            <label className="block font-semibold text-[#1e2a49] mb-2">
              Photos
            </label>

            <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center mb-6">
              <div className="p-3 bg-emerald-50 rounded-full">
                <svg
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              <h2 className="text-base font-semibold text-[#283456] mt-2 text-center">
                Drop files here or select files to upload
              </h2>
              <p className="text-gray-500 text-sm text-center">
                You can upload up to 20 JPG files
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotosChange}
                ref={fileInputRef}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-emerald-700 text-sm mt-2 font-medium hover:underline"
              >
                Select
              </button>

              {photos.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {photos.map((url, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:9000${url}`}
                      alt={`Tour photo ${idx + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* For */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm">For</label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setForTourists("local")}
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    forTourists === "local"
                      ? "bg-[#008558] text-white"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  Local tourists
                </button>
                <button
                  type="button"
                  onClick={() => setForTourists("international")}
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    forTourists === "international"
                      ? "bg-[#008558] text-white"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  International tourists
                </button>
              </div>
            </div>

            {/* Type */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm">Type</label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTourType("group")}
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    tourType === "group"
                      ? "bg-[#008558] text-white"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  Group tour
                </button>
                <button
                  type="button"
                  onClick={() => setTourType("private")}
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    tourType === "private"
                      ? "bg-[#008558] text-white"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  Private tour
                </button>
              </div>
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm">
                Duration
              </label>
              <div className="flex gap-3">
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <select
                  value={durationType}
                  onChange={(e) =>
                    setDurationType(e.target.value as "days" | "hours")
                  }
                  className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="days">Days</option>
                  <option value="hours">Hours</option>
                </select>
              </div>
            </div>

            {/* Min People */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm">
                Min. people required for booking
              </label>
              <select
                value={minPeople}
                onChange={(e) => setMinPeople(e.target.value)}
                className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            {/* Age Range */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm">
                Age range
              </label>
              <div className="flex items-center gap-3">
                <select
                  value={ageRange.min}
                  onChange={(e) =>
                    setAgeRange({ ...ageRange, min: e.target.value })
                  }
                  className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  {[...Array(18)].map((_, i) => (
                    <option key={i} value={i.toString()}>
                      {i}
                    </option>
                  ))}
                </select>
                <span className="text-sm">to</span>
                <select
                  value={ageRange.max}
                  onChange={(e) =>
                    setAgeRange({ ...ageRange, max: e.target.value })
                  }
                  className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  {[...Array(18)].map((_, i) => (
                    <option key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-500">years old</span>
              </div>
            </div>

            {/* Languages */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm">
                Languages spoken by guide
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">Select language</option>
                <option value="English">English</option>
                <option value="Urdu">Urdu</option>
              </select>
            </div>

            {/* Starts In */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm">
                Starts in
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">Select city</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
              </select>
            </div>

            {/* Available Spots */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm">
                Available spots
              </label>
              <select
                value={spots}
                onChange={(e) => setSpots(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">Select spots</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            {/* Availability */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm">
                Availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">Select dates</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>

            {/* Theme */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm">
                Tour theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">Select theme</option>
                <option value="Nature">Nature</option>
                <option value="Culture">Culture</option>
              </select>
            </div>

            {/* Pickup Included */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm">
                Pickup Included
              </label>
              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setPickupIncluded("yes")}
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    pickupIncluded === "yes"
                      ? "bg-[#008558] text-white"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setPickupIncluded("no")}
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    pickupIncluded === "no"
                      ? "bg-[#008558] text-white"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Meeting Address */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm">
                Meeting address
              </label>
              <textarea
                rows={2}
                value={meetingAddress}
                onChange={(e) => setMeetingAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              />
            </div>

            {/* Meeting Time */}
            <div className="mb-6">
              <label className="block mb-1 font-semibold text-sm">
                Meeting Time
              </label>
              <select
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">Select time</option>
                <option value="9:00 pm">9:00 PM</option>
                <option value="10:00 am">10:00 AM</option>
              </select>
            </div>

            <ListingButtons
              onBack={handleBack}
              onNext={isLastStep ? handleSubmit : handleNext}
              nextLabel={
                isLastStep ? (isEditMode ? "Update" : "Submit") : "Next"
              }
            />
          </form>
        );

      case 1: // Title & Overview
        return (
          <div className="listing-tour-right active px-6 py-4 bg-white shadow-sm rounded-lg">
            <TitleOverviewForm
              title={title}
              overview={overview}
              onTitleChange={setTitle}
              onOverviewChange={setOverview}
              onBack={handleBack}
              onNext={handleNext}
            />
          </div>
        );

      case 2: // Destinations & Highlights
        return (
          <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
              {isEditMode
                ? "Edit Destinations & Highlights"
                : "Destinations & Highlights"}
            </h2>

            {/* Locations Covered */}
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-[#1e2a49]">
                Locations covered
              </label>
              <SelectBox
                value={locations}
                onChange={(e) => setLocations(e.target.value)}
                options={["Hunza", "Skardu", "Islamabad"]}
                placeholder="Select destination"
                className="w-full"
              />
            </div>

            {/* Highlights Section */}
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-[#1e2a49]">
                Highlights
              </label>

              {highlights.map((highlight, index) => (
                <div key={index} className="relative mb-4">
                  <textarea
                    value={highlight}
                    onChange={(e) =>
                      handleHighlightChange(index, e.target.value)
                    }
                    maxLength={90}
                    rows={1}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none min-h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                    {highlight.length}/90
                  </span>
                </div>
              ))}

              <button
                type="button"
                onClick={addMoreHighlight}
                className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-100 transition mb-4"
              >
                <span className="text-xl leading-none">+</span>
                Add Highlight
              </button>
            </div>

            <ListingButtons onBack={handleBack} onNext={handleNext} />
          </form>
        );

      case 3: // Itinerary
        return (
          <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
              Itinerary
            </h2>

            {itineraries.map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl p-4 mb-6 shadow-sm relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <label className="block font-semibold text-[#1e2a49]">
                    {index + 1}
                  </label>
                </div>

                {/* Time Field */}
                <div className="relative mb-4">
                  <textarea
                    placeholder="i.e Day 1"
                    value={item.time}
                    onChange={(e) =>
                      handleItineraryChange(index, "time", e.target.value)
                    }
                    maxLength={20}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute bottom-2 right-4 text-xs text-gray-500">
                    {item.time.length}/20
                  </span>
                </div>

                {/* Title Field */}
                <div className="relative mb-4">
                  <textarea
                    placeholder="i.e Arrival in Islamabad"
                    value={item.title}
                    onChange={(e) =>
                      handleItineraryChange(index, "title", e.target.value)
                    }
                    maxLength={70}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute bottom-2 right-4 text-xs text-gray-500">
                    {item.title.length}/70
                  </span>
                </div>

                {/* Overview Field */}
                <div className="relative">
                  <textarea
                    placeholder="i.e Our day begins in..."
                    value={item.overview}
                    onChange={(e) =>
                      handleItineraryChange(index, "overview", e.target.value)
                    }
                    maxLength={400}
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute bottom-2 right-4 text-xs text-gray-500">
                    {item.overview.length}/400
                  </span>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addMoreItinerary}
              className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition mb-8"
            >
              <span className="text-xl leading-none">+</span> more
            </button>

            <ListingButtons onBack={handleBack} onNext={handleNext} />
          </form>
        );

      case 4: // Inclusions & Exclusions
        return (
          <div className="max-w-6xl w-full mx-auto">
            <InclusionExclusionForm
              heading="Inclusions & Exclusions"
              onBack={handleBack}
              onNext={handleNext}
            />
          </div>
        );

      case 5: // FAQs
        return (
          <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
              {isEditMode ? "Edit FAQs" : "FAQs"}
            </h2>

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-lg font-semibold text-[#1e2a49]">
                    FAQ {index + 1}
                  </label>
                </div>

                <div className="relative mb-5">
                  <textarea
                    placeholder="Enter question..."
                    value={faq.question}
                    onChange={(e) =>
                      handleFaqChange(index, "question", e.target.value)
                    }
                    maxLength={100}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute right-4 bottom-2 text-xs text-gray-500">
                    {faq.question.length}/100
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    placeholder="Enter answer..."
                    value={faq.answer}
                    onChange={(e) =>
                      handleFaqChange(index, "answer", e.target.value)
                    }
                    maxLength={300}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute right-4 bottom-2 text-xs text-gray-500">
                    {faq.answer.length}/300
                  </span>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addMoreFaq}
              className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-6 py-2 rounded-full text-sm font-semibold mb-8 hover:bg-emerald-200 transition"
            >
              <span className="text-xl leading-none">+</span> Add More
            </button>

            <ListingButtons onBack={handleBack} onNext={handleNext} />
          </form>
        );

      case 6: // Pricing & Add Ons
        return (
          <div className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
              {isEditMode ? "Edit Pricing & Add Ons" : "Pricing & Add Ons"}
            </h2>

            {/* Base Price Section */}
            <div className="bg-white border rounded-xl p-6 flex flex-col sm:flex-row gap-6 mb-5 shadow-sm">
              <div className="sm:w-36 flex border-r-2 border-dotted items-center text-[#1e2a49] font-semibold text-sm">
                Base Price
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Price
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="450,000"
                      value={basePrice}
                      onChange={(e) => setBasePrice(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm"
                    />
                    <span className="absolute right-4 top-2.5 text-sm text-gray-400">
                      PKR
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Age range
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="number"
                      value={priceGroups[0]?.minAge || 2}
                      onChange={(e) => {
                        const updated = [...priceGroups];
                        if (updated[0])
                          updated[0].minAge = parseInt(e.target.value);
                        setPriceGroups(updated);
                      }}
                      className="w-16 border border-gray-300 rounded-lg px-2 py-2 text-center text-sm"
                    />
                    <span className="text-gray-600 text-sm">to</span>
                    <input
                      type="number"
                      value={priceGroups[0]?.maxAge || 12}
                      onChange={(e) => {
                        const updated = [...priceGroups];
                        if (updated[0])
                          updated[0].maxAge = parseInt(e.target.value);
                        setPriceGroups(updated);
                      }}
                      className="w-16 border border-gray-300 rounded-lg px-2 py-2 text-center text-sm"
                    />
                    <span className="text-sm text-gray-400">years old</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Age group
                  </label>
                  <input
                    type="text"
                    placeholder="i.e adults"
                    value={priceGroups[0]?.ageGroup || ""}
                    onChange={(e) => {
                      const updated = [...priceGroups];
                      if (updated[0]) updated[0].ageGroup = e.target.value;
                      setPriceGroups(updated);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-6 py-2 rounded-full text-sm font-medium mb-6 hover:bg-emerald-200 transition"
            >
              <span className="text-xl leading-none">+</span> Secondary price
              groups
            </button>

            {/* Add-On Cards */}
            {addOns.map((addOn, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl p-6 flex flex-col sm:flex-row gap-6 mb-5 shadow-sm"
              >
                <div className="sm:w-36 flex border-r-2 border-dotted items-center text-[#1e2a49] font-semibold text-sm">
                  Add On {index + 1}
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Add on
                    </label>
                    <input
                      type="text"
                      value={addOn.name}
                      onChange={(e) =>
                        handleAddOnChange(index, "name", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Price
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={addOn.price}
                        onChange={(e) =>
                          handleAddOnChange(index, "price", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm"
                      />
                      <span className="absolute right-4 top-2.5 text-sm text-gray-400">
                        PKR
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Type
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleAddOnChange(index, "type", "person")
                        }
                        className={`px-6 py-2 rounded-full text-sm font-medium transition border ${
                          addOn.type === "person"
                            ? "bg-emerald-700 text-white"
                            : "bg-white text-[#1e2a49] border-gray-300"
                        }`}
                      >
                        Per person
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleAddOnChange(index, "type", "booking")
                        }
                        className={`px-6 py-2 rounded-full text-sm font-medium transition border ${
                          addOn.type === "booking"
                            ? "bg-emerald-700 text-white"
                            : "bg-white text-[#1e2a49] border-gray-300"
                        }`}
                      >
                        Per booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addMoreAddOn}
              className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-6 py-2 rounded-full text-sm font-medium mb-8 hover:bg-emerald-200 transition"
            >
              <span className="text-xl leading-none">+</span> More add ons
            </button>

            <ListingButtons onBack={handleBack} onNext={handleNext} />
          </div>
        );

      case 7: // Important Information
        return (
          <div className="max-w-6xl w-full mx-auto">
            <ImportantInfoForm
              heading="Important Information"
              onBack={handleBack}
              onNext={handleSubmit}
              nextLabel={isEditMode ? "Update" : "Submit"}
              sections={[
                { title: "Additional details" },
                { title: "Not suitable for" },
              ]}
            />
          </div>
        );

      case 8: // Submitted
        return (
          <ListingSubmissionMessage
            image="/images/verified_8948320.gif"
            title={
              isEditMode
                ? "Your Tour Has Been Updated"
                : "Your Tour Has Been Submitted"
            }
            description={
              isEditMode
                ? "Thank you for updating your tour on TravelNinja. Our team is reviewing your changes to ensure they meet our quality standards."
                : "Thank you for adding your tour to TravelNinja. Our team is currently reviewing your listing to ensure it meets our quality standards."
            }
            sections={[
              {
                heading: isEditMode ? "Review Process" : "Approval Process",
                content: isEditMode
                  ? "Updates typically take 2-6 hours to review."
                  : "Tour reviews typically take 6–12 hours before going live.",
              },
              {
                heading: "Notifications",
                content: isEditMode
                  ? "We'll notify you via email and dashboard once your changes are approved and live."
                  : "You'll be notified via email and dashboard once your tour is approved and published.",
              },
              {
                heading: "Updates & Edits",
                content:
                  "Need to make changes? You can update your tour anytime from your dashboard.",
              },
            ]}
            buttonLabel="Go to Home"
            onButtonClick={() => navigate("/")}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">
              {isEditMode ? "Updating your tour..." : "Creating your tour..."}
            </p>
          </div>
        </div>
      )}

      {currentStep < 8 ? (
        <div className="flex">
          <ListingSidebar
            steps={steps.slice(0, -1)} // Exclude "Submitted" from sidebar
            activeStep={currentStep}
            onStepClick={handleStepClick}
          />
          <div className="flex-1 px-6 py-8">{renderStep()}</div>
        </div>
      ) : (
        <div className="flex justify-center w-full py-8">{renderStep()}</div>
      )}
    </div>
  );
};

export default TourForm;
