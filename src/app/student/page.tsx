"use client";

import React, { useState, useEffect } from "react";

import { Student, RecentProgress, RecommendedActivity, WeeklyGoal } from "@/types";
import { loadStudentData, loadRecentProgress, loadRecommendedActivities } from "@/services/studentService";
import { getRandomMotivationalMessage } from "@/utils/helpers";
import { StudentStats } from "@/components/student/StudentStats";
import { WeeklyGoalCard } from "@/components/student/WeeklyGoalCard";
import { StudentHeader } from "./components/StudentHeader";
import { RecentProgressCard } from "./components/RecentProgressCard";
import { RecommendedActivitiesCard } from "./components/RecommendedActivitiesCard";
import { QuickActionButtons } from "./components/QuickActionButtons";
import { LoadingState } from "./components/LoadingState";

export default function StudentHomePage() {
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [recentProgress, setRecentProgress] = useState<RecentProgress[]>([]);
  const [recommendedActivities, setRecommendedActivities] = useState<RecommendedActivity[]>([]);
  const [weeklyGoal] = useState<WeeklyGoal>({ current: 850, target: 1000 });
  const [motivationalMessage, setMotivationalMessage] = useState<string>("");

  useEffect(() => {
    const initializeData = async () => {
      try {
        const [student, progress, activities] = await Promise.all([
          loadStudentData(),
          loadRecentProgress(),
          loadRecommendedActivities()
        ]);

        setStudentData(student);
        setRecentProgress(progress);
        setRecommendedActivities(activities);
        setMotivationalMessage(getRandomMotivationalMessage());
      } catch (error) {
        console.error("Failed to load student data:", error);
      }
    };

    initializeData();
  }, []);

  if (!studentData) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <StudentHeader 
          studentName={studentData.name} 
          motivationalMessage={motivationalMessage} 
        />

        <StudentStats student={studentData} />

        <WeeklyGoalCard weeklyGoal={weeklyGoal} />

        <div className="grid lg:grid-cols-2 gap-8">
          <RecentProgressCard progress={recentProgress} />
          <RecommendedActivitiesCard activities={recommendedActivities} />
        </div>

        <QuickActionButtons />
      </div>
    </div>
  );
}