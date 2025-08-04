// Shared types and interfaces for the math learning platform

export interface Student {
  id: string;
  name: string;
  grade: number;
  current_level: number;
  total_points: number;
  badges: string[];
  streak_days: number;
}

export interface Exercise {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  points: number;
  type: 'vertical' | 'horizontal' | 'completion';
  questions?: Question[];
  vertical_layout?: VerticalLayout;
  horizontal_layout?: HorizontalLayout;
  completion_layout?: CompletionLayout;
  explanation?: string;
}

export interface Question {
  id: string;
  question: string;
  vertical_layout?: VerticalLayout;
  horizontal_layout?: HorizontalLayout;
  completion_data?: CompletionData;
  correct_answer?: string | number;
  options?: string[];
}

export interface VerticalLayout {
  top_number: number;
  bottom_number: number;
  operator: string;
  answer: number;
}

export interface HorizontalLayout {
  left_number: number;
  operator: string;
  right_number: number;
  answer: number;
}

export interface CompletionLayout {
  expression: string;
  missing_position: 'left' | 'operator' | 'right' | 'answer';
  answer: string;
}

export interface CompletionData {
  expression: string;
  blanks: CompletionBlank[];
}

export interface CompletionBlank {
  position: string;
  correct_value: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  content: string;
}

export interface StudentProgress {
  id: string;
  student_id: string;
  exercise_id?: string;
  lesson_id?: string;
  score: number;
  completed_at: Date;
  time_spent: number;
}

export interface RecentProgress {
  subject: string;
  score: number;
  date: string;
}

export interface RecommendedActivity {
  id: string;
  type: 'exercise' | 'lesson';
  title: string;
  description: string;
  difficulty: string;
  points: number;
  icon: string;
  color: string;
}

export interface WeeklyGoal {
  current: number;
  target: number;
}

export interface ChildData {
  id: number;
  name: string;
  grade: number;
  total_points: number;
  current_level: number;
  streak_days: number;
  badges: string[];
  last_activity: string;
  weekly_goal: WeeklyGoal;
  avatar: string;
}

export interface WeeklyProgressData {
  day: string;
  exercises: number;
  points: number;
}

export interface SubjectProgressData {
  subject: string;
  progress: number;
  fill: string;
}

export interface RecentActivity {
  id: number;
  type: 'exercise' | 'lesson' | 'game';
  title: string;
  score: number;
  date: string;
  duration: number;
}

export type DifficultyLevel = 'קל' | 'בינוני' | 'קשה';
export type MathSubject = 'חיבור' | 'חיסור' | 'כפל' | 'חילוק';
export type ActivityType = 'exercise' | 'lesson' | 'game';