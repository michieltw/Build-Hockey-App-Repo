import { useState, useEffect } from "react";
import { fetchTableData, insertTableData } from "../services/api";

export function Playoffs() {
  const [brackets, setBrackets] = useState<any[]>([]);
  const [seedings, setSeedings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"brackets" | "seedings">("brackets");

  // Form states for Bracket
  const [bracketFormOpen, setBracketFormOpen] = useState(false);
  const [bSeasonId, setBSeasonId] = useState("");
  const [bDivisionId, setBDivisionId] = useState("");
  const [bRound, setBRound] = useState("");
  const [bBracketPosition, setBBracketPosition] = useState("");
  const [bHomeTeamId, setBHomeTeamId] = useState("");
  const [bAwayTeamId, setBAwayTeamId] = useState("");

  // Form states for Seeding
  const [seedingFormOpen, setSeedingFormOpen] = useState(false);
  const [sSeasonId, setSSeasonId] = useState("");
  const [sDivisionId, setSDivisionId] = useState("");
  const [sTeamId, setSTeamId] = useState("");
  const [sSeedRank, setSSeedRank] = useState("");
  const [sPointsAtSeeding, setSPointsAtSeeding] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const [bracketData, seedingData] = await Promise.all([
        fetchTableData("playoff_brackets"),
        fetchTableData("playoff_seedings"),
      ]);
      setBrackets(bracketData || []);
      setSeedings(seedingData || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load playoff data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBracketCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("playoff_brackets", {
        season_id: bSeasonId,
        division_id: bDivisionId,
        round: bRound,
        bracket_position: bBracketPosition,
        home_team_id: bHomeTeamId,
        away_team_id: bAwayTeamId,
      });
      setBracketFormOpen(false);
      loadData();
      // reset
      setBSeasonId(""); setBDivisionId(""); setBRound(""); setBBracketPosition(""); setBHomeTeamId(""); setBAwayTeamId("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleSeedingCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("playoff_seedings", {
        season_id: sSeasonId,
        division_id: sDivisionId,
        team_id: sTeamId,
        seed_rank: sSeedRank,
        points_at_seeding: sPointsAtSeeding,
        seeding_date: new Date().toISOString().split("T")[0],
      });
      setSeedingFormOpen(false);
      loadData();
      // reset
      setSSeasonId(""); setSDivisionId(""); setSTeamId(""); setSSeedRank(""); setSPointsAtSeeding("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Playoffs</h1>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab("brackets")}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
              activeTab === "brackets" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Brackets
          </button>
          <button
            onClick={() => setActiveTab("seedings")}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
              activeTab === "seedings" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Seedings
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* BRACKETS SECTION */}
      {activeTab === "brackets" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setBracketFormOpen(!bracketFormOpen)}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              {bracketFormOpen ? "Close Form" : "Create Matchup"}
            </button>
          </div>

          {bracketFormOpen && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">New Bracket Matchup</h2>
              <form onSubmit={handleBracketCreate} className="space-y-4 max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Season ID</label>
                    <input required type="number" value={bSeasonId} onChange={(e) => setBSeasonId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Division ID</label>
                    <input required type="number" value={bDivisionId} onChange={(e) => setBDivisionId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Round</label>
                    <input required type="number" value={bRound} onChange={(e) => setBRound(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Position</label>
                    <input required type="number" value={bBracketPosition} onChange={(e) => setBBracketPosition(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Home Team ID</label>
                    <input required type="number" value={bHomeTeamId} onChange={(e) => setBHomeTeamId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Away Team ID</label>
                    <input required type="number" value={bAwayTeamId} onChange={(e) => setBAwayTeamId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                </div>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">Save Matchup</button>
              </form>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-slate-500">Loading brackets...</div>
            ) : brackets.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No bracket matchups found.</div>
            ) : (
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="p-4">Round</th>
                    <th className="p-4">Pos</th>
                    <th className="p-4">Home Team</th>
                    <th className="p-4">Away Team</th>
                    <th className="p-4">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {brackets.map((b) => (
                    <tr key={b.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="p-4 tabular-nums">R{b.round}</td>
                      <td className="p-4 tabular-nums">{b.bracket_position}</td>
                      <td className="p-4 tabular-nums">{b.home_team_id}</td>
                      <td className="p-4 tabular-nums">{b.away_team_id}</td>
                      <td className="p-4 tabular-nums">{b.winner_team_id || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* SEEDINGS SECTION */}
      {activeTab === "seedings" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setSeedingFormOpen(!seedingFormOpen)}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              {seedingFormOpen ? "Close Form" : "Create Seeding"}
            </button>
          </div>

          {seedingFormOpen && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">New Team Seeding</h2>
              <form onSubmit={handleSeedingCreate} className="space-y-4 max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Season ID</label>
                    <input required type="number" value={sSeasonId} onChange={(e) => setSSeasonId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Division ID</label>
                    <input required type="number" value={sDivisionId} onChange={(e) => setSDivisionId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Team ID</label>
                  <input required type="number" value={sTeamId} onChange={(e) => setSTeamId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Seed Rank</label>
                    <input required type="number" value={sSeedRank} onChange={(e) => setSSeedRank(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Points at Seeding</label>
                    <input required type="number" value={sPointsAtSeeding} onChange={(e) => setSPointsAtSeeding(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
                  </div>
                </div>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">Save Seeding</button>
              </form>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-slate-500">Loading seedings...</div>
            ) : seedings.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No seedings found.</div>
            ) : (
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="p-4">Rank</th>
                    <th className="p-4">Team ID</th>
                    <th className="p-4">Points</th>
                    <th className="p-4">Date Set</th>
                  </tr>
                </thead>
                <tbody>
                  {seedings.map((s) => (
                    <tr key={s.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="p-4 tabular-nums font-bold">#{s.seed_rank}</td>
                      <td className="p-4 tabular-nums">{s.team_id}</td>
                      <td className="p-4 tabular-nums">{s.points_at_seeding}</td>
                      <td className="p-4 tabular-nums">{s.seeding_date?.split("T")[0]}</td>
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
