-- SETUP TEST DATA FOR CEHPOINT MARKETING PARTNERS
-- 
-- Instructions:
-- 1. Create two users in Supabase Authentication first:
--    - admin@cehpoint.com (password: Admin@123456)
--    - influencer@test.com (password: Test@123456)
-- 2. Copy their User UIDs from the Authentication panel
-- 3. Replace the UUIDs below with the actual UUIDs
-- 4. Run this entire script in Supabase SQL Editor

-- ⚠️ REPLACE THESE WITH YOUR ACTUAL USER IDs FROM SUPABASE AUTHENTICATION
-- Find them in: Authentication > Users > Copy the "UID" column
DO $$
DECLARE
  admin_user_id UUID := 'PASTE-ADMIN-UID-HERE';  -- Replace with admin's UID
  influencer_user_id UUID := 'PASTE-INFLUENCER-UID-HERE';  -- Replace with influencer's UID
  inf_id UUID;
BEGIN

  -- Insert users into users table
  INSERT INTO users (id, email, role) VALUES 
    (admin_user_id, 'admin@cehpoint.com', 'admin'),
    (influencer_user_id, 'influencer@test.com', 'influencer')
  ON CONFLICT (id) DO UPDATE 
    SET email = EXCLUDED.email, role = EXCLUDED.role;

  -- Insert test influencer profile
  INSERT INTO influencers (
    user_id, 
    full_name, 
    phone_number, 
    email, 
    district, 
    state, 
    social_media_handles, 
    follower_count, 
    id_proof_url, 
    id_proof_type, 
    upi_id, 
    approval_status,
    approved_at,
    approved_by
  ) VALUES (
    influencer_user_id,
    'Priya Sharma',
    '+91-9876543210',
    'influencer@test.com',
    'Mumbai',
    'Maharashtra',
    '{"instagram": "@priyasharma_official", "youtube": "PriyaVlogs", "facebook": "priya.sharma"}',
    25000,
    'https://example.com/id-proof-sample.jpg',
    'aadhaar',
    'priya@paytm',
    'approved',
    NOW(),
    admin_user_id
  )
  ON CONFLICT (user_id) DO UPDATE 
    SET approval_status = 'approved', approved_at = NOW(), approved_by = admin_user_id;

  -- Get the influencer ID
  SELECT id INTO inf_id FROM influencers WHERE user_id = influencer_user_id;

  -- Insert sample video submissions
  INSERT INTO video_submissions (
    influencer_id,
    title,
    description,
    video_url,
    approval_status,
    submitted_at,
    reviewed_at,
    reviewed_by
  ) VALUES 
  (
    inf_id,
    'Introducing Cehpoint Premium Services',
    'A detailed video showcasing the premium features and benefits of Cehpoint services for Mumbai customers. Includes customer testimonials and product demonstration.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'approved',
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '4 days',
    admin_user_id
  ),
  (
    inf_id,
    'Cehpoint Customer Success Stories',
    'Real customer stories from Mumbai showcasing how Cehpoint helped their business grow. Featuring local businesses and entrepreneurs.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'approved',
    NOW() - INTERVAL '10 days',
    NOW() - INTERVAL '9 days',
    admin_user_id
  ),
  (
    inf_id,
    'New Cehpoint Product Launch Review',
    'Unboxing and first impressions of the new Cehpoint product line. Waiting for admin approval before posting.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'pending',
    NOW() - INTERVAL '1 day',
    NULL,
    NULL
  )
  ON CONFLICT DO NOTHING;

  -- Insert sample payments
  INSERT INTO payments (
    influencer_id,
    amount,
    payment_type,
    payment_status,
    upi_transaction_id,
    paid_at,
    paid_by,
    notes
  ) VALUES 
  (
    inf_id,
    5000.00,
    'fixed',
    'paid',
    'UPI123456789',
    NOW() - INTERVAL '3 days',
    admin_user_id,
    'Payment for approved video: Cehpoint Premium Services'
  ),
  (
    inf_id,
    4500.00,
    'fixed',
    'paid',
    'UPI987654321',
    NOW() - INTERVAL '8 days',
    admin_user_id,
    'Payment for approved video: Customer Success Stories'
  ),
  (
    inf_id,
    1250.00,
    'revenue_share',
    'pending',
    NULL,
    NULL,
    NULL,
    'Revenue share for current month - 2 approved videos posted'
  )
  ON CONFLICT DO NOTHING;

  RAISE NOTICE '✓ Test data created successfully!';
  RAISE NOTICE 'Admin Login: admin@cehpoint.com / Admin@123456';
  RAISE NOTICE 'Influencer Login: influencer@test.com / Test@123456';
  RAISE NOTICE 'Influencer Profile: Priya Sharma, Mumbai, Maharashtra';
  RAISE NOTICE 'Sample Data: 3 videos (2 approved, 1 pending), ₹9,500 paid, ₹1,250 pending';
END $$;
