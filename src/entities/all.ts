// Mock entities for the math learning platform

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
  vertical_layout?: {
    top_number: number;
    bottom_number: number;
    operator: string;
    answer: number;
  };
  horizontal_layout?: {
    left_number: number;
    operator: string;
    right_number: number;
    answer: number;
  };
  completion_layout?: {
    expression: string;
    missing_position: 'left' | 'operator' | 'right' | 'answer';
    answer: string;
  };
  explanation?: string;
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

// Mock implementations
export class ExerciseService {
  static async list(): Promise<Exercise[]> {
    return [
      {
        id: '1',
        title: 'חיבור בסיסי',
        subject: 'חיבור',
        difficulty: 'קל',
        points: 10,
        type: 'vertical',
        questions: [
          {
            id: '1-1',
            question: '23 + 17 = ?',
            vertical_layout: {
              top_number: 23,
              bottom_number: 17,
              operator: '+',
              answer: 40
            }
          },
          {
            id: '1-2', 
            question: '45 + 28 = ?',
            vertical_layout: {
              top_number: 45,
              bottom_number: 28,
              operator: '+',
              answer: 73
            }
          },
          {
            id: '1-3',
            question: '67 + 19 = ?', 
            vertical_layout: {
              top_number: 67,
              bottom_number: 19,
              operator: '+',
              answer: 86
            }
          }
        ],
        vertical_layout: {
          top_number: 23,
          bottom_number: 17,
          operator: '+',
          answer: 40
        },
        explanation: 'כדי לחבר, מתחילים מהעמודה הימנית ביותר'
      },
      {
        id: '2',
        title: 'כפל פשוט',
        subject: 'כפל',
        difficulty: 'בינוני',
        points: 15,
        type: 'horizontal',
        questions: [
          {
            id: '2-1',
            question: '7 × 6 = ?',
            horizontal_layout: {
              left_number: 7,
              operator: '×',
              right_number: 6,
              answer: 42
            }
          },
          {
            id: '2-2',
            question: '8 × 9 = ?',
            horizontal_layout: {
              left_number: 8,
              operator: '×',
              right_number: 9,
              answer: 72
            }
          }
        ],
        horizontal_layout: {
          left_number: 7,
          operator: '×',
          right_number: 6,
          answer: 42
        }
      },
      {
        id: '3',
        title: 'חיסור מתקדם',
        subject: 'חיסור',
        difficulty: 'קשה',
        points: 20,
        type: 'vertical',
        questions: [
          {
            id: '3-1',
            question: '84 - 29 = ?',
            vertical_layout: {
              top_number: 84,
              bottom_number: 29,
              operator: '-',
              answer: 55
            }
          },
          {
            id: '3-2',
            question: '93 - 47 = ?',
            vertical_layout: {
              top_number: 93,
              bottom_number: 47,
              operator: '-',
              answer: 46
            }
          },
          {
            id: '3-3',
            question: '76 - 38 = ?',
            vertical_layout: {
              top_number: 76,
              bottom_number: 38,
              operator: '-',
              answer: 38
            }
          },
          {
            id: '3-4',
            question: '65 - 27 = ?',
            vertical_layout: {
              top_number: 65,
              bottom_number: 27,
              operator: '-',
              answer: 38
            }
          }
        ],
        vertical_layout: {
          top_number: 84,
          bottom_number: 29,
          operator: '-',
          answer: 55
        }
      }
    ];
  }
}

export class LessonService {
  static async list(): Promise<Lesson[]> {
    return [
      {
        id: '1',
        title: 'יסודות החיבור',
        description: 'למד את הבסיס של חיבור מספרים',
        duration: 10,
        content: 'תוכן השיעור על חיבור...'
      }
    ];
  }
}

// Export classes with static methods as the original entities
export const Exercise = ExerciseService;
export const Lesson = LessonService;