// Pure utility functions

import { DifficultyLevel, MathSubject, ActivityType, Exercise } from '@/types';
import { DIFFICULTY_COLORS, SUBJECT_ICONS, ACTIVITY_COLORS, MOTIVATIONAL_MESSAGES } from './constants';

/**
 * Gets the appropriate CSS classes for difficulty level
 */
export const getDifficultyColor = (difficulty: DifficultyLevel): string => {
  return DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.default;
};

/**
 * Gets the appropriate icon for a math subject
 */
export const getSubjectIcon = (subject: MathSubject): string => {
  return SUBJECT_ICONS[subject] || SUBJECT_ICONS.default;
};

/**
 * Gets the appropriate color classes for activity type
 */
export const getActivityColor = (type: ActivityType): string => {
  return ACTIVITY_COLORS[type] || ACTIVITY_COLORS.default;
};

/**
 * Gets the appropriate icon for activity type
 */
export const getActivityIcon = (type: ActivityType): string => {
  const iconMap = {
    exercise: '📝',
    lesson: '📖',
    game: '🎮',
    default: '📚'
  };
  
  return iconMap[type] || iconMap.default;
};

/**
 * Generates a random motivational message
 */
export const getRandomMotivationalMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
  return MOTIVATIONAL_MESSAGES[randomIndex];
};

/**
 * Formats a number with Hebrew locale
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('he-IL').format(num);
};

/**
 * Formats a date with Hebrew locale
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('he-IL').format(date);
};

/**
 * Calculates percentage score
 */
export const calculateScore = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

/**
 * Generates a unique key for React components
 */
export const generateUniqueKey = (prefix: string, id: string | number, index?: number): string => {
  const suffix = index !== undefined ? `-${index}` : '';
  return `${prefix}-${id}${suffix}`;
};

/**
 * Safely gets array length with fallback
 */
export const getArrayLength = <T>(array: T[] | undefined): number => {
  return array?.length || 0;
};

/**
 * Filters exercises based on search criteria
 */
export const filterExercises = (
  exercises: Exercise[],
  searchQuery: string,
  selectedGrade: string,
  selectedSubject: string,
  selectedDifficulty: string
): Exercise[] => {
  return exercises.filter((exercise) => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === "all" || (exercise.grade !== undefined && exercise.grade === parseInt(selectedGrade));
    const matchesSubject = selectedSubject === "all" || exercise.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty;

    return matchesSearch && matchesGrade && matchesSubject && matchesDifficulty;
  });
};