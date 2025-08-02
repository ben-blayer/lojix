"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function VerticalExercise({
  question,
  onAnswer,
  isAnswered,
  isCorrect,
}: any) {
  const [answer, setAnswer] = useState("");
  const { vertical_layout } = question;

  const handleSubmit = () => {
    onAnswer(answer);
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-200 font-mono">
        <div className="flex">
          {/* Numbers column */}
          <div className="flex-1">
            <div className="flex justify-end mb-3 text-4xl h-16">
              <span>{vertical_layout.top_number}</span>
            </div>
            <div className="flex justify-end mb-3 text-4xl h-16">
              <span>{vertical_layout.bottom_number}</span>
            </div>
            <div className="border-t-3 border-gray-800 my-2"></div>
            <div className="flex justify-end text-4xl h-16">
              {isAnswered ? (
                <div className="flex items-center gap-3">
                  <span className="text-gray-800">{answer}</span>
                  {isCorrect ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500" />
                  )}
                </div>
              ) : (
                <Input
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-24 text-center text-4xl h-16 font-mono border-2 border-blue-400 focus:border-blue-600"
                  placeholder="?"
                  autoFocus
                  style={{
                    appearance: "textfield",
                    MozAppearance: "textfield",
                  }}
                />
              )}
            </div>
          </div>
          {/* Operator column */}
          <div className="flex flex-col items-center justify-center w-16 mr-4">
            <div className="h-16"></div>
            <div className="h-16 flex items-center">
              <span className="text-blue-600 font-bold text-5xl">
                {vertical_layout.operator}
              </span>
            </div>
            <div className="h-16"></div>
          </div>
        </div>
      </div>

      {!isAnswered && (
        <Button
          onClick={handleSubmit}
          disabled={!answer}
          className="bg-blue-600 hover:bg-blue-700 hebrew-font"
          size="lg"
        >
          בדוק תשובה
        </Button>
      )}

      {isAnswered && (
        <div className="text-center max-w-md">
          <p
            className={`text-xl font-bold hebrew-font mb-3 ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect
              ? "נכון מאוד! 🎉"
              : `התשובה הנכונה היא: ${vertical_layout.answer}`}
          </p>
          {question.explanation && (
            <p className="text-gray-600 hebrew-font text-lg">
              {question.explanation}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
