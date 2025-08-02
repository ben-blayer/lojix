"use client";

import React, { useState, useEffect } from "react";
import { Exercise } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { BookOpen, Play, Star, Search, Zap, Target, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function Exercises() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [
    exercises,
    searchQuery,
    selectedGrade,
    selectedSubject,
    selectedDifficulty,
  ]);

  const loadExercises = async () => {
    const data = await Exercise.list();
    setExercises(data);
  };

  const filterExercises = () => {
    let filtered = exercises;
    if (searchQuery) {
      filtered = filtered.filter((ex) => ex.title.includes(searchQuery));
    }
    if (selectedGrade !== "all") {
      filtered = filtered.filter((ex) => ex.grade === parseInt(selectedGrade));
    }
    if (selectedSubject !== "all") {
      filtered = filtered.filter((ex) => ex.subject === selectedSubject);
    }
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((ex) => ex.difficulty === selectedDifficulty);
    }
    setFilteredExercises(filtered);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "קל":
        return "bg-green-100 text-green-800";
      case "בינוני":
        return "bg-yellow-100 text-yellow-800";
      case "קשה":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "חיבור":
        return "➕";
      case "חיסור":
        return "➖";
      case "כפל":
        return "✖️";
      case "חילוק":
        return "➗";
      case "שברים":
        return "½";
      case "גיאומטריה":
        return "📐";
      default:
        return "📝";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text hebrew-font">
                תרגילים במתמטיקה
              </h1>
              <p className="text-gray-600 hebrew-font mt-2">
                תרגול מביא לשלמות. בואו נתחיל!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative lg:col-span-2">
                  <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="חפש תרגיל..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 hebrew-font"
                  />
                </div>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="כיתה" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">כל הכיתות</SelectItem>
                    {[1, 2, 3, 4, 5, 6].map((g) => (
                      <SelectItem key={g} value={`${g}`}>
                        כיתה {String.fromCharCode(1488 + g - 1)}'
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="נושא" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">כל הנושאים</SelectItem>
                    {[
                      "חיבור",
                      "חיסור",
                      "כפל",
                      "חילוק",
                      "שברים",
                      "גיאומטריה",
                    ].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedDifficulty}
                  onValueChange={setSelectedDifficulty}
                >
                  <SelectTrigger>
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
            </CardContent>
          </Card>
        </motion.div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-hover border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-xl shadow-inner">
                        {getSubjectIcon(exercise.subject)}
                      </div>
                      <div>
                        <CardTitle className="hebrew-font text-lg">
                          {exercise.title}
                        </CardTitle>
                        <p className="text-sm text-gray-500 hebrew-font">
                          כיתה {exercise.grade} • {exercise.subject}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex-grow">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {exercise.difficulty}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Star className="w-3 h-3 text-yellow-500" />
                      {exercise.points} נקודות
                    </Badge>
                  </div>
                  <p className="text-gray-600 hebrew-font text-sm mb-4">
                    {exercise.questions?.length || 0} שאלות לאתגור הידע שלך.
                  </p>
                </CardContent>
                <div className="p-4 pt-0">
                  <Link href={`/excercise-runner?id=${exercise.id}`}>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white hebrew-font">
                      <Play className="w-4 h-4 ml-2" />
                      התחל תרגיל
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        {filteredExercises.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 hebrew-font mb-2">
              לא נמצאו תרגילים
            </h3>
            <p className="text-gray-500 hebrew-font">
              נסה לשנות את קריטריוני החיפוש
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
