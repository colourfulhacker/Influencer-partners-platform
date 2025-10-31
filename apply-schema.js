const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function applySchema() {
  const connectionString = process.env.supabase_transaction_pooler;
  if (!connectionString) {
    console.error('Error: supabase_transaction_pooler not found in .env.local');
    process.exit(1);
  }

  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    console.log('Connected to the database.');

    // Individual DROP statements for better error handling
    const individualDropStatements = [
      'DROP TRIGGER IF EXISTS update_users_updated_at ON users;',
      'DROP TRIGGER IF EXISTS update_influencers_updated_at ON influencers;',
      'DROP TRIGGER IF EXISTS update_video_submissions_updated_at ON video_submissions;',
      'DROP TRIGGER IF EXISTS update_post_proofs_updated_at ON post_proofs;',
      'DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;',
      'DROP TRIGGER IF EXISTS update_promotion_guidelines_updated_at ON promotion_guidelines;',
      'DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;',
      'DROP TABLE IF EXISTS promotion_guidelines CASCADE;',
      'DROP TABLE IF EXISTS payments CASCADE;',
      'DROP TABLE IF EXISTS post_proofs CASCADE;',
      'DROP TABLE IF EXISTS video_submissions CASCADE;',
      'DROP TABLE IF EXISTS influencers CASCADE;',
      'DROP TABLE IF EXISTS users CASCADE;'
    ];

    console.log('Dropping existing tables and triggers individually...');
    for (const statement of individualDropStatements) {
      try {
        await client.query(statement);
      } catch (dropErr) {
        console.warn(`Warning: Could not execute drop statement: ${statement}. Error: ${dropErr.message}`);
      }
    }
    console.log('Attempted to drop existing tables and triggers.');

    // Read the schema SQL
    const schemaSql = fs.readFileSync('./database-schema.sql', 'utf8');
    console.log('Executing database schema...');
    await client.query(schemaSql);
    console.log('Database schema applied successfully.');

    // After applying the schema, insert the admin user
    const insertAdminSql = `
      INSERT INTO public.users (id, email, role)
      VALUES ('77af4d7b-a151-43d1-98fe-c6f2d600a6d4', 'admin@cehpoint.com', 'admin')
      ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, role = EXCLUDED.role;
    `;
    console.log('Inserting/updating admin user...');
    await client.query(insertAdminSql);
    console.log('Admin user inserted/updated successfully.');

  } catch (err) {
    console.error('Error applying schema or inserting admin user:', err);
    process.exit(1);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

applySchema();