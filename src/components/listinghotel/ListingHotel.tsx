"use client";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingButtons from "../ListingButtons";
import ListingSubmissionMessage from "../ui/ListingSubmissionMessage";
import ListingSidebar from "../ui/ListingSidebar";
import { toast } from "sonner";
const steps = ["About the room", "Pricing & Availability"];
const uploadIcon = "/images/upload-icon.svg";
const addMoreIcon = "/images/add-more-icon.svg";

// Define interface for all form data
interface HotelFormData {
  roomName: string;
  roomNumber: string;
  roomSize: string;
  selectedAmenities: string[];
  peopleCount: string;
  bedTypes: string[];
  photos: string[];
  price: string;
  breakfastIncluded: "yes" | "no" | "";
}

// API Service
const apiService = {
  async uploadImages(files: File[]): Promise<string[]> {
    const uploadFormData = new FormData();
    files.forEach((file) => uploadFormData.append("files", file));

    try {
      const response = await fetch("http://localhost:9000/api/v1/uploads", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.urls || [];
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Failed to upload images");
    }
  },

  async createListing(listingData: any): Promise<any> {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:9000/api/v1/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(listingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `API Error: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Create listing failed:", error);
      throw error;
    }
  },

  async updateListing(listingId: string, listingData: any): Promise<any> {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:9000/api/v1/listings/${listingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(listingData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `API Error: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Update listing failed:", error);
      throw error;
    }
  },

  async fetchListing(listingId: string): Promise<any> {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/listings/${listingId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch listing: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch listing failed:", error);
      throw error;
    }
  },
};

// AboutTheRoomForm Component
interface AboutTheRoomFormProps {
  onNext: () => void;
  onBack: () => void;
  formData: HotelFormData;
  updateFormData: (updates: Partial<HotelFormData>) => void;
  onPhotosUpload: (files: File[]) => Promise<void>;
}

const AboutTheRoomForm: React.FC<AboutTheRoomFormProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  onPhotosUpload,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(selectedFiles)
  }, [selectedFiles])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 20); // max 20 images
      setSelectedFiles(fileArray);

      try {
        setUploading(true);
        await onPhotosUpload(fileArray);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const amenitiesOptions = [
    "WiFi",
    "TV",
    "AC",
    "Heater",
    "Mini Bar",
    "Balcony",
  ];

  const toggleAmenity = (value: string) => {
    const newAmenities = formData.selectedAmenities.includes(value)
      ? formData.selectedAmenities.filter((item) => item !== value)
      : [...formData.selectedAmenities, value];
    updateFormData({ selectedAmenities: newAmenities });
  };

  const handleNext = () => {
    if (
      !formData.roomName ||
      !formData.roomSize ||
      formData.photos.length === 0
    ) {
      alert("Please fill all required fields and upload at least one photo.");
      return;
    }
    onNext();
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#1e2a49] mb-6">
        Hotel Media & Basics
      </h2>

      {/* Photo Upload */}
      <label className="block font-semibold text-[#1e2a49] mb-2">Photos</label>
      <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center mb-6 relative">
        <div className="p-3 bg-emerald-50 rounded-full">
          <img src={uploadIcon} alt="Upload" className="h-8 w-8" />
        </div>
        <h2 className="text-base font-semibold text-[#283456] mt-2">
          Drop files here or select files to upload
        </h2>
        <p className="text-gray-500 text-sm">
          You can upload up to 20 JPG files
        </p>

        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-emerald-700 text-sm mt-2 font-medium hover:underline"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Select"}
        </button>

        {formData.photos.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-6 mt-4">
            {formData.photos.map((url, index) => (
              <div
                key={`uploaded-${index}`}
                className="w-24 h-24 rounded overflow-hidden border"
              >
                <img
                  src={`http://localhost:9000${url}`}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Room Name */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">Room name *</label>
        <textarea
          rows={1}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
          value={formData.roomName}
          onChange={(e) => updateFormData({ roomName: e.target.value })}
          required
        />
      </div>

      {/* Room Number */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Room number *
        </label>
        <textarea
          rows={1}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
          value={formData.roomNumber}
          onChange={(e) => updateFormData({ roomNumber: e.target.value })}
          required
        />
      </div>

      {/* Room Size */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          Room size (sq ft) *
        </label>
        <textarea
          rows={1}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
          value={formData.roomSize}
          onChange={(e) => updateFormData({ roomSize: e.target.value })}
          required
        />
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold text-sm">Amenities</label>
        <div className="grid grid-cols-2 gap-2">
          {amenitiesOptions.map((item) => (
            <label key={item} className="flex items-center text-sm">
              <input
                type="checkbox"
                value={item}
                checked={formData.selectedAmenities.includes(item)}
                onChange={() => toggleAmenity(item)}
                className="mr-2"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* People Capacity */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          How many people can stay in the room?
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={formData.peopleCount}
          onChange={(e) => updateFormData({ peopleCount: e.target.value })}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      {/* Bed Types */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">
          How many beds are in the room?
        </label>
        {formData.bedTypes.map((bed, index) => (
          <div key={index} className="mb-2">
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              value={bed}
              onChange={(e) => {
                const updated = [...formData.bedTypes];
                updated[index] = e.target.value;
                updateFormData({ bedTypes: updated });
              }}
            >
              <option value="">Select bed type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Queen">Queen</option>
              <option value="King">King</option>
            </select>
          </div>
        ))}

        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-[#008558] bg-[#EBFFF7] px-4 py-2 rounded-full font-medium text-sm hover:bg-[#d4f5e8] transition"
          onClick={() =>
            updateFormData({ bedTypes: [...formData.bedTypes, ""] })
          }
        >
          <img src={addMoreIcon} alt="Add more" className="w-4 h-4" />
          <span>more</span>
        </button>
      </div>

      {/* Navigation Buttons */}
      <ListingButtons onBack={onBack} onNext={handleNext} />
    </form>
  );
};

// HostelPricingAvailability Component
interface HostelPricingAvailabilityProps {
  onNext: () => void;
  onBack: () => void;
  formData: HotelFormData;
  updateFormData: (updates: Partial<HotelFormData>) => void;
}

const HostelPricingAvailability: React.FC<HostelPricingAvailabilityProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
}) => {
  const handleNext = () => {
    if (!formData.price) {
      toast.error("Please enter a price.");
      return;
    }
    onNext();
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-[28px] font-bold text-[#283456] mb-6">
        Pricing & Availability
      </h2>

      <form className="space-y-6">
        {/* Availability Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#283456]">
            Availability
          </label>
          <div className="relative w-[280px]">
            <input
              type="date"
              className="border rounded-md px-4 py-2 text-sm w-full focus:outline-none"
              onChange={(e) =>
                console.log("Selected availability date:", e.target.value)
              }
            />
          </div>
        </div>

        {/* Price and Breakfast */}
        <div className="flex flex-wrap gap-10 mt-6">
          {/* Price Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#283456]">
              Price <span className="text-gray-400">per night *</span>
            </label>
            <textarea
              rows={1}
              className="w-[280px] border rounded-md px-4 py-2 text-sm resize-none focus:outline-none"
              value={formData.price}
              onChange={(e) => updateFormData({ price: e.target.value })}
              placeholder="Enter price (e.g., 1500)"
              required
            />
          </div>

          {/* Breakfast Toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#283456]">
              Breakfast Included?
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                className={`px-6 py-2 rounded-md text-sm font-medium ${
                  formData.breakfastIncluded === "yes"
                    ? "bg-[#008558] text-white"
                    : "bg-white border text-[#283456]"
                }`}
                onClick={() => updateFormData({ breakfastIncluded: "yes" })}
              >
                Yes
              </button>
              <button
                type="button"
                className={`px-6 py-2 rounded-md text-sm font-medium ${
                  formData.breakfastIncluded === "no"
                    ? "bg-[#008558] text-white"
                    : "bg-white border text-[#283456]"
                }`}
                onClick={() => updateFormData({ breakfastIncluded: "no" })}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <ListingButtons onBack={onBack} onNext={handleNext} />
      </form>
    </div>
  );
};

// HostelListingSubmitted Component
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
          heading: "Approval Process",
          content: "This typically takes 6-12 hours.",
        },
        {
          heading: "Notifications",
          content:
            "We'll notify you via email and dashboard once your room is approved and live.",
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

// Main HotelForm Component
export default function HotelForm() {
  // Centralized form data state
  const [formData, setFormData] = useState<HotelFormData>({
    roomName: "",
    roomNumber: "",
    roomSize: "",
    selectedAmenities: [],
    peopleCount: "3",
    bedTypes: [""],
    photos: [],
    price: "",
    breakfastIncluded: "",
  });

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [listingId, setListingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("token");
  const partnerId = localStorage.getItem("user_id");

  // Check for edit mode on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    if (id) {
      setListingId(id);
      setIsEditMode(true);
      fetchExistingListing(id);
    }
  }, []);

  const fetchExistingListing = async (id: string) => {
    try {
      setLoading(true);
      const response = await apiService.fetchListing(id);
      const meta = response.meta_data;

      setFormData({
        roomName: meta.room_name || response.title || "",
        roomNumber: meta.room_number || "",
        roomSize: meta.room_size || response.description || "",
        selectedAmenities: meta.amenities || [],
        peopleCount: (meta.sleeps || 3).toString(),
        bedTypes: meta.bed_types || [""],
        photos: meta.photos || [],
        price: (meta.price || response.price || "").toString(),
        breakfastIncluded: meta.breakfast_included ? "yes" : "no",
      });

      toast("Hotel room data loaded for editing");
    } catch (error) {
      console.error("Failed to fetch existing listing:", error);
      toast.error("Failed to load hotel room data");
    } finally {
      setLoading(false);
    }
  };

  // Function to update form data
  const updateFormData = (updates: Partial<HotelFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  // Photo upload function
  const uploadFiles = async (files: File[]) => {
    try {
      console.log("🔄 Uploading files...");
      const uploadedUrls = await apiService.uploadImages(files);
      console.log("✅ Upload successful:", uploadedUrls);

      // Update photos in form data
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...uploadedUrls],
      }));
    } catch (err) {
      console.error("❌ Image upload failed:", err);
      toast.error("Failed to upload images. Please try again.");
      throw err;
    }
  };

  // API submission function
  const handleSubmit = async () => {
    if (!storedToken || !partnerId) {
      toast.error("Missing authentication. Please log in again.");
      return;
    }

    if (
      !formData.roomName ||
      !formData.roomNumber ||
      !formData.roomSize ||
      !formData.price ||
      formData.photos.length === 0
    ) {
      toast.error(
        "Please fill all required fields and upload at least one photo."
      );
      return;
    }

    setIsSubmitting(true);
    const parsedPrice = parseInt(formData.price.replace(/,/g, ""));
    const payload = {
      partner_id: partnerId,
      listing_type: "hotel",
      title: formData.roomName,
      description: formData.roomSize,
      price: parsedPrice,
      meta_data: {
        price: parsedPrice,
        photos: formData.photos,
        room_name: formData.roomName,
        room_number: formData.roomNumber,
        amenities: formData.selectedAmenities,
        sleeps: parseInt(formData.peopleCount),
        beds: formData.bedTypes.filter((bed) => bed !== "").length,
        bed_types: formData.bedTypes.filter((bed) => bed !== ""),
        room_size: formData.roomSize,
        breakfast_included: formData.breakfastIncluded === "yes",
      },
    };

    console.log("📤 Submitting payload:", JSON.stringify(payload, null, 2));

    try {
      let response;
      if (isEditMode && listingId) {
        response = await apiService.updateListing(listingId, payload);
        toast.success("Hotel room updated successfully");
      } else {
        response = await apiService.createListing(payload);
        toast.success("Hotel room created successfully");
      }

      console.log("✅ Room listing submitted successfully:", response);
      handleNext(); // Go to submission confirmation
    } catch (error: any) {
      console.error("❌ Submission failed:", error);
      toast.error(
        error.message || "Failed to submit room listing. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <AboutTheRoomForm
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            updateFormData={updateFormData}
            onPhotosUpload={uploadFiles}
          />
        );
      case 1:
        return (
          <HostelPricingAvailability
            onNext={handleSubmit}
            onBack={handleBack}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <HostelListingSubmitted
            onButtonClick={() => navigate("/dashboard")}
          />
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  if (loading && activeStep === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p>Loading hotel room data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <ListingSidebar
        steps={steps}
        activeStep={activeStep}
        onStepClick={(index: number) => setActiveStep(index)}
      />
      <div className="flex-1 p-6">
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
              <p>{isEditMode ? "Updating" : "Submitting"} your listing...</p>
            </div>
          </div>
        )}
        {renderStepComponent()}
      </div>
    </div>
  );
}
