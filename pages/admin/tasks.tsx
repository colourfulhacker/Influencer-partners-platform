import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { supabase } from '@/lib/supabase';
import { MonthlyTask, TaskAssignment } from '@/types';
import { Plus, CheckCircle, Clock, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

const AdminTasksPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<MonthlyTask[]>([]);
  const [assignments, setAssignments] = useState<TaskAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic: 'edtech',
    deliverables_required: [] as string[],
    guidelines: '',
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear(),
    is_default: false,
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/influencer/dashboard');
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [tasksResult, assignmentsResult] = await Promise.all([
        supabase.from('monthly_tasks').select('*').order('created_at', { ascending: false }),
        supabase.from('task_assignments').select('*, monthly_tasks(*), influencers(*)').order('created_at', { ascending: false }),
      ]);

      if (tasksResult.error) throw tasksResult.error;
      if (assignmentsResult.error) throw assignmentsResult.error;

      setTasks(tasksResult.data || []);
      setAssignments(assignmentsResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('monthly_tasks')
        .insert([{ ...formData, created_by: user?.id }]);

      if (error) throw error;

      setShowCreateModal(false);
      setFormData({
        title: '',
        description: '',
        topic: 'edtech',
        deliverables_required: [],
        guidelines: '',
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear(),
        is_default: false,
      });
      fetchData();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  const getTaskStats = (task: MonthlyTask) => {
    const taskAssignments = assignments.filter((a) => a.task_id === task.id);
    const completed = taskAssignments.filter((a) => a.status === 'completed').length;
    const total = taskAssignments.length;
    return { completed, total };
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading tasks...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Monthly Tasks</h1>
            <p className="text-gray-600 mt-1">Create and manage influencer promotional tasks</p>
          </div>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignments.filter((a) => a.status === 'completed').length}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6">
          {tasks.length === 0 ? (
            <Card className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-gray-600 mb-4">Create your first monthly task to get started</p>
              <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                Create Task
              </Button>
            </Card>
          ) : (
            tasks.map((task) => {
              const stats = getTaskStats(task);
              return (
                <Card key={task.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
                      <p className="text-gray-600 mt-1">{task.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="info">{task.topic}</Badge>
                        <Badge variant="default">
                          {task.month} {task.year}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Completion</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {stats.completed}/{stats.total}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Deliverables</h4>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {task.deliverables_required.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Guidelines</h4>
                      <p className="text-sm text-gray-600">{task.guidelines}</p>
                    </div>
                  </div>

                </Card>
              );
            })
          )}
        </div>
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Monthly Task"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            label="Task Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="e.g., Promote EdTech Startups in Your Region"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="What should influencers do?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              required
            >
              <option value="edtech">EdTech</option>
              <option value="agritech">AgriTech</option>
              <option value="healthtech">HealthTech</option>
              <option value="tourism">Tourism</option>
              <option value="finance">Finance</option>
              <option value="retail">Retail</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deliverables (comma-separated)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={2}
              value={formData.deliverables_required.join(', ')}
              onChange={(e) => setFormData({ ...formData, deliverables_required: e.target.value.split(',').map(s => s.trim()) })}
              required
              placeholder="1 video post (60-90 seconds), 2 story posts"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guidelines</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              value={formData.guidelines}
              onChange={(e) => setFormData({ ...formData, guidelines: e.target.value })}
              placeholder="Content guidelines and requirements"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Month"
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              required
            />
            <Input
              type="number"
              label="Year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Task
            </Button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default AdminTasksPage;
