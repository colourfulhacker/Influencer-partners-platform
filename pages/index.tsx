import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Sparkles, Rocket, Users, Video, TrendingUp, Award, CheckCircle, Globe, Lightbulb, Target } from 'lucide-react';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Cehpoint Influence Partners - Empowering Digital India</title>
        <meta
          name="description"
          content="Join Cehpoint Influence Partners. Empower local entrepreneurs through technology and earn while promoting digital transformation across India."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Cehpoint Influence Partners
              </h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register/influencer">
                <Button variant="primary">Join Movement</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 sm:py-32">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium mb-6">
                <Rocket className="h-4 w-4 mr-2" />
                Building a Self-Reliant Digital India
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Empower India's Future
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Through Innovation
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
                Become an Innovation Ambassador. Promote technology, inspire entrepreneurs, and help democratize digital business across every district of India.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link href="/register/influencer">
                  <Button variant="primary" size="lg" className="text-lg px-10 py-4">
                    Join as Ambassador
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary" size="lg" className="text-lg px-10 py-4">
                    Sign In
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">2 Tasks</div>
                  <div className="text-gray-600">Per Month</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600">₹2K-₹10K</div>
                  <div className="text-gray-600">Per Video</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">+5%</div>
                  <div className="text-gray-600">Revenue Share</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Join the Innovation Movement?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Be the bridge between technology and people who need it most. Transform lives while building your influence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-shadow">
                <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Lightbulb className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Inspire Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Educate your audience about EdTech, AgriTech, HealthTech, and digital entrepreneurship opportunities that can transform their lives.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-xl transition-shadow">
                <div className="bg-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Monthly Tasks</h3>
                <p className="text-gray-600 leading-relaxed">
                  Receive 2 curated marketing tasks each month with clear guidelines, sample scripts, and full support to create impactful content.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl border border-indigo-100 hover:shadow-xl transition-shadow">
                <div className="bg-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Generous Earnings</h3>
                <p className="text-gray-600 leading-relaxed">
                  Earn ₹2K-₹10K per approved video based on followers, plus 5% revenue share from leads you generate. Real impact, real rewards.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100 hover:shadow-xl transition-shadow">
                <div className="bg-green-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Local Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Promote innovation in your own language and region. Help local entrepreneurs discover technology solutions that solve real problems.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100 hover:shadow-xl transition-shadow">
                <div className="bg-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Video className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Complete Guidance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access the Innovation Playbook, sample scripts, marketing guidelines, and ongoing support to create professional content with ease.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl border border-pink-100 hover:shadow-xl transition-shadow">
                <div className="bg-pink-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Nation Building</h3>
                <p className="text-gray-600 leading-relaxed">
                  Be part of a movement that reduces unemployment, creates taxpayers, and builds self-sustaining digital ecosystems across India.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                How the Platform Works
              </h2>
              <p className="text-xl text-gray-600">
                Simple, transparent, and designed for your success
              </p>
            </div>
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg relative">
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  1
                </div>
                <h4 className="text-lg font-bold mb-3 mt-4">Register & Verify</h4>
                <p className="text-gray-600">
                  Sign up with your details, social media handles, and ID proof. Get approved by our team within 24-48 hours.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg relative">
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-purple-600 to-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  2
                </div>
                <h4 className="text-lg font-bold mb-3 mt-4">Receive Tasks</h4>
                <p className="text-gray-600">
                  Get 2 monthly tasks focused on IT services, innovation, and entrepreneurship with complete guidelines and resources.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg relative">
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-indigo-600 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  3
                </div>
                <h4 className="text-lg font-bold mb-3 mt-4">Create & Submit</h4>
                <p className="text-gray-600">
                  Use our playbook and scripts to create engaging videos. Submit for approval before posting to ensure quality.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg relative">
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-green-600 to-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  4
                </div>
                <h4 className="text-lg font-bold mb-3 mt-4">Earn Rewards</h4>
                <p className="text-gray-600">
                  Get paid via UPI for approved videos plus monthly performance bonuses based on the leads you generate.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Build Digital India?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of influencers who are inspiring innovation, creating opportunities, and earning competitive rewards.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/register/influencer">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl text-lg px-10"
                  >
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white/10 text-lg px-10"
                  >
                    Already a Member?
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-blue-400" />
                <h3 className="text-white font-bold text-lg">Cehpoint Innovation</h3>
              </div>
              <p className="text-gray-400">
                Empowering local entrepreneurs through technology and building a self-reliant Digital India.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/register/influencer" className="hover:text-blue-400 transition-colors">Join as Influencer</Link></li>
                <li><Link href="/login" className="hover:text-blue-400 transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Mission</h4>
              <p className="text-gray-400">
                Democratizing technology to help every Indian, from any town or village, build global-impact digital businesses.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; 2025 Cehpoint Innovation Movement. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
