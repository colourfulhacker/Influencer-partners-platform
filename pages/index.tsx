import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Users, Video, DollarSign, Award } from 'lucide-react';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <Head>
        <title>Cehpoint Marketing Partners - Influencer Platform</title>
        <meta
          name="description"
          content="Join our network of influencers and grow your income"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-primary-600">
              Cehpoint Marketing Partners
            </h1>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register/influencer">
                <Button variant="primary">Join as Influencer</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Become a Brand Ambassador
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our network of influencers across India. Promote our products in
            your district, create engaging content, and earn competitive rewards.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/register/influencer">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Join Our Network</h3>
            <p className="text-gray-600">
              Register as an influencer and become part of our growing community
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Video className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Create Content</h3>
            <p className="text-gray-600">
              Follow our guidelines and create engaging promotional videos
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Earn Rewards</h3>
            <p className="text-gray-600">
              Get paid for approved content plus revenue sharing opportunities
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Grow Together</h3>
            <p className="text-gray-600">
              Build your brand while helping us reach more customers
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">How It Works</h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Register & Get Approved</h4>
                <p className="text-gray-600">
                  Sign up with your details, upload ID proof, and add your UPI ID.
                  Our team will review and approve your application.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Submit Video for Approval</h4>
                <p className="text-gray-600">
                  Follow our guidelines and create promotional videos. Submit them
                  for review before posting publicly.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Post & Share Proof</h4>
                <p className="text-gray-600">
                  Once approved, post the video on your social media and upload the
                  link with screenshot as proof.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-1">Receive Payment</h4>
                <p className="text-gray-600">
                  Get paid directly via UPI after verification. Earn additional
                  revenue share by posting 2+ videos per month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Cehpoint Marketing Partners. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
