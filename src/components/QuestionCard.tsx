
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: string;
  options: string[];
  correctAnswer?: string;
  timeLimit: number;
  onAnswer: (answer: string) => void;
  showResult: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  correctAnswer,
  timeLimit,
  onAnswer,
  showResult,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isAnswered, setIsAnswered] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setTimeLeft(timeLimit);
    setIsAnswered(false);
  }, [question, timeLimit]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      setIsAnswered(true);
      onAnswer("");
    }
  }, [timeLeft, isAnswered, onAnswer]);

  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    onAnswer(answer);
  };

  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option
        ? "border-accent bg-accent/10"
        : "border-gray-200 hover:border-gray-300";
    }

    if (option === correctAnswer) {
      return "border-green-500 bg-green-50";
    }

    if (selectedAnswer === option && option !== correctAnswer) {
      return "border-red-500 bg-red-50";
    }

    return "border-gray-200 opacity-50";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-scale-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs font-medium text-gray-500">Time remaining</div>
          <div className="text-xs font-medium">{timeLeft}s</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={cn(
              "h-2 rounded-full transition-all",
              timeLeft < timeLimit * 0.25
                ? "bg-red-500"
                : timeLeft < timeLimit * 0.5
                ? "bg-yellow-500"
                : "bg-green-500"
            )}
            style={{ width: `${(timeLeft / timeLimit) * 100}%` }}
          ></div>
        </div>
      </div>

      <h3 
        className="text-xl font-medium mb-6"
        dangerouslySetInnerHTML={{ __html: question }}
      />

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(option)}
            disabled={isAnswered}
            className={cn(
              "w-full p-4 border rounded-lg text-left transition-all",
              getOptionStyle(option)
            )}
          >
            <span dangerouslySetInnerHTML={{ __html: option }} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
