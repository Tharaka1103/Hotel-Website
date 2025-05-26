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
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    
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
    <footer className="bg-card border-t shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-sm text-muted-foreground gap-2">
              <span>© {currentYear} Rupas Surf Admin Portal</span>
              <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full mx-2 mt-2"></div>
              <span>All rights reserved</span>
            </div>

            {/* Connection Status */}
            <div className="flex justify-center">
              <div className="flex items-center justify-between px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-medium text-green-700 dark:text-green-400">Connected</span>
                </div>
                <div className="flex space-x-1 ml-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>

            {/* Love & Version */}
            <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-xs text-muted-foreground flex items-center">
                Developed with <Heart className="w-3 h-3 mx-1 text-red-500 fill-current" /> by TRIMIDS Innovation
              </span>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  <span className="hidden sm:inline">Build </span>V1.0.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
