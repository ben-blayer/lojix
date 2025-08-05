"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Users, BookOpen, BarChart3, Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { withAdminAuth } from '@/components/auth/withAuth';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const adminActions = [
    {
      title: 'ניהול משתמשים',
      description: 'צפייה ועריכת פרטי תלמידים והורים',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      action: () => console.log('User management')
    },
    {
      title: 'ניהול תרגילים',
      description: 'הוספה ועריכה של תרגילים ושיעורים',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      action: () => console.log('Exercise management')
    },
    {
      title: 'דוחות וסטטיסטיקות',
      description: 'צפייה בביצועים והתקדמות כללית',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      action: () => console.log('Reports')
    },
    {
      title: 'הגדרות מערכת',
      description: 'הגדרות כלליות ותצורת המערכת',
      icon: Settings,
      color: 'from-orange-500 to-orange-600',
      action: () => console.log('Settings')
    }
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 hebrew-font">פאנל ניהול</h1>
            <p className="text-gray-600 hebrew-font mt-2">שלום {user?.name}, ברוך הבא לפאנל הניהול</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 hebrew-font">מנהל מערכת</span>
            </div>
            
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 hebrew-font"
            >
              <LogOut className="w-4 h-4" />
              יציאה
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 hebrew-font">סך הכל תלמידים</p>
                  <p className="text-2xl font-bold text-blue-600">1,247</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 hebrew-font">תרגילים פעילים</p>
                  <p className="text-2xl font-bold text-green-600">342</p>
                </div>
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 hebrew-font">הורים רשומים</p>
                  <p className="text-2xl font-bold text-purple-600">823</p>
                </div>
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 hebrew-font">פעילות השבוע</p>
                  <p className="text-2xl font-bold text-orange-600">95%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Admin Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {adminActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={action.action}>
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg hebrew-font">{action.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 hebrew-font text-sm">{action.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="hebrew-font">גישה מהירה</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="hebrew-font">
                  הוספת תרגיל חדש
                </Button>
                <Button variant="outline" className="hebrew-font">
                  יצוא נתונים
                </Button>
                <Button variant="outline" className="hebrew-font">
                  גיבוי מערכת
                </Button>
                <Button variant="outline" className="hebrew-font">
                  הודעות מערכת
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default withAdminAuth(AdminDashboard);