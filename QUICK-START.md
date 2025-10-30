# Quick Start - Create Test Accounts

Follow these steps to set up test admin and influencer accounts.

## Step 1: Create Auth Users in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **Users**
4. Create TWO users:

### Admin Account
- Click "Add user" → "Create new user"
- Email: `admin@cehpoint.com`
- Password: `Admin@123456`
- ✓ Check "Auto Confirm User"
- Click "Create user"
- **Copy the User UID** (you'll need this in Step 2)

### Influencer Account
- Click "Add user" → "Create new user"
- Email: `influencer@test.com`
- Password: `Test@123456`
- ✓ Check "Auto Confirm User"
- Click "Create user"
- **Copy the User UID** (you'll need this in Step 2)

## Step 2: Run Database Setup

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste this entire SQL script:

```sql
-- STEP 1: Replace these UUIDs with the actual UUIDs from the users you created above
-- Find them in Authentication > Users, copy the "UID" column value

-- Example:
-- If your admin UID is: a1b2c3d4-e5f6-7890-abcd-ef1234567890
-- If your influencer UID is: b2c3d4e5-f6a7-8901-bcde-f12345678901

-- Insert users into users table
INSERT INTO users (id, email, role) VALUES 
  ('PASTE-YOUR-ADMIN-UID-HERE', 'admin@cehpoint.com', 'admin'),
  ('PASTE-YOUR-INFLUENCER-UID-HERE', 'influencer@test.com', 'influencer')
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
  approved_at
) VALUES (
  'PASTE-YOUR-INFLUENCER-UID-HERE',
  'Priya Sharma',
  '+91-9876543210',
  'influencer@test.com',
  'Mumbai',
  'Maharashtra',
  '{"instagram": "@priyasharma", "youtube": "PriyaVlogs", "facebook": "priya.sharma"}',
  25000,
  'https://example.com/id-proof.jpg',
  'aadhaar',
  'priya@paytm',
  'approved',
  NOW()
)
ON CONFLICT DO NOTHING;

-- Get the influencer ID and insert sample data
DO $$
DECLARE
  inf_id UUID;
  admin_uid UUID := 'PASTE-YOUR-ADMIN-UID-HERE';
BEGIN
  -- Get influencer ID
  SELECT id INTO inf_id FROM influencers WHERE email = 'influencer@test.com';
  
  IF inf_id IS NOT NULL THEN
    -- Insert 3 sample video submissions
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
      'A detailed video showcasing the premium features and benefits of Cehpoint services for Mumbai customers. Includes testimonials and demo.',
      'https://www.youtube.com/watch?v=sample1',
      'approved',
      NOW() - INTERVAL '5 days',
      NOW() - INTERVAL '4 days',
      admin_uid
    ),
    (
      inf_id,
      'Cehpoint Customer Success Stories',
      'Real customer stories from Mumbai showcasing how Cehpoint helped their business grow. Featuring local businesses.',
      'https://www.youtube.com/watch?v=sample2',
      'approved',
      NOW() - INTERVAL '10 days',
      NOW() - INTERVAL '9 days',
      admin_uid
    ),
    (
      inf_id,
      'New Cehpoint Product Launch Review',
      'Pending review: Unboxing and first impressions of the new Cehpoint product line.',
      'https://www.youtube.com/watch?v=sample3',
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
      admin_uid,
      'Payment for approved video - Cehpoint Premium Services'
    ),
    (
      inf_id,
      4500.00,
      'fixed',
      'paid',
      'UPI987654321',
      NOW() - INTERVAL '8 days',
      admin_uid,
      'Payment for approved video - Customer Success Stories'
    ),
    (
      inf_id,
      1250.00,
      'revenue_share',
      'pending',
      NULL,
      NULL,
      NULL,
      'Revenue share for current month - 2 videos posted'
    )
    ON CONFLICT DO NOTHING;
    
    RAISE NOTICE 'Test data created successfully!';
    RAISE NOTICE 'Admin email: admin@cehpoint.com';
    RAISE NOTICE 'Influencer email: influencer@test.com';
  ELSE
    RAISE EXCEPTION 'Influencer not found. Please check the user IDs.';
  END IF;
END $$;
```

4. **IMPORTANT**: Before running, replace BOTH occurrences of:
   - `'PASTE-YOUR-ADMIN-UID-HERE'` with your admin's actual UID
   - `'PASTE-YOUR-INFLUENCER-UID-HERE'` with your influencer's actual UID (appears 2 times)

5. Click **"Run"**
6. You should see: "Test data created successfully!"

## Step 3: Create Storage Bucket

1. In Supabase Dashboard, go to **Storage**
2. Click **"New bucket"**
3. Bucket name: `documents`
4. Make it **Public**
5. Click **"Create bucket"**

## Step 4: Test Login

Now you can test the platform!

### Login Credentials

**Admin Account:**
- URL: Your Replit preview URL + `/login`
- Email: `admin@cehpoint.com`
- Password: `Admin@123456`

**Influencer Account:**
- Email: `influencer@test.com`
- Password: `Test@123456`

## What You'll See

### As Admin (admin@cehpoint.com):
- Dashboard with 1 influencer, 3 video submissions (1 pending review)
- Can approve/reject the pending video
- View payment history (₹9,500 paid, ₹1,250 pending)
- District coverage showing Mumbai

### As Influencer (influencer@test.com):
- Dashboard with earnings: ₹9,500 total, ₹1,250 pending
- 3 video submissions (2 approved, 1 pending)
- Payment history
- Can submit new videos
- View promotion guidelines

## Troubleshooting

**"Invalid login credentials"**
- Make sure you created the users in Supabase Authentication first
- Check that you replaced the UUIDs correctly in the SQL
- Try logging out and logging in again

**"No data showing"**
- Verify the SQL ran successfully
- Check Supabase Table Editor to see if data exists
- Make sure the influencer was set to "approved" status

**"Cannot upload files"**
- Ensure the `documents` bucket exists in Storage
- Make sure it's set to public

## Next Steps

1. Explore all features as both admin and influencer
2. Test video submission workflow
3. Test approval/rejection workflow
4. Customize the platform for your needs
5. When ready, deploy to Vercel (see DEPLOYMENT.md)
