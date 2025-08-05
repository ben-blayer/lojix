"use client";

import React, { useState, useEffect, useCallback } from "react";

import { Exercise } from "@/types";
import { Exercise as ExerciseService } from "@/entities/all";
import { filterExercises } from "@/utils/helpers";
import { withStudentOrParentAuth } from "@/components/auth/withAuth";
import { ExerciseFilters } from "@/components/exercises/ExerciseFilters";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ExerciseHeader } from "./components/ExerciseHeader";
import { LoadingState } from "./components/LoadingState";
import { EmptyState } from "./components/EmptyState";

function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const loadExercises = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const data = await ExerciseService.list();
      setExercises(data);
    } catch (error) {
      console.error("Failed to load exercises:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = useCallback((): void => {
    const filtered = filterExercises(
      exercises,
      searchQuery,
      selectedGrade,
      selectedSubject,
      selectedDifficulty
    );
    setFilteredExercises(filtered);
  }, [exercises, searchQuery, selectedGrade, selectedSubject, selectedDifficulty]);

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <ExerciseHeader exerciseCount={filteredExercises.length} />

        <ExerciseFilters
          searchQuery={searchQuery}
          selectedGrade={selectedGrade}
          selectedSubject={selectedSubject}
          selectedDifficulty={selectedDifficulty}
          onSearchChange={setSearchQuery}
          onGradeChange={setSelectedGrade}
          onSubjectChange={setSelectedSubject}
          onDifficultyChange={setSelectedDifficulty}
        />

        {filteredExercises.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise, index) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default withStudentOrParentAuth(ExercisesPage);