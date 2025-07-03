
import axios from "axios";
export interface Listing {
  listing_id: string;
  partner_id: string;
  listing_type: string;
  title: string;
  description: string;
  price: number;
  meta_data?: Record<string, any>;
  status: string;
  admin_comments?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateListingData {
  partner_id: string;
  listing_type: string;
  title: string;
  description: string;
  price: number;
  meta_data?: Record<string, any>;
}

export interface UpdateListingData {
  title?: string;
  description?: string;
  price?: number;
  meta_data?: Record<string, any>;
}

export interface Review {
  review_id: string;
  supplier_id: string;
  customer_id: string;
  booking_id: string;
  rating: number;
  review_text: string;
  reply_text?: string;
  review_photos?: string[];
  created_at: string;
}

export interface CreateReviewData {
  supplier_id: string;
  booking_id: string;
  rating: number;
  review_text: string;
  review_photos?: string[];
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://159.89.17.162:9000/api/v1",
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// User-related API calls
export const registerUser = async (data: { full_name: string; email: string; phone_number: string; password: string; role: string }) => {
  const res = await api.post("/users/register", data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post("/users/login", data);
  return res.data;
};

export const getUserById = async (userId: string) => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};

export const updateUser = async (userId: string, data: any) => {
  const res = await api.put(`/users/${userId}`, data);
  return res.data;
};




// File upload for verification documents
export const uploadVerificationDocument = async (file: File, supplierId: string) => {
  const formData = new FormData();
  formData.append('document', file);
  formData.append('supplier_id', supplierId);
  
  const res = await api.post("/suppliers/upload-document", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};


// Listing-related API calls
export const createListing = async (data: CreateListingData) => {
  const res = await api.post("/listings", data);
  return res.data;
};

export const getSupplierListings = async (): Promise<Listing[]> => {
  const res = await api.get("/listings/my-listings");
  return res.data;
};

export const getListingById = async (id: string): Promise<Listing> => {
  const res = await api.get(`/listings/${id}`);
  return res.data;
};

export const updateListing = async (id: string, data: UpdateListingData) => {
  const res = await api.put(`/listings/${id}`, data);
  return res.data;
};

export const getAllListings = async (): Promise<Listing[]> => {
  const res = await api.get("/listings");
  return res.data;
};

export const approveListing = async (id: string) => {
  const res = await api.patch(`/listings/${id}/approve`);
  return res.data;
};

export const rejectListing = async (id: string, reason: string) => {
  const res = await api.patch(`/listings/${id}/reject`, { reason });
  return res.data;
};

export const deleteListing = async (id: string) => {
  const res = await api.delete(`/listings/${id}`);
  return res.data;
};

// Review-related API calls
export const createReview = async (data: CreateReviewData) => {
  const res = await api.post("/reviews", data);
  return res.data;
};

export const getReviewsBySupplier = async (supplierId: string): Promise<Review[]> => {
  const res = await api.get(`/reviews/supplier/${supplierId}`);
  return res.data;
};

export const replyToReview = async (id: string, replyText: string) => {
  const res = await api.patch(`/reviews/${id}/reply`, { reply_text: replyText });
  return res.data;
};

export const deleteReview = async (id: string) => {
  const res = await api.delete(`/reviews/${id}`);
  return res.data;
};

// Support-related API calls
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const res = await api.get<T>(endpoint);
  return res.data;
};

export const createTicket = async (data: { subject: string; related_to: string; description: string }) => {
  const res = await api.post("/support", data);
  return res.data;
};

export const getUserTickets = async () => {
  const res = await api.get("/support/my-tickets");
  return res.data;
};

export const getTicketDetails = async (ticketId: string) => {
  const res = await api.get(`/support/${ticketId}`);
  return res.data;
};

export const updateTicket = async (ticketId: string, data: { status?: string; admin_responses?: string }) => {
  const res = await api.patch(`/support/${ticketId}`, data);
  return res.data;
};

export const closeTicket = async (ticketId: string) => {
  const res = await api.patch(`/support/${ticketId}/close`);
  return res.data;
};

export const addAdminResponse = async (ticketId: string, response: string) => {
  const res = await api.patch(`/support/${ticketId}/response`, { admin_responses: response });
  return res.data;
};

// Message-related API calls
export const fetchMessagesByBooking = async (bookingId: string) => {
  const res = await api.get(`/messages/booking/${bookingId}`);
  return res.data;
};

export const sendMessage = async (data: { booking_id: string; message_text: string }) => {
  const res = await api.post("/messages", data);
  return res.data;
};

// Payout-related API calls
export const createPayout = async (data: {
  booking_id: string;
  partner_id: string;
  amount_due: number;
  commission_fee: number;
  wht_tax: number;
  final_amount: number;
  payout_status: string;
  payout_method: string;
  payout_date: string;
}) => {
  const res = await api.post("/payouts", data);
  return res.data;
};

export const getSupplierPayouts = async (partnerId: string) => {
  const res = await api.get(`/payouts/partner/${partnerId}`);
  return res.data;
};

export const getPayoutById = async (payoutId: string) => {
  const res = await api.get(`/payouts/${payoutId}`);
  return res.data;
};


// Delete a supplier by ID
export const deleteSupplier = async (supplierId: string): Promise<{ message: string }> => {
  const res = await api.delete(`/suppliers/${supplierId}`);
  return res.data;
};

// Get listings by supplier ID (alternative to "my-listings")
export const getListingsBySupplierId = async (supplierId: string): Promise<Listing[]> => {
  const res = await api.get(`/listings/supplier/${supplierId}`);
  return res.data;
};

// Delete a review by ID
export const deleteReviewById = async (reviewId: string): Promise<{ message: string }> => {
  const res = await api.delete(`/reviews/${reviewId}`);
  return res.data;
};

// Get tickets by user ID (alternative to "my-tickets")
export const getTicketsByUserId = async (userId: string) => {
  const res = await api.get(`/support/user/${userId}/tickets`);
  return res.data;
};

// Fetch messages by user ID (alternative endpoint if exists)
export const fetchMessagesByUserId = async (userId: string) => {
  const res = await api.get(`/messages/user/${userId}`);
  return res.data;
};

// Cancel a payout request
export const cancelPayout = async (payoutId: string) => {
  const res = await api.patch(`/payouts/${payoutId}/cancel`);
  return res.data;
};

export const updatePayoutStatus = async (payoutId: string, status: string) => {
  const res = await api.patch(`/payouts/${payoutId}/status`, { status });
  return res.data;
};

// Check if user exists by email
export const checkUserExists = async (email: string) => {
  try {
    const res = await api.get(`/users/check-email/${email}`);
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return { exists: false };
    }
    throw error;
  }
};

export default api;