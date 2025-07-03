export interface Listing {
  listing_id: string;
  partner_id: string;
  listing_type: string;
  title: string;
  description: string;
  price: number;
  meta_data: any;
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
  meta_data: any;
}

export interface UpdateListingData {
  listing_type?: string;
  title?: string;
  description?: string;
  price?: number;
  meta_data?: any;
}
