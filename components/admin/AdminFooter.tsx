'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Heart,
  Shield,
  ExternalLink,
  Activity,
  Server,
  Clock,
  Wifi,
  Database,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();
  const [currentTime, setCurrentTime] = useState('');
  const [systemHealth, setSystemHealth] = useState({
    status: 'healthy',
    uptime: '99.9%',
    response: '45ms',
    cpu: 23,
    memory: 67,
    disk: 45
  });

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    
    // Simulate system health updates
    const healthInterval = setInterval(() => {
      setSystemHealth(prev => ({
        ...prev,
        response: `${Math.floor(Math.random() * 30 + 30)}ms`,
        cpu: Math.floor(Math.random() * 20 + 15),
        memory: Math.floor(Math.random() * 30 + 50),
        disk: Math.floor(Math.random() * 20 + 35)
      }));
    }, 5000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(healthInterval);
    };
  }, []);

  const getHealthColor = (value: number, type: 'cpu' | 'memory' | 'disk') => {
    const thresholds = {
      cpu: { warning: 70, critical: 90 },
      memory: { warning: 80, critical: 95 },
      disk: { warning: 85, critical: 95 }
    };
    
    if (value >= thresholds[type].critical) return 'text-red-500';
    if (value >= thresholds[type].warning) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getProgressColor = (value: number, type: 'cpu' | 'memory' | 'disk') => {
    const thresholds = {
      cpu: { warning: 70, critical: 90 },
      memory: { warning: 80, critical: 95 },
      disk: { warning: 85, critical: 95 }
    };
    
    if (value >= thresholds[type].critical) return 'bg-red-500';
    if (value >= thresholds[type].warning) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6">
          
          {/* Brand & Version Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Portal
                </h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    v2.1.0
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Production
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Server Time: {currentTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Database className="w-4 h-4" />
                <span>Last Deploy: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Hotel Website
              </Button>
            </Link>
          </div>

          {/* System Health */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold">System Health</h4>
              <Badge 
                variant="secondary" 
                className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Healthy
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* System Metrics */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">CPU Usage</span>
                    <span className={`font-medium ${getHealthColor(systemHealth.cpu, 'cpu')}`}>
                      {systemHealth.cpu}%
                    </span>
                  </div>
                  <Progress 
                    value={systemHealth.cpu} 
                    className="h-1.5"
                    style={{
                      '--progress-background': getProgressColor(systemHealth.cpu, 'cpu')
                    } as React.CSSProperties}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Memory</span>
                    <span className={`font-medium ${getHealthColor(systemHealth.memory, 'memory')}`}>
                      {systemHealth.memory}%
                    </span>
                  </div>
                  <Progress 
                    value={systemHealth.memory} 
                    className="h-1.5"
                    style={{
                      '--progress-background': getProgressColor(systemHealth.memory, 'memory')
                    } as React.CSSProperties}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Disk Space</span>
                    <span className={`font-medium ${getHealthColor(systemHealth.disk, 'disk')}`}>
                      {systemHealth.disk}%
                    </span>
                  </div>
                  <Progress 
                    value={systemHealth.disk} 
                    className="h-1.5"
                    style={{
                      '--progress-background': getProgressColor(systemHealth.disk, 'disk')
                    } as React.CSSProperties}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Response</span>
                    <span className="font-medium text-green-500">{systemHealth.response}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="font-medium text-green-500">{systemHealth.uptime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links & Status */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center space-x-2">
              <Server className="w-5 h-5" />
              <span>Quick Access</span>
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <Link href="/adminDashboard">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  Dashboard
                </Button>
              </Link>
              <Link href="/bookings">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  Bookings
                </Button>
              </Link>
              <Link href="/packages">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  Packages
                </Button>
              </Link>
              <Link href="/admins">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  Admins
                </Button>
              </Link>
            </div>

            {/* Connection Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-medium text-green-700 dark:text-green-400">
                    Connected
                  </span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center text-sm text-muted-foreground gap-2 sm:gap-4">
              <span>© {currentYear} Hotel Management System</span>
              <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full"></div>
              <span>All rights reserved</span>
            </div>

            {/* Love & Version */}
            <div className="flex items-center space-x-4">
              <span className="text-xs text-muted-foreground flex items-center">
                Made with <Heart className="w-3 h-3 mx-1 text-red-500 fill-current" /> for hospitality
              </span>
              
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  <span className="hidden sm:inline">Build </span>2024.01.15
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only System Status Summary */}
          <div className="lg:hidden mt-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">System Status</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-600 font-medium">CPU {systemHealth.cpu}%</span>
                <span className="text-blue-600 font-medium">MEM {systemHealth.memory}%</span>
                <span className="text-purple-600 font-medium">{systemHealth.response}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
