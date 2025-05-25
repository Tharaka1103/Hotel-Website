'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Search, 
  Users, 
  Shield,
  ShieldCheck,
  UserX,
  Mail,
  Calendar
} from 'lucide-react';
import EditAdminModal from './EditAdminModal';
import DeleteAdminDialog from './DeleteAdminDialog';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  isActive: boolean;
  createdAt: string;
}

interface AdminListProps {
  admins: Admin[];
  currentAdmin: Admin | null;
  onAdminUpdated: () => void;
}

export default function AdminList({ admins, currentAdmin, onAdminUpdated }: AdminListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [deletingAdmin, setDeletingAdmin] = useState<Admin | null>(null);

  const isSuperAdmin = currentAdmin?.role === 'super_admin';

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAdmins = admins.length;
  const superAdmins = admins.filter(admin => admin.role === 'super_admin').length;
  const regularAdmins = admins.filter(admin => admin.role === 'admin').length;
  const activeAdmins = admins.filter(admin => admin.isActive).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  Total Admins
                </p>
                <p className="text-2xl font-bold">
                  {totalAdmins}
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  Super Admins
                </p>
                <p className="text-2xl font-bold">
                  {superAdmins}
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  Regular Admins
                </p>
                <p className="text-2xl font-bold">
                  {regularAdmins}
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  Active Users
                </p>
                <p className="text-2xl font-bold">
                  {activeAdmins}
                </p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-full">
                <UserX className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Admin Management</span>
            <Badge variant="outline" className="text-xs">
              {filteredAdmins.length} of {totalAdmins} admins
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admin</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  {isSuperAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold">
                            {admin.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {admin.name}
                          </p>
                          {admin._id === currentAdmin?._id && (
                            <p className="text-xs text-blue-600 dark:text-blue-400">You</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 " />
                        <span className="text-sm ">
                          {admin.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={admin.role === 'super_admin' ? 'default' : 'secondary'}
                        className="capitalize text-white"
                      >
                        {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={admin.isActive ? 'default' : 'destructive'}
                        className={admin.isActive ? 'bg-green-600 text-white' : ''}
                      >
                        {admin.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 " />
                        <span className="text-sm ">
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    {isSuperAdmin && (
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setEditingAdmin(admin)}
                              className="cursor-pointer"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Admin
                            </DropdownMenuItem>
                            {admin._id !== currentAdmin?._id && (
                              <DropdownMenuItem
                                onClick={() => setDeletingAdmin(admin)}
                                className="cursor-pointer text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Admin
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {filteredAdmins.map((admin) => (
              <Card key={admin._id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start space-x-4 flex-1 w-full">
                    <Avatar className="h-12 w-12 sm:h-10 sm:w-10 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
                        {admin.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center flex-wrap gap-2">
                        <p className="font-medium text-base">
                          {admin.name}
                          {admin._id === currentAdmin?._id && (
                            <span className="text-blue-600 dark:text-blue-400 ml-2 text-sm">(You)</span>
                          )}
                        </p>
                      </div>
                      <p className="text-sm break-all">
                        {admin.email}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Badge 
                          variant={admin.role === 'super_admin' ? 'default' : 'secondary'}
                          className="text-xs px-2 py-1 text-white"
                        >
                          {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                        </Badge>
                        <Badge 
                          variant={admin.isActive ? 'default' : 'destructive'}
                          className={`text-xs px-2 py-1 ${admin.isActive ? 'bg-green-600 text-black' : ''}`}
                        >
                          {admin.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(admin.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  {isSuperAdmin && (
                    <div className="self-start">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={() => setEditingAdmin(admin)}
                            className="cursor-pointer py-2"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          {admin._id !== currentAdmin?._id && (
                            <DropdownMenuItem
                              onClick={() => setDeletingAdmin(admin)}
                              className="cursor-pointer text-red-600 py-2"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {filteredAdmins.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <p className="">No admins found</p>
              <p className="text-sm mt-1">
                {searchTerm ? 'Try adjusting your search terms' : 'No administrators have been added yet'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Admin Modal */}
      <EditAdminModal
        isOpen={!!editingAdmin}
        onClose={() => setEditingAdmin(null)}
        onAdminUpdated={onAdminUpdated}
        admin={editingAdmin}
        currentUserId={currentAdmin?._id || ''}
      />

      {/* Delete Admin Dialog */}
      <DeleteAdminDialog
        isOpen={!!deletingAdmin}
        onClose={() => setDeletingAdmin(null)}
        onAdminDeleted={onAdminUpdated}
        admin={deletingAdmin}
      />
    </div>
  );
}
