"use client";

import React, { useState, useEffect } from "react";

import { 
  ChildData, 
  WeeklyProgressData, 
  SubjectProgressData, 
  RecentActivity 
} from "@/types";
import { 
  loadChildrenData, 
  loadWeeklyProgress, 
  loadSubjectProgress, 
  loadRecentActivities 
} from "@/services/parentService";
import { withParentAuth } from "@/components/auth/withAuth";
import { ChildSelector } from "@/components/parent/ChildSelector";
import { ParentDashboardStats } from "@/components/parent/ParentDashboardStats";
import { PageHeader } from "./components/PageHeader";
import { WeeklyProgressChart } from "./components/WeeklyProgressChart";
import { SubjectProgressChart } from "./components/SubjectProgressChart";
import { RecentActivitiesList } from "./components/RecentActivitiesList";
import { LoadingState } from "./components/LoadingState";

function ParentDashboardPage() {
  const [children, setChildren] = useState<ChildData[]>([]);
  const [selectedChild, setSelectedChild] = useState<ChildData | null>(null);
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgressData[]>([]);
  const [subjectProgress, setSubjectProgress] = useState<SubjectProgressData[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const initializeData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const [childrenData, weeklyData, subjectData, activitiesData] = await Promise.all([
        loadChildrenData(),
        loadWeeklyProgress(),
        loadSubjectProgress(),
        loadRecentActivities()
      ]);

      setChildren(childrenData);
      setSelectedChild(childrenData[0]);
      setWeeklyProgress(weeklyData);
      setSubjectProgress(subjectData);
      setRecentActivities(activitiesData);
    } catch (error) {
      console.error("Failed to load parent dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  if (isLoading || !selectedChild) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader />

        <ChildSelector
          childrenData={children}
          selectedChild={selectedChild}
          onChildSelect={setSelectedChild}
        />

        <ParentDashboardStats child={selectedChild} />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <WeeklyProgressChart data={weeklyProgress} />
          <SubjectProgressChart data={subjectProgress} />
        </div>

        <div className="grid lg:grid-cols-1 gap-8 mt-8">
          <RecentActivitiesList activities={recentActivities} />
        </div>
      </div>
    </div>
  );
}

export default withParentAuth(ParentDashboardPage);