import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // update this import
import ListingButtons from "../ListingButtons";
import CarListingSidebar from "./CarListingSidebar";
import ListingSubmitted from "./CarListingSubmitted";

// Upload and dropdown icons
const uploadIcon = "/images/upload-icon.svg";
const dropdownIcon = "/images/arrow-drop-down-svgrepo-com.svg";

// Car form data interface
interface CarFormData {
  photos: string[];
  car_name: string;
  car_make: string;
  model_year: string;
  fuel_type: string;
  transmission: "Manual" | "Automatic";
  engine_capacity: string;
  car_type: string;
  features: string[];
  availability: string;
  self_drive: "yes" | "no" | null;
  price: string;
  inclusions: string;
  exclusions: string;
  important_info: string;
}

// Interfaces
interface StepComponentProps {
  onNext: () => void;
  onBack: () => void;
  onButtonClick?: () => void;
  formData: CarFormData;
  updateFormData: (updates: Partial<CarFormData>) => void;
  onPhotosUpload?: (files: File[]) => Promise<void>;
  nextLabel?: string;
}

const AboutTheCarForm: React.FC<StepComponentProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  onPhotosUpload,
}) => {
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onPhotosUpload) {
      const filesArray = Array.from(e.target.files);
      onPhotosUpload(filesArray);
    }
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">About the car</h2>

      {/* Photo Upload */}
      <label className="block font-semibold text-[#1e2a49] mb-2">Photos</label>
      <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center mb-6">
        <div className="p-3 bg-emerald-50 rounded-full">
          <img src={uploadIcon} alt="Upload" className="h-8 w-8" />
        </div>
        <h2 className="text-base font-semibold text-[#283456] mt-2">
          Drop files here or select files to upload
        </h2>
        <p className="text-gray-500 text-sm">
          You can upload up to 20 JPG files
        </p>

        <label className="text-emerald-700 text-sm mt-2 font-medium hover:underline cursor-pointer">
          Select
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Display selected image previews */}
        {formData.photos.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {formData.photos.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      {/* Car Name */}
      <div className="mb-4">
        <label className="block font-semibold text-sm mb-1">Car name</label>
        <textarea
          rows={1}
          value={formData.car_name}
          onChange={(e) => updateFormData({ car_name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y"
        />
      </div>

      <div className="flex flex-col w-[40%]">
        {/* Make */}
        <div className="mb-4">
          <label className="block font-semibold text-sm mb-1">Make</label>
          <div className="relative">
            <select
              className="w-full outline-none border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none"
              value={formData.car_make}
              onChange={(e) => updateFormData({ car_make: e.target.value })}
            >
              <option value="">Select make</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Hyundai">Hyundai</option>
            </select>
            <img
              src={dropdownIcon}
              className="absolute right-4 top-2.5 w-4 pointer-events-none"
              alt="dropdown"
            />
          </div>
        </div>

        {/* Model Year */}
        <div className="mb-4">
          <label className="block font-semibold text-sm mb-1">Model year</label>
          <div className="relative">
            <select
              className="w-full outline-none border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none"
              value={formData.model_year}
              onChange={(e) => updateFormData({ model_year: e.target.value })}
            >
              <option value="">Select model year</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
            </select>
            <img
              src={dropdownIcon}
              className="absolute right-4 top-2.5 w-4 pointer-events-none"
              alt="dropdown"
            />
          </div>
        </div>

        {/* Fuel */}
        <div className="mb-4">
          <label className="block font-semibold text-sm mb-1">Fuel</label>
          <div className="relative">
            <select
              className="w-full outline-none border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none"
              value={formData.fuel_type}
              onChange={(e) => updateFormData({ fuel_type: e.target.value })}
            >
              <option value="">Select fuel</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
            <img
              src={dropdownIcon}
              className="absolute right-4 top-2.5 w-4 pointer-events-none"
              alt="dropdown"
            />
          </div>
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block font-semibold text-sm mb-1">Type</label>
          <div className="relative">
            <select
              className="w-full outline-none border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none"
              value={formData.car_type}
              onChange={(e) => updateFormData({ car_type: e.target.value })}
            >
              <option value="">Select type</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
            </select>
            <img
              src={dropdownIcon}
              className="absolute right-4 top-2.5 w-4 pointer-events-none"
              alt="dropdown"
            />
          </div>
        </div>
      </div>

      {/* Transmission */}
      <div className="mb-4">
        <label className="block font-semibold text-sm mb-2">Transmission</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => updateFormData({ transmission: "Manual" })}
            className={`px-4 py-2 rounded-lg text-sm border ${
              formData.transmission === "Manual"
                ? "bg-[#008558] text-white"
                : "text-gray-700"
            }`}
          >
            Manual
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ transmission: "Automatic" })}
            className={`px-4 py-2 rounded-lg text-sm border ${
              formData.transmission === "Automatic"
                ? "bg-[#008558] text-white"
                : "text-gray-700"
            }`}
          >
            Automatic
          </button>
        </div>
      </div>

      {/* Engine Capacity */}
      <div className="mb-6 w-[40%]">
        <label className="block font-semibold text-sm mb-1">
          Engine capacity
        </label>
        <div className="relative">
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none"
            value={formData.engine_capacity}
            onChange={(e) =>
              updateFormData({ engine_capacity: e.target.value })
            }
          >
            <option value="">Select engine capacity</option>
            <option value="1000cc">1000cc</option>
            <option value="1300cc">1300cc</option>
            <option value="1500cc">1500cc</option>
            <option value="1800cc">1800cc</option>
            <option value="2000cc">2000cc</option>
          </select>
          <img
            src={dropdownIcon}
            className="absolute right-4 top-2.5 w-4 pointer-events-none"
            alt="dropdown"
          />
        </div>
      </div>

      {/* Features */}
      <div className="mb-6 w-[40%]">
        <label className="block font-semibold text-sm mb-1">Features</label>
        <div className="relative">
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none"
            onChange={(e) => {
              const selectedFeature = e.target.value;
              if (
                selectedFeature &&
                !formData.features.includes(selectedFeature)
              ) {
                updateFormData({
                  features: [...formData.features, selectedFeature],
                });
              }
            }}
          >
            <option value="">Select all that apply</option>
            <option value="AC">AC</option>
            <option value="Navigation">Navigation</option>
            <option value="Bluetooth">Bluetooth</option>
            <option value="Sunroof">Sunroof</option>
            <option value="Leather Seats">Leather Seats</option>
          </select>
          <img
            src={dropdownIcon}
            className="absolute right-4 top-2.5 w-4 pointer-events-none"
            alt="dropdown"
          />
        </div>
        {formData.features.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

// Step 2: Car Pricing & Availability
const CarPricingAvailability: React.FC<StepComponentProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
}) => {
  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        Pricing & Availability
      </h2>

      {/* Availability */}
      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Availability
        </label>
        <div className="relative w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer">
          <select
            className="w-full outline-none appearance-none bg-transparent text-sm"
            value={formData.availability}
            onChange={(e) => updateFormData({ availability: e.target.value })}
          >
            <option value="">Select dates</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
            <option value="All Days">All Days</option>
          </select>
          <img
            src={dropdownIcon}
            className="absolute right-4 top-2.5 w-4 pointer-events-none"
            alt="dropdown"
          />
        </div>
      </div>

      {/* Self Drive */}
      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Available on self drive?
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ self_drive: "yes" })}
            className={`px-6 py-2 rounded-md text-sm font-semibold ${
              formData.self_drive === "yes"
                ? "bg-[#008558] text-white"
                : "bg-white text-[#1e2a49] border border-gray-300"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ self_drive: "no" })}
            className={`px-6 py-2 rounded-md text-sm font-semibold ${
              formData.self_drive === "no"
                ? "bg-[#008558] text-white"
                : "bg-white text-[#1e2a49] border border-gray-300"
            }`}
          >
            No
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="mb-10">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Price <span className="text-[#6b7280]">per day</span>
        </label>
        <textarea
          rows={1}
          value={formData.price}
          onChange={(e) => updateFormData({ price: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none"
          placeholder="Enter daily rental price"
        />
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

// Step 3: Inclusions & Exclusions
const InclusionsExclusionsForm: React.FC<StepComponentProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
}) => {
  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        Inclusions & Exclusions
      </h2>

      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          What's included?
        </label>
        <textarea
          rows={4}
          value={formData.inclusions}
          onChange={(e) => updateFormData({ inclusions: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none"
          placeholder="List what's included with your car rental..."
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          What's excluded?
        </label>
        <textarea
          rows={4}
          value={formData.exclusions}
          onChange={(e) => updateFormData({ exclusions: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none"
          placeholder="List what's not included..."
        />
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

// Step 4: Important Information
const CarImportantInformation: React.FC<StepComponentProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  nextLabel,
}) => {
  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-[#1e2a49] mb-6">
        Important Information
      </h2>

      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Additional details
        </label>
        <textarea
          rows={6}
          value={formData.important_info}
          onChange={(e) => updateFormData({ important_info: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none"
          placeholder="Any additional information renters should know..."
        />
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} nextLabel={nextLabel} />
    </form>
  );
};

// Step 5: Listing Submitted

// Main Complete Car Listing Activity Component
export default function CompleteCarListingActivity() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // ⬅️ Add this below useNavigate()
  const isEditMode = !!id; // ⬅️ Indicates edit mode
  const [loading, setLoading] = useState(!!id); // ⬅️ Show loader only if in edit mode
  const [error, setError] = useState<string | null>(null); // ⬅️ Error state
  const [stepIndex, setStepIndex] = useState(0);

  // Form data state
  const [formData, setFormData] = useState<CarFormData>({
    photos: [],
    car_name: "",
    car_make: "",
    model_year: "",
    fuel_type: "",
    transmission: "Automatic",
    engine_capacity: "",
    car_type: "",
    features: [],
    availability: "",
    self_drive: null,
    price: "",
    inclusions: "",
    exclusions: "",
    important_info: "",
  });

  const updateFormData = (updates: Partial<CarFormData>) => {
    console.log("Updating form data with:", updates);
    setFormData((prev) => {
      const newData = { ...prev, ...updates };
      console.log("New form data:", newData);
      return newData;
    });
  };

  // Upload files function
  const uploadFiles = async (files: File[]) => {
    const uploadData = new FormData();
    files.forEach((file) => uploadData.append("files", file));

    try {
      const res = await fetch("http://localhost:9000/api/v1/uploads", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const fullUrls = data.urls.map(
        (url: string) => `http://localhost:9000${url}`
      );
      updateFormData({ photos: [...formData.photos, ...fullUrls] });
    } catch (err) {
      alert("Failed to upload files");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isEditMode) return;

    const fetchListing = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/listings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch listing");

        const listing = await response.json();
        const metaData = listing.meta_data || {};

        setFormData({
          photos: metaData.photos || [],
          car_name: listing.title || "",
          car_make: metaData.car_make || "",
          model_year: metaData.model_year || "",
          fuel_type: metaData.fuel_type || "",
          transmission: metaData.transmission || "Automatic",
          engine_capacity: metaData.engine_capacity || "",
          car_type: metaData.car_type || "",
          features: metaData.features || [],
          availability: metaData.set_availability ? "All Days" : "",
          self_drive: metaData.self_drive || null,
          price: listing.price?.toString() || "",
          inclusions: Array.isArray(metaData.inclusions)
            ? metaData.inclusions.join("\n")
            : metaData.inclusions || "",
          exclusions: Array.isArray(metaData.exclusions)
            ? metaData.exclusions.join("\n")
            : metaData.exclusions || "",
          important_info: metaData.important_info || listing.description || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching listing:", err);
        setError("Failed to load listing data");
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, isEditMode]);

  // Handle form submission
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const partnerId = localStorage.getItem("user_id");

    if (!token || (!partnerId && !isEditMode)) {
      alert("Missing authentication.");
      return;
    }

    const payload = {
      ...(isEditMode ? {} : { partner_id: partnerId }),
      listing_type: "car_rental",
      title: formData.car_name,
      description:
        formData.important_info ||
        `${formData.car_make} ${formData.model_year} for rent`,
      price: parseFloat(formData.price.replace(/,/g, "") || "0"),
      meta_data: {
        photos: formData.photos,
        car_make: formData.car_make,
        model_year: formData.model_year,
        transmission: formData.transmission,
        engine_capacity: formData.engine_capacity,
        fuel_type: formData.fuel_type,
        car_type: formData.car_type,
        features: formData.features,
        inclusions: formData.inclusions
          .split("\n")
          .filter((item) => item.trim()),
        exclusions: formData.exclusions
          .split("\n")
          .filter((item) => item.trim()),
        set_availability: !!formData.availability,
        price: parseFloat(formData.price.replace(/,/g, "") || "0"),
        important_info: formData.important_info,
      },
    };

    try {
      const res = await fetch(
        `http://localhost:9000/api/v1/listings${isEditMode ? `/${id}` : ""}`,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.error("❌ Listing error:", data);
        alert(data.message || "Failed to submit");
        return;
      }

      console.log("✅ Listing submitted successfully:", data);
      setStepIndex(stepComponents.length - 1);
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Network error. Please try again.");
    }
  };

  const stepComponents = [
    AboutTheCarForm,
    CarPricingAvailability,
    InclusionsExclusionsForm,
    CarImportantInformation,
    ListingSubmitted,
  ];

  const handleNext = () => {
    console.log("Current car form data:", formData);
    if (stepIndex < stepComponents.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (index < stepComponents.length - 1) {
      // Prevent clicking on the final submission step
      setStepIndex(index);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008558] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#008558] text-white px-6 py-2 rounded-lg hover:bg-[#007047] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const StepComponent = stepComponents[stepIndex];

  return (
    <div className="flex min-h-screen bg-white">
      {stepIndex < stepComponents.length - 1 && (
        <CarListingSidebar
          activeStep={stepIndex}
          onStepClick={handleStepClick}
        />
      )}
      <div className="flex-1 p-6">
        <StepComponent
          onNext={
            stepIndex === stepComponents.length - 2 ? handleSubmit : handleNext
          }
          onBack={handleBack}
          onButtonClick={() => navigate("/dashboard")}
          formData={formData}
          updateFormData={updateFormData}
          onPhotosUpload={uploadFiles}
          nextLabel={
            stepIndex === stepComponents.length - 2
              ? isEditMode
                ? "Update Listing"
                : "Submit Listing"
              : "Next"
          }
        />
      </div>
    </div>
  );
}
