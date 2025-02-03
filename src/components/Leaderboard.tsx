import React from "react";
import { LeaderboardEntry } from "./leaderboard/LeaderboardEntry";
import { LeaderboardHeader } from "./leaderboard/LeaderboardHeader";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { useCountrySearch } from "@/hooks/use-country-search";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Leaderboard = () => {
  const { searchQuery, setSearchQuery, filteredCountries } = useCountrySearch();
  const { leaderboardData, isLoading } = useLeaderboard(
    filteredCountries.length === 1 ? filteredCountries[0] : undefined
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-6 animate-fade-in">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/50"
        />
        {searchQuery && filteredCountries.length > 0 && (
          <ScrollArea className="h-24 mt-2 rounded-md border border-white/10 bg-white/5">
            <div className="p-2">
              {filteredCountries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSearchQuery(country)}
                  className="w-full text-left px-2 py-1 hover:bg-white/10 rounded text-sm text-white/80"
                >
                  {country}
                </button>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
      <LeaderboardHeader />
      <div className="space-y-2">
        {leaderboardData?.map((entry) => (
          <LeaderboardEntry key={entry.rank} {...entry} />
        ))}
      </div>
    </div>
  );
};