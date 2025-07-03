// import axios, { type AxiosResponse } from 'axios';
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://159.89.17.162:9000/v1',
// });


// // Add auth token interceptor for authenticated requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('auth_token'); // Adjust based on where you store the token
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // User-related API calls
// export const registerUser = async (data: { full_name: string; email: string; phone_number: string; password: string; role: string }) => {
//   const res: AxiosResponse = await api.post('/users/register', data);
//   return res.data;
// };

// export const loginUser = async (data: { email: string; password: string }) => {
//   const res: AxiosResponse = await api.post('/users/login', data);
//   return res.data;
// };

// // Listing-related API calls
// export interface Listing {
//   listing_id: string;
//   partner_id: string;
//   listing_type: string;
//   title: string;
//   description: string;
//   price: number;
//   meta_data: any;
//   status: string;
//   admin_comments?: string;
//   created_at: string;
//   updated_at: string;
// }

// export interface CreateListingData {
//   partner_id: string;
//   listing_type: string;
//   title: string;
//   description: string;
//   price: number;
//   meta_data: any;
// }

// export interface UpdateListingData {
//   listing_type?: string;
//   title?: string;
//   description?: string;
//   price?: number;
//   meta_data?: any;
// }

// // Listing API Functions
// export const createListing = async (data: CreateListingData) => {
//   const res: AxiosResponse = await api.post('/listings', data);
//   return res.data;
// };

// export const getSupplierListings = async (): Promise<Listing[]> => {
//   const res: AxiosResponse = await api.get('/listings/my-listings');
//   return res.data;
// };

// export const getListingById = async (id: string): Promise<Listing> => {
//   const res: AxiosResponse = await api.get(`/listings/${id}`);
//   return res.data;
// };

// export const updateListing = async (id: string, data: UpdateListingData) => {
//   const res: AxiosResponse = await api.put(`/listings/${id}`, data);
//   return res.data;
// };

// export const getAllListings = async (): Promise<Listing[]> => {
//   const res: AxiosResponse = await api.get('/listings');
//   return res.data;
// };

// export const approveListing = async (id: string) => {
//   const res: AxiosResponse = await api.patch(`/listings/${id}/approve`);
//   return res.data;
// };

// export const rejectListing = async (id: string, reason: string) => {
//   const res: AxiosResponse = await api.patch(`/listings/${id}/reject`, { reason });
//   return res.data;
// };

// export const deleteListing = async (id: string) => {
//   const res: AxiosResponse = await api.delete(`/listings/${id}`);
//   return res.data;
// };

// // Review-related API calls
// export interface Review {
//   review_id: string;
//   supplier_id: string;
//   customer_id: string;
//   booking_id: string;
//   rating: number;
//   review_text: string;
//   review_photos?: string[];
//   reply_text?: string;
//   created_at: string;
//   updated_at: string;
// }

// export interface CreateReviewData {
//   supplier_id: string;
//   customer_id: string;
//   booking_id: string;
//   rating: number;
//   review_text: string;
//   review_photos?: string[];
// }

// // Create a new review (Customer only)
// export const createReview = async (data: CreateReviewData) => {
//   const res: AxiosResponse = await api.post('/reviews', data);
//   return res.data;
// };

// // Get all reviews for a specific supplier
// export const getReviewsBySupplier = async (supplierId: string): Promise<Review[]> => {
//   const res: AxiosResponse = await api.get(`/reviews/supplier/${supplierId}`);
//   return res.data;
// };

// // Reply to a review (Supplier only)
// export const replyToReview = async (id: string, replyText: string) => {
//   const res: AxiosResponse = await api.patch(`/reviews/${id}/reply`, { reply_text: replyText });
//   return res.data;
// };

// // Delete a review (Admin only)
// export const deleteReview = async (id: string) => {
//   const res: AxiosResponse = await api.delete(`/reviews/${id}`);
//   return res.data;
// };

// // Support-related API calls
// export const fetchData = async <T>(endpoint: string): Promise<T> => {
//   try {
//     const res: AxiosResponse<T> = await api.get<T>(endpoint);
//     return res.data;
//   } catch (error) {
//     throw new Error('Failed to fetch data');
//   }
// };

// export const createTicket = async (data: { subject: string; related_to: string; description: string }) => {
//   const res: AxiosResponse = await api.post('/support', data);
//   return res.data;
// };

// export const getUserTickets = async () => {
//   const res: AxiosResponse = await api.get('/support/my-tickets');
//   return res.data;
// };

// export const getTicketDetails = async (ticketId: string) => {
//   const res: AxiosResponse = await api.get(`/support/${ticketId}`);
//   return res.data;
// };

// export const updateTicket = async (ticketId: string, data: { status?: string; admin_responses?: string }) => {
//   const res: AxiosResponse = await api.patch(`/support/${ticketId}`, data);
//   return res.data;
// };

// export const closeTicket = async (ticketId: string) => {
//   const res: AxiosResponse = await api.patch(`/support/${ticketId}/close`);
//   return res.data;
// };

// export const addAdminResponse = async (ticketId: string, response: string) => {
//   const res: AxiosResponse = await api.patch(`/support/${ticketId}/response`, { admin_responses: response });
//   return res.data;
// };

// // Message-related API calls
// export const fetchMessagesByBooking = async (bookingId: string) => {
//   const res: AxiosResponse = await api.get(`/messages/booking/${bookingId}`);
//   return res.data;
// };

// export const sendMessage = async (data: { booking_id: string; message_text: string }) => {
//   const res: AxiosResponse = await api.post('/messages', data);
//   return res.data;
// };

// // Payout-related API calls
// export const createPayout = async (data: {
//   booking_id: string;
//   partner_id: string;
//   amount_due: number;
//   commission_fee: number;
//   wht_tax: number;
//   final_amount: number;
//   payout_status: string;
//   payout_method: string;
//   payout_date: string;
// }) => {
//   const res: AxiosResponse = await api.post('/payouts', data);
//   return res.data;
// };

// export const getSupplierPayouts = async (partnerId: string) => {
//   const res: AxiosResponse = await api.get(`/payouts/partner/${partnerId}`);
//   return res.data;
// };

// export const getPayoutById = async (payoutId: string) => {
//   const res: AxiosResponse = await api.get(`/payouts/${payoutId}`);
//   return res.data;
// };

// export const updatePayoutStatus = async (payoutId: string, status: string) => {
//   const res: AxiosResponse = await api.patch(`/payouts/${payoutId}/status`, { status });
//   return res.data;
// };
