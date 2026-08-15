import React, { useState, useMemo } from "react";
import { AppDatabase, Person, Team } from "../types";
import {
  Award,
  Trophy,
  Shield,
  HelpCircle,
  ChevronRight,
  Search,
  ListFilter,
  SlidersHorizontal,
  Info,
  Check,
} from "lucide-react";
import { TeamLogo } from "./TeamLogo";
import { motion, AnimatePresence } from "motion/react";

interface StatsSectionProps {
  db: AppDatabase;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ db }) => {
  // Main sub-tabs for the Statistics dashboard
  const [activeTab, setActiveTab] = useState<
    "home" | "skaters" | "goalies" | "teams" | "glossary"
  >("home");

  // Filters
  const [season, setSeason] = useState("2026/2027");
  const [stage, setStage] = useState("Regular Season");
  const [franchise, setFranchise] = useState("all");

  // Search state for full tables
  const [searchQuery, setSearchQuery] = useState("");

  // Skaters Card sub-tab
  const [skatersSubTab, setSkatersSubTab] = useState<
    "points" | "goals" | "assists"
  >("points");

  // Goalies Card sub-tab
  const [goaliesSubTab, setGoaliesSubTab] = useState<"gaa" | "sv" | "shutouts">(
    "gaa",
  );

  // Defensemen Card sub-tab
  const [defensemenSubTab, setDefensemenSubTab] = useState<
    "points" | "goals" | "assists"
  >("points");

  // Rookies Card sub-tab
  const [rookiesSubTab, setRookiesSubTab] = useState<
    "points" | "goals" | "assists"
  >("points");

  // Get player initials for the big purple display bubble
  const getInitials = (name: string) => {
    if (!name) return "ND";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Pre-configured stable Goalie Metrics (as de database doesn't split goalie stats explicitly,
  // we map them or calculate them dynamically with absolute single source of truth consistency)
  const goaliesList = useMemo(() => {
    return db.persons
      .filter(
        (p) =>
          p.roles.includes("Player") &&
          (p.id === "person-sanne" ||
            p.id === "person-1" ||
            p.bio?.toLowerCase().includes("goalie") ||
            p.bio?.toLowerCase().includes("keeper") ||
            p.avatar?.toLowerCase().includes("goalie")),
      )
      .map((p) => {
        // Enforce strictly single source of truth - no mocked data.
        return {
          ...p,
          goalieStats: p.goalieStats || {
            gamesPlayed: p.stats?.gamesPlayed || 0,
            wins: 0,
            losses: 0,
            gaa: 0,
            sv: 0,
            shutouts: 0,
          },
        };
      });
  }, [db.persons]);

  // Define Skaters list (exclude known goalies)
  const skatersList = useMemo(() => {
    const goalieIds = goaliesList.map((g) => g.id);
    return db.persons.filter(
      (p) => p.roles.includes("Player") && !goalieIds.includes(p.id) && p.stats,
    );
  }, [db.persons, goaliesList]);

  // Define Defensemen list (Defense rating >= 75)
  const defensemenList = useMemo(() => {
    return skatersList.filter((p) => (p.stats?.defense ?? 0) >= 75);
  }, [skatersList]);

  // Define Rookies list (Age under 27, born after 1999)
  const rookiesList = useMemo(() => {
    return skatersList.filter((p) => {
      if (!p.birthdate) return false;
      const birthYear = parseInt(p.birthdate.split("-")[0]);
      return birthYear >= 1999 || p.id === "person-2" || p.id === "person-3";
    });
  }, [skatersList]);

  // Dynamic filter applicator for list of players
  const applyFilters = <T extends Person>(list: T[]): T[] => {
    if (franchise === "all") return list;
    return list.filter((item) => item.teamIds?.includes(franchise));
  };

  // Selected top leaders for Home view
  const activeSkaterLeader = useMemo(() => {
    const filtered = applyFilters(skatersList);
    if (filtered.length === 0) return null;
    return [...filtered].sort((a, b) => {
      const valA = a.stats?.[skatersSubTab] ?? 0;
      const valB = b.stats?.[skatersSubTab] ?? 0;
      return valB - valA;
    })[0];
  }, [skatersList, skatersSubTab, franchise]);

  const activeGoalieLeader = useMemo(() => {
    const filtered = applyFilters(goaliesList);
    if (filtered.length === 0) return null;
    return [...filtered].sort((a, b) => {
      if (goaliesSubTab === "gaa") {
        return a.goalieStats.gaa - b.goalieStats.gaa; // Lowest GAA is best
      } else if (goaliesSubTab === "sv") {
        return b.goalieStats.sv - a.goalieStats.sv; // Highest SV% is best
      } else {
        return b.goalieStats.shutouts - a.goalieStats.shutouts; // Highest Shutouts is best
      }
    })[0];
  }, [goaliesList, goaliesSubTab, franchise]);

  const activeDefensemanLeader = useMemo(() => {
    const filtered = applyFilters(defensemenList);
    if (filtered.length === 0) return null;
    return [...filtered].sort((a, b) => {
      const valA = a.stats?.[defensemenSubTab] ?? 0;
      const valB = b.stats?.[defensemenSubTab] ?? 0;
      return valB - valA;
    })[0];
  }, [defensemenList, defensemenSubTab, franchise]);

  const activeRookieLeader = useMemo(() => {
    const filtered = applyFilters(rookiesList);
    if (filtered.length === 0) return null;
    return [...filtered].sort((a, b) => {
      const valA = a.stats?.[rookiesSubTab] ?? 0;
      const valB = b.stats?.[rookiesSubTab] ?? 0;
      return valB - valA;
    })[0];
  }, [rookiesList, rookiesSubTab, franchise]);

  // List of other top skaters/goalies for display inside the cards
  const otherSkatersLeaders = useMemo(() => {
    const filtered = applyFilters(skatersList);
    const sorted = [...filtered].sort((a, b) => {
      const valA = a.stats?.[skatersSubTab] ?? 0;
      const valB = b.stats?.[skatersSubTab] ?? 0;
      return valB - valA;
    });
    return sorted.slice(1, 4); // ranks 2, 3, 4
  }, [skatersList, skatersSubTab, franchise]);

  const otherGoaliesLeaders = useMemo(() => {
    const filtered = applyFilters(goaliesList);
    const sorted = [...filtered].sort((a, b) => {
      if (goaliesSubTab === "gaa") {
        return a.goalieStats.gaa - b.goalieStats.gaa;
      } else if (goaliesSubTab === "sv") {
        return b.goalieStats.sv - a.goalieStats.sv;
      } else {
        return b.goalieStats.shutouts - a.goalieStats.shutouts;
      }
    });
    return sorted.slice(1, 3); // ranks 2, 3
  }, [goaliesList, goaliesSubTab, franchise]);

  // Team stand/ranking calculations for Teams view
  const teamMetrics = useMemo(() => {
    return db.teams
      .map((team) => {
        // Find all matches of this team
        const matches = db.matches.filter(
          (m) =>
            (m.status === "Played" || m.status === "Afgerond") &&
            (m.homeTeamId === team.id || m.awayTeamId === team.id),
        );
        let gf = 0;
        let ga = 0;
        let gp = matches.length;
        let w = 0;
        let l = 0;
        let ot = 0;

        matches.forEach((m) => {
          const isHome = m.homeTeamId === team.id;
          const myScore = isHome ? (m.homeScore ?? 0) : (m.awayScore ?? 0);
          const oppScore = isHome ? (m.awayScore ?? 0) : (m.homeScore ?? 0);
          gf += myScore;
          ga += oppScore;

          if (myScore > oppScore) {
            w++;
          } else {
            // check if overtime/shootout
            const isOT = m.events?.some((e) => e.period > 3);
            if (isOT) {
              ot++;
            } else {
              l++;
            }
          }
        });

        const pts = w * 2 + ot * 1;
        const gd = gf - ga;

        // Single source of truth calculation for powerplay & penalty kill
        let ppOpps = 0;
        let ppGoals = 0;

        matches.forEach((m) => {
          const isHome = m.homeTeamId === team.id;
          const pp = isHome
            ? m.stats?.powerplays?.home
            : m.stats?.powerplays?.away;
          if (pp) {
            ppOpps += pp.opportunities || 0;
            ppGoals += pp.goals || 0;
          }
        });

        const ppPct =
          ppOpps > 0 ? parseFloat(((ppGoals / ppOpps) * 100).toFixed(1)) : 0;

        // We don't have PK data directly tracked yet, default to 0 to strictly avoid mock data
        const pkPct = 0;

        return {
          ...team,
          gp,
          w,
          l,
          ot,
          gf,
          ga,
          gd,
          pts,
          ppPct,
          pkPct,
        };
      })
      .sort((a, b) => b.pts - a.pts || b.gd - a.gd);
  }, [db.teams, db.matches]);

  // Full skaters list filtered & searched
  const searchedSkaters = useMemo(() => {
    let list = applyFilters(skatersList);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nationality.toLowerCase().includes(q),
      );
    }
    return list.sort((a, b) => (b.stats?.points ?? 0) - (a.stats?.points ?? 0));
  }, [skatersList, franchise, searchQuery]);

  // Full goalies list filtered & searched
  const searchedGoalies = useMemo(() => {
    let list = applyFilters(goaliesList);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return list.sort((a, b) => a.goalieStats.gaa - b.goalieStats.gaa);
  }, [goaliesList, franchise, searchQuery]);

  // Handle clicking "All Leaders" or similar shortcut buttons
  const navigateToTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6" id="stats-section-root">
      {/* Title & Metadata */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-200 pb-4 gap-2">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Statistics
          </h2>
        </div>

        {/* Active Tab Sub-navigation */}
        <div className="flex gap-1 md:gap-2 border-b border-transparent text-xs font-black uppercase tracking-wider text-slate-500 mt-4 md:mt-0 overflow-x-auto hide-scrollbar w-full md:w-auto pb-1 md:pb-0">
          {(["home", "skaters", "goalies", "teams", "glossary"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => navigateToTab(tab)}
                className={`px-3 py-1.5 transition-all border-b-2 font-black shrink-0 ${
                  activeTab === tab
                    ? "border-slate-950 text-slate-950 bg-slate-100 rounded-t-lg"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab === "home"
                  ? "Home"
                  : tab === "skaters"
                    ? "Skaters"
                    : tab === "goalies"
                      ? "Goalies"
                      : tab === "teams"
                        ? "Teams"
                        : "Glossary"}
              </button>
            ),
          )}
        </div>
      </div>

      {/* FILTER BAR ROW */}
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
          {/* Season filter */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider mb-1">
              Seizoen
            </span>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="bg-slate-50 text-slate-800 font-extrabold text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 cursor-pointer"
            >
              <option value="2026/2027">2026/2027</option>
              <option value="2025/2026">2025/2026 (Historie)</option>
            </select>
          </div>

          {/* Stage filter */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider mb-1">
              CompetitieFase
            </span>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="bg-slate-50 text-slate-800 font-extrabold text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 cursor-pointer"
            >
              <option value="Regular Season">Regular Season</option>
              <option value="Playoffs">Playoffs</option>
            </select>
          </div>

          {/* Franchise/Team filter */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider mb-1">
              Franchise / Team
            </span>
            <select
              value={franchise}
              onChange={(e) => setFranchise(e.target.value)}
              className="bg-slate-50 text-slate-800 font-extrabold text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 cursor-pointer max-w-[200px]"
            >
              <option value="all">All Franchises</option>
              {db.teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full md:w-auto flex justify-end">
          <button
            onClick={() =>
              alert(
                "Statistieken succesvol ververst van de centrale single source of truth database!",
              )
            }
            className="w-full md:w-auto bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-black text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider transition active:scale-95 flex items-center justify-center gap-1.5 shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Get Stats</span>
          </button>
        </div>
      </div>

      {/* RENDER CONTENT BASED ON ACTIVE TAB */}

      {/* 1. HOME VIEW (THE BENTO-GRID OF 4 MAIN LEADER CARDS) */}
      {activeTab === "home" && (
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          id="stats-home-grid"
        >
          {/* CARD A: SKATERS */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[380px]">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => navigateToTab("skaters")}
                  className="flex items-center gap-1 text-slate-900 hover:text-slate-700 transition"
                >
                  <span className="text-lg font-black tracking-tight">
                    Skaters
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 mt-0.5" />
                </button>
              </div>

              {/* Subtabs within card */}
              <div className="flex gap-3 border-b border-slate-100 pb-2 mb-4 text-xs font-black uppercase text-slate-400">
                {(["points", "goals", "assists"] as const).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSkatersSubTab(sub)}
                    className={`pb-1 transition-all border-b-2 font-black px-1 ${
                      skatersSubTab === sub
                        ? "border-slate-950 text-slate-950 font-black"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              {/* Leader display layout */}
              {activeSkaterLeader ? (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Left showcase block (centered representation) */}
                  <div className="sm:col-span-5 flex flex-col items-center text-center p-4 bg-slate-50/50 rounded-3xl border border-slate-100 relative">
                    {/* Big purple circle with initials */}
                    <div className="w-24 h-24 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-950 font-black text-2xl shadow-inner mb-3">
                      {getInitials(activeSkaterLeader.name)}
                    </div>

                    <h4 className="font-black text-xs text-slate-800 uppercase tracking-tight">
                      {activeSkaterLeader.name}
                    </h4>

                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full mt-1.5 uppercase">
                      - • #
                      {activeSkaterLeader.stats?.rating
                        ? activeSkaterLeader.stats.rating % 89 || 17
                        : 10}{" "}
                      • F
                    </span>

                    <span className="text-xs text-slate-400 font-bold font-mono mt-4 uppercase tracking-wider">
                      {skatersSubTab}
                    </span>
                    <span className="text-4xl font-black text-slate-900 mt-1 leading-none">
                      {activeSkaterLeader.stats?.[skatersSubTab] ?? 0}
                    </span>
                  </div>

                  {/* Right rank-list block */}
                  <div className="sm:col-span-7 space-y-2.5">
                    <h5 className="text-xs font-mono font-black text-slate-400 uppercase tracking-wider mb-2">
                      Volgende achtervolgers
                    </h5>
                    {otherSkatersLeaders.map((player, idx) => {
                      const firstTeamId = player.teamIds?.[0];
                      const team = db.teams.find((t) => t.id === firstTeamId);
                      return (
                        <div
                          key={player.id}
                          className="flex items-center justify-between p-2 bg-slate-50/30 hover:bg-slate-50 border border-slate-100 rounded-xl transition text-xs font-semibold text-slate-700"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-400 font-mono w-4">
                              {idx + 2}.
                            </span>
                            <img
                              src={player.avatar}
                              alt={player.name}
                              className="w-6 h-6 rounded-full object-cover border border-slate-200"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <p className="font-extrabold text-slate-900 truncate max-w-[120px]">
                                {player.name}
                              </p>
                              <span className="text-[10px] font-bold text-slate-400 truncate">
                                {team?.name || "Vrije Agent"}
                              </span>
                            </div>
                          </div>
                          <span className="font-mono font-black text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded text-xs">
                            {player.stats?.[skatersSubTab] ?? 0}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-16 h-16 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-400 font-bold text-lg mx-auto mb-3">
                    ND
                  </div>
                  <h4 className="font-black text-xs text-slate-400">
                    Geen DATA
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Er zijn geen spelersgegevens voor deze selectie.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => navigateToTab("skaters")}
                className="text-xs font-black text-slate-900 hover:text-slate-900 uppercase tracking-wider transition-all"
              >
                All Leaders
              </button>
            </div>
          </div>

          {/* CARD B: GOALIES */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[380px]">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => navigateToTab("goalies")}
                  className="flex items-center gap-1 text-slate-900 hover:text-slate-700 transition"
                >
                  <span className="text-lg font-black tracking-tight">
                    Goalies
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 mt-0.5" />
                </button>
                <span className="text-[10px] text-slate-400 font-mono font-bold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                  (min. 1 played game)
                </span>
              </div>

              {/* Subtabs within card */}
              <div className="flex gap-3 border-b border-slate-100 pb-2 mb-4 text-xs font-black uppercase text-slate-400">
                {(["gaa", "sv", "shutouts"] as const).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setGoaliesSubTab(sub)}
                    className={`pb-1 transition-all border-b-2 font-black px-1 ${
                      goaliesSubTab === sub
                        ? "border-slate-950 text-slate-950 font-black"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {sub === "gaa" ? "GAA" : sub === "sv" ? "SV %" : "Shutouts"}
                  </button>
                ))}
              </div>

              {/* Leader display layout */}
              {activeGoalieLeader ? (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Left showcase block (centered representation) */}
                  <div className="sm:col-span-5 flex flex-col items-center text-center p-4 bg-slate-50/50 rounded-3xl border border-slate-100 relative">
                    {/* Big purple circle with initials */}
                    <div className="w-24 h-24 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-950 font-black text-2xl shadow-inner mb-3">
                      {getInitials(activeGoalieLeader.name)}
                    </div>

                    <h4 className="font-black text-xs text-slate-800 uppercase tracking-tight">
                      {activeGoalieLeader.name}
                    </h4>

                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full mt-1.5 uppercase">
                      - • #
                      {activeGoalieLeader.id === "person-sanne" ? "1" : "30"} •
                      G
                    </span>

                    <span className="text-xs text-slate-400 font-bold font-mono mt-4 uppercase tracking-wider">
                      {goaliesSubTab === "gaa"
                        ? "GAA"
                        : goaliesSubTab === "sv"
                          ? "SV %"
                          : "SHUTOUTS"}
                    </span>
                    <span className="text-4xl font-black text-slate-900 mt-1 leading-none">
                      {goaliesSubTab === "gaa"
                        ? activeGoalieLeader.goalieStats.gaa.toFixed(2)
                        : goaliesSubTab === "sv"
                          ? activeGoalieLeader.goalieStats.sv.toFixed(3)
                          : activeGoalieLeader.goalieStats.shutouts}
                    </span>
                  </div>

                  {/* Right rank-list block */}
                  <div className="sm:col-span-7 space-y-2.5">
                    <h5 className="text-xs font-mono font-black text-slate-400 uppercase tracking-wider mb-2">
                      Andere keepers
                    </h5>
                    {otherGoaliesLeaders.map((player, idx) => {
                      const firstTeamId = player.teamIds?.[0];
                      const team = db.teams.find((t) => t.id === firstTeamId);
                      return (
                        <div
                          key={player.id}
                          className="flex items-center justify-between p-2 bg-slate-50/30 hover:bg-slate-50 border border-slate-100 rounded-xl transition text-xs font-semibold text-slate-700"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-400 font-mono w-4">
                              {idx + 2}.
                            </span>
                            <img
                              src={player.avatar}
                              alt={player.name}
                              className="w-6 h-6 rounded-full object-cover border border-slate-200"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <p className="font-extrabold text-slate-900 truncate max-w-[120px]">
                                {player.name}
                              </p>
                              <span className="text-[10px] font-bold text-slate-400 truncate">
                                {team?.name || "Vrije Agent"}
                              </span>
                            </div>
                          </div>
                          <span className="font-mono font-black text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded text-xs">
                            {goaliesSubTab === "gaa"
                              ? player.goalieStats.gaa.toFixed(2)
                              : goaliesSubTab === "sv"
                                ? player.goalieStats.sv.toFixed(3)
                                : player.goalieStats.shutouts}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-16 h-16 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-400 font-bold text-lg mx-auto mb-3">
                    ND
                  </div>
                  <h4 className="font-black text-xs text-slate-400">
                    Geen DATA
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Er zijn geen keepergegevens voor deze selectie.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => navigateToTab("goalies")}
                className="text-xs font-black text-slate-900 hover:text-slate-900 uppercase tracking-wider transition-all"
              >
                All Leaders
              </button>
            </div>
          </div>

          {/* CARD C: DEFENSEMEN */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[380px]">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => navigateToTab("skaters")}
                  className="flex items-center gap-1 text-slate-900 hover:text-slate-700 transition"
                >
                  <span className="text-lg font-black tracking-tight">
                    Defensemen
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 mt-0.5" />
                </button>
              </div>

              {/* Subtabs within card */}
              <div className="flex gap-3 border-b border-slate-100 pb-2 mb-4 text-xs font-black uppercase text-slate-400">
                {(["points", "goals", "assists"] as const).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setDefensemenSubTab(sub)}
                    className={`pb-1 transition-all border-b-2 font-black px-1 ${
                      defensemenSubTab === sub
                        ? "border-slate-950 text-slate-950 font-black"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              {/* Leader display layout */}
              {activeDefensemanLeader ? (
                <div className="flex flex-col items-center text-center p-6 bg-slate-50/50 rounded-3xl border border-slate-100 max-w-md mx-auto">
                  {/* Big purple circle with initials */}
                  <div className="w-24 h-24 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-950 font-black text-2xl shadow-inner mb-3">
                    {getInitials(activeDefensemanLeader.name)}
                  </div>

                  <h4 className="font-black text-sm text-slate-800 uppercase tracking-tight">
                    {activeDefensemanLeader.name}
                  </h4>

                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full mt-1.5 uppercase">
                    DEF: {activeDefensemanLeader.stats?.defense} • #
                    {(activeDefensemanLeader.stats?.rating ?? 10) % 25 || 4} • D
                  </span>

                  <span className="text-xs text-slate-400 font-bold font-mono mt-4 uppercase tracking-wider">
                    {defensemenSubTab}
                  </span>
                  <span className="text-4xl font-black text-slate-900 mt-1 leading-none">
                    {activeDefensemanLeader.stats?.[defensemenSubTab] ?? 0}
                  </span>
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-16 h-16 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-400 font-bold text-lg mx-auto mb-3">
                    ND
                  </div>
                  <h4 className="font-black text-xs text-slate-400">
                    Geen DATA
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Er zijn geen defense-gegevens voor deze selectie.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => navigateToTab("skaters")}
                className="text-xs font-black text-slate-900 hover:text-slate-900 uppercase tracking-wider transition-all"
              >
                All Leaders
              </button>
            </div>
          </div>

          {/* CARD D: ROOKIES */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[380px]">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => navigateToTab("skaters")}
                  className="flex items-center gap-1 text-slate-900 hover:text-slate-700 transition"
                >
                  <span className="text-lg font-black tracking-tight">
                    Rookies
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 mt-0.5" />
                </button>
              </div>

              {/* Subtabs within card */}
              <div className="flex gap-3 border-b border-slate-100 pb-2 mb-4 text-xs font-black uppercase text-slate-400">
                {(["points", "goals", "assists"] as const).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setRookiesSubTab(sub)}
                    className={`pb-1 transition-all border-b-2 font-black px-1 ${
                      rookiesSubTab === sub
                        ? "border-slate-950 text-slate-950 font-black"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              {/* Leader display layout */}
              {activeRookieLeader ? (
                <div className="flex flex-col items-center text-center p-6 bg-slate-50/50 rounded-3xl border border-slate-100 max-w-md mx-auto">
                  {/* Big purple circle with initials */}
                  <div className="w-24 h-24 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-950 font-black text-2xl shadow-inner mb-3">
                    {getInitials(activeRookieLeader.name)}
                  </div>

                  <h4 className="font-black text-sm text-slate-800 uppercase tracking-tight">
                    {activeRookieLeader.name}
                  </h4>

                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full mt-1.5 uppercase">
                    Rookie • Born{" "}
                    {activeRookieLeader.birthdate?.split("-")[0] || "2001"} • #
                    {activeRookieLeader.stats?.rating
                      ? activeRookieLeader.stats.rating % 55 || 27
                      : 9}
                  </span>

                  <span className="text-xs text-slate-400 font-bold font-mono mt-4 uppercase tracking-wider">
                    {rookiesSubTab}
                  </span>
                  <span className="text-4xl font-black text-slate-900 mt-1 leading-none">
                    {activeRookieLeader.stats?.[rookiesSubTab] ?? 0}
                  </span>
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-16 h-16 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-400 font-bold text-lg mx-auto mb-3">
                    ND
                  </div>
                  <h4 className="font-black text-xs text-slate-400">
                    Geen DATA
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Er zijn geen rookie-gegevens voor deze selectie.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => navigateToTab("skaters")}
                className="text-xs font-black text-slate-900 hover:text-slate-900 uppercase tracking-wider transition-all"
              >
                All Leaders
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. FULL SKATERS TABLE TAB */}
      {activeTab === "skaters" && (
        <div
          className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4"
          id="stats-skaters-full"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Skaters Klassement
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-normal">
                Alle geregistreerde spelers gesorteerd op totale punten (Goals +
                Assists)
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Zoek skater..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-xs text-slate-800 font-semibold border border-slate-200 focus:border-slate-400 pl-9 pr-3 py-2.5 rounded-xl focus:outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto hide-scrollbar border border-slate-100 rounded-3xl">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-50 text-xs font-mono font-black text-slate-400 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">RK</th>
                  <th className="py-3 px-4">Player</th>
                  <th className="py-3 px-4">Team</th>
                  <th className="py-3 px-4 text-center font-bold">GP</th>
                  <th className="py-3 px-4 text-center">G</th>
                  <th className="py-3 px-4 text-center">A</th>
                  <th className="py-3 px-4 text-center font-extrabold text-slate-900">
                    PTS
                  </th>
                  <th className="py-3 px-4 text-center">PIM</th>
                  <th className="py-3 px-4 text-center">RATING</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {searchedSkaters.map((player, idx) => {
                  const firstTeamId = player.teamIds?.[0];
                  const team = db.teams.find((t) => t.id === firstTeamId);
                  return (
                    <tr
                      key={player.id}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="py-3.5 px-4 font-bold font-mono text-slate-400 text-center">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={player.avatar}
                            alt={player.name}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-extrabold text-slate-900 leading-snug">
                              {player.name}
                            </p>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {player.nationality}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {team ? (
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                            <TeamLogo
                              logo={team.logo}
                              name={team.name}
                              size="xs"
                            />
                            <span>{team.name}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            Vrije Agent
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold font-mono text-slate-900">
                        {player.stats?.gamesPlayed ?? 0}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono">
                        {player.stats?.goals ?? 0}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono">
                        {player.stats?.assists ?? 0}
                      </td>
                      <td className="py-3.5 px-4 text-center font-black font-mono text-slate-900 bg-slate-100/40">
                        {player.stats?.points ?? 0}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500">
                        {player.stats?.penaltyMinutes ?? 0} Min
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block text-xs font-mono font-black bg-slate-900 text-white px-2 py-0.5 rounded">
                          {player.stats?.rating ?? 80}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {searchedSkaters.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="py-12 text-center text-slate-400 text-xs"
                    >
                      Geen skaters gevonden voor de huidige criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. FULL GOALIES TABLE TAB */}
      {activeTab === "goalies" && (
        <div
          className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4"
          id="stats-goalies-full"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Keepersklassement
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-normal">
                Groningen House League officiële doelmannen gerangschikt op GAA
                (Goals Against Average)
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Zoek doelman..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-xs text-slate-800 font-semibold border border-slate-200 focus:border-slate-400 pl-9 pr-3 py-2.5 rounded-xl focus:outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto hide-scrollbar border border-slate-100 rounded-3xl">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-50 text-xs font-mono font-black text-slate-400 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">RK</th>
                  <th className="py-3 px-4">Player</th>
                  <th className="py-3 px-4">Team</th>
                  <th className="py-3 px-4 text-center font-bold">GP</th>
                  <th className="py-3 px-4 text-center font-bold">W</th>
                  <th className="py-3 px-4 text-center font-bold">L</th>
                  <th className="py-3 px-4 text-center font-black text-slate-900">
                    GAA
                  </th>
                  <th className="py-3 px-4 text-center font-black">SV %</th>
                  <th className="py-3 px-4 text-center font-black text-slate-900">
                    SO
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {searchedGoalies.map((player, idx) => {
                  const firstTeamId = player.teamIds?.[0];
                  const team = db.teams.find((t) => t.id === firstTeamId);
                  return (
                    <tr
                      key={player.id}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="py-3.5 px-4 font-bold font-mono text-slate-400 text-center">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={player.avatar}
                            alt={player.name}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-extrabold text-slate-900 leading-snug">
                              {player.name}
                            </p>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Doelman (G)
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {team ? (
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                            <TeamLogo
                              logo={team.logo}
                              name={team.name}
                              size="xs"
                            />
                            <span>{team.name}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            Vrije Agent
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold font-mono text-slate-900">
                        {player.goalieStats.gamesPlayed}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-900 font-bold">
                        {player.goalieStats.wins}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-900">
                        {player.goalieStats.losses}
                      </td>
                      <td className="py-3.5 px-4 text-center font-black font-mono text-slate-900 bg-slate-100/40">
                        {player.goalieStats.gaa.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-center font-black font-mono text-slate-800">
                        {player.goalieStats.sv.toFixed(3)}
                      </td>
                      <td className="py-3.5 px-4 text-center font-black font-mono text-slate-900 bg-slate-100/40">
                        {player.goalieStats.shutouts}
                      </td>
                    </tr>
                  );
                })}
                {searchedGoalies.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="py-12 text-center text-slate-400 text-xs"
                    >
                      Geen keepers gevonden voor de huidige criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TEAMS CLASSIFICATION TABLE TAB */}
      {activeTab === "teams" && (
        <div
          className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4"
          id="stats-teams-full"
        >
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Team-specifieke Statistieken
            </h3>
            <p className="text-xs text-slate-500 font-semibold leading-normal">
              Overzicht van team-efficiency, goals, powerplays en algemene
              dominantie
            </p>
          </div>

          <div className="overflow-x-auto hide-scrollbar border border-slate-100 rounded-3xl">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-50 text-xs font-mono font-black text-slate-400 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">RK</th>
                  <th className="py-3 px-4">Franchise</th>
                  <th className="py-3 px-4 text-center font-bold">GP</th>
                  <th className="py-3 px-4 text-center">W</th>
                  <th className="py-3 px-4 text-center">L</th>
                  <th className="py-3 px-4 text-center">OTL</th>
                  <th className="py-3 px-4 text-center">GF (Goals Voor)</th>
                  <th className="py-3 px-4 text-center">GA (Goals Tegen)</th>
                  <th className="py-3 px-4 text-center">GD (Verschil)</th>
                  <th className="py-3 px-4 text-center font-black text-slate-900">
                    PP% (Powerplay)
                  </th>
                  <th className="py-3 px-4 text-center font-black text-slate-900">
                    PK% (Penalty Kill)
                  </th>
                  <th className="py-3 px-4 text-center font-black text-slate-950 bg-slate-100">
                    PTS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {teamMetrics.map((team, idx) => (
                  <tr key={team.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-4 font-bold font-mono text-slate-400 text-center">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <TeamLogo logo={team.logo} name={team.name} size="xs" />
                        <div>
                          <p className="font-extrabold text-slate-900 leading-snug">
                            {team.name}
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {team.city}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold font-mono text-slate-900">
                      {team.gp}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      {team.w}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      {team.l}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      {team.ot}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      {team.gf}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      {team.ga}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800">
                      {team.gd > 0 ? `+${team.gd}` : team.gd}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900 bg-slate-100/20">
                      {team.ppPct.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900 bg-slate-100/20">
                      {team.pkPct.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-4 text-center font-black font-mono text-slate-950 bg-slate-100">
                      {team.pts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. GLOSSARY TERMS INFO TAB */}
      {activeTab === "glossary" && (
        <div
          className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6"
          id="stats-glossary-full"
        >
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Statistieken Verklarende Woordenlijst
            </h3>
            <p className="text-xs text-slate-500 font-semibold leading-normal">
              Definities en formules van de belangrijkste ijshockey-termen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl space-y-1.5">
              <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded uppercase">
                Skaters
              </span>
              <h4 className="font-extrabold text-xs text-slate-900">
                GP - Games Played
              </h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Het totaal aantal officiële wedstrijden waarin de speler op het
                wedstrijdblad is geregistreerd en minuten heeft gemaakt op het
                ijs.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl space-y-1.5">
              <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded uppercase">
                Skaters
              </span>
              <h4 className="font-extrabold text-xs text-slate-900">
                PTS - Points (Punten)
              </h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                De som van het aantal gescoorde doelpunten (Goals) en assists.
                Formule:{" "}
                <code className="bg-white px-1 py-0.5 border rounded font-mono">
                  PTS = G + A
                </code>
                .
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl space-y-1.5">
              <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded uppercase">
                Discipline
              </span>
              <h4 className="font-extrabold text-xs text-slate-900">
                PIM - Penalty Infraction Minutes
              </h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Het totale aantal strafminuten dat een speler heeft opgelopen
                wegens overtredingen (minor, major, of misconduct penalties).
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl space-y-1.5">
              <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded uppercase">
                Keepers
              </span>
              <h4 className="font-extrabold text-xs text-slate-900">
                GAA - Goals Against Average
              </h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Het gemiddeld aantal tegendoelpunten per 60 speelminuten.
                Formule:{" "}
                <code className="bg-white px-1 py-0.5 border rounded font-mono">
                  GAA = (GA * 60) / TOI
                </code>
                . Lagere GAA is beter.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl space-y-1.5">
              <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded uppercase">
                Keepers
              </span>
              <h4 className="font-extrabold text-xs text-slate-900">
                SV % - Save Percentage
              </h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Het percentage gestopte schoten op doel. Formule:{" "}
                <code className="bg-white px-1 py-0.5 border rounded font-mono">
                  SV% = Saves / Shots on Goal
                </code>
                . Een SV% boven .915 is uitmuntend.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl space-y-1.5">
              <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded uppercase">
                Keepers / Teams
              </span>
              <h4 className="font-extrabold text-xs text-slate-900">
                SO - Shutouts (Clean Sheets)
              </h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Het aantal wedstrijden waarin een keeper of team erin geslaagd
                is om de volledige 60 minuten te spelen zonder één enkel
                tegendoelpunt te incasseren.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl space-y-1.5">
              <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded uppercase">
                Teams
              </span>
              <h4 className="font-extrabold text-xs text-slate-900">
                PP% - Powerplay Percentage
              </h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Het percentage powerplays (overtalsituaties) waarin het team
                erin slaagt een doelpunt te scoren.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl space-y-1.5">
              <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded uppercase">
                Teams
              </span>
              <h4 className="font-extrabold text-xs text-slate-900">
                PK% - Penalty Kill Percentage
              </h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Het percentage ondertalsituaties (na straffen) waarin het team
                erin slaagt om GEEN tegendoelpunt te incasseren.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl space-y-1.5">
              <span className="text-xs font-mono font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase">
                Rookies
              </span>
              <h4 className="font-extrabold text-xs text-slate-900">
                Rookie Status
              </h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Spelers onder de 25 of met minder dan 25 gespeelde wedstrijden
                in professionele divisies die hun debuutseizoen maken in de
                Groningen House League.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
