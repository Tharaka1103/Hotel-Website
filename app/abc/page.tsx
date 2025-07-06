'use client';

import { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiShare2, 
  FiSettings,
  FiEdit3,
  FiTrash2,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiCopy,
  FiCheck,
  FiX,
  FiFolder,
  FiLock,
  FiGlobe,
  FiEye,
  FiEdit
} from 'react-icons/fi';

interface Workspace {
  _id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  shareToken: string;
  permissions: 'view' | 'edit' | 'full';
  createdAt: string;
  owner: {
    name: string;
    email: string;
  };
  _count?: {
    resources: number;
  };
  settings?: {
    allowComments: boolean;
    allowDownload: boolean;
    requirePassword: boolean;
    password: string;
  };
}

const workspaceColors = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b',
  '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6'
];

const workspaceIcons = [
  '🗂️', '📁', '💼', '🎯', '🚀', '💡', '🔧', '📊', '🏆', '🎨'
];

export default function Workspace() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [filteredWorkspaces, setFilteredWorkspaces] = useState<Workspace[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#6366f1',
    icon: '🗂️',
    permissions: 'view' as 'view' | 'edit' | 'full',
    settings: {
      allowComments: true,
      allowDownload: true,
      requirePassword: false,
      password: '',
    }
  });

  // Mock user ID - replace with actual authentication
  const userId = '507f1f77bcf86cd799439011';

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    filterWorkspaces();
  }, [workspaces, searchTerm, sortBy]);

  // Update form data when editingWorkspace changes
  useEffect(() => {
    if (editingWorkspace) {
      setFormData({
        name: editingWorkspace.name || '',
        description: editingWorkspace.description || '',
        color: editingWorkspace.color || '#6366f1',
        icon: editingWorkspace.icon || '🗂️',
        permissions: editingWorkspace.permissions || 'view',
        settings: {
          allowComments: editingWorkspace.settings?.allowComments ?? true,
          allowDownload: editingWorkspace.settings?.allowDownload ?? true,
          requirePassword: editingWorkspace.settings?.requirePassword ?? false,
          password: editingWorkspace.settings?.password || '',
        }
      });
    }
  }, [editingWorkspace]);

  const fetchWorkspaces = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/workspaces?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setWorkspaces(data);
      } else {
        setError('Failed to fetch workspaces');
      }
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      setError('Failed to fetch workspaces');
    } finally {
      setLoading(false);
    }
  };

  const filterWorkspaces = () => {
    let filtered = [...workspaces];

    if (searchTerm) {
      filtered = filtered.filter(workspace =>
        workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workspace.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'resources':
          return (b._count?.resources || 0) - (a._count?.resources || 0);
        default:
          return 0;
      }
    });

    setFilteredWorkspaces(filtered);
  };

  const handleCreateWorkspace = async (workspaceData: any) => {
    try {
      setError(null);
      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...workspaceData,
          owner: userId,
        }),
      });

      if (response.ok) {
        const newWorkspace = await response.json();
        setWorkspaces([newWorkspace, ...workspaces]);
        setIsCreateModalOpen(false);
        setEditingWorkspace(null);
      } else {
        setError('Failed to create workspace');
      }
    } catch (error) {
      console.error('Error creating workspace:', error);
      setError('Failed to create workspace');
    }
  };

  const handleEditWorkspace = async (workspaceData: any) => {
    if (!editingWorkspace) return;

    try {
      setError(null);
      const response = await fetch(`/api/workspaces/${editingWorkspace._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workspaceData),
      });

      if (response.ok) {
        const updatedWorkspace = await response.json();
        setWorkspaces(workspaces.map(w => 
          w._id === updatedWorkspace._id ? updatedWorkspace : w
        ));
        setEditingWorkspace(null);
        setIsCreateModalOpen(false);
      } else {
        setError('Failed to update workspace');
      }
    } catch (error) {
      console.error('Error updating workspace:', error);
      setError('Failed to update workspace');
    }
  };

  const handleDeleteWorkspace = async (workspaceId: string) => {
    if (!confirm('Are you sure you want to delete this workspace?')) return;

    try {
      setError(null);
      const response = await fetch(`/api/workspaces/${workspaceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setWorkspaces(workspaces.filter(w => w._id !== workspaceId));
      } else {
        setError('Failed to delete workspace');
      }
    } catch (error) {
      console.error('Error deleting workspace:', error);
      setError('Failed to delete workspace');
    }
  };

  const handleShareWorkspace = (workspace: Workspace) => {
    try {
      const shareUrl = `${window.location.origin}/workspace/share/${workspace.shareToken}`;
      navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Failed to copy share link');
    }
  };

  const handleOpenModal = () => {
    setIsCreateModalOpen(true);
    setEditingWorkspace(null);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setEditingWorkspace(null);
    // Reset form when closing
    if (!editingWorkspace) {
      setFormData({
        name: '',
        description: '',
        color: '#6366f1',
        icon: '🗂️',
        permissions: 'view',
        settings: {
          allowComments: true,
          allowDownload: true,
          requirePassword: false,
          password: '',
        }
      });
    }
  };

  const handleEditClick = (workspace: Workspace) => {
    setEditingWorkspace(workspace);
    setIsCreateModalOpen(true);
  };

  const copyShareLink = async (workspace: Workspace) => {
    const shareUrl = `${window.location.origin}/workspace/share/${workspace.shareToken}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWorkspace) {
      handleEditWorkspace(formData);
    } else {
      handleCreateWorkspace(formData);
    }
    handleCloseModal();
    if (!editingWorkspace) {
      setFormData({
        name: '',
        description: '',
        color: '#6366f1',
        icon: '🗂️',
        permissions: 'view',
        settings: {
          allowComments: true,
          allowDownload: true,
          requirePassword: false,
          password: '',
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workspaces...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-500 hover:text-red-700"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Workspaces</h1>
              <p className="text-gray-600 mt-1">Manage your resources and collaborate with others</p>
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FiPlus size={18} />
              <span>Create Workspace</span>
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search workspaces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="created">Sort by Created</option>
                <option value="resources">Sort by Resources</option>
              </select>

              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FiGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FiList size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Workspaces Grid/List */}
        {filteredWorkspaces.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FiSettings size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workspaces found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first workspace'}
            </p>
            {!searchTerm && (
              <button
                onClick={handleOpenModal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
              >
                <FiPlus size={18} />
                <span>Create Your First Workspace</span>
              </button>
            )}
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
          }`}>
            {filteredWorkspaces.map((workspace) => (
              // WorkspaceCard inline element
              <div key={workspace._id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-semibold"
                        style={{ backgroundColor: workspace.color }}
                      >
                        {workspace.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{workspace.name}</h3>
                        <p className="text-gray-500 text-sm">{workspace.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditClick(workspace)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleShareWorkspace(workspace)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <FiShare2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteWorkspace(workspace._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FiFileText size={14} />
                        <span>{workspace._count?.resources || 0} resources</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiCalendar size={14} />
                        <span>{formatDate(workspace.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiUsers size={14} />
                      <span className="capitalize">{workspace.permissions}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => copyShareLink(workspace)}
                      className="flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                    >
                      {copied ? <FiCheck size={14} className="text-green-500" /> : <FiCopy size={14} />}
                      <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                    <a
                      href={`/workspace/${workspace._id}`}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      Open Workspace
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {workspaces.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Workspaces</h3>
              <p className="text-3xl font-bold text-blue-600">{workspaces.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Resources</h3>
              <p className="text-3xl font-bold text-green-600">
                {workspaces.reduce((sum, w) => sum + (w._count?.resources || 0), 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shared Workspaces</h3>
              <p className="text-3xl font-bold text-purple-600">
                {workspaces.filter(w => w.permissions !== 'view').length}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Workspace Modal - inline element */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingWorkspace ? 'Edit Workspace' : 'Create New Workspace'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workspace Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter workspace name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Permission Level
                  </label>
                  <select
                    value={formData.permissions}
                    onChange={(e) => setFormData({ ...formData, permissions: e.target.value as 'view' | 'edit' | 'full' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="view">View Only</option>
                    <option value="edit">View & Edit</option>
                    <option value="full">Full Control</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe your workspace..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Theme
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {workspaceColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          formData.color === color ? 'border-gray-400 scale-110' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {workspaceIcons.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon })}
                        className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-lg transition-all ${
                          formData.icon === icon ? 'border-blue-500 bg-blue-50 scale-110' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Workspace Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Allow Comments</label>
                      <p className="text-sm text-gray-500">Let viewers add comments to resources</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.settings.allowComments}
                      onChange={(e) => setFormData({
                        ...formData,
                        settings: { ...formData.settings, allowComments: e.target.checked }
                      })}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Allow Downloads</label>
                      <p className="text-sm text-gray-500">Let viewers download shared files</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.settings.allowDownload}
                      onChange={(e) => setFormData({
                        ...formData,
                        settings: { ...formData.settings, allowDownload: e.target.checked }
                      })}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Require Password</label>
                      <p className="text-sm text-gray-500">Protect workspace with password</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.settings.requirePassword}
                      onChange={(e) => setFormData({
                        ...formData,
                        settings: { ...formData.settings, requirePassword: e.target.checked }
                      })}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  {formData.settings.requirePassword && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={formData.settings.password}
                        onChange={(e) => setFormData({
                          ...formData,
                          settings: { ...formData.settings, password: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter password"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingWorkspace ? 'Update Workspace' : 'Create Workspace'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


