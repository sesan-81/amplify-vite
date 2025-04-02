
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for leaderboards
const MOCK_GLOBAL_LEADERS = [
  { id: 1, rank: 1, name: "QuizMaster", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=quiz1", score: 12500, gamesPlayed: 78, winRate: 82 },
  { id: 2, rank: 2, name: "TriviaChamp", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=champ1", score: 11200, gamesPlayed: 65, winRate: 78 },
  { id: 3, rank: 3, name: "BrainiacGamer", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=brain1", score: 10800, gamesPlayed: 92, winRate: 73 },
  { id: 4, rank: 4, name: "KnowledgeSeeker", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=knowledge1", score: 9700, gamesPlayed: 56, winRate: 70 },
  { id: 5, rank: 5, name: "FactFinder", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=fact1", score: 9200, gamesPlayed: 48, winRate: 75 },
  { id: 6, rank: 6, name: "WisdomWarrior", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=wisdom1", score: 8800, gamesPlayed: 62, winRate: 65 },
  { id: 7, rank: 7, name: "QuizWhiz", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=whiz1", score: 8500, gamesPlayed: 45, winRate: 71 },
  { id: 8, rank: 8, name: "InfoLord", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=info1", score: 8100, gamesPlayed: 55, winRate: 67 },
  { id: 9, rank: 9, name: "MindMaster", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=mind1", score: 7900, gamesPlayed: 50, winRate: 66 },
  { id: 10, rank: 10, name: "GeniusGamer", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=genius1", score: 7600, gamesPlayed: 42, winRate: 64 },
];

const MOCK_WEEKLY_LEADERS = [
  { id: 5, rank: 1, name: "FactFinder", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=fact1", score: 3200, gamesPlayed: 18, winRate: 89 },
  { id: 3, rank: 2, name: "BrainiacGamer", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=brain1", score: 2900, gamesPlayed: 22, winRate: 82 },
  { id: 8, rank: 3, name: "InfoLord", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=info1", score: 2700, gamesPlayed: 15, winRate: 80 },
  { id: 2, rank: 4, name: "TriviaChamp", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=champ1", score: 2500, gamesPlayed: 20, winRate: 75 },
  { id: 1, rank: 5, name: "QuizMaster", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=quiz1", score: 2200, gamesPlayed: 18, winRate: 72 },
  { id: 10, rank: 6, name: "GeniusGamer", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=genius1", score: 2000, gamesPlayed: 12, winRate: 83 },
  { id: 4, rank: 7, name: "KnowledgeSeeker", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=knowledge1", score: 1800, gamesPlayed: 16, winRate: 69 },
  { id: 7, rank: 8, name: "QuizWhiz", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=whiz1", score: 1600, gamesPlayed: 15, winRate: 67 },
  { id: 9, rank: 9, name: "MindMaster", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=mind1", score: 1500, gamesPlayed: 10, winRate: 70 },
  { id: 6, rank: 10, name: "WisdomWarrior", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=wisdom1", score: 1400, gamesPlayed: 12, winRate: 67 },
];

const MOCK_CATEGORIES = [
  { id: "general", name: "General Knowledge" },
  { id: "science", name: "Science" },
  { id: "history", name: "History" },
  { id: "entertainment", name: "Entertainment" },
  { id: "sports", name: "Sports" },
  { id: "geography", name: "Geography" },
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("global");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const leaders = activeTab === "global" ? MOCK_GLOBAL_LEADERS : MOCK_WEEKLY_LEADERS;

  return (
    <div className="min-h-screen bg-secondary/30 page-transition">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you stack up against the competition
          </p>
        </div>

        <Tabs defaultValue="global" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="global">All Time</TabsTrigger>
              <TabsTrigger value="weekly">This Week</TabsTrigger>
            </TabsList>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex gap-2 overflow-x-auto max-w-3xl">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap button-transition ${
                  selectedCategory === "all"
                    ? "bg-accent text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                All Categories
              </button>
              {MOCK_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap button-transition ${
                    selectedCategory === category.id
                      ? "bg-accent text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <TabsContent value="global" className="mt-0">
            <LeaderboardTable leaders={leaders} />
          </TabsContent>
          
          <TabsContent value="weekly" className="mt-0">
            <LeaderboardTable leaders={leaders} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface LeaderboardTableProps {
  leaders: Array<{
    id: number;
    rank: number;
    name: string;
    avatar: string;
    score: number;
    gamesPlayed: number;
    winRate: number;
  }>;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ leaders }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Player</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Score</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Games</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader) => (
              <tr
                key={leader.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {leader.rank <= 3 ? (
                      <span className="w-8 h-8 flex items-center justify-center bg-yellow-50 rounded-full text-yellow-500 font-bold mr-2">
                        {leader.rank}
                      </span>
                    ) : (
                      <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-700 font-medium mr-2">
                        {leader.rank}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-3">
                      <img
                        src={leader.avatar}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{leader.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-bold">
                  {leader.score.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  {leader.gamesPlayed}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    {leader.winRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
