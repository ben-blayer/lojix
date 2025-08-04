// Student-related business logic

import { Student, RecentProgress, RecommendedActivity } from '@/types';
import { Exercise, Lesson } from '@/entities/all';

/**
 * Loads mock student data
 */
export const loadStudentData = async (): Promise<Student> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    id: '1',
    name: "דניאל כהן",
    grade: 3,
    current_level: 12,
    total_points: 1250,
    badges: ["מלך החיבור", "גיבור הכפל", "אלוף הזמן"],
    streak_days: 7,
  };
};

/**
 * Loads recent progress data
 */
export const loadRecentProgress = async (): Promise<RecentProgress[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    { subject: "חיבור", score: 95, date: "היום" },
    { subject: "חיסור", score: 88, date: "אתמול" },
    { subject: "כפל", score: 92, date: "שלשום" },
  ];
};

/**
 * Loads recommended activities
 */
export const loadRecommendedActivities = async (): Promise<RecommendedActivity[]> => {
  try {
    const exercises = await Exercise.list();
    const lessons = await Lesson.list();

    const recommendedExercises = exercises.slice(0, 2).map((ex) => ({
      id: ex.id,
      type: "exercise" as const,
      title: ex.title,
      description: `תרגל ${ex.subject} בצורה מהנה`,
      difficulty: ex.difficulty,
      points: ex.points,
      icon: "🎯",
      color: "bg-blue-500",
    }));

    const recommendedLessons = lessons.slice(0, 1).map((le) => ({
      id: le.id,
      type: "lesson" as const,
      title: le.title,
      description: le.description,
      difficulty: "בינוני",
      points: le.duration * 5,
      icon: "🎓",
      color: "bg-purple-500",
    }));

    return [...recommendedExercises, ...recommendedLessons];
  } catch (error) {
    console.error("Failed to load recommended activities", error);
    return [];
  }
};