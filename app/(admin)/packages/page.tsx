'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, X, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';
import { Skeleton } from '@/components/ui/skeleton';

interface Package {
  _id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  createdAt: string;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<Package | null>(null);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: [''],
    price: ''
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const data = await response.json();
      setPackages(data.packages || []);
    } catch (error) {
      toast.error('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const filteredFeatures = formData.features.filter(feature => feature.trim() !== '');
    if (filteredFeatures.length === 0) {
      toast.error('Please add at least one feature');
      return;
    }

    try {
      const url = editingPackage ? `/api/packages/${editingPackage._id}` : '/api/packages';
      const method = editingPackage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          features: filteredFeatures,
          price: Number(formData.price)
        }),
      });

      if (response.ok) {
        toast.success(editingPackage ? 'Package updated successfully' : 'Package created successfully');
        resetForm();
        fetchPackages();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save package');
      }
    } catch (error) {
      toast.error('Failed to save package');
    }
  };

  const handleDeleteClick = (pkg: Package) => {
    setPackageToDelete(pkg);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!packageToDelete) return;

    setDeleteLoading(true);
    try {
      const response = await fetch(`/api/packages/${packageToDelete._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Package deleted successfully');
        fetchPackages();
        setIsDeleteDialogOpen(false);
        setPackageToDelete(null);
      } else {
        toast.error('Failed to delete package');
      }
    } catch (error) {
      toast.error('Failed to delete package');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setPackageToDelete(null);
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      description: pkg.description,
      features: [...pkg.features, ''],
      price: pkg.price.toString()
    });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      features: [''],
      price: ''
    });
    setEditingPackage(null);
    setIsFormOpen(false);
  };

  const addFeatureField = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeatureField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-7 w-48 sm:h-8 sm:w-64" />
              <Skeleton className="h-4 w-64 sm:w-96" />
            </div>
            <Skeleton className="h-9 w-full sm:h-10 sm:w-32" />
          </div>

          {/* Stats Skeletons */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 sm:p-6 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16 sm:h-4 sm:w-20" />
                    <Skeleton className="h-6 w-8 sm:h-8 sm:w-12" />
                  </div>
                  <Skeleton className="h-8 w-8 sm:h-12 sm:w-12 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Package Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-32 sm:h-6 sm:w-48" />
                    <Skeleton className="h-6 w-16 sm:h-6 sm:w-20" />
                  </div>
                  <Skeleton className="h-16 w-full" />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, j) => (
                      <Skeleton key={j} className="h-3 w-full sm:h-4" />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 flex-1 sm:h-9" />
                    <Skeleton className="h-8 flex-1 sm:h-9" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Package Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Create and manage your surf packages</p>
          </div>
          <Button 
            onClick={() => setIsFormOpen(true)} 
            className="w-full sm:w-auto text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Package
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-blue-600">Total Packages</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-900">{packages.length}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-green-600">Average Price</p>
                <p className="text-xl sm:text-2xl font-bold text-green-900">
                  ${packages.length > 0 ? Math.round(packages.reduce((sum, pkg) => sum + pkg.price, 0) / packages.length) : 0}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm sm:text-lg font-bold text-green-600">$</span>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-purple-600">Highest Price</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-900">
                  ${packages.length > 0 ? Math.max(...packages.map(pkg => pkg.price)) : 0}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm sm:text-lg font-bold text-purple-600">↑</span>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-orange-600">Lowest Price</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-900">
                  ${packages.length > 0 ? Math.min(...packages.map(pkg => pkg.price)) : 0}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-sm sm:text-lg font-bold text-orange-600">↓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Dialog */}
        {isFormOpen && (
          <Card className="border-2 border-primary/20">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex justify-between items-center text-lg sm:text-xl">
                {editingPackage ? 'Edit Package' : 'Create New Package'}
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Package Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter package title"
                      className="text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price ($)</label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="Enter price"
                      className="text-sm sm:text-base"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter package description"
                    className="text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Features</label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Enter feature"
                        className="text-sm sm:text-base"
                      />
                      {formData.features.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeatureField(index)}
                          className="px-2 sm:px-3"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addFeatureField}
                    className="text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Feature
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1 text-sm sm:text-base py-2 sm:py-3"
                  >
                    {editingPackage ? 'Update Package' : 'Create Package'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    className="flex-1 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {packages.map((pkg) => (
            <Card key={pkg._id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-base sm:text-lg line-clamp-2">{pkg.title}</CardTitle>
                  <Badge variant="secondary" className="text-base sm:text-lg font-bold px-2 sm:px-3 py-1 whitespace-nowrap">
                    ${pkg.price}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <p className="text-muted-foreground text-sm sm:text-base line-clamp-3">{pkg.description}</p>
                
                <div>
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Features:</h4>
                  <ul className="space-y-1 max-h-32 overflow-y-auto">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="text-xs sm:text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(pkg)}
                    className="flex-1 text-xs sm:text-sm py-2"
                  >
                    <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(pkg)}
                    className="flex-1 text-xs sm:text-sm py-2"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {packages.length === 0 && (
          <div className="text-center py-12 sm:py-20">
            <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">📦</div>
            <p className="text-lg sm:text-2xl text-muted-foreground mb-2 sm:mb-4">No packages found</p>
            <p className="text-sm sm:text-base text-muted-foreground px-4">Create your first package to get started</p>
            <Button 
              onClick={() => setIsFormOpen(true)}
              className="mt-4 sm:mt-6 text-sm sm:text-base px-6 py-2 sm:py-3"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Package
            </Button>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                Confirm Deletion
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                Are you sure you want to delete the package "{packageToDelete?.title}"? 
                This action cannot be undone.
              </p>
              {packageToDelete && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-black text-sm sm:text-base">{packageToDelete.title}</span>
                    <Badge variant="secondary" className="text-sm">
                      ${packageToDelete.price}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-black mt-1 line-clamp-2">
                    {packageToDelete.description}
                  </p>
                </div>
              )}
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button 
                variant="outline" 
                onClick={handleDeleteCancel}
                className="w-full sm:w-auto text-sm sm:text-base"
                disabled={deleteLoading}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteConfirm}
                className="w-full sm:w-auto text-sm sm:text-base"
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </div>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Package
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
