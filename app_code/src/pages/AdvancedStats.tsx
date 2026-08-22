import { useState, useEffect } from "react";
import { fetchTableData, insertTableData } from "../services/api";

export function AdvancedStats() {
  const [goalieStats, setGoalieStats] = useState<any[]>([]);
  const [teamRecords, setTeamRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"goalies" | "teams">("goalies");

  // Form states for Goalie
  const [gFormOpen, setGFormOpen] = useState(false);
  const [gPlayerId, setGPlayerId] = useState("");
  const [gSeasonId, setGSeasonId] = useState("");
  const [gTeamId, setGTeamId] = useState("");
  const [gWins, setGWins] = useState("");
  const [gLosses, setGLosses] = useState("");

  // Form states for Team Records
  const [tFormOpen, setTFormOpen] = useState(false);
  const [tSeasonId, setTSeasonId] = useState("");
  const [tTeamA, setTTeamA] = useState("");
  const [tTeamB, setTTeamB] = useState("");
  const [tTeamAWins, setTTeamAWins] = useState("");
  const [tTeamBWins, setTTeamBWins] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const [gData, tData] = await Promise.all([
        fetchTableData("goalie_statistics"),
        fetchTableData("team_versus_team_records"),
      ]);
      setGoalieStats(gData || []);
      setTeamRecords(tData || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load advanced stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGoalieCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("goalie_statistics", {
        player_id: gPlayerId,
        season_id: gSeasonId,
        team_id: gTeamId,
        games_played: parseInt(gWins || '0') + parseInt(gLosses || '0'),
        wins: gWins,
        losses: gLosses,
      });
      setGFormOpen(false);
      loadData();
      setGPlayerId(""); setGSeasonId(""); setGTeamId(""); setGWins(""); setGLosses("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleTeamCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("team_versus_team_records", {
        season_id: tSeasonId,
        team_a_id: tTeamA,
        team_b_id: tTeamB,
        games_played: parseInt(tTeamAWins || '0') + parseInt(tTeamBWins || '0'),
        team_a_wins: tTeamAWins,
        team_b_wins: tTeamBWins,
      });
      setTFormOpen(false);
      loadData();
      setTSeasonId(""); setTTeamA(""); setTTeamB(""); setTTeamAWins(""); setTTeamBWins("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Advanced Stats</h1>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab("goalies")}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
              activeTab === "goalies" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Goalies
          </button>
          <button
            onClick={() => setActiveTab("teams")}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
              activeTab === "teams" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Team vs Team
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* GOALIES SECTION */}
      {activeTab === "goalies" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setGFormOpen(!gFormOpen)}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              {gFormOpen ? "Close Form" : "Log Goalie Stat"}
            </button>
          </div>

          {gFormOpen && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">New Goalie Entry</h2>
              <form onSubmit={handleGoalieCreate} className="space-y-4 max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Player ID</label>
                    <input required type="number" value={gPlayerId} onChange={(e) => setGPlayerId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Team ID</label>
                    <input required type="number" value={gTeamId} onChange={(e) => setGTeamId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Season ID</label>
                  <input required type="number" value={gSeasonId} onChange={(e) => setGSeasonId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Wins</label>
                    <input required type="number" value={gWins} onChange={(e) => setGWins(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Losses</label>
                    <input required type="number" value={gLosses} onChange={(e) => setGLosses(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                </div>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">Save Stat</button>
              </form>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-slate-500">Loading goalies...</div>
            ) : goalieStats.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No goalie stats found.</div>
            ) : (
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="p-4">Player ID</th>
                    <th className="p-4">Team ID</th>
                    <th className="p-4">GP</th>
                    <th className="p-4">W</th>
                    <th className="p-4">L</th>
                  </tr>
                </thead>
                <tbody>
                  {goalieStats.map((g) => (
                    <tr key={g.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="p-4 tabular-nums">{g.player_id}</td>
                      <td className="p-4 tabular-nums">{g.team_id}</td>
                      <td className="p-4 tabular-nums">{g.games_played}</td>
                      <td className="p-4 tabular-nums text-emerald-600 font-medium">{g.wins}</td>
                      <td className="p-4 tabular-nums text-red-600 font-medium">{g.losses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* TEAM VS TEAM SECTION */}
      {activeTab === "teams" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setTFormOpen(!tFormOpen)}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              {tFormOpen ? "Close Form" : "Log Matchup Record"}
            </button>
          </div>

          {tFormOpen && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">New Team vs Team Record</h2>
              <form onSubmit={handleTeamCreate} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Season ID</label>
                  <input required type="number" value={tSeasonId} onChange={(e) => setTSeasonId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Team A ID</label>
                    <input required type="number" value={tTeamA} onChange={(e) => setTTeamA(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Team B ID</label>
                    <input required type="number" value={tTeamB} onChange={(e) => setTTeamB(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Team A Wins</label>
                    <input required type="number" value={tTeamAWins} onChange={(e) => setTTeamAWins(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Team B Wins</label>
                    <input required type="number" value={tTeamBWins} onChange={(e) => setTTeamBWins(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                </div>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">Save Record</button>
              </form>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-slate-500">Loading records...</div>
            ) : teamRecords.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No team records found.</div>
            ) : (
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="p-4">Team A</th>
                    <th className="p-4">Team B</th>
                    <th className="p-4">GP</th>
                    <th className="p-4">A Wins</th>
                    <th className="p-4">B Wins</th>
                  </tr>
                </thead>
                <tbody>
                  {teamRecords.map((t) => (
                    <tr key={t.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="p-4 tabular-nums font-medium">{t.team_a_id}</td>
                      <td className="p-4 tabular-nums font-medium">{t.team_b_id}</td>
                      <td className="p-4 tabular-nums">{t.games_played}</td>
                      <td className="p-4 tabular-nums text-emerald-600">{t.team_a_wins}</td>
                      <td className="p-4 tabular-nums text-indigo-600">{t.team_b_wins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
