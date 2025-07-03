import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, ChevronDown } from "lucide-react";
import ListingButtons from "../ListingButtons";
import ListingSubmitted from "../listingactivity/ListingSubmitted";
import BikeListingSidebar from "./BikeListingSidebar";

// Bike form data interface
interface BikeFormData {
  photos: string[];
  bike_name: string;
  bike_make: string;
  model_year: string;
  fuel_type?: string;
  transmission?: string;
  engine_capacity?: string;
  bike_type?: string;
  features: string[];
  availability: string;
  self_drive: "yes" | "no" | null;
  price: string;
  secondary_prices: { label: string; price: string }[];
  add_ons: string[];
  inclusions: string;
  exclusions: string;
  important_info: string;
  not_suitable_for: string[];
}

// Interfaces
interface StepComponentProps {
  onNext: () => void;
  onBack: () => void;
  onButtonClick?: () => void;
  formData: BikeFormData;
  updateFormData: (updates: Partial<BikeFormData>) => void;
  onPhotosUpload?: (files: File[]) => Promise<void>;
  nextLabel?: string;
}

const AboutTheBikeForm: React.FC<StepComponentProps> = ({ 
  onNext, 
  onBack, 
  formData, 
  updateFormData,
  onPhotosUpload 
}) => {
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onPhotosUpload) {
      const filesArray = Array.from(e.target.files);
      onPhotosUpload(filesArray);
    }
  };

  // Remove photo function
  const removePhoto = (index: number) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData({ photos: updatedPhotos });
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-bold text-[#1e2a49]">About the bike</h2>
      </div>

      {/* Photo Upload */}
      <label className="block font-semibold text-[#1e2a49] mb-2">Photos</label>
      <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center mb-6 hover:border-[#008558] transition-colors">
        <div className="p-4 bg-emerald-50 rounded-full mb-3">
          <Upload className="h-8 w-8 text-[#008558]" />
        </div>
        <h3 className="text-base font-semibold text-[#283456] mb-1">
          Drop files here or select files to upload
        </h3>
        <p className="text-gray-500 text-sm mb-3">
          You can upload up to 20 JPG files
        </p>

        <label className="text-emerald-700 text-sm font-medium hover:underline cursor-pointer bg-emerald-50 px-4 py-2 rounded-md">
          Select Files
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
          <div className="mt-6 grid grid-cols-3 gap-4 w-full">
            {formData.photos.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Uploaded ${index}`}
                  className="w-full h-32 object-cover rounded-lg border shadow-sm"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bike Name */}
      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] text-sm mb-2">Bike name</label>
        <textarea
          rows={1}
          value={formData.bike_name}
          onChange={(e) => updateFormData({ bike_name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-y focus:border-[#008558] focus:ring-1 focus:ring-[#008558] outline-none"
          placeholder="e.g., Honda CB350 RS"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Make */}
        <div className="mb-4">
          <label className="block font-semibold text-[#1e2a49] text-sm mb-2">Make</label>
          <div className="relative">
            <select 
              className="w-full outline-none border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none focus:border-[#008558] focus:ring-1 focus:ring-[#008558]"
              value={formData.bike_make}
              onChange={(e) => updateFormData({ bike_make: e.target.value })}
            >
              <option value="">Select make</option>
              <option value="Honda">Honda</option>
              <option value="Yamaha">Yamaha</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Kawasaki">Kawasaki</option>
              <option value="Royal Enfield">Royal Enfield</option>
              <option value="Bajaj">Bajaj</option>
              <option value="TVS">TVS</option>
              <option value="Hero">Hero</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Model Year */}
        <div className="mb-4">
          <label className="block font-semibold text-[#1e2a49] text-sm mb-2">Model year</label>
          <div className="relative">
            <select 
              className="w-full outline-none border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none focus:border-[#008558] focus:ring-1 focus:ring-[#008558]"
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
              <option value="2017">2017</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Fuel */}
        <div className="mb-4">
          <label className="block font-semibold text-[#1e2a49] text-sm mb-2">Fuel</label>
          <div className="relative">
            <select 
              className="w-full outline-none border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none focus:border-[#008558] focus:ring-1 focus:ring-[#008558]"
              value={formData.fuel_type}
              onChange={(e) => updateFormData({ fuel_type: e.target.value })}
            >
              <option value="">Select fuel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block font-semibold text-[#1e2a49] text-sm mb-2">Type</label>
          <div className="relative">
            <select 
              className="w-full outline-none border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none focus:border-[#008558] focus:ring-1 focus:ring-[#008558]"
              value={formData.bike_type}
              onChange={(e) => updateFormData({ bike_type: e.target.value })}
            >
              <option value="">Select type</option>
              <option value="Sports">Sports</option>
              <option value="Cruiser">Cruiser</option>
              <option value="Adventure">Adventure</option>
              <option value="Touring">Touring</option>
              <option value="Standard">Standard</option>
              <option value="Scooter">Scooter</option>
              <option value="Electric">Electric</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Engine Capacity */}
      <div className="mb-6 w-full md:w-1/2">
        <label className="block font-semibold text-[#1e2a49] text-sm mb-2">
          Engine capacity
        </label>
        <div className="relative">
          <select 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none focus:border-[#008558] focus:ring-1 focus:ring-[#008558] outline-none"
            value={formData.engine_capacity}
            onChange={(e) => updateFormData({ engine_capacity: e.target.value })}
          >
            <option value="">Select engine capacity</option>
            <option value="100cc">100cc</option>
            <option value="125cc">125cc</option>
            <option value="150cc">150cc</option>
            <option value="200cc">200cc</option>
            <option value="250cc">250cc</option>
            <option value="350cc">350cc</option>
            <option value="500cc">500cc</option>
            <option value="650cc">650cc</option>
            <option value="1000cc+">1000cc+</option>
          </select>
          <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <label className="block font-semibold text-[#1e2a49] text-sm mb-2">Features</label>
        <div className="relative mb-3">
          <select 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none focus:border-[#008558] focus:ring-1 focus:ring-[#008558] outline-none"
            onChange={(e) => {
              const selectedFeature = e.target.value;
              if (selectedFeature && !formData.features.includes(selectedFeature)) {
                updateFormData({ features: [...formData.features, selectedFeature] });
              }
              e.target.value = "";
            }}
          >
            <option value="">Select all that apply</option>
            <option value="ABS">ABS</option>
            <option value="LED Headlight">LED Headlight</option>
            <option value="Digital Display">Digital Display</option>
            <option value="Bluetooth Connectivity">Bluetooth Connectivity</option>
            <option value="USB Charging">USB Charging</option>
            <option value="Disc Brakes">Disc Brakes</option>
            <option value="Alloy Wheels">Alloy Wheels</option>
            <option value="Electric Start">Electric Start</option>
          </select>
          <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        {formData.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span 
                key={index} 
                className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full border border-emerald-200 cursor-pointer"
                onClick={() => updateFormData({ 
                  features: formData.features.filter((_, i) => i !== index) 
                })}
              >
                {feature} ×
              </span>
            ))}
          </div>
        )}
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

// ... keep existing code (BikePricingAvailability, AddonsInclusionsForm, BikeImportantInformation components)

// Step 2: Bike Pricing & Availability
const BikePricingAvailability: React.FC<StepComponentProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
}) => {
  const addSecondaryPrice = () => {
    updateFormData({
      secondary_prices: [...formData.secondary_prices, { label: "", price: "" }]
    });
  };

  const updateSecondaryPrice = (index: number, field: "label" | "price", value: string) => {
    const updated = formData.secondary_prices.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    updateFormData({ secondary_prices: updated });
  };

  const removeSecondaryPrice = (index: number) => {
    updateFormData({
      secondary_prices: formData.secondary_prices.filter((_, i) => i !== index)
    });
  };

  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-bold text-[#1e2a49]">
          Pricing & Availability
        </h2>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Availability
        </label>
        <div className="relative">
          <select 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none focus:border-[#008558] focus:ring-1 focus:ring-[#008558] outline-none"
            value={formData.availability}
            onChange={(e) => updateFormData({ availability: e.target.value })}
          >
            <option value="">Select availability</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
            <option value="All Days">All Days</option>
            <option value="Custom Schedule">Custom Schedule</option>
          </select>
          <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Self Drive */}
      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-3">
          Available on self ride?
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ self_drive: "yes" })}
            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
              formData.self_drive === "yes"
                ? "bg-[#008558] text-white shadow-md"
                : "bg-white text-[#1e2a49] border border-gray-300 hover:border-[#008558]"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ self_drive: "no" })}
            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
              formData.self_drive === "no"
                ? "bg-[#008558] text-white shadow-md"
                : "bg-white text-[#1e2a49] border border-gray-300 hover:border-[#008558]"
            }`}
          >
            No
          </button>
        </div>
      </div>

      {/* Primary Price */}
      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Price <span className="text-[#6b7280] font-normal">per day</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.price}
            onChange={(e) => updateFormData({ price: e.target.value })}
            className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 text-sm focus:border-[#008558] focus:ring-1 focus:ring-[#008558] outline-none"
            placeholder="Enter daily rental price"
          />
          <span className="absolute left-3 top-3.5 text-gray-500 text-sm">₹</span>
        </div>
      </div>

      {/* Secondary Prices */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block font-semibold text-[#1e2a49]">
            Additional pricing options
          </label>
          <button
            type="button"
            onClick={addSecondaryPrice}
            className="text-[#008558] text-sm font-medium hover:underline"
          >
            + Add option
          </button>
        </div>
        
        {formData.secondary_prices.map((price, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Label (e.g., Weekly)"
              value={price.label}
              onChange={(e) => updateSecondaryPrice(index, "label", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-[#008558] focus:ring-1 focus:ring-[#008558] outline-none"
            />
            <div className="relative flex">
              <input
                type="text"
                placeholder="Price"
                value={price.price}
                onChange={(e) => updateSecondaryPrice(index, "price", e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg pl-8 pr-4 py-2 text-sm focus:border-[#008558] focus:ring-1 focus:ring-[#008558] outline-none"
              />
              <span className="absolute left-3 top-2.5 text-gray-500 text-sm">₹</span>
              <button
                type="button"
                onClick={() => removeSecondaryPrice(index)}
                className="ml-2 text-red-500 hover:text-red-700 text-sm px-2"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

// Step 3: Add-ons & Inclusions
const AddonsInclusionsForm: React.FC<StepComponentProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
}) => {
  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-bold text-[#1e2a49]">
          Inclusions & Exclusions
        </h2>
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          What's included?
        </label>
        <textarea
          rows={4}
          value={formData.inclusions}
          onChange={(e) => updateFormData({ inclusions: e.target.value })}
          className="flex items-center w-full border border-gray-300 rounded-lg px-4 py-1 text-sm resize-none focus:border-[#008558] h-11 focus:ring-1 focus:ring-[#008558] outline-none"
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
          className="flex items-center w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:border-[#008558] h-11 focus:ring-1 focus:ring-[#008558] outline-none"
        />
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} />
    </form>
  );
};

// Step 4: Important Information
const BikeImportantInformation: React.FC<StepComponentProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  nextLabel,
}) => {
  return (
    <form className="max-w-5xl w-[650px] px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-bold text-[#1e2a49]">
          Important Information
        </h2>
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Additional details
        </label>
        <textarea
          rows={6}
          value={formData.important_info}
          onChange={(e) => updateFormData({ important_info: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:border-[#008558] focus:ring-1 focus:ring-[#008558] outline-none"
          placeholder="Any additional information riders should know (e.g., license requirements, pickup location, fuel policy)..."
        />
      </div>

      {/* Not Suitable For */}
      <div className="mb-8">
        <label className="block font-semibold text-[#1e2a49] mb-2">
          Not suitable for
        </label>
        <div className="relative mb-3">
          <select 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm appearance-none focus:border-[#008558] focus:ring-1 focus:ring-[#008558] outline-none"
            onChange={(e) => {
              const selected = e.target.value;
              if (selected && !formData.not_suitable_for.includes(selected)) {
                updateFormData({ not_suitable_for: [...formData.not_suitable_for, selected] });
              }
              e.target.value = "";
            }}
          >
            <option value="">Select restrictions</option>
            <option value="Beginners">Beginners</option>
            <option value="Highway Riding">Highway Riding</option>
            <option value="Off-road">Off-road</option>
            <option value="Long Distance">Long Distance</option>
            <option value="Racing">Racing</option>
          </select>
          <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        {formData.not_suitable_for.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.not_suitable_for.map((item, index) => (
              <span 
                key={index} 
                className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full border border-red-200 cursor-pointer"
                onClick={() => updateFormData({ 
                  not_suitable_for: formData.not_suitable_for.filter((_, i) => i !== index) 
                })}
              >
                {item} ×
              </span>
            ))}
          </div>
        )}
      </div>

      <ListingButtons onBack={onBack} onNext={onNext} nextLabel={nextLabel} />
    </form>
  );
};

// Main BikeListingActivity Component - handles both create and update
export default function BikeListingActivity() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(!!id); // Only show loading for edit mode
  const [error, setError] = useState<string | null>(null);
  
  // Determine if we're in edit mode
  const isEditMode = !!id;

  // Form data state
  const [formData, setFormData] = useState<BikeFormData>({
    photos: [],
    bike_name: "",
    bike_make: "",
    model_year: "",
    fuel_type: "",
    transmission: "",
    engine_capacity: "",
    bike_type: "",
    features: [],
    availability: "",
    self_drive: null,
    price: "",
    secondary_prices: [],
    add_ons: [],
    inclusions: "",
    exclusions: "",
    important_info: "",
    not_suitable_for: [],
  });

  // Fetch existing listing data for edit mode
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
        console.log("Fetching listing with ID:", id);
        const response = await fetch(`http://localhost:9000/api/v1/listings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch listing");
        }

        const listing = await response.json();
        console.log("Fetched listing:", listing);

        // Map the fetched data to form data
        const metaData = listing.meta_data || {};
        
        setFormData({
          photos: metaData.photos || [],
          bike_name: listing.title || "",
          bike_make: metaData.bike_make || "",
          model_year: metaData.model_year || "",
          fuel_type: metaData.fuel_type || "",
          transmission: metaData.transmission || "",
          engine_capacity: metaData.engine_capacity || "",
          bike_type: metaData.bike_type || "",
          features: metaData.features || [],
          availability: metaData.availability || "",
          self_drive: metaData.self_drive || null,
          price: listing.price?.toString() || "",
          secondary_prices: metaData.secondary_prices || [],
          add_ons: metaData.add_ons || [],
          inclusions: Array.isArray(metaData.inclusions) ? metaData.inclusions.join('\n') : (metaData.inclusions || ""),
          exclusions: Array.isArray(metaData.exclusions) ? metaData.exclusions.join('\n') : (metaData.exclusions || ""),
          important_info: metaData.important_info || listing.description || "",
          not_suitable_for: metaData.not_suitable_for || [],
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

  const updateFormData = (updates: Partial<BikeFormData>) => {
    console.log("Updating bike form data with:", updates);
    setFormData((prev) => {
      const newData = { ...prev, ...updates };
      console.log("New bike form data:", newData);
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

  // Handle form submission for both create and update
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const partnerId = localStorage.getItem("user_id");

    if (!token || !partnerId) {
      alert("Missing authentication.");
      return;
    }

    const payload = {
      ...(isEditMode ? {} : { partner_id: partnerId }),
      listing_type: "bike_rental",
      title: formData.bike_name,
      description: formData.important_info || `${formData.bike_make} ${formData.model_year} for rent`,
      price: parseFloat(formData.price.replace(/,/g, "") || "0"),
      meta_data: {
        photos: formData.photos,
        bike_make: formData.bike_make,
        model_year: formData.model_year,
        transmission: formData.transmission,
        engine_capacity: formData.engine_capacity,
        fuel_type: formData.fuel_type,
        bike_type: formData.bike_type,
        features: formData.features,
        availability: formData.availability,
        self_drive: formData.self_drive,
        inclusions: formData.inclusions.split('\n').filter(item => item.trim()),
        exclusions: formData.exclusions.split('\n').filter(item => item.trim()),
        price: parseFloat(formData.price.replace(/,/g, "") || "0"),
        secondary_prices: formData.secondary_prices.map(sp => ({
          label: sp.label,
          price: parseFloat(sp.price.replace(/,/g, "") || "0")
        })),
        add_ons: formData.add_ons,
        important_info: formData.important_info,
        not_suitable_for: formData.not_suitable_for,
      },
    };

    console.log(`${isEditMode ? 'Updating' : 'Creating'} bike listing payload:`, JSON.stringify(payload, null, 2));

    try {
      const url = isEditMode 
        ? `http://localhost:9000/api/v1/listings/${id}`
        : "http://localhost:9000/api/v1/listings";
      
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(`❌ Bike listing ${isEditMode ? 'update' : 'creation'} error:`, data);
        alert(data.message || `${isEditMode ? 'Update' : 'Creation'} failed`);
        return;
      }

      console.log(`✅ Bike listing ${isEditMode ? 'updated' : 'created'} successfully:`, data);
      setStepIndex(stepComponents.length - 1); // show success page
    } catch (err) {
      console.error(`❌ Error during bike listing ${isEditMode ? 'update' : 'creation'}:`, err);
      alert("Network error. Please try again.");
    }
  };

  const stepComponents = [
    AboutTheBikeForm,
    BikePricingAvailability,
    AddonsInclusionsForm,
    BikeImportantInformation,
    ListingSubmitted,
  ];

  const handleNext = () => {
    console.log("Current bike form data:", formData);
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

  // Loading state (only for edit mode)
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

  // Error state
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
    <div className="flex min-h-screen">
      {stepIndex < stepComponents.length - 1 && (
        <BikeListingSidebar
          activeStep={stepIndex}
          onStepClick={handleStepClick}
        />
      )}
      <div className="flex-1 p-6">
        <StepComponent
          onNext={stepIndex === stepComponents.length - 2 ? handleSubmit : handleNext}
          onBack={handleBack}
          onButtonClick={() => navigate("/dashboard")}
          formData={formData}
          updateFormData={updateFormData}
          onPhotosUpload={uploadFiles}
          nextLabel={stepIndex === stepComponents.length - 2 ? (isEditMode ? "Update Listing" : "Submit Listing") : "Next"}
        />
      </div>
    </div>
  );
}