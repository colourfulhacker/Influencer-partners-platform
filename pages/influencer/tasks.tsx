import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { supabase } from '@/lib/supabase';
import { TaskAssignment, MonthlyTask } from '@/types';
import { CheckCircle, Clock, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const InfluencerTasksPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [assignments, setAssignments] = useState<TaskAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === undefined) return; // Wait for auth to load
    if (user === null) {
      router.push('/login');
      return;
    }
    if (user.role === 'admin') {
      router.push('/admin/dashboard');
      return;
    }
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data: influencerData } = await supabase
        .from('influencers')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (!influencerData) return;

      const { data, error } = await supabase
        .from('task_assignments')
        .select('*, monthly_tasks(*)')
        .eq('influencer_id', influencerData.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssignments(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'submitted':
        return 'info';
      case 'in_progress':
        return 'warning';
      default:
        return 'default';
    }
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

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  const currentMonthTasks = assignments.filter(
    (a) => a.assigned_month === currentMonth && a.assigned_year === currentYear
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600 mt-1">
            Complete your monthly tasks to earn rewards and build your influence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{currentMonthTasks.length}</p>
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
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignments.filter((a) => a.status === 'in_progress').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Current Month Tasks</h2>
          {currentMonthTasks.length === 0 ? (
            <Card className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks assigned yet</h3>
              <p className="text-gray-600">Check back soon for your monthly tasks</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {currentMonthTasks.map((assignment) => {
                const task = assignment.task as MonthlyTask;
                return (
                  <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{task?.title}</h3>
                        <p className="text-gray-600 mt-1">{task?.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="info">{task?.topic}</Badge>
                          <Badge variant={getStatusColor(assignment.status)}>
                            {assignment.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {task?.deliverables_required && task.deliverables_required.length > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-2">Deliverables</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {task.deliverables_required.map((d, idx) => (
                            <li key={idx}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {task?.guidelines && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-2">Guidelines</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{task.guidelines}</p>
                      </div>
                    )}

                    <div className="mt-4 flex gap-3">
                      {assignment.status === 'assigned' && (
                        <Link href="/influencer/videos">
                          <Button variant="primary">Submit Video</Button>
                        </Link>
                      )}
                      {assignment.status === 'submitted' && (
                        <Badge variant="info">Awaiting Approval</Badge>
                      )}
                      {assignment.status === 'completed' && (
                        <Badge variant="success">✓ Completed</Badge>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {assignments.length > currentMonthTasks.length && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Previous Tasks</h2>
            <div className="grid gap-4">
              {assignments
                .filter(
                  (a) => a.assigned_month !== currentMonth || a.assigned_year !== currentYear
                )
                .map((assignment) => {
                  const task = assignment.task as MonthlyTask;
                  return (
                    <Card key={assignment.id} className="opacity-75">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{task?.title}</h3>
                          <p className="text-sm text-gray-600">
                            {assignment.assigned_month} {assignment.assigned_year}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(assignment.status)}>
                          {assignment.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InfluencerTasksPage;
