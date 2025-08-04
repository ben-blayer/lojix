"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Star } from 'lucide-react';

import { Exercise } from '@/types';
import { getDifficultyColor, getSubjectIcon, getArrayLength } from '@/utils/helpers';
import { ROUTES } from '@/utils/constants';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, index }) => {
  const questionCount = getArrayLength(exercise.questions);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm card-hover h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                {getSubjectIcon(exercise.subject as any)}
              </div>
              <div>
                <CardTitle className="text-lg hebrew-font">{exercise.title}</CardTitle>
                <p className="text-sm text-gray-500 hebrew-font">{exercise.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-xs font-medium">{exercise.points}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-3">
            <Badge 
              variant="secondary" 
              className={getDifficultyColor(exercise.difficulty as any)}
            >
              {exercise.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {exercise.points} נקודות
            </Badge>
          </div>
          
          <p className="text-gray-600 hebrew-font text-sm mb-4">
            {questionCount} שאלות לאתגור הידע שלך.
          </p>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <Link href={`${ROUTES.exerciseRunner}?id=${exercise.id}`}>
            <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white hebrew-font">
              <Play className="w-4 h-4 ml-2" />
              התחל תרגיל
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};