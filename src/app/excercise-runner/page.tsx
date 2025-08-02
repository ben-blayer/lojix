"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Exercise } from "@/entities/all";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Trophy, Star, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

import VerticalExercise from "@/components/excercises/VerticalExcercise";
import CompletionExercise from "@/components/excercises/CompletionExcercise";

const MAX_DYNAMIC_QUESTIONS = 5;

export default function ExerciseRunner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [exercise, setExercise] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [completionAnswers, setCompletionAnswers] = useState({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // State for dynamic quiz type
  const [isDynamicQuiz, setIsDynamicQuiz] = useState(false);
  const [dynamicQuestion, setDynamicQuestion] = useState<any>(null);
  const [dynamicUserAnswer, setDynamicUserAnswer] = useState("");
  const [dynamicFeedback, setDynamicFeedback] = useState<any>(null);

  const generateDynamicQuestion = useCallback(() => {
    if (!exercise) return;
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    let question, answer;

    switch (exercise.subject) {
      case "חיבור":
        question = `${num1} + ${num2} = ?`;
        answer = num1 + num2;
        break;
      case "חיסור":
        const max = Math.max(num1, num2);
        const min = Math.min(num1, num2);
        question = `${max} - ${min} = ?`;
        answer = max - min;
        break;
      case "כפל":
        question = `${num1} × ${num2} = ?`;
        answer = num1 * num2;
        break;
      case "חילוק":
        const product = num1 * num2;
        question = `${product} ÷ ${num1} = ?`;
        answer = num2;
        break;
      default:
        question = `${num1} + ${num2} = ?`;
        answer = num1 + num2;
    }
    setDynamicQuestion({ question, answer });
  }, [exercise]);

  useEffect(() => {
    const exerciseId = searchParams.get('id');
    if (exerciseId) {
      loadExercise(exerciseId);
    }
  }, [searchParams]);

  const loadExercise = async (id: string) => {
    try {
      const exercises = await Exercise.list();
      const foundExercise = exercises.find((e) => e.id === id);
      if (foundExercise) {
        setExercise(foundExercise);
        if ((foundExercise as any).exercise_type === "dynamic_quiz") {
          setIsDynamicQuiz(true);
          setScore(0);
          setCurrentQuestionIndex(1);
          generateDynamicQuestion();
        }
      } else {
        router.push('/excercises');
      }
    } catch (error) {
      console.error("Error loading exercise:", error);
      router.push('/excercises');
    }
  };

  const handleAnswerSubmit = (e: any) => {
    e.preventDefault();
    if (isDynamicQuiz) {
      handleDynamicAnswer();
    }
  };

  const handleDynamicAnswer = () => {
    if (!dynamicUserAnswer) return;

    if (parseInt(dynamicUserAnswer) === dynamicQuestion.answer) {
      setScore((prev) => prev + 1);
      setDynamicFeedback("correct");
    } else {
      setDynamicFeedback("incorrect");
    }

    setTimeout(() => {
      if (currentQuestionIndex < MAX_DYNAMIC_QUESTIONS) {
        setCurrentQuestionIndex((prev) => prev + 1);
        generateDynamicQuestion();
        setDynamicFeedback(null);
        setDynamicUserAnswer("");
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const handleMultipleChoiceAnswer = (answer: any) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === exercise.questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleVerticalAnswer = (answer: any) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (
      answer === exercise.questions[currentQuestionIndex].vertical_layout.answer
    ) {
      setScore(score + 1);
    }
  };

  const handleCompletionAnswer = (answers: any) => {
    if (isAnswered) return;
    setCompletionAnswers(answers);
    setIsAnswered(true);

    const question = exercise.questions[currentQuestionIndex];
    const isCorrect = question.completion_data.blanks.every((blank: any) => {
      return answers[blank.position] === blank.correct_value;
    });

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setCompletionAnswers({});
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const isAnswerCorrect = () => {
    if (isDynamicQuiz) return dynamicFeedback === "correct";

    const currentQuestion = exercise.questions[currentQuestionIndex];
    if (!currentQuestion) return false;

    switch (exercise.exercise_type) {
      case "multiple_choice":
        return selectedAnswer === currentQuestion.correct_answer;
      case "vertical":
        return selectedAnswer === currentQuestion.vertical_layout.answer;
      case "horizontal_completion":
      case "vertical_completion":
        return currentQuestion.completion_data.blanks.every((blank: any) => {
          return (completionAnswers as any)[blank.position] === blank.correct_value;
        });
      default:
        return false;
    }
  };

  const renderStandardExercise = () => {
    const currentQuestion = exercise.questions[currentQuestionIndex];

    switch (exercise.exercise_type) {
      case "vertical":
        return (
          <VerticalExercise
            key={currentQuestionIndex}
            question={currentQuestion}
            onAnswer={handleVerticalAnswer}
            isAnswered={isAnswered}
            isCorrect={isAnswerCorrect()}
          />
        );
      case "horizontal_completion":
      case "vertical_completion":
        return (
          <CompletionExercise
            key={currentQuestionIndex}
            question={currentQuestion}
            onAnswer={handleCompletionAnswer}
            isAnswered={isAnswered}
            userAnswers={completionAnswers}
            isVertical={exercise.exercise_type === "vertical_completion"}
          />
        );
      default: // multiple_choice
        return (
          <div>
            <p
              className="text-2xl md:text-3xl font-semibold my-8 hebrew-font"
              dir="ltr"
            >
              {currentQuestion.question}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option: any) => (
                <Button
                  key={option}
                  variant="outline"
                  className={`h-auto py-4 text-xl transition-all duration-300 border-2 ${getButtonClass(
                    option
                  )}`}
                  onClick={() => handleMultipleChoiceAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-gray-100 flex items-center gap-2"
                >
                  {isAnswerCorrect() ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <XCircle className="text-red-500" />
                  )}
                  <p className="hebrew-font text-gray-700">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
    }
  };

  const renderDynamicQuiz = () => (
    <form onSubmit={handleAnswerSubmit} className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="text-gray-500 text-sm hebrew-font">
            שאלה {currentQuestionIndex}/{MAX_DYNAMIC_QUESTIONS}
          </div>
          <div className="text-4xl font-bold hebrew-font" dir="ltr">
            {dynamicQuestion?.question}
          </div>
          <Input
            type="number"
            value={dynamicUserAnswer}
            onChange={(e) => setDynamicUserAnswer(e.target.value)}
            className="text-center text-2xl h-14 w-40"
            autoFocus
            disabled={!!dynamicFeedback}
            style={{ appearance: "textfield", MozAppearance: "textfield" }}
          />
        </motion.div>
      </AnimatePresence>
      {dynamicFeedback && (
        <div className="mt-4 flex justify-center">
          {dynamicFeedback === "correct" && (
            <CheckCircle className="w-10 h-10 text-green-500" />
          )}
          {dynamicFeedback === "incorrect" && (
            <XCircle className="w-10 h-10 text-red-500" />
          )}
        </div>
      )}
    </form>
  );

  const getButtonClass = (option: any) => {
    if (!isAnswered) return "bg-white hover:bg-blue-50";
    const isCorrect =
      option === exercise.questions[currentQuestionIndex].correct_answer;
    const isSelected = option === selectedAnswer;
    if (isCorrect) return "bg-green-100 border-green-500 text-green-800";
    if (isSelected && !isCorrect)
      return "bg-red-100 border-red-500 text-red-800";
    return "bg-white opacity-60";
  };

  if (!exercise) {
    return (
      <div className="flex items-center justify-center h-screen">
        טוען תרגיל...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {isFinished ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Card className="w-full max-w-md text-center border-0 shadow-2xl">
              <CardHeader>
                <Trophy className="w-16 h-16 mx-auto text-yellow-400" />
                <CardTitle className="text-2xl font-bold hebrew-font mt-4">
                  כל הכבוד!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-gray-600 hebrew-font">
                  סיימת את התרגיל "{exercise.title}"
                </p>
                <div className="text-4xl font-bold text-blue-600">
                  {score} /{" "}
                  {isDynamicQuiz
                    ? MAX_DYNAMIC_QUESTIONS
                    : exercise.questions.length}
                </div>
                <p className="text-lg text-gray-800 hebrew-font">
                  צברת{" "}
                  <span className="font-bold">
                    {Math.round(
                      (score /
                        (isDynamicQuiz
                          ? MAX_DYNAMIC_QUESTIONS
                          : exercise.questions.length)) *
                        exercise.points
                    )}
                  </span>{" "}
                  נקודות!{" "}
                  <Star className="inline w-5 h-5 ml-1 text-yellow-500" />
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => router.push('/excercises')}
                  className="w-full hebrew-font"
                >
                  חזרה לרשימת התרגילים
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-4xl"
          >
            <Card className="border-0 shadow-2xl">
              <CardHeader>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/excercises')}
                  className="absolute top-4 left-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Progress
                  value={
                    (currentQuestionIndex /
                      (isDynamicQuiz
                        ? MAX_DYNAMIC_QUESTIONS
                        : exercise.questions.length)) *
                    100
                  }
                  className="w-full"
                />
                <CardTitle className="text-center text-xl hebrew-font mt-4 pt-4">
                  {exercise.title}
                </CardTitle>
              </CardHeader>
              <CardContent
                className="text-center"
                style={{
                  minHeight: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isDynamicQuiz ? renderDynamicQuiz() : renderStandardExercise()}
              </CardContent>
              <CardFooter>
                {isDynamicQuiz ? (
                  <Button
                    onClick={handleAnswerSubmit}
                    disabled={!!dynamicFeedback || !dynamicUserAnswer}
                    className="w-full hebrew-font"
                  >
                    בדוק תשובה
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!isAnswered}
                    className="w-full hebrew-font"
                  >
                    {currentQuestionIndex < exercise.questions.length - 1
                      ? "השאלה הבאה"
                      : "סיים תרגיל"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
