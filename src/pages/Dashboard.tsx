import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authstore';
import { Button } from '../components/ui/button';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import { TaskStatus } from '../types/task';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const { data: tasks, isLoading, error } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    await createTask.mutateAsync({ title: newTaskTitle });
    setNewTaskTitle('');
  };

  const handleToggleStatus = async (taskId: string, currentStatus: TaskStatus) => {
    const nextStatus: TaskStatus =
      currentStatus === 'todo' ? 'in_progress' : currentStatus === 'in_progress' ? 'done' : 'todo';

    await updateTask.mutateAsync({
      id: taskId,
      input: { status: nextStatus },
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    if (confirm('Delete this task?')) {
      await deleteTask.mutateAsync(taskId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold">TM01 Task Manager</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">{user?.email}</span>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>

        {/* Create Task Form */}
        <form onSubmit={handleCreateTask} className="mb-8 flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" disabled={createTask.isPending}>
            {createTask.isPending ? 'Adding...' : 'Add Task'}
          </Button>
        </form>

        {/* Task List */}
        {isLoading && <p>Loading tasks...</p>}
        {error && <p className="text-red-600">Error loading tasks: {error.message}</p>}

        <div className="space-y-3">
          {tasks?.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleToggleStatus(task.id, task.status)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    task.status === 'done'
                      ? 'bg-green-500 border-green-500'
                      : task.status === 'in_progress'
                      ? 'bg-yellow-500 border-yellow-500'
                      : 'border-gray-300'
                  }`}
                >
                  {task.status === 'done' && <span className="text-white text-xs">✓</span>}
                </button>

                <div>
                  <h3
                    className={`font-medium ${
                      task.status === 'done' ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.title}
                  </h3>
                  <span className="text-xs text-gray-500 capitalize">
                    {task.status.replace('_', ' ')} • {task.priority} priority
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteTask(task.id)}
                disabled={deleteTask.isPending}
              >
                Delete
              </Button>
            </div>
          ))}

          {tasks?.length === 0 && (
            <p className="text-center text-gray-500 py-8">No tasks yet. Create one above!</p>
          )}
        </div>
      </main>
    </div>
  );
}
