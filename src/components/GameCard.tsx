
import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { Badge } from "./ui/badge";

export interface GameCardProps {
  id: string;
  title: string;
  host: string;
  players: number;
  maxPlayers: number;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  status: "waiting" | "in-progress" | "completed";
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  host,
  players,
  maxPlayers,
  category,
  difficulty,
  status,
}) => {
  const statusVariants = {
    waiting: "bg-emerald-100 text-emerald-800 border-emerald-200",
    "in-progress": "bg-amber-100 text-amber-800 border-amber-200",
    completed: "bg-slate-100 text-slate-800 border-slate-200",
  };

  const difficultyVariants = {
    easy: "bg-blue-100 text-blue-800 border-blue-200",
    medium: "bg-purple-100 text-purple-800 border-purple-200",
    hard: "bg-rose-100 text-rose-800 border-rose-200",
  };

  const isJoinable = status === "waiting" && players < maxPlayers;
  
  const playerCountColor = players >= maxPlayers 
    ? "text-rose-600" 
    : players >= maxPlayers * 0.8 
      ? "text-amber-600" 
      : "text-emerald-600";

  return (
    <div className="card-hover glass rounded-xl overflow-hidden transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
          <span
            className={`${
              statusVariants[status]
            } text-xs font-semibold px-2.5 py-0.5 rounded-full border`}
          >
            {status.replace("-", " ")}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-2 font-medium text-gray-700">Hosted by {host}</span>
          <span className="mx-2">•</span>
          <span className={playerCountColor}>
            <span className="font-semibold">{players}</span>/{maxPlayers} players
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-700">
            {category}
          </Badge>
          <Badge className={`${difficultyVariants[difficulty]} border`}>
            {difficulty}
          </Badge>
        </div>
        
        <div className="mt-6">
          {isJoinable ? (
            <Link to={`/game/${id}`} className="w-full">
              <Button className="w-full transform hover:translate-y-[-2px] transition-all shadow-sm">
                Join Game
              </Button>
            </Link>
          ) : status === "in-progress" ? (
            <Link to={`/game/${id}`} className="w-full">
              <Button
                className="w-full transition-all"
                variant="outline"
              >
                Spectate
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full transition-all"
              variant="ghost"
              disabled={true}
            >
              Game Ended
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
