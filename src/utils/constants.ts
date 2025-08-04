// Application constants

export const MOTIVATIONAL_MESSAGES = [
  "מעולה! אתה ממשיך בקצב נהדר! 🌟",
  "הישגים מדהימים השבוע! 🎉", 
  "אתה על המסלול הנכון להצלחה! 🚀",
  "כל יום אתה הופך חכם יותר! 💪",
] as const;

export const DIFFICULTY_COLORS = {
  'קל': 'bg-green-100 text-green-800',
  'בינוני': 'bg-yellow-100 text-yellow-800',
  'קשה': 'bg-red-100 text-red-800',
  default: 'bg-gray-100 text-gray-800'
} as const;

export const SUBJECT_ICONS = {
  'חיבור': '➕',
  'חיסור': '➖', 
  'כפל': '✖️',
  'חילוק': '➗',
  default: '📚'
} as const;

export const ACTIVITY_ICONS = {
  exercise: '📝',
  lesson: '📖',
  game: '🎮',
  default: '📚'
} as const;

export const ACTIVITY_COLORS = {
  exercise: 'bg-green-100 text-green-800',
  lesson: 'bg-blue-100 text-blue-800', 
  game: 'bg-purple-100 text-purple-800',
  default: 'bg-gray-100 text-gray-800'
} as const;

export const ROUTES = {
  home: '/',
  student: '/student',
  parent: '/parent',
  exercises: '/excercises',
  exerciseRunner: '/excercise-runner',
  lessons: '/lessons'
} as const;