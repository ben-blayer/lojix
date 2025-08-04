"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface ExerciseFiltersProps {
  searchQuery: string;
  selectedGrade: string;
  selectedSubject: string;
  selectedDifficulty: string;
  onSearchChange: (value: string) => void;
  onGradeChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
}

export const ExerciseFilters: React.FC<ExerciseFiltersProps> = ({
  searchQuery,
  selectedGrade,
  selectedSubject,
  selectedDifficulty,
  onSearchChange,
  onGradeChange,
  onSubjectChange,
  onDifficultyChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="relative">
        <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="חיפוש תרגילים..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-10 hebrew-font"
        />
      </div>

      <Select value={selectedGrade} onValueChange={onGradeChange}>
        <SelectTrigger className="hebrew-font">
          <SelectValue placeholder="כיתה" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">כל הכיתות</SelectItem>
          <SelectItem value="1">כיתה א&apos;</SelectItem>
          <SelectItem value="2">כיתה ב&apos;</SelectItem>
          <SelectItem value="3">כיתה ג&apos;</SelectItem>
          <SelectItem value="4">כיתה ד&apos;</SelectItem>
          <SelectItem value="5">כיתה ה&apos;</SelectItem>
          <SelectItem value="6">כיתה ו&apos;</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedSubject} onValueChange={onSubjectChange}>
        <SelectTrigger className="hebrew-font">
          <SelectValue placeholder="נושא" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">כל הנושאים</SelectItem>
          <SelectItem value="חיבור">חיבור</SelectItem>
          <SelectItem value="חיסור">חיסור</SelectItem>
          <SelectItem value="כפל">כפל</SelectItem>
          <SelectItem value="חילוק">חילוק</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
        <SelectTrigger className="hebrew-font">
          <SelectValue placeholder="רמת קושי" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">כל הרמות</SelectItem>
          <SelectItem value="קל">קל</SelectItem>
          <SelectItem value="בינוני">בינוני</SelectItem>
          <SelectItem value="קשה">קשה</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};