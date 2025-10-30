# Quick Setup Instructions for Cehpoint Marketing Partners

## Step 1: Create Authentication Users in Supabase

1. Go to your Supabase project
2. Navigate to **Authentication** → **Users**
3. Click **"Add user"** and create these two test users:

### Admin User
- Email: `admin@cehpoint.com`
- Password: `Admin@123456`
- Check "Auto Confirm User"

### Influencer User
- Email: `influencer@test.com`
- Password: `Test@123456`
- Check "Auto Confirm User"

**Important**: After creating each user, note down their UUID (User ID). You'll need these in the next step.

## Step 2: Run Database Schema

1. In Supabase, go to **SQL Editor**
2. Copy the entire content of `scripts/setup-database.sql`
3. Paste and click **"Run"**
4. Wait for success message

## Step 3: Insert Test Data

1. Still in SQL Editor, create a new query
2. Copy and paste this SQL (replace the UUIDs with your actual user UUIDs from Step 1):

```sql
-- Insert test users into users table
-- IMPORTANT: Replace these UUIDs with the actual UUIDs from Supabase Auth
INSERT INTO users (id, email, role) VALUES 
  ('YOUR-ADMIN-UUID-HERE', 'admin@cehpoint.com', 'admin'),
  ('YOUR-INFLUENCER-UUID-HERE', 'influencer@test.com', 'influencer')
ON CONFLICT (id) DO NOTHING;

-- Insert test influencer profile
-- Replace the user_id with your influencer's UUID
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
  approved_at
) VALUES (
  'YOUR-INFLUENCER-UUID-HERE',
  'Test Influencer',
  '+91-9876543210',
  'influencer@test.com',
  'Mumbai',
  'Maharashtra',
  '{"instagram": "@testinfluencer", "youtube": "TestChannel"}',
  25000,
  'https://example.com/id-proof.jpg',
  'aadhaar',
  'testuser@paytm',
  'approved',
  NOW()
)
ON CONFLICT DO NOTHING;

-- Get the influencer ID for next steps
DO $$
DECLARE
  inf_id UUID;
BEGIN
  SELECT id INTO inf_id FROM influencers WHERE email = 'influencer@test.com';
  
  -- Insert sample video submission
  INSERT INTO video_submissions (
    influencer_id,
    title,
    description,
    video_url,
    approval_status,
    submitted_at
  ) VALUES (
    inf_id,
    'Test Product Promotion Video',
    'This is a sample promotional video for testing purposes. Shows how the platform works.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'approved',
    NOW() - INTERVAL '2 days'
  );
  
  -- Insert sample payment
  INSERT INTO payments (
    influencer_id,
    amount,
    payment_type,
    payment_status,
    upi_transaction_id,
    notes
  ) VALUES (
    inf_id,
    5000.00,
    'fixed',
    'paid',
    'UPI123456789',
    'Payment for approved video'
  );
  
  RAISE NOTICE 'Test data inserted successfully!';
END $$;
```

3. Click **"Run"**

## Step 4: Create Storage Bucket

1. In Supabase, go to **Storage**
2. Click **"New bucket"**
3. Name it: `documents`
4. Make it **public** (or configure RLS if you prefer)
5. Click **"Create bucket"**

## Step 5: Test the Platform

You can now log in with these credentials:

### Admin Login
- URL: Your Replit preview URL + `/login`
- Email: `admin@cehpoint.com`
- Password: `Admin@123456`

### Influencer Login
- URL: Your Replit preview URL + `/login`
- Email: `influencer@test.com`
- Password: `Test@123456`

## What You Can Test

### As Admin:
1. View dashboard with statistics
2. See pending influencer approvals
3. Review and approve/reject videos
4. Manage payments
5. View district coverage

### As Influencer:
1. View dashboard with earnings
2. Submit new videos
3. Track approval status
4. View payment history
5. Read promotion guidelines

## Troubleshooting

### "Error: Invalid JWT" or authentication issues
- Make sure you created users in Supabase Authentication first
- Ensure the UUIDs in the SQL match exactly
- Clear browser cache and try again

### "Cannot insert data" errors
- Check that RLS policies were created
- Verify the users table has data
- Make sure UUIDs are correct

### Storage/upload errors
- Ensure the `documents` bucket exists
- Make sure it's set to public or has proper RLS policies

## Next Steps

Once everything works:
1. Create your real admin account
2. Update the test data or delete it
3. Customize branding and colors
4. Deploy to Vercel (see DEPLOYMENT.md)

## Need Help?

If you encounter issues:
1. Check browser console for errors
2. Check Supabase logs
3. Verify all environment variables are set
4. Make sure database schema ran successfully
