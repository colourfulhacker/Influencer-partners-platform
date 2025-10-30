import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';
import { supabase } from '@/lib/supabase';
import { VideoSubmission, Influencer } from '@/types';
import { CheckCircle, XCircle } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import Head from 'next/head';

const AdminVideos: React.FC = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<
    (VideoSubmission & { influencer: Influencer })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<
    (VideoSubmission & { influencer: Influencer }) | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchVideos();
    }
  }, [user]);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('video_submissions')
        .select(
          `
          *,
          influencer:influencers(*)
        `
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (videoId: string) => {
    try {
      const { error } = await supabase
        .from('video_submissions')
        .update({
          approval_status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id,
        })
        .eq('id', videoId);

      if (error) throw error;
      alert('Video approved successfully!');
      fetchVideos();
      setModalOpen(false);
    } catch (error: any) {
      alert(error.message || 'Failed to approve video');
    }
  };

  const handleReject = async (videoId: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    try {
      const { error } = await supabase
        .from('video_submissions')
        .update({
          approval_status: 'rejected',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id,
          rejection_reason: rejectionReason,
        })
        .eq('id', videoId);

      if (error) throw error;
      alert('Video rejected');
      fetchVideos();
      setModalOpen(false);
      setRejectionReason('');
    } catch (error: any) {
      alert(error.message || 'Failed to reject video');
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
        <title>Videos - Admin - Cehpoint Marketing Partners</title>
      </Head>

      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Video Submissions</h1>
          <p className="mt-1 text-gray-600">Review and approve influencer videos</p>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Influencer</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>
                    <div className="font-medium">{video.title}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{video.influencer.full_name}</div>
                      <div className="text-sm text-gray-500">
                        {video.influencer.district}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDateTime(video.submitted_at)}</TableCell>
                  <TableCell>{getStatusBadge(video.approval_status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSelectedVideo(video);
                        setModalOpen(true);
                      }}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {selectedVideo && (
          <Modal
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setRejectionReason('');
            }}
            title="Review Video Submission"
            size="lg"
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Title</p>
                <p className="font-medium text-lg">{selectedVideo.title}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-gray-900">{selectedVideo.description}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Influencer</p>
                <p className="font-medium">
                  {selectedVideo.influencer.full_name} - {selectedVideo.influencer.district}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Video Link</p>
                {selectedVideo.video_url && (
                  <a
                    href={selectedVideo.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {selectedVideo.video_url}
                  </a>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-600">Status</p>
                {getStatusBadge(selectedVideo.approval_status)}
              </div>

              {selectedVideo.approval_status === 'rejected' && selectedVideo.rejection_reason && (
                <div className="bg-red-50 border border-red-200 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1">Rejection Reason</p>
                  <p className="text-red-800">{selectedVideo.rejection_reason}</p>
                </div>
              )}

              {selectedVideo.approval_status === 'pending' && (
                <>
                  <div>
                    <Input
                      id="rejectionReason"
                      label="Rejection Reason (if rejecting)"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Provide reason for rejection"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button
                      variant="danger"
                      onClick={() => handleReject(selectedVideo.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleApprove(selectedVideo.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default AdminVideos;
