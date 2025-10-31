#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv/config');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Supabase credentials not found in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const adminEmail = 'cehpoint.admin@gmail.com';
const adminPassword = 'Admin123456';
const influencerEmail = 'cehpoint.demo@gmail.com';
const influencerPassword = 'Demo123456';

async function createAccounts() {
  console.log('🚀 Creating login accounts for Cehpoint Influence Partners...\n');

  try {
    // Create Admin Account
    console.log('📝 Creating admin account...');
    const { data: adminAuthData, error: adminAuthError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          role: 'admin',
        },
      },
    });

    if (adminAuthError) {
      if (adminAuthError.message.includes('already registered')) {
        console.log('ℹ️  Admin account already exists');
      } else {
        throw adminAuthError;
      }
    } else {
      console.log('✅ Admin account created successfully');
      
      // Insert admin user metadata
      if (adminAuthData.user) {
        await supabase.from('users').upsert({
          id: adminAuthData.user.id,
          email: adminEmail,
          role: 'admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    }

    // Create Influencer Account
    console.log('\n📝 Creating influencer account...');
    const { data: influencerAuthData, error: influencerAuthError } = await supabase.auth.signUp({
      email: influencerEmail,
      password: influencerPassword,
      options: {
        data: {
          role: 'influencer',
        },
      },
    });

    if (influencerAuthError) {
      if (influencerAuthError.message.includes('already registered')) {
        console.log('ℹ️  Influencer account already exists');
      } else {
        throw influencerAuthError;
      }
    } else {
      console.log('✅ Influencer account created successfully');
      
      // Insert influencer user metadata and profile
      if (influencerAuthData.user) {
        await supabase.from('users').upsert({
          id: influencerAuthData.user.id,
          email: influencerEmail,
          role: 'influencer',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        // Create influencer profile
        await supabase.from('influencers').upsert({
          user_id: influencerAuthData.user.id,
          full_name: 'Demo Influencer',
          phone_number: '+91-9876543210',
          email: influencerEmail,
          district: 'Bangalore Urban',
          state: 'Karnataka',
          social_media_handles: {
            instagram: 'demo_influencer',
            youtube: 'DemoChannel',
          },
          follower_count: 35000,
          id_proof_url: 'https://example.com/demo-id.pdf',
          id_proof_type: 'aadhaar',
          upi_id: 'demo@upi',
          approval_status: 'approved',
          approved_at: new Date().toISOString(),
          approved_by: adminAuthData?.user?.id || null,
        });
      }
    }

    // Display Login Credentials
    console.log('\n' + '='.repeat(60));
    console.log('🎉 SUCCESS! Your accounts are ready to use!');
    console.log('='.repeat(60));
    console.log('\n📋 LOGIN CREDENTIALS:\n');
    
    console.log('👨‍💼 ADMIN ACCOUNT:');
    console.log('   Email:    ' + adminEmail);
    console.log('   Password: ' + adminPassword);
    console.log('   Access:   Full platform management, create tasks, approve videos\n');
    
    console.log('🎯 INFLUENCER ACCOUNT:');
    console.log('   Email:    ' + influencerEmail);
    console.log('   Password: ' + influencerPassword);
    console.log('   Access:   View tasks, submit videos, track revenue\n');
    
    console.log('='.repeat(60));
    console.log('\n🌐 Login at: https://' + process.env.REPL_SLUG + '.' + process.env.REPL_OWNER + '.repl.co/login');
    console.log('\n✨ Platform: Cehpoint Influence Partners');
    console.log('💰 Revenue Model: ₹2K-₹10K per video + 5% performance share\n');

  } catch (error) {
    console.error('\n❌ Error creating accounts:', error.message);
    process.exit(1);
  }
}

createAccounts();
