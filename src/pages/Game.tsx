
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionCard from "@/components/QuestionCard";
import Button from "@/components/Button";
import { toast } from "sonner";

// Mock data for questions
const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Saturn", "Jupiter", "Neptune"],
    correctAnswer: "Jupiter",
  },
  {
    id: 2,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: "Oxygen",
  },
  {
    id: 3,
    question: "What year was the first iPhone released?",
    options: ["2005", "2006", "2007", "2008"],
    correctAnswer: "2007",
  },
  {
    id: 4,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
  },
  {
    id: 5,
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Ernest Hemingway", "Harper Lee", "J.D. Salinger", "F. Scott Fitzgerald"],
    correctAnswer: "Harper Lee",
  },
];

// Mock data for players
const MOCK_PLAYERS = [
  { id: 1, name: "You", score: 0, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=player1" },
  { id: 2, name: "AI Player 1", score: 0, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ai1" },
  { id: 3, name: "AI Player 2", score: 0, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ai2" },
  { id: 4, name: "AI Player 3", score: 0, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ai3" },
];

const Game = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState(MOCK_PLAYERS);
  const [showResult, setShowResult] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [messages, setMessages] = useState<{ sender: string; text: string; timestamp: Date }[]>([
    { sender: "System", text: "Welcome to the game! Good luck!", timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  const timeLimit = 15; // seconds per question

  useEffect(() => {
    if (isCountingDown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isCountingDown && countdown === 0) {
      setIsCountingDown(false);
      simulateOtherPlayersJoining();
    }
  }, [countdown, isCountingDown]);

  const simulateOtherPlayersJoining = () => {
    // Simulate chat messages from other players
    setTimeout(() => {
      addMessage("AI Player 1", "Hey everyone! Good luck!");
    }, 2000);
    
    setTimeout(() => {
      addMessage("AI Player 2", "Let's go! I'm going to win this!");
    }, 4000);
    
    setTimeout(() => {
      addMessage("AI Player 3", "This looks like a fun category!");
    }, 6000);
  };

  const handleAnswer = (answer: string) => {
    if (answeredQuestions.has(currentQuestionIndex)) {
      return; // Prevent answering the same question multiple times
    }

    const updatedPlayers = [...players];
    const playerIndex = updatedPlayers.findIndex((p) => p.name === "You");
    
    if (answer === currentQuestion.correctAnswer) {
      const points = 100; // In a real app, points could be based on time taken to answer
      updatedPlayers[playerIndex].score += points;
      toast.success(`Correct! +${points} points`);
    } else if (answer === "") {
      toast.error("Time's up!");
    } else {
      toast.error("Incorrect answer");
    }
    
    setPlayers(updatedPlayers);
    setShowResult(true);
    
    // Mark this question as answered
    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(currentQuestionIndex);
    setAnsweredQuestions(newAnsweredQuestions);
    
    // Simulate other players answering
    simulateOtherPlayersAnswering();
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowResult(false);
      } else {
        setGameEnded(true);
        addMessage("System", "Game has ended! Check the final scores!");
      }
    }, 3000);
  };

  const simulateOtherPlayersAnswering = () => {
    const updatedPlayers = [...players];
    
    // Simulate AI players answering (with 70% chance of being correct)
    for (let i = 1; i < updatedPlayers.length; i++) {
      const isCorrect = Math.random() < 0.7;
      if (isCorrect) {
        const points = 100;
        updatedPlayers[i].score += points;
      }
    }
    
    setPlayers(updatedPlayers);
  };

  const addMessage = (sender: string, text: string) => {
    setMessages((prev) => [
      ...prev,
      { sender, text, timestamp: new Date() },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      addMessage("You", newMessage);
      setNewMessage("");
    }
  };

  const handlePlayAgain = () => {
    // Reset game state
    setCurrentQuestionIndex(0);
    setPlayers(MOCK_PLAYERS.map(player => ({ ...player, score: 0 })));
    setShowResult(false);
    setGameEnded(false);
    setCountdown(3);
    setIsCountingDown(true);
    setAnsweredQuestions(new Set());
    setMessages([{ sender: "System", text: "Welcome to the game! Good luck!", timestamp: new Date() }]);
  };

  const handleLeaveLobby = () => {
    navigate("/lobby");
  };

  // Sort players by score for display
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col page-transition">
      {isCountingDown ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="text-center animate-scale-in">
            <div className="text-7xl font-bold text-white mb-4">{countdown}</div>
            <p className="text-white text-xl">Game starting...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Game Header */}
          <div className="bg-white border-b border-gray-200 py-4 px-4 md:px-6">
            <div className="container mx-auto">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Science Trivia</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">
                    Question {currentQuestionIndex + 1}/{MOCK_QUESTIONS.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLeaveLobby}
                  >
                    Leave Game
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Game Content */}
          <div className="flex-1 container mx-auto px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Question and Players Column */}
            <div className="lg:col-span-2 space-y-6">
              {!gameEnded ? (
                <QuestionCard
                  question={currentQuestion.question}
                  options={currentQuestion.options}
                  correctAnswer={showResult ? currentQuestion.correctAnswer : undefined}
                  timeLimit={timeLimit}
                  onAnswer={handleAnswer}
                  showResult={showResult}
                />
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-scale-in">
                  <h2 className="text-2xl font-bold mb-6 text-center">Game Over!</h2>
                  <div className="space-y-6">
                    <div className="text-center py-4">
                      <h3 className="text-xl font-medium mb-2">Final Scores</h3>
                      <div className="space-y-4 max-w-sm mx-auto">
                        {sortedPlayers.map((player, index) => (
                          <div
                            key={player.id}
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              index === 0
                                ? "bg-yellow-50 border border-yellow-200"
                                : "bg-gray-50 border border-gray-100"
                            }`}
                          >
                            <div className="flex items-center">
                              {index === 0 && (
                                <span className="text-yellow-500 mr-2">👑</span>
                              )}
                              <span className="font-medium">
                                {index + 1}. {player.name}
                              </span>
                            </div>
                            <span className="font-bold">{player.score} pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button onClick={handlePlayAgain} variant="primary">
                        Play Again
                      </Button>
                      <Button onClick={handleLeaveLobby} variant="outline">
                        Back to Lobby
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Players List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-medium mb-4">Players</h3>
                <div className="space-y-3">
                  {sortedPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-3">
                          <img
                            src={player.avatar}
                            alt={player.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span
                          className={
                            player.name === "You" ? "font-medium" : ""
                          }
                        >
                          {player.name}
                        </span>
                      </div>
                      <span className="font-bold">{player.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Column */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[600px] overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-medium">Game Chat</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.sender === "You" 
                        ? "items-end" 
                        : msg.sender === "System"
                        ? "items-center"
                        : "items-start"
                    }`}
                  >
                    {msg.sender !== "System" && (
                      <span className="text-xs text-gray-500 mb-1">
                        {msg.sender}
                      </span>
                    )}
                    <div
                      className={`rounded-lg px-3 py-2 max-w-[80%] ${
                        msg.sender === "You"
                          ? "bg-accent text-white"
                          : msg.sender === "System"
                          ? "bg-gray-100 text-gray-800 text-xs"
                          : "bg-gray-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  <Button type="submit" size="sm">
                    Send
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
