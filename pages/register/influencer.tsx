import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FileUpload } from '@/components/FileUpload';
import { indianStates } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const InfluencerRegister: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    district: '',
    state: '',
    instagram: '',
    youtube: '',
    facebook: '',
    followerCount: '',
    idProofType: '',
    idProofUrl: '',
    upiId: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: userError } = await supabase.from('users').insert({
          id: authData.user.id,
          email: formData.email,
          role: 'influencer',
        });

        if (userError) throw userError;

        const { error: influencerError } = await supabase
          .from('influencers')
          .insert({
            user_id: authData.user.id,
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            email: formData.email,
            district: formData.district,
            state: formData.state,
            social_media_handles: {
              instagram: formData.instagram,
              youtube: formData.youtube,
              facebook: formData.facebook,
            },
            follower_count: parseInt(formData.followerCount) || 0,
            id_proof_type: formData.idProofType,
            id_proof_url: formData.idProofUrl,
            upi_id: formData.upiId,
            approval_status: 'pending',
          });

        if (influencerError) throw influencerError;

        alert(
          'Registration successful! Your application is under review. You will receive an email once approved.'
        );
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12">
      <Head>
        <title>Influencer Registration - Cehpoint Marketing Partners</title>
      </Head>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">
            Cehpoint Marketing Partners
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900">
            Influencer Registration
          </h2>
          <p className="mt-2 text-gray-600">
            Join our network and start earning
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  helperText="Minimum 6 characters"
                />
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <Select
                  id="state"
                  name="state"
                  label="State"
                  value={formData.state}
                  onChange={handleChange}
                  options={indianStates.map((s) => ({ value: s, label: s }))}
                  required
                />
                <Input
                  id="district"
                  name="district"
                  label="District"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-4">Social Media Handles</h3>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  id="instagram"
                  name="instagram"
                  label="Instagram Handle"
                  value={formData.instagram}
                  onChange={handleChange}
                  helperText="e.g., @username"
                />
                <Input
                  id="youtube"
                  name="youtube"
                  label="YouTube Channel"
                  value={formData.youtube}
                  onChange={handleChange}
                  helperText="Channel URL or name"
                />
                <Input
                  id="facebook"
                  name="facebook"
                  label="Facebook Profile/Page"
                  value={formData.facebook}
                  onChange={handleChange}
                />
                <Input
                  id="followerCount"
                  name="followerCount"
                  label="Total Follower Count"
                  type="number"
                  value={formData.followerCount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold mb-4">Verification</h3>
              <div className="grid grid-cols-1 gap-4">
                <Select
                  id="idProofType"
                  name="idProofType"
                  label="ID Proof Type"
                  value={formData.idProofType}
                  onChange={handleChange}
                  options={[
                    { value: 'aadhaar', label: 'Aadhaar Card' },
                    { value: 'pan', label: 'PAN Card' },
                  ]}
                  required
                />
                <FileUpload
                  bucket="documents"
                  path="id-proofs"
                  accept="image/*,application/pdf"
                  maxSizeMB={5}
                  onUploadComplete={(url) =>
                    setFormData({ ...formData, idProofUrl: url })
                  }
                  label="Upload ID Proof"
                  helperText="Upload Aadhaar or PAN card (max 5MB)"
                />
              </div>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
              <Input
                id="upiId"
                name="upiId"
                label="UPI ID"
                value={formData.upiId}
                onChange={handleChange}
                required
                helperText="e.g., yourname@paytm"
              />
            </div>

            <div className="flex items-center justify-between pt-6">
              <Link href="/login" className="text-primary-600 hover:text-primary-500">
                Already have an account? Sign in
              </Link>
              <Button type="submit" variant="primary" isLoading={loading}>
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InfluencerRegister;
