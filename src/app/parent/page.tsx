"use client";

import React, { useState, useEffect } from "react";
import { Student, StudentProgress, Exercise } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  User,
  TrendingUp,
  Clock,
  Target,
  Award,
  BookOpen,
  Calendar,
  Activity,
  Star,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ParentDashboard() {
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [weeklyProgress, setWeeklyProgress] = useState<any[]>([]);
  const [subjectProgress, setSubjectProgress] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {
    loadChildren();
    loadWeeklyProgress();
    loadSubjectProgress();
    loadRecentActivities();
  }, []);

  const loadChildren = async () => {
    // Mock children data
    const mockChildren = [
      {
        id: 1,
        name: "דניאל כהן",
        grade: 3,
        total_points: 1250,
        current_level: 12,
        streak_days: 7,
        badges: ["מלך החיבור", "גיבור הכפל", "אלוף הזמן"],
        last_activity: "2024-01-15T10:30:00Z",
        weekly_goal: { current: 850, target: 1000 },
        avatar: "🧑‍🎓",
      },
      {
        id: 2,
        name: "שרה כהן",
        grade: 1,
        total_points: 680,
        current_level: 8,
        streak_days: 3,
        badges: ["נסיכת המספרים", "כוכבת החיבור"],
        last_activity: "2024-01-15T16:45:00Z",
        weekly_goal: { current: 420, target: 600 },
        avatar: "👧",
      },
    ];
    setChildren(mockChildren);
    setSelectedChild(mockChildren[0]);
  };

  const loadWeeklyProgress = async () => {
    // Mock weekly progress data
    setWeeklyProgress([
      { day: "א'", points: 120, exercises: 8, time: 45 },
      { day: "ב'", points: 95, exercises: 6, time: 35 },
      { day: "ג'", points: 150, exercises: 10, time: 60 },
      { day: "ד'", points: 130, exercises: 9, time: 50 },
      { day: "ה'", points: 110, exercises: 7, time: 40 },
      { day: "ו'", points: 80, exercises: 5, time: 30 },
      { day: "ש'", points: 165, exercises: 12, time: 70 },
    ]);
  };

  const loadSubjectProgress = async () => {
    // Mock subject progress data
    setSubjectProgress([
      { subject: "חיבור", score: 92, exercises: 25, color: "#10B981" },
      { subject: "חיסור", score: 88, exercises: 20, color: "#3B82F6" },
      { subject: "כפל", score: 95, exercises: 18, color: "#F59E0B" },
      { subject: "חילוק", score: 76, exercises: 15, color: "#EF4444" },
      { subject: "שברים", score: 83, exercises: 12, color: "#8B5CF6" },
      { subject: "גיאומטריה", score: 91, exercises: 10, color: "#EC4899" },
    ]);
  };

  const loadRecentActivities = async () => {
    // Mock recent activities
    setRecentActivities([
      {
        type: "exercise",
        title: "תרגיל כפל",
        score: 95,
        time: "10:30",
        date: "היום",
      },
      {
        type: "game",
        title: "מלחמת החיבור",
        score: 88,
        time: "16:45",
        date: "אתמול",
      },
      {
        type: "lesson",
        title: "שיעור שברים",
        score: 92,
        time: "14:20",
        date: "אתמול",
      },
      {
        type: "exercise",
        title: "תרגיל חילוק",
        score: 76,
        time: "11:15",
        date: "שלשום",
      },
      {
        type: "game",
        title: "פאזל מספרים",
        score: 89,
        time: "15:30",
        date: "שלשום",
      },
    ]);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "exercise":
        return <BookOpen className="w-4 h-4" />;
      case "game":
        return <Trophy className="w-4 h-4" />;
      case "lesson":
        return <Star className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "exercise":
        return "bg-green-100 text-green-800";
      case "game":
        return "bg-blue-100 text-blue-800";
      case "lesson":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text hebrew-font">
                לוח בקרה להורים
              </h1>
              <p className="text-gray-600 hebrew-font mt-2">
                עקוב אחרי התקדמות ילדיך
              </p>
            </div>
          </div>
        </motion.div>

        {/* Children Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex gap-4 justify-center">
            {children.map((child) => (
              <Card
                key={child.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedChild?.id === child.id
                    ? "border-2 border-blue-500 shadow-lg"
                    : "border border-gray-200 hover:shadow-md"
                }`}
                onClick={() => setSelectedChild(child)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{child.avatar}</div>
                    <div>
                      <h3 className="font-bold hebrew-font">{child.name}</h3>
                      <p className="text-sm text-gray-500 hebrew-font">
                        כיתה {child.grade}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {selectedChild && (
          <>
            {/* Child Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 hebrew-font">סך נקודות</p>
                        <p className="text-3xl font-bold">
                          {selectedChild.total_points}
                        </p>
                      </div>
                      <Star className="w-8 h-8 text-yellow-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 hebrew-font">רמה נוכחית</p>
                        <p className="text-3xl font-bold">
                          {selectedChild.current_level}
                        </p>
                      </div>
                      <Target className="w-8 h-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 hebrew-font">
                          ימים רצופים
                        </p>
                        <p className="text-3xl font-bold">
                          {selectedChild.streak_days}
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 hebrew-font">תגים</p>
                        <p className="text-3xl font-bold">
                          {selectedChild.badges.length}
                        </p>
                      </div>
                      <Award className="w-8 h-8 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Weekly Goal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 hebrew-font">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    יעד השבוע
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 hebrew-font">
                        התקדמות השבוע
                      </span>
                      <span className="font-bold text-blue-600">
                        {selectedChild.weekly_goal.current}/
                        {selectedChild.weekly_goal.target} נקודות
                      </span>
                    </div>
                    <Progress
                      value={
                        (selectedChild.weekly_goal.current /
                          selectedChild.weekly_goal.target) *
                        100
                      }
                      className="h-3"
                    />
                    <p className="text-sm text-gray-500 hebrew-font">
                      עוד{" "}
                      {selectedChild.weekly_goal.target -
                        selectedChild.weekly_goal.current}{" "}
                      נקודות להשגת היעד השבועי
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Analytics */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Weekly Progress Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="hebrew-font">פעילות שבועית</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyProgress}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="points"
                          fill="#3B82F6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Subject Progress */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="hebrew-font">
                      התקדמות לפי נושא
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {subjectProgress.map((subject, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium hebrew-font">
                              {subject.subject}
                            </span>
                            <span className="text-sm text-gray-500">
                              {subject.score}%
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={subject.score}
                              className="flex-1"
                            />
                            <Badge variant="outline" className="text-xs">
                              {subject.exercises} תרגילים
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 hebrew-font">
                    <Activity className="w-5 h-5 text-purple-500" />
                    פעילות אחרונה
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(
                              activity.type
                            )}`}
                          >
                            {getActivityIcon(activity.type)}
                          </div>
                          <div>
                            <p className="font-medium hebrew-font">
                              {activity.title}
                            </p>
                            <p className="text-sm text-gray-500 hebrew-font">
                              {activity.date} • {activity.time}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          {activity.score}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
