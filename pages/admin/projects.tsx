import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { supabase } from '@/lib/supabase';
import { MarketingProject } from '@/types';
import { Plus, Edit2, Trash2, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

const AdminProjectsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<MarketingProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    objectives: [] as string[],
    target_audience: '',
    deliverables: [] as string[],
    guidelines: '',
    sample_script: '',
    is_active: true,
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/influencer/dashboard');
      return;
    }
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('marketing_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('marketing_projects')
        .insert([{ ...formData, created_by: user?.id }]);

      if (error) throw error;

      setShowCreateModal(false);
      setFormData({
        title: '',
        description: '',
        objectives: [],
        target_audience: '',
        deliverables: [],
        guidelines: '',
        sample_script: '',
        is_active: true,
      });
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading projects...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketing Projects</h1>
            <p className="text-gray-600 mt-1">Manage IT service promotion campaigns</p>
          </div>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="grid gap-6">
          {projects.length === 0 ? (
            <Card className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-4">Create your first marketing campaign to get started</p>
              <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                Create Project
              </Button>
            </Card>
          ) : (
            projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <p className="text-gray-600 mt-1">{project.description}</p>
                  </div>
                  <Badge variant={project.is_active ? 'success' : 'warning'}>
                    {project.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Objectives</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {project.objectives.map((obj, idx) => (
                        <li key={idx}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Target Audience</h4>
                    <p className="text-sm text-gray-600">{project.target_audience}</p>
                  </div>
                </div>

                {project.guidelines && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Guidelines</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {project.guidelines}
                    </p>
                  </div>
                )}

                {project.sample_script && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Sample Script</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap italic">
                      {project.sample_script}
                    </p>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Marketing Project"
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <Input
            label="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="e.g., EdTech Innovation Campaign"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Brief project overview"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Objectives (comma-separated)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              value={formData.objectives.join(', ')}
              onChange={(e) => setFormData({ ...formData, objectives: e.target.value.split(',').map(s => s.trim()) })}
              required
              placeholder="Increase awareness, Generate leads, Build credibility"
            />
          </div>

          <Input
            label="Target Audience"
            value={formData.target_audience}
            onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
            required
            placeholder="e.g., Students, Parents, Rural Entrepreneurs"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guidelines
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={4}
              value={formData.guidelines}
              onChange={(e) => setFormData({ ...formData, guidelines: e.target.value })}
              placeholder="Guidelines for influencers creating content"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sample Script
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={4}
              value={formData.sample_script}
              onChange={(e) => setFormData({ ...formData, sample_script: e.target.value })}
              placeholder="Example script for influencers to follow"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Project
            </Button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default AdminProjectsPage;
