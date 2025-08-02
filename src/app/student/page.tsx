"use client";

import React, { useState, useEffect } from "react";
import { Student, Exercise, Lesson, StudentProgress } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Star,
  Trophy,
  BookOpen,
  Gamepad2,
  Clock,
  Target,
  TrendingUp,
  Sparkles,
  Award,
  PlayCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function StudentHome() {
  const [studentData, setStudentData] = useState<any>(null);
  const [recentProgress, setRecentProgress] = useState<any[]>([]);
  const [recommendedActivities, setRecommendedActivities] = useState<any[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState({ current: 850, target: 1000 });
  const [motivationalMessage, setMotivationalMessage] = useState("");

  useEffect(() => {
    loadStudentData();
    loadRecentProgress();
    loadRecommendedActivities();
    // Set motivational message on client side to avoid hydration mismatch
    const messages = [
      "מעולה! אתה ממשיך בקצב נהדר! 🌟",
      "הישגים מדהימים השבוע! 🎉",
      "אתה על המסלול הנכון להצלחה! 🚀",
      "כל יום אתה הופך חכם יותר! 💪",
    ];
    setMotivationalMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  const loadStudentData = async () => {
    // Mock student data - in real app would fetch current student
    setStudentData({
      name: "דניאל כהן",
      grade: 3,
      current_level: 12,
      total_points: 1250,
      badges: ["מלך החיבור", "גיבור הכפל", "אלוף הזמן"],
      streak_days: 7,
    });
  };

  const loadRecentProgress = async () => {
    // Mock recent progress data
    setRecentProgress([
      { subject: "חיבור", score: 95, date: "היום" },
      { subject: "חיסור", score: 88, date: "אתמול" },
      { subject: "כפל", score: 92, date: "שלשום" },
    ]);
  };

  const loadRecommendedActivities = async () => {
    try {
      const exercises = await Exercise.list();
      const lessons = await Lesson.list();

      const recExercises = exercises.slice(0, 2).map((ex) => ({
        id: ex.id,
        type: "exercise",
        title: ex.title,
        description: `תרגל ${ex.subject} בצורה מהנה`,
        difficulty: ex.difficulty,
        points: ex.points,
        icon: "🎯",
        color: "bg-blue-500",
      }));

      const recLessons = lessons.slice(0, 1).map((le) => ({
        id: le.id,
        type: "lesson",
        title: le.title,
        description: le.description,
        difficulty: "בינוני", // Lessons don't have difficulty, so mock it
        points: le.duration * 5, // Mock points based on duration
        icon: "🎓",
        color: "bg-purple-500",
      }));

      setRecommendedActivities([...recExercises, ...recLessons]);
    } catch (error) {
      console.error("Failed to load recommended activities", error);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text hebrew-font">
                שלום {studentData?.name || "תלמיד"}!
              </h1>
              <p className="text-gray-600 hebrew-font mt-2">
                {motivationalMessage}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 hebrew-font">סך נקודות</p>
                    <p className="text-3xl font-bold">
                      {studentData?.total_points}
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
            transition={{ delay: 0.2 }}
          >
            <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 hebrew-font">ימים רצופים</p>
                    <p className="text-3xl font-bold">
                      {studentData?.streak_days}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 hebrew-font">רמה נוכחית</p>
                    <p className="text-3xl font-bold">
                      {studentData?.current_level}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 hebrew-font">תגי הישגים</p>
                    <p className="text-3xl font-bold">
                      {studentData?.badges?.length || 0}
                    </p>
                  </div>
                  <Trophy className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Weekly Goal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
                    {weeklyGoal.current}/{weeklyGoal.target} נקודות
                  </span>
                </div>
                <Progress
                  value={(weeklyGoal.current / weeklyGoal.target) * 100}
                  className="h-3"
                />
                <p className="text-sm text-gray-500 hebrew-font">
                  עוד {weeklyGoal.target - weeklyGoal.current} נקודות להשגת היעד
                  השבועי!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 hebrew-font">
                  <Award className="w-5 h-5 text-green-500" />
                  הישגים אחרונים
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProgress.map((progress, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium hebrew-font">
                            {progress.subject}
                          </p>
                          <p className="text-sm text-gray-500 hebrew-font">
                            {progress.date}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {progress.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recommended Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 hebrew-font">
                  <PlayCircle className="w-5 h-5 text-purple-500" />
                  מומלץ עבורך
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedActivities.map((activity, index) => (
                    <Link
                      href={`/${
                          activity.type === "exercise"
                            ? "excercise-runner"
                            : "lessons"
                        }?id=${activity.id}`}
                      key={`${activity.type}-${activity.id || index}`}
                    >
                      <div className="p-4 bg-gray-50 rounded-lg card-hover cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-12 h-12 ${activity.color} rounded-lg flex items-center justify-center text-white text-xl`}
                          >
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium hebrew-font">
                              {activity.title}
                            </h3>
                            <p className="text-sm text-gray-600 hebrew-font mt-1">
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {activity.difficulty}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="bg-yellow-100 text-yellow-800 text-xs"
                              >
                                {activity.points} נקודות
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Link href="/excercises" className="md:col-span-1">
            <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white cursor-pointer">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold hebrew-font">תרגילים</h3>
                <p className="text-sm text-green-100 hebrew-font">
                  תרגול מקצועי
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/lessons" className="md:col-span-1">
            <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white cursor-pointer">
              <CardContent className="p-6 text-center">
                <PlayCircle className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold hebrew-font">שיעורים</h3>
                <p className="text-sm text-purple-100 hebrew-font">
                  הסברים ויזואליים
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
