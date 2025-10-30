import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { Influencer } from '@/types';
import { CheckCircle, XCircle } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import Head from 'next/head';

const AdminInfluencers: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchInfluencers();
    }
  }, [user]);

  const fetchInfluencers = async () => {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInfluencers(data || []);
    } catch (error) {
      console.error('Error fetching influencers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (influencerId: string) => {
    try {
      const { error } = await supabase
        .from('influencers')
        .update({
          approval_status: 'approved',
          approved_at: new Date().toISOString(),
          approved_by: user?.id,
        })
        .eq('id', influencerId);

      if (error) throw error;
      alert('Influencer approved successfully!');
      fetchInfluencers();
      setModalOpen(false);
    } catch (error: any) {
      alert(error.message || 'Failed to approve influencer');
    }
  };

  const handleReject = async (influencerId: string) => {
    try {
      const { error } = await supabase
        .from('influencers')
        .update({
          approval_status: 'rejected',
        })
        .eq('id', influencerId);

      if (error) throw error;
      alert('Influencer rejected');
      fetchInfluencers();
      setModalOpen(false);
    } catch (error: any) {
      alert(error.message || 'Failed to reject influencer');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="warning">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Influencers - Admin - Cehpoint Marketing Partners</title>
      </Head>

      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Influencers</h1>
          <p className="mt-1 text-gray-600">Manage influencer applications and approvals</p>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {influencers.map((influencer) => (
                <TableRow key={influencer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{influencer.full_name}</div>
                      <div className="text-sm text-gray-500">{influencer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {influencer.district}, {influencer.state}
                  </TableCell>
                  <TableCell>{influencer.follower_count.toLocaleString()}</TableCell>
                  <TableCell>{formatDateTime(influencer.created_at)}</TableCell>
                  <TableCell>{getStatusBadge(influencer.approval_status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSelectedInfluencer(influencer);
                        setModalOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {selectedInfluencer && (
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Influencer Details"
            size="lg"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium">{selectedInfluencer.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-medium">{selectedInfluencer.phone_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{selectedInfluencer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">District</p>
                  <p className="font-medium">
                    {selectedInfluencer.district}, {selectedInfluencer.state}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Follower Count</p>
                  <p className="font-medium">
                    {selectedInfluencer.follower_count.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ID Proof Type</p>
                  <p className="font-medium uppercase">
                    {selectedInfluencer.id_proof_type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">UPI ID</p>
                  <p className="font-medium">{selectedInfluencer.upi_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  {getStatusBadge(selectedInfluencer.approval_status)}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Social Media Handles</p>
                <div className="bg-gray-50 p-3 rounded space-y-1">
                  {selectedInfluencer.social_media_handles?.instagram && (
                    <p>Instagram: {selectedInfluencer.social_media_handles.instagram}</p>
                  )}
                  {selectedInfluencer.social_media_handles?.youtube && (
                    <p>YouTube: {selectedInfluencer.social_media_handles.youtube}</p>
                  )}
                  {selectedInfluencer.social_media_handles?.facebook && (
                    <p>Facebook: {selectedInfluencer.social_media_handles.facebook}</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">ID Proof</p>
                {selectedInfluencer.id_proof_url && (
                  <a
                    href={selectedInfluencer.id_proof_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    View ID Proof
                  </a>
                )}
              </div>

              {selectedInfluencer.approval_status === 'pending' && (
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button
                    variant="danger"
                    onClick={() => handleReject(selectedInfluencer.id)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleApprove(selectedInfluencer.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default AdminInfluencers;
