"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CompletionExerciseProps, CompletionAnswers } from "@/types";

export default function CompletionExercise({
  question,
  onAnswer,
  isAnswered,
  userAnswers,
  isVertical = false,
}: CompletionExerciseProps) {
  const [answers, setAnswers] = useState<CompletionAnswers>({});
  const { completion_data } = question;

  useEffect(() => {
    setAnswers({});
  }, [question]);

  const handleInputChange = (position: string, value: string) => {
    if (value.length > 1) value = value.slice(-1); // Allow only single digit
    setAnswers((prev) => ({ ...prev, [position]: value }));
  };
  const handleSubmit = () => {
    onAnswer(answers);
  };

  const isCorrect = () => {
    if (!isAnswered) return false;
    return completion_data?.blanks.every(
      (blank) => userAnswers[blank.position] === blank.correct_value
    ) || false;
  };

  const renderHorizontalExpression = () => {
    if (!completion_data?.expression) return null;
    const parts = completion_data.expression.split("_");
    const elements = [];
    for (let i = 0; i < parts.length; i++) {
      elements.push(
        <span key={`text-${i}`} className="text-3xl font-bold">
          {parts[i]}
        </span>
      );
      if (i < parts.length - 1) {
        const blank = completion_data.blanks[i];
        if (!blank) continue;
        const position = blank.position;
        elements.push(
          <div key={`input-${position}`} className="relative inline-block mx-2">
            <Input
              type="number"
              value={
                isAnswered
                  ? userAnswers[position] || ""
                  : answers[position] || ""
              }
              onChange={(e) => handleInputChange(position, e.target.value)}
              className={`w-20 h-14 text-center text-3xl font-bold border-2 ${
                isAnswered
                  ? userAnswers[position] === blank.correct_value
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "border-purple-400 focus:border-purple-600"
              }`}
              disabled={isAnswered}
              style={{ appearance: "textfield", MozAppearance: "textfield" }}
            />
          </div>
        );
      }
    }
    return elements;
  };

  const renderVerticalCompletion = () => {
    if (!completion_data?.expression) return null;
    const lines = completion_data.expression.split("\n");
    const operator = completion_data.expression.includes("×")
      ? "×"
      : completion_data.expression.includes("+")
      ? "+"
      : "-";

    const renderLine = (line: string, lineKey: string) => {
      if (!line) return <div className="h-16"></div>;

      const parts = line.trim().replace(operator, "").split("");
      return (
        <div className="flex justify-end items-center mb-3 text-4xl h-16">
          {parts.map((part, index) => {
            if (part === "_") {
              // This finds the correct blank based on its order in the line
              const blankIndexInLine =
                parts.slice(0, index + 1).filter((p) => p === "_").length - 1;
              const position = `${lineKey}-${blankIndexInLine}`;
              // Find blank data for validation (unused but kept for future enhancement)

              return (
                <Input
                  key={position}
                  type="number"
                  value={
                    isAnswered
                      ? userAnswers[position] || ""
                      : answers[position] || ""
                  }
                  onChange={(e) => handleInputChange(position, e.target.value)}
                  className="w-16 h-16 text-center text-4xl font-bold mx-1 border-2 border-purple-400 focus:border-purple-600"
                  disabled={isAnswered}
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                  }}
                />
              );
            }
            return (
              <span
                key={`text-${lineKey}-${index}`}
                className="w-16 text-center leading-16"
              >
                {part}
              </span>
            );
          })}
        </div>
      );
    };

    return (
      <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-purple-200 font-mono">
        <div className="flex">
          <div className="flex-1">
            {renderLine(lines[0], "top")}
            {renderLine(lines[1], "bottom")}
            <div className="border-t-3 border-gray-800 my-2 mx-4"></div>
            {renderLine(lines[3], "result")}
          </div>
          <div className="flex flex-col items-center justify-center w-16 mr-4">
            <div className="h-16"></div>
            <div className="h-16 flex items-center">
              <span className="text-purple-600 font-bold text-5xl">
                {operator}
              </span>
            </div>
            <div className="h-16"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold hebrew-font mb-6">השלם את החסר:</h3>
        {isVertical ? (
          renderVerticalCompletion()
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-purple-200 flex items-center justify-center flex-wrap gap-2">
            {renderHorizontalExpression()}
          </div>
        )}
      </div>

      {!isAnswered && (
        <Button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < (completion_data?.blanks.length || 0)}
          className="bg-purple-600 hover:bg-purple-700 hebrew-font text-lg px-8 py-3"
          size="lg"
        >
          בדוק תשובות
        </Button>
      )}

      {isAnswered && (
        <div className="text-center max-w-md">
          <p
            className={`text-xl font-bold hebrew-font mb-3 ${
              isCorrect() ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect() ? "כל הכבוד! תשובה נכונה! 🎉" : "יש עוד מה לשפר 💪"}
          </p>
          {question.explanation && (
            <p className="text-gray-600 hebrew-font text-lg mb-4">
              {question.explanation}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
