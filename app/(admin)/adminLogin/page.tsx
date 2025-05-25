'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  Lock, 
  Mail, 
  Shield, 
  ArrowLeft, 
  Eye, 
  EyeOff,
  Building2,
  Users,
  BarChart3,
  Settings,
  CheckCircle,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/me');
        const data = await response.json();
        if (data.success) {
          // User is already authenticated, redirect to dashboard
          router.push('/adminDashboard');
          router.refresh();
          return;
        }
      } catch (error) {
        // User is not authenticated, continue to login
        console.log('User not authenticated, showing login');
      } finally {
        setPageLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Small delay to ensure session is set
        setTimeout(() => {
          router.push('/adminDashboard');
          router.refresh();
        }, 100);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const features = [
    {
      icon: Building2,
      title: "Hotel Management",
      description: "Complete control over rooms, bookings, and guest services",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Staff Management", 
      description: "Manage your team and assign roles efficiently",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Real-time insights and detailed performance reports",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Settings,
      title: "System Administration",
      description: "Configure settings and manage system preferences",
      color: "from-orange-500 to-red-500"
    }
  ];

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-green-900/80 to-black"></div>
        </div>

        {/* Fallback Background if image fails */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800" 
             style={{ zIndex: -1 }}>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-between p-8 lg:p-12 xl:p-16 text-white">
          {/* Top Section */}
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Hotel Admin</h1>
                <p className="text-blue-200 text-sm">Management Portal</p>
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
                Manage Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  Hotel Empire
                </span>
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed max-w-md">
                Streamline operations, boost efficiency, and deliver exceptional guest experiences with our comprehensive management system.
              </p>
            </div>
          </div>

          {/* Features Carousel */}
          <div className="space-y-6">
            <div className="transition-all duration-500 ease-in-out">
              <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r",
                  features[currentSlide].color
                )}>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">
                    {features[currentSlide].title}
                  </h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {features[currentSlide].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentSlide 
                      ? "bg-white w-8" 
                      : "bg-white/40 hover:bg-white/60"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">500+</div>
              <div className="text-blue-200 text-sm">Hotels Managed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">50K+</div>
              <div className="text-blue-200 text-sm">Daily Bookings</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-2xl font-bold">4.9</span>
              </div>
              <div className="text-blue-200 text-sm">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 lg:p-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Portal</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Sign in to manage your hotel</p>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 ">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Hotel</span>
              </Button>
            </Link>
          </div>

          {/* Welcome Section */}
          <div className="hidden lg:block text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to access your admin dashboard
            </p>
          </div>

          {/* Login Card */}
          <Card className="shadow-2xl border-0 bg-amber-50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-center text-black font-bold">Sign In</CardTitle>
              <CardDescription className="text-center text-black">
                Enter your credentials to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="animate-in slide-in-from-top-2">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-black">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@hotel.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 h-12 transition-colors"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-black">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pl-10 pr-10 h-12 transition-colors"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-5 w-5" />
                      Sign In to Admin Panel
                    </>
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Demo Credentials</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border">
                    <span className="text-gray-600 dark:text-gray-400">Email:</span>
                    <code className="text-blue-600 dark:text-blue-400 font-mono">admin@hotel.com</code>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border">
                    <span className="text-gray-600 dark:text-gray-400">Password:</span>
                    <code className="text-blue-600 dark:text-blue-400 font-mono">admin123</code>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                <p className="flex items-center justify-center space-x-1">
                  <Lock className="w-3 h-3" />
                  <span>Secured with enterprise-grade encryption</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Need help? Contact your system administrator</p>
            <p className="mt-2">© 2024 Hotel Management System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
