export interface Review {
  review_id: string;
  supplier_id: string;
  customer_id: string;
  booking_id: string;
  rating: number;
  review_text: string;
  review_photos?: string[];
  reply_text?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewData {
  supplier_id: string;
  customer_id: string;
  booking_id: string;
  rating: number;
  review_text: string;
  review_photos?: string[];
}
