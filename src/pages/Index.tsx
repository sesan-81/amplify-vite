
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";

const Index = () => {
  return (
    <div className="min-h-screen bg-sky-50 page-transition">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-sky-100 to-sky-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <div className="inline-block bg-blue-50 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium mb-2 shadow-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Challenge your knowledge
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-800 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Real-time Trivia Battles with Friends
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Join thousands of players in fast-paced trivia competitions. Create rooms, invite friends, and climb the global leaderboards.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Link to="/register">
                <Button size="lg" className="shadow-md">
                  Start Playing
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="outline" size="lg" className="shadow-sm">
                  View Leaderboards
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-50 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium mb-4">Simple steps</div>
            <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Create or Join Games",
                description:
                  "Set up your own trivia room with custom categories and difficulty levels, or join existing games.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                title: "Answer Questions",
                description:
                  "Race against the clock to answer questions correctly. The faster you answer, the more points you earn.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                title: "Climb the Leaderboard",
                description:
                  "Compete with friends and players around the world to reach the top of the global leaderboard.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                    <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-8 rounded-xl bg-white shadow-lg border border-gray-100 hover-scale"
              >
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Ready to Test Your Knowledge?</h2>
            <p className="text-lg text-blue-100">
              Join thousands of players in exciting trivia battles. Sign up now and start playing!
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 shadow-md">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold flex items-center">
                <span className="text-blue-600 mr-1">Q</span>
                TriviaCraft
              </div>
              <p className="text-gray-600 mt-2">
                The ultimate real-time trivia platform
              </p>
            </div>
            <div className="flex space-x-8">
              <Link to="/" className="text-sm text-gray-600 hover:text-blue-600 button-transition">
                Home
              </Link>
              <Link to="/lobby" className="text-sm text-gray-600 hover:text-blue-600 button-transition">
                Lobby
              </Link>
              <Link to="/leaderboard" className="text-sm text-gray-600 hover:text-blue-600 button-transition">
                Leaderboard
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-8 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} TriviaCraft. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
