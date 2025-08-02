// Utility functions for the math learning platform

export function createPageUrl(path: string): string {
  // Convert old React Router style paths to Next.js paths
  const pathMap: { [key: string]: string } = {
    'Exercises': '/excercises',
    'Lessons': '/lessons',
    'ExerciseRunner': '/excercise-runner',
    'LessonViewer': '/lessons',
    'Student': '/student',
    'Parent': '/parent'
  };

  // Handle paths with query parameters
  const [basePath, queryString] = path.split('?');
  const mappedPath = pathMap[basePath] || `/${basePath.toLowerCase()}`;
  
  return queryString ? `${mappedPath}?${queryString}` : mappedPath;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('he-IL').format(num);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('he-IL').format(date);
}

export function calculateScore(correct: number, total: number): number {
  return Math.round((correct / total) * 100);
}

export function generateRandomMathProblem(difficulty: 'easy' | 'medium' | 'hard') {
  const ranges = {
    easy: { min: 1, max: 10 },
    medium: { min: 10, max: 50 },
    hard: { min: 50, max: 100 }
  };
  
  const range = ranges[difficulty];
  const a = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  const b = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  const operators = ['+', '-', '×'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  
  let answer: number;
  switch (operator) {
    case '+':
      answer = a + b;
      break;
    case '-':
      answer = Math.max(a, b) - Math.min(a, b);
      break;
    case '×':
      answer = a * b;
      break;
    default:
      answer = a + b;
  }
  
  return { a, b, operator, answer };
}