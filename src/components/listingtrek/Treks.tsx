
"use client";

import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import SelectBox from "../ui/SelectBox";
import ListingButtons from "../ListingButtons";
import TitleOverviewForm from "../ui/TitleOverviewForm";
import InclusionExclusionForm from "../ui/InclusionExclusionForm";
import ImportantInfoForm from "../ui/ImportantInfoForm";
import ListingSubmissionMessage from "../ui/ListingSubmissionMessage";
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

interface ListingData {
  listing_id?: string;
  title: string;
  description: string;
  price: number;
  meta_data: any;
}

const CompleteTrekForm = () => {
  const navigate = useNavigate();
  const { id: listingId } = useParams();
  const [searchParams] = useSearchParams();
  const editMode = Boolean(listingId) || searchParams.get("edit") === "true";

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(editMode);

  // ✅ Trek Media & Basics
  const [touristType, setTouristType] = useState<"local" | "international">(
    "international"
  );
  const [trekType, setTrekType] = useState<"group" | "private">("private");
  const [duration, setDuration] = useState("3");
  const [theme, setTheme] = useState("");
  const [durationUnit, setDurationUnit] = useState<"days" | "hours">("days");
  const [minPeople, setMinPeople] = useState("4");
  const [ageRange, setAgeRange] = useState({ min: "0", max: "11" });
  const [language, setLanguage] = useState("");
  const [city, setCity] = useState("");
  const [spots, setSpots] = useState("");
  const [availability, setAvailability] = useState("");
  const [trekName] = useState("");
  const [pickupIncluded, setPickupIncluded] = useState<"yes" | "no">("yes");
  const [meetingAddress, setMeetingAddress] = useState("");
  const [meetingTime, setMeetingTime] = useState("");

  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Title & Overview
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");

  // ✅ Destinations & Highlights
  const [locations, setLocations] = useState("");
  const [highlights, setHighlights] = useState(["", "", ""]);

  // ✅ Itinerary
  const [itineraries, setItineraries] = useState<ItineraryItem[]>([
    { time: "", title: "", overview: "" },
  ]);

  // ✅ Inclusions & Exclusions
  const [inclusions] = useState<InclusionExclusionItem[]>([{ text: "" }]);
  const [exclusions] = useState<InclusionExclusionItem[]>([{ text: "" }]);

  // ✅ FAQs
  const [faqs, setFaqs] = useState<FaqItem[]>([{ question: "", answer: "" }]);

  // ✅ Pricing & Add-ons
  const [basePrice, setBasePrice] = useState("450,000");
  const [priceGroups, setPriceGroups] = useState<PriceGroup[]>([
    { price: "450,000", minAge: 2, maxAge: 12, ageGroup: "" },
  ]);
  const [addOns, setAddOns] = useState<AddOn[]>([
    { name: "", price: "450,000", type: "person" },
  ]);

  // ✅ Important Information
  const [additionalDetails] = useState<ImportantInfoItem[]>([{ text: "" }]);
  const [notSuitableFor] = useState<ImportantInfoItem[]>([{ text: "" }]);

  const steps = [
    "Trek Media & Basics",
    "Title & Overview",
    "Destinations & Highlights",
    "Itinerary",
    "Inclusions & Exclusions",
    "FAQs",
    "Pricing & Add Ons",
    "Important Information",
    "Trek Submitted",
  ];

  const uploadIcon = "/images/upload-icon.svg";
  const addMoreIcon = "/images/add-more-icon.svg";

  const storedToken = localStorage.getItem("token");
  const partnerId = localStorage.getItem("user_id");

  // Load existing listing data if in edit mode
  useEffect(() => {
    const loadListingData = async () => {
      if (!editMode || !listingId) return;

      setIsLoadingData(true);
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/listings/${listingId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch listing data");
        }

        const listingData: ListingData = await response.json();

        // Populate form fields with existing data
        setTitle(listingData.title || "");
        setOverview(listingData.description || "");
        setBasePrice(
          listingData.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ||
            "450,000"
        );

        if (listingData.meta_data) {
          const meta = listingData.meta_data;

          // Basic fields
          if (meta.type) setTrekType(meta.type);
          if (meta.duration) {
            const durationMatch = meta.duration.match(
              /(\d+)\s*(days?|hours?)/i
            );
            if (durationMatch) {
              setDuration(durationMatch[1]);
              setDurationUnit(
                durationMatch[2].toLowerCase().includes("hour")
                  ? "hours"
                  : "days"
              );
            }
          }
          if (meta.min_people) setMinPeople(meta.min_people.toString());
          if (meta.available_slots) setSpots(meta.available_slots.toString());
          if (meta.set_date) setAvailability(meta.set_date);
          if (meta.difficulty_level) setTheme(meta.difficulty_level);
          if (meta.age_range) {
            const ageMatch = meta.age_range.match(/(\d+)-(\d+)/);
            if (ageMatch) {
              setAgeRange({ min: ageMatch[1], max: ageMatch[2] });
            }
          }
          if (meta.languages && meta.languages.length > 0)
            setLanguage(meta.languages[0]);
          if (meta.starts_in) setCity(meta.starts_in);
          if (typeof meta.pickup_included === "boolean") {
            setPickupIncluded(meta.pickup_included ? "yes" : "no");
          }
          if (meta.meeting_time_date) setMeetingTime(meta.meeting_time_date);
          if (meta.photos) setPhotos(meta.photos);

          // Highlights
          if (meta.highlights) {
            const highlightsArray =
              typeof meta.highlights === "string"
                ? meta.highlights.split(", ").filter(Boolean)
                : meta.highlights;
            setHighlights(
              highlightsArray.length > 0 ? highlightsArray : ["", "", ""]
            );
          }

          // Itinerary
          if (meta.itinerary) {
            const itineraryItems = meta.itinerary
              .split("\n")
              .map((item: string) => {
                const match = item.match(/^(.+?)\s*-\s*(.+?):\s*(.+)$/);
                if (match) {
                  return {
                    time: match[1].trim(),
                    title: match[2].trim(),
                    overview: match[3].trim(),
                  };
                }
                return { time: "", title: "", overview: item };
              })
              .filter(
                (item: ItineraryItem) =>
                  item.time || item.title || item.overview
              );

            if (itineraryItems.length > 0) {
              setItineraries(itineraryItems);
            }
          }

          // FAQs
          if (meta.faqs && Array.isArray(meta.faqs)) {
            const faqItems = meta.faqs
              .map((faq: string) => {
                const match = faq.match(/^(.+?)\s*-\s*(.+)$/);
                if (match) {
                  return { question: match[1].trim(), answer: match[2].trim() };
                }
                return { question: faq, answer: "" };
              })
              .filter((faq: FaqItem) => faq.question || faq.answer);

            if (faqItems.length > 0) {
              setFaqs(faqItems);
            }
          }

          // Price groups
          if (meta.secondary_prices && Array.isArray(meta.secondary_prices)) {
            const priceGroupsData = meta.secondary_prices.map((pg: any) => ({
              price:
                pg.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ||
                "450,000",
              minAge: 2,
              maxAge: 12,
              ageGroup: pg.label || "",
            }));
            if (priceGroupsData.length > 0) {
              setPriceGroups(priceGroupsData);
            }
          }

          // Add-ons
          if (meta.add_ons && Array.isArray(meta.add_ons)) {
            const addOnItems = meta.add_ons
              .map((addon: string) => {
                const parts = addon.split(" - ");
                return {
                  name: parts[0] || "",
                  type: (parts[1] as "person" | "booking") || "person",
                  price: parts[2] || "450,000",
                };
              })
              .filter((addon: AddOn) => addon.name);

            if (addOnItems.length > 0) {
              setAddOns(addOnItems);
            }
          }
        }

        toast.success("Listing data loaded successfully");
      } catch (error) {
        console.error("Failed to load listing data:", error);
        toast.error("Failed to load listing data");
      } finally {
        setIsLoadingData(false);
      }
    };

    loadListingData();
  }, [editMode, listingId, storedToken]);

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
      toast.success(`${files.length} photo(s) uploaded successfully`);
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Failed to upload photos");
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

  const handleSubmit = async () => {
    if (!storedToken || !partnerId) {
      toast.error("Missing authentication details");
      return;
    }

    setIsLoading(true);

    const payload = {
      partner_id: partnerId,
      listing_type: "trek",
      title,
      description: overview,
      price: parseInt(basePrice.replace(/,/g, "")),
      meta_data: {
        photos,
        type: trekType,
        select_trek: trekName || undefined,
        duration: `${duration} ${durationUnit}`,
        min_people: parseInt(minPeople),
        available_slots: spots ? parseInt(spots) : undefined,
        set_availability: availability !== "",
        set_date: availability || undefined,
        difficulty_level: theme || undefined,
        age_range: `${ageRange.min}-${ageRange.max}`,
        languages: language ? [language] : [],
        starts_in: city,
        pickup_included: pickupIncluded === "yes",
        meeting_time_date: meetingTime || undefined,
        title,
        overview,
        highlights: highlights.filter((h) => h).join(", "),
        itinerary: itineraries
          .map((i) => `${i.time} - ${i.title}: ${i.overview}`)
          .join("\n"),
        inclusions: inclusions.map((i) => i.text).filter(Boolean),
        exclusions: exclusions.map((e) => e.text).filter(Boolean),
        faqs: faqs
          .filter((f) => f.question || f.answer)
          .map((f) => `${f.question} - ${f.answer}`),
        base_price: parseInt(basePrice.replace(/,/g, "")),
        secondary_prices: priceGroups.map((pg) => ({
          label: pg.ageGroup || "Group",
          price: parseInt(pg.price.replace(/,/g, "")),
        })),
        add_ons: addOns
          .filter((a) => a.name)
          .map((a) => `${a.name} - ${a.type} - ${a.price}`),
        important_info: additionalDetails.map((d) => d.text).join("\n"),
        not_suitable_for: notSuitableFor.map((n) => n.text).filter(Boolean),
      },
    };

    try {
      const url =
        editMode && listingId
          ? `http://localhost:9000/api/v1/listings/${listingId}`
          : "http://localhost:9000/api/v1/listings";

      const method = editMode ? "PUT" : "POST";

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
          `❌ Error ${editMode ? "updating" : "creating"} listing:`,
          JSON.stringify(errorData)
        );

        const errorMessage =
          errorData.message +
          (errorData.errors
            ?.map((e: any) => `${e.field}: ${e.message}`)
            .join("\n") ?? "");

        toast.error(errorMessage);
        return;
      }

      const data = await res.json();
      console.log(`✅ Trek Listing ${editMode ? "updated" : "created"}:`, data);

      toast.success(
        `Trek listing ${editMode ? "updated" : "created"} successfully!`
      );
      handleNext(); // go to submission confirmation screen
    } catch (err) {
      console.error(`❌ ${editMode ? "Update" : "Submission"} failed:`, err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  // Show loading spinner while fetching data in edit mode
  if (isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008558] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing data...</p>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0: 
        return (
         <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 mb-20">
  <h2 className="text-3xl font-bold text-[#283456] mb-6">
    {editMode ? "Edit Trek Media & Basics" : "Trek Media & Basics"}
  </h2>

  {/* Upload Section */}
  <label className="block font-semibold mb-2 text-[#000000C7] text-[16px]">
    Photos
  </label>
  <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center mb-6">
    <div className="p-3 bg-[#DEFFEBFC] rounded-full">
      <img src={uploadIcon} alt="Upload" className="h-8 w-8" />
    </div>
    <h2 className="text-[17px] font-semibold text-[#283456] mt-2 text-center">
      Drop files here or select files to upload
    </h2>
    <p className="text-[#666666] text-[14px] text-center">
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
      className="text-[#008558] text-[15px] mt-2 font-medium hover:underline"
    >
      Select
    </button>

    {photos.length > 0 && (
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {photos.map((url, idx) => (
          <img
            key={idx}
            src={`http://localhost:9000${url}`}
            alt={`Trek photo ${idx + 1}`}
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
          />
        ))}
      </div>
    )}
  </div>

  {/* For */}
  <div className="mb-4">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">For</label>
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => setTouristType("local")}
        className={`px-4 py-2 rounded-lg border text-sm sm:text-[15px] ${
          touristType === "local"
            ? "bg-[#008558] text-white"
            : "bg-white border-gray-300 text-[#323232]"
        }`}
      >
        Local tourists
      </button>
      <button
        type="button"
        onClick={() => setTouristType("international")}
        className={`px-4 py-2 rounded-lg border text-sm sm:text-[15px] ${
          touristType === "international"
            ? "bg-[#008558] text-white"
            : "bg-white border-gray-300 text-[#323232]"
        }`}
      >
        International tourists
      </button>
    </div>
  </div>

  {/* Type */}
  <div className="mb-4">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">Type</label>
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => setTrekType("group")}
        className={`px-4 py-2 rounded-lg border text-sm sm:text-[15px] ${
          trekType === "group"
            ? "bg-[#008558] text-white"
            : "bg-white border-gray-300 text-[#323232]"
        }`}
      >
        Group trek
      </button>
      <button
        type="button"
        onClick={() => setTrekType("private")}
        className={`px-4 py-2 rounded-lg border text-sm sm:text-[15px] ${
          trekType === "private"
            ? "bg-[#008558] text-white"
            : "bg-white border-gray-300 text-[#323232]"
        }`}
      >
        Private trek
      </button>
    </div>
  </div>

  {/* Duration */}
  <div className="mb-4">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">Duration</label>
    <div className="flex gap-3">
      <SelectBox
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        options={["1", "2", "3", "4", "5", "6", "7"]}
        className="w-20 sm:w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />
      <SelectBox
        value={durationUnit}
        onChange={(e) => setDurationUnit(e.target.value as "days" | "hours")}
        options={["days", "hours"]}
        className="w-20 sm:w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />
    </div>
  </div>

  {/* Min People */}
  <div className="mb-4">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">
      Min. people required for booking
    </label>
    <SelectBox
      value={minPeople}
      onChange={(e) => setMinPeople(e.target.value)}
      options={["3", "4", "5"]}
      className="w-20 sm:w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm"
    />
  </div>

  {/* Age Range */}
  <div className="mb-4">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">Age range</label>
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <SelectBox
        value={ageRange.min}
        onChange={(e) => setAgeRange({ ...ageRange, min: e.target.value })}
        options={[...Array(18)].map((_, i) => i.toString())}
        className="w-16 sm:w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />
      <span className="text-sm sm:text-[16px] text-[#000000]">to</span>
      <SelectBox
        value={ageRange.max}
        onChange={(e) => setAgeRange({ ...ageRange, max: e.target.value })}
        options={[...Array(18)].map((_, i) => (i + 1).toString())}
        className="w-16 sm:w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />
      <span className="text-sm sm:text-[16px] text-[#000000]">years old</span>
    </div>
  </div>

  {/* Languages */}
  <div className="mb-4">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">
      Languages spoken by guide
    </label>
    <SelectBox
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      options={["English", "Urdu"]}
      placeholder="Select language"
      className="w-full sm:w-auto"
    />
  </div>

  {/* Starts In */}
  <div className="mb-4">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">Starts in</label>
    <SelectBox
      value={city}
      onChange={(e) => setCity(e.target.value)}
      options={["Lahore", "Karachi"]}
      placeholder="Select city"
      className="w-full sm:w-auto"
    />
  </div>

  {/* Spots */}
  <div className="mb-4">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">Available spots</label>
    <SelectBox
      value={spots}
      onChange={(e) => setSpots(e.target.value)}
      options={["1", "2", "3"]}
      placeholder="Select spots"
      className="w-full sm:w-auto"
    />
  </div>

  {/* Availability */}
  <div className="mb-4">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">Availability</label>
    <SelectBox
      value={availability}
      onChange={(e) => setAvailability(e.target.value)}
      options={["All July"]}
      placeholder="Select dates"
      className="w-full sm:w-auto"
    />
  </div>

  {/* Theme */}
  <div className="mb-4">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">Trek Theme</label>
    <SelectBox
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      options={["Nature", "Culture", "Adventure", "Spiritual"]}
      placeholder="Select theme"
      className="w-full sm:w-auto"
    />
  </div>

  {/* Pickup Included */}
  <div className="mb-4">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">Pickup Included</label>
    <div className="flex flex-wrap gap-2 sm:gap-3 mt-1">
      <button
        type="button"
        onClick={() => setPickupIncluded("yes")}
        className={`px-4 py-2 rounded-lg border text-sm sm:text-[15px] ${
          pickupIncluded === "yes"
            ? "bg-[#008558] text-white"
            : "bg-white border-gray-300 text-[#323232]"
        }`}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => setPickupIncluded("no")}
        className={`px-4 py-2 rounded-lg border text-sm sm:text-[15px] ${
          pickupIncluded === "no"
            ? "bg-[#008558] text-white"
            : "bg-white border-gray-300 text-[#323232]"
        }`}
      >
        No
      </button>
    </div>
  </div>

  {/* Meeting Address */}
  <div className="mb-4">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">
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
  <div className="mb-8">
    <label className="block mb-1 font-semibold text-[#000000C7] text-[16px]">
      Meeting Time
    </label>
    <SelectBox
      value={meetingTime}
      onChange={(e) => setMeetingTime(e.target.value)}
      options={["9:00 pm", "10:00 am"]}
      className="w-full sm:w-auto"
    />
  </div>

  <ListingButtons onBack={handleBack} onNext={handleNext} />
