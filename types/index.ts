export type UserRole = 'influencer' | 'admin' | 'marketing';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export type PaymentStatus = 'pending' | 'paid' | 'under_review';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Influencer {
  id: string;
  user_id: string;
  full_name: string;
  phone_number: string;
  email: string;
  district: string;
  state: string;
  social_media_handles: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
  };
  follower_count: number;
  id_proof_url: string;
  id_proof_type: 'aadhaar' | 'pan';
  upi_id: string;
  approval_status: ApprovalStatus;
  approved_at?: string;
  approved_by?: string;
  created_at: string;
  updated_at: string;
}

export interface VideoSubmission {
  id: string;
  influencer_id: string;
  title: string;
  description: string;
  video_url?: string;
  video_file_url?: string;
  thumbnail_url?: string;
  approval_status: ApprovalStatus;
  reviewed_at?: string;
  reviewed_by?: string;
  rejection_reason?: string;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

export interface PostProof {
  id: string;
  video_submission_id: string;
  influencer_id: string;
  platform: 'instagram' | 'youtube' | 'facebook' | 'other';
  post_url: string;
  screenshot_url: string;
  posted_at: string;
  verified: boolean;
  verified_by?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  influencer_id: string;
  video_submission_id?: string;
  amount: number;
  payment_type: 'fixed' | 'revenue_share';
  payment_status: PaymentStatus;
  upi_transaction_id?: string;
  paid_at?: string;
  paid_by?: string;
  month?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PromotionGuidelines {
  id: string;
  title: string;
  content: string;
  dos: string[];
  donts: string[];
  script_template?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InfluencerStats {
  total_videos_submitted: number;
  approved_videos: number;
  rejected_videos: number;
  pending_videos: number;
  total_earnings: number;
  pending_payments: number;
  this_month_posts: number;
  eligible_for_revenue_share: boolean;
}

export interface AdminDashboardStats {
  total_influencers: number;
  pending_approvals: number;
  approved_influencers: number;
  rejected_influencers: number;
  total_videos_submitted: number;
  pending_video_reviews: number;
  total_payments_made: number;
  pending_payments: number;
  district_coverage: { district: string; state: string; count: number }[];
}
