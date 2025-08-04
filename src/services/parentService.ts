// Parent dashboard business logic

import { ChildData, WeeklyProgressData, SubjectProgressData, RecentActivity } from '@/types';

/**
 * Loads children data for parent dashboard
 */
export const loadChildrenData = async (): Promise<ChildData[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: 1,
      name: "דניאל כהן",
      grade: 3,
      total_points: 1250,
      current_level: 12,
      streak_days: 7,
      badges: ["מלך החיבור", "גיבור הכפל"],
      last_activity: "היום בשעה 16:30",
      weekly_goal: { current: 850, target: 1000 },
      avatar: "👦",
    },
    {
      id: 2,
      name: "שרה כהן",
      grade: 5,
      total_points: 2100,
      current_level: 18,
      streak_days: 12,
      badges: ["מלכת החילוק", "גיבורת הגיאומטריה", "אלופת הזמן"],
      last_activity: "היום בשעה 15:45",
      weekly_goal: { current: 1200, target: 1500 },
      avatar: "👧",
    },
  ];
};

/**
 * Loads weekly progress data
 */
export const loadWeeklyProgress = async (): Promise<WeeklyProgressData[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    { day: "א'", exercises: 3, points: 45 },
    { day: "ב'", exercises: 5, points: 75 },
    { day: "ג'", exercises: 2, points: 30 },
    { day: "ד'", exercises: 4, points: 60 },
    { day: "ה'", exercises: 6, points: 90 },
    { day: "ו'", exercises: 3, points: 45 },
    { day: "ש'", exercises: 1, points: 15 },
  ];
};

/**
 * Loads subject progress data
 */
export const loadSubjectProgress = async (): Promise<SubjectProgressData[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    { subject: "חיבור", progress: 85, fill: "#10B981" },
    { subject: "חיסור", progress: 72, fill: "#3B82F6" },
    { subject: "כפל", progress: 68, fill: "#8B5CF6" },
    { subject: "חילוק", progress: 45, fill: "#F59E0B" },
  ];
};

/**
 * Loads recent activities data
 */
export const loadRecentActivities = async (): Promise<RecentActivity[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: 1,
      type: "exercise",
      title: "תרגיל חיבור מתקדם",
      score: 95,
      date: "היום 16:30",
      duration: 12,
    },
    {
      id: 2,
      type: "lesson",
      title: "יסודות הכפל",
      score: 88,
      date: "אתמול 15:45",
      duration: 25,
    },
    {
      id: 3,
      type: "game",
      title: "משחק מספרים",
      score: 92,
      date: "אתמול 14:20",
      duration: 18,
    },
  ];
};