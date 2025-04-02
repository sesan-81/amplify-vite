
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import GameCard from "@/components/GameCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Game {
  id: string;
  title: string;
  host: string;
  players: number;
  maxPlayers: number;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  status: "waiting" | "in-progress" | "completed";
}

const MOCK_GAMES: Game[] = [
  {
    id: "1",
    title: "Science Trivia",
    host: "ScienceGuru",
    players: 3,
    maxPlayers: 6,
    category: "Science",
    difficulty: "medium",
    status: "waiting",
  },
  {
    id: "2",
    title: "Movie Buffs Challenge",
    host: "FilmFanatic",
    players: 6,
    maxPlayers: 6,
    category: "Entertainment",
    difficulty: "hard",
    status: "in-progress",
  },
  {
    id: "3",
    title: "General Knowledge",
    host: "QuizMaster",
    players: 2,
    maxPlayers: 8,
    category: "General",
    difficulty: "easy",
    status: "waiting",
  },
  {
    id: "4",
    title: "History Nerds",
    host: "HistoryBuff",
    players: 4,
    maxPlayers: 4,
    category: "History",
    difficulty: "hard",
    status: "completed",
  },
  {
    id: "5",
    title: "Sports Champions",
    host: "SportsExpert",
    players: 2,
    maxPlayers: 6,
    category: "Sports",
    difficulty: "medium",
    status: "waiting",
  },
  {
    id: "6",
    title: "Geography Masters",
    host: "GlobeTracker",
    players: 1,
    maxPlayers: 4,
    category: "Geography",
    difficulty: "easy",
    status: "waiting",
  },
];

const CATEGORIES = [
  "All",
  "General",
  "Science",
  "History",
  "Entertainment",
  "Sports",
  "Geography",
];

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

const Lobby = () => {
  const [games, setGames] = useState<Game[]>(MOCK_GAMES);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newGameTitle, setNewGameTitle] = useState("");
  const [newGameCategory, setNewGameCategory] = useState("General");
  const [newGameDifficulty, setNewGameDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [newGameMaxPlayers, setNewGameMaxPlayers] = useState(4);
  
  const navigate = useNavigate();

  const filteredGames = games.filter((game) => {
    const matchesCategory =
      selectedCategory === "All" || game.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "All" ||
      game.difficulty === selectedDifficulty.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.host.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const handleCreateGame = () => {
    if (!newGameTitle.trim()) {
      toast.error("Please enter a game title");
      return;
    }

    const newGame: Game = {
      id: `${games.length + 1}`,
      title: newGameTitle,
      host: "You",
      players: 1,
      maxPlayers: newGameMaxPlayers,
      category: newGameCategory,
      difficulty: newGameDifficulty,
      status: "waiting",
    };

    setGames([newGame, ...games]);
    setShowCreateDialog(false);
    toast.success("Game created successfully!");
    
    navigate(`/game/${newGame.id}`);
  };

  return (
    <div className="min-h-screen bg-sky-50 page-transition">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="inline-block bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-sm font-medium mb-2">Find your game</div>
            <h1 className="text-3xl font-bold text-gray-800">Game Lobby</h1>
            <p className="text-gray-600">
              Join an existing game or create your own
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="animate-pulse hover:animate-none shadow-md"
          >
            Create New Game
          </Button>
        </div>

        <div className="glass rounded-xl shadow-md p-6 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              >
                {DIFFICULTIES.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredGames.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-xl p-12 text-center animate-fade-in">
            <h3 className="text-xl font-medium mb-2 text-gray-800">No games found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or create a new game
            </p>
            <Button 
              onClick={() => setShowCreateDialog(true)}
              className="animate-pulse hover:animate-none shadow-md"
            >
              Create New Game
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-md animate-scale-in glass">
          <DialogHeader>
            <DialogTitle>Create New Game</DialogTitle>
            <DialogDescription>
              Set up your trivia game and invite players to join.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Game Title
              </label>
              <Input
                type="text"
                value={newGameTitle}
                onChange={(e) => setNewGameTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="Enter a game title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={newGameCategory}
                onChange={(e) => setNewGameCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 bg-white"
              >
                {CATEGORIES.filter((cat) => cat !== "All").map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Difficulty
              </label>
              <select
                value={newGameDifficulty}
                onChange={(e) => setNewGameDifficulty(e.target.value as "easy" | "medium" | "hard")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 bg-white"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Max Players
              </label>
              <select
                value={newGameMaxPlayers}
                onChange={(e) => setNewGameMaxPlayers(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 bg-white"
              >
                {[2, 4, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} players
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateGame} className="shadow-sm">Create Game</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Lobby;
