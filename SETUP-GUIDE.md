# Cehpoint Marketing Platform - Complete Setup Guide

This guide will walk you through setting up your enhanced Cehpoint Marketing Platform with all new features including task management, guidebook integration, and revenue sharing.

## Prerequisites

- Supabase account with a project created
- Environment variables configured in Replit:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 1: Run Database Migrations

### 1.1 Base Schema (if not already done)
1. Go to your Supabase Dashboard → SQL Editor
2. Copy the content from `database-schema.sql`
3. Click "Run" to create the base tables

### 1.2 Enhanced Schema Migration
1. In Supabase SQL Editor, create a new query
2. Copy the content from `scripts/enhanced-schema-migration.sql`
3. Click "Run" to create the new tables for:
   - Marketing Projects
   - Monthly Tasks
   - Task Assignments
   - Revenue Shares
   - Guidebook Resources

## Step 2: Set Up Supabase Storage

### 2.1 Create Storage Buckets
1. In Supabase Dashboard, go to **Storage**
2. Create the following buckets:

#### Documents Bucket
- Name: `documents`
- Public: Yes
- File size limit: 50MB
- Allowed MIME types: `image/*,application/pdf`

#### Guidebooks Bucket
- Name: `guidebooks`
- Public: Yes (or configure RLS for influencer access)
- File size limit: 100MB
- Allowed MIME types: `application/pdf`

### 2.2 Upload Guidebook PDF
1. Go to **Storage** → `guidebooks` bucket
2. Click "Upload file"
3. Upload `attached_assets/Cehpoint_Innovation_Movement_Playbook_1761908847700.pdf`
4. After upload, click on the file and copy its public URL
5. You'll use this URL in Step 4

## Step 3: Create Authentication Users

### 3.1 Create Admin User
1. Go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Email: `admin@cehpoint.com`
4. Password: `Cehpoint@2025`
5. ✓ Check "Auto Confirm User"
6. Click "Create user"
7. **Copy the User UID** (you'll need this next)

### 3.2 Create Influencer User
1. Click "Add user" → "Create new user"
2. Email: `influencer@cehpoint.com`
3. Password: `Influencer@2025`
4. ✓ Check "Auto Confirm User"
5. Click "Create user"
6. **Copy the User UID**

## Step 4: Seed Demo Data

### 4.1 Update Seed Script
1. Open `scripts/seed-enhanced-data.sql`
2. Replace `'ADMIN-UUID-HERE'` with your admin's actual UID (appears 9 times)
3. Replace `'INFLUENCER-UUID-HERE'` with your influencer's actual UID (appears 2 times)
4. Replace `'PLACEHOLDER-URL'` with the guidebook PDF URL from Storage (appears 1 time)

### 4.2 Run Seed Script
1. In Supabase SQL Editor, create a new query
2. Copy the **modified** content from `scripts/seed-enhanced-data.sql`
3. Click "Run"
4. You should see success messages

### 4.3 Assign Tasks to Test Influencer
Run this SQL to assign 2 tasks to your test influencer:

```sql
-- Replace with your actual UUIDs
SELECT assign_monthly_tasks_to_influencer(
  'YOUR-INFLUENCER-ID-FROM-INFLUENCERS-TABLE'::UUID,
  'November',
  2025,
  'YOUR-ADMIN-UUID'::UUID
);
```

To get the influencer ID, run:
```sql
SELECT id FROM influencers WHERE email = 'influencer@cehpoint.com';
```

## Step 5: Verify Setup

### 5.1 Check Tables
Run these queries to verify data:

```sql
-- Check users
SELECT * FROM users;

-- Check influencers
SELECT * FROM influencers;

-- Check marketing projects
SELECT * FROM marketing_projects;

-- Check monthly tasks
SELECT * FROM monthly_tasks;

-- Check task assignments
SELECT * FROM task_assignments;

-- Check guidebook resources
SELECT * FROM guidebook_resources;
```

### 5.2 Test Login
1. Go to your Replit preview URL + `/login`
2. Test admin login:
   - Email: `admin@cehpoint.com`
   - Password: `Cehpoint@2025`
3. Test influencer login:
   - Email: `influencer@cehpoint.com`
   - Password: `Influencer@2025`

## Login Credentials

### Admin Account
- **Email**: `admin@cehpoint.com`
- **Password**: `Cehpoint@2025`
- **Role**: Admin
- **Access**: Full platform management, task assignment, revenue tracking

### Influencer Account
- **Email**: `influencer@cehpoint.com`
- **Password**: `Influencer@2025`
- **Role**: Influencer
- **Access**: Task board, video submissions, guidebook, earnings

## Features Available After Setup

### For Admins:
✅ View comprehensive dashboard with analytics
✅ Manage marketing projects and campaigns
✅ Create and assign monthly tasks to influencers
✅ Review and approve video submissions
✅ Track revenue sharing and process payments
✅ Manage advertising guidelines
✅ View district coverage and performance metrics
✅ Upload and manage guidebook resources

### For Influencers:
✅ View assigned tasks (2 per month)
✅ Access Cehpoint Innovation Movement Playbook
✅ Submit promotional videos linked to tasks
✅ Track task completion status
✅ View earnings breakdown (fixed + revenue share)
✅ Access promotion guidelines and sample scripts
✅ View payment history
✅ Track performance metrics

## Revenue Sharing Policy

### Follower Band Payouts:
- **0-5k followers**: ₹2,000 per approved video
- **5k-25k followers**: ₹4,000 per approved video
- **25k-100k followers**: ₹7,000 per approved video
- **100k+ followers**: ₹10,000 per approved video

### Performance Bonus:
- 5% of revenue generated from leads/region
- Tracked monthly
- Added to base payout

### Example Calculation:
Influencer with 30k followers:
- 2 approved videos = ₹14,000 fixed payout
- Generated ₹50,000 in leads = ₹2,500 performance share
- **Total monthly earning**: ₹16,500

## Troubleshooting

### "supabaseUrl is required" error
- Verify environment variables are set in Replit
- Restart the dev server

### "Row Level Security" errors
- Ensure RLS policies were created in the migration scripts
- Check that user roles are set correctly

### Can't see tasks
- Verify task assignments were created
- Check that tasks are for current month/year
- Ensure influencer is approved

### Guidebook not showing
- Verify file was uploaded to Supabase Storage
- Check that file URL was updated in seed script
- Ensure storage bucket is public or has proper RLS

## Next Steps

1. ✅ Complete this setup guide
2. Test all features thoroughly
3. Customize branding and styling
4. Add more marketing projects and tasks
5. Invite real influencers
6. Deploy to production when ready

## Support

If you encounter issues:
1. Check browser console for errors
2. Check Supabase logs in Dashboard
3. Verify all SQL scripts ran successfully
4. Ensure environment variables are correct