</form>

        );

      case 1: // Title & Overview
        return (
          <div className="listing-tour-right active px-4 sm:px-6 py-4 bg-white shadow-sm rounded-lg w-full">
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
  <h2 className="text-2xl sm:text-3xl font-bold text-[#1e2a49] mb-6">
    Destinations & Highlights
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
    <label className="block font-semibold mb-2 text-[#1e2a49]">Highlights</label>

    {highlights.map((highlight, index) => (
      <div key={index} className="relative mb-4">
        <textarea
          value={highlight}
          onChange={(e) => handleHighlightChange(index, e.target.value)}
          maxLength={90}
          rows={1}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span className="absolute bottom-2 right-3 text-xs text-gray-500">
          {highlight.length}/90
        </span>
      </div>
    ))}

    <button
      type="button"
      onClick={addMoreHighlight}
      className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4 hover:bg-emerald-100"
    >
      <img src={addMoreIcon} alt="Add more" width={13} />
      more
    </button>
  </div>

  <ListingButtons onBack={handleBack} onNext={handleNext} />
</form>

        );

      case 3: // Itinerary
        return (
         <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
  <h2 className="text-2xl sm:text-3xl font-bold text-[#1e2a49] mb-6">
    Itinerary
  </h2>

  {itineraries.map((item, index) => (
    <div
      key={index}
      className="bg-white border rounded-xl p-4 mb-6 shadow-sm"
    >
      <label className="block font-semibold text-[#1e2a49] mb-4">
        {index + 1}
      </label>

      <div className="relative mb-4">
        <textarea
          placeholder="i.e Day 1"
          value={item.time}
          onChange={(e) => handleItineraryChange(index, "time", e.target.value)}
          maxLength={20}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span className="absolute bottom-2 right-4 text-xs text-gray-500">
          {item.time.length}/20
        </span>
      </div>

      <div className="relative mb-4">
        <textarea
          placeholder="i.e Arrival in Islamabad"
          value={item.title}
          onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
          maxLength={70}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span className="absolute bottom-2 right-4 text-xs text-gray-500">
          {item.title.length}/70
        </span>
      </div>

      <div className="relative">
        <textarea
          placeholder="i.e Our day begins in..."
          value={item.overview}
          onChange={(e) => handleItineraryChange(index, "overview", e.target.value)}
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
          <InclusionExclusionForm
            heading="Inclusions & Exclusions"
            onBack={handleBack}
            onNext={handleNext}
          />
        );

      case 5: // FAQs
        return (
     <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
  <h2 className="text-2xl sm:text-3xl font-bold text-[#1e2a49] mb-6">FAQs</h2>

  {faqs.map((item, index) => (
    <div
      key={index}
      className="bg-white border rounded-xl p-4 mb-6 shadow-sm"
    >
      <label className="block font-semibold text-[#1e2a49] mb-4">
        FAQ {index + 1}
      </label>

      <div className="relative mb-4">
        <textarea
          placeholder="Enter question..."
          value={item.question}
          onChange={(e) => handleFaqChange(index, "question", e.target.value)}
          maxLength={50}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none h-[40px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span className="absolute bottom-2 right-4 text-xs text-gray-500">
          {item.question.length}/50
        </span>
      </div>

      <div className="relative">
        <textarea
          placeholder="Enter answer..."
          value={item.answer}
          onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
          maxLength={200}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span className="absolute bottom-2 right-4 text-xs text-gray-500">
          {item.answer.length}/200
        </span>
      </div>
    </div>
  ))}

  <button
    type="button"
    onClick={addMoreFaq}
    className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-200 transition mb-8"
  >
    <span className="text-xl leading-none">+</span> Add More
  </button>

  <ListingButtons onBack={handleBack} onNext={handleNext} />
</form>

        );

      case 6: // Pricing & Add Ons
        return (
      <div className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
  <h2 className="text-xl sm:text-2xl font-bold text-[#1e2a49] mb-6">
    Pricing & Add Ons
  </h2>

  {/* Base Price */}
  <div className="bg-white border rounded-xl p-4 sm:p-6 flex flex-col lg:flex-row gap-4 sm:gap-6 mb-5 shadow-sm">
    <div className="lg:w-36 flex lg:border-r-2 border-dotted items-center text-[#1e2a49] font-semibold text-sm">
      Base Price
    </div>
    <div className="flex-1 space-y-4 sm:space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-1">Price</label>
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
        <label className="block text-sm font-semibold mb-1">Age range</label>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="number"
            value={priceGroups[0]?.minAge || 2}
            onChange={(e) => {
              const updated = [...priceGroups];
              if (updated[0]) updated[0].minAge = parseInt(e.target.value);
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
              if (updated[0]) updated[0].maxAge = parseInt(e.target.value);
              setPriceGroups(updated);
            }}
            className="w-16 border border-gray-300 rounded-lg px-2 py-2 text-center text-sm"
          />
          <span className="text-sm text-gray-400">years old</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Age group</label>
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
    className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-2 rounded-full text-sm font-medium mb-6 hover:bg-emerald-200"
  >
    <span className="text-xl leading-none">+</span> Secondary price groups
  </button>

  {/* Add Ons */}
  {addOns.map((addOn, index) => (
    <div
      key={index}
      className="bg-white border rounded-xl p-4 sm:p-6 flex flex-col lg:flex-row gap-4 sm:gap-6 mb-5 shadow-sm"
    >
      <div className="lg:w-36 flex lg:border-r-2 border-dotted items-center text-[#1e2a49] font-semibold text-sm">
        Add On {index + 1}
      </div>
      <div className="flex-1 space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Add on</label>
          <input
            type="text"
            value={addOn.name}
            onChange={(e) => handleAddOnChange(index, "name", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Price</label>
          <div className="relative">
            <input
              type="text"
              value={addOn.price}
              onChange={(e) => handleAddOnChange(index, "price", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-sm"
            />
            <span className="absolute right-4 top-2.5 text-sm text-gray-400">
              PKR
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Type</label>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleAddOnChange(index, "type", "person")}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition border ${
                addOn.type === "person"
                  ? "bg-emerald-700 text-white"
                  : "bg-white text-[#1e2a49] border-gray-300"
              }`}
            >
              Per person
            </button>
            <button
              type="button"
              onClick={() => handleAddOnChange(index, "type", "booking")}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition border ${
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
    className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-5 py-2 rounded-full text-sm font-medium mb-8 hover:bg-emerald-200"
  >
    <span className="text-xl leading-none">+</span> More add ons
  </button>

  <ListingButtons onBack={handleBack} onNext={handleNext} />
</div>

        );

      case 7: // Important Information
        return (
          <div className="listing-tour-right active w-full">
            <ImportantInfoForm
              heading="Important Information"
              onBack={handleBack}
              onNext={handleSubmit}
              nextLabel={
                isLoading ? "Saving..." : editMode ? "Update" : "Submit"
              }
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
              editMode
                ? "Your Trek Has Been Updated"
                : "Your Trek Has Been Submitted"
            }
            description={
              editMode
                ? "Thank you for updating your trek listing. Your changes have been saved successfully."
                : "Thank you for adding your trek to TravelNinja. Our team is currently reviewing your listing to ensure it meets our quality standards."
            }
            sections={
              editMode
                ? [
                    {
                      heading: "Changes Saved",
                      content:
                        "Your trek listing has been updated with the latest information.",
                    },
                    {
                      heading: "Live Status",
                      content:
                        "Your updated listing is now live and visible to customers.",
                    },
                    {
                      heading: "Further Updates",
                      content:
                        "You can make additional changes anytime from your dashboard.",
                    },
                  ]
                : [
                    {
                      heading: "Approval Process",
                      content:
                        "Trek reviews typically take 6-12 hours before going live.",
                    },
                    {
                      heading: "Notifications",
                      content:
                        "You'll be notified via email and dashboard once your trek is approved and published.",
                    },
                    {
                      heading: "Updates & Edits",
                      content:
                        "Need to make changes? You can update your trek anytime from your dashboard.",
                    },
                  ]
            }
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
      {currentStep < 8 ? (
        <div className="flex flex-col lg:flex-row">
          <ListingSidebar
            steps={steps.slice(0, -1)} // Exclude "Submitted" from sidebar
            activeStep={currentStep}
            onStepClick={handleStepClick}
          />
          <div className="flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-full overflow-hidden">
            <div className="max-w-4xl mx-auto">
              {renderStep()}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full py-6 sm:py-8 px-4">
          <div className="max-w-4xl mx-auto w-full">
            {renderStep()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteTrekForm;
