import React, { useState } from 'react';
import { AppDatabase, Person, Team, Match, Equipment } from '../types';
import { movePlayerToTeam, addEquipment, updateEquipment, deleteEquipment, updatePersonProfile } from '../services';
import { TeamLogo } from './TeamLogo';
import {
  User, Award, Dumbbell, Calendar, Shield, Sparkles, PlusCircle, Trash2,
  Wrench, Star, Heart, TrendingUp, RefreshCw, Zap, Trophy, UserPlus
} from 'lucide-react';

interface StandardUserDashboardProps {
  db: AppDatabase;
  onUpdateDb: (updatedDb: AppDatabase) => void;
}

export const StandardUserDashboard: React.FC<StandardUserDashboardProps> = ({ db, onUpdateDb}) => {
  const currentPersonId = db.currentUser.personId;
  const person = db.persons.find((p) => p.id === currentPersonId);

  // States for player linking & creation
  const [selectedExistingPlayerId, setSelectedExistingPlayerId] = useState('');
  const [showCreatePlayerForm, setShowCreatePlayerForm] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerBirthdate, setNewPlayerBirthdate] = useState('2000-01-01');
  const [newPlayerNationality, setNewPlayerNationality] = useState('Nederlands');
  const [newPlayerBio, setNewPlayerBio] = useState('');
  const [newPlayerAvatar, setNewPlayerAvatar] = useState('https://cdn.shopify.com/s/files/1/1038/7203/7203/files/placeholder_profile_player_male.png?v=1784405789');

  // States for equipment management
  const [showAddEquipmentForm, setShowAddEquipmentForm] = useState(false);
  const [eqType, setEqType] = useState<'stick' | 'skates' | 'helmet' | 'gloves'>('stick');
  const [eqBrand, setEqBrand] = useState('');
  const [eqModel, setEqModel] = useState('');
  const [eqSpecValue, setEqSpecValue] = useState(''); // Curve/Size/Color
  const [eqSpecNumber, setEqSpecNumber] = useState<number>(75); // Flex or size

  // Training & feedback states
  const [isTraining, setIsTraining] = useState<string | null>(null);
  const [trainingFeedback, setTrainingFeedback] = useState<string | null>(null);
  const [activeTabSection, setActiveTabSection] = useState<'stats' | 'locker' | 'matches' | 'transfer'>('stats');

  // Filter out players already linked or just retrieve all persons with 'Player' role
  const allPlayers = db.persons.filter(p => p.roles.includes('Player'));

  const handleLinkToPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExistingPlayerId) return;

    const targetPlayer = db.persons.find(p => p.id === selectedExistingPlayerId);
    if (!targetPlayer) return;

    const updatedDb = { ...db };
    updatedDb.currentUser.personId = targetPlayer.id;
    updatedDb.currentUser.username = targetPlayer.name;
    onUpdateDb(updatedDb);
  };

  const handleUnlinkPlayer = () => {
    const updatedDb = { ...db };
    updatedDb.currentUser.personId = null;
    updatedDb.currentUser.username = 'Standard User';
    onUpdateDb(updatedDb);
  };

  const handleCreateAndLinkPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;

    const newId = `person-player-${Date.now()}`;
    const newPerson: Person = {
      id: newId,
      name: newPlayerName,
      avatar: newPlayerAvatar || 'https://cdn.shopify.com/s/files/1/1038/7203/7203/files/placeholder_profile_player_male.png?v=1784405789',
      birthdate: newPlayerBirthdate,
      nationality: newPlayerNationality,
      bio: newPlayerBio || 'Snelgroeiend sporttalent.',
      roles: ['Player'],
      playerPool: 'Vrije Agenten',
      teamIds: [],
      equipment: [
        {
          id: `eq-init-${Date.now()}`,
          type: 'stick',
          brand: 'Bauer',
          model: 'Nexus Sync',
          specifications: { flex: 77, curve: 'P92' },
          condition: 100
        }
      ],
      stats: {
        gamesPlayed: 0,
        goals: 0,
        assists: 0,
        points: 0,
        penaltyMinutes: 0,
        rating: 75,
        speed: 75,
        shooting: 75,
        passing: 75,
        defense: 75,
        physical: 75
      }
    };

    const updatedDb = { ...db };
    updatedDb.persons.push(newPerson);
    updatedDb.currentUser.personId = newId;
    updatedDb.currentUser.username = newPlayerName;
    onUpdateDb(updatedDb);

    // Reset form states
    setNewPlayerName('');
    setNewPlayerBio('');
    setShowCreatePlayerForm(false);
  };

  const handleTrainAttribute = (attribute: 'speed' | 'shooting' | 'passing' | 'defense' | 'physical') => {
    if (!person || !person.stats) return;

    const currentVal = person.stats[attribute] || 70;
    if (currentVal >= 99) {
      alert(`Je ${attribute} is al op het maximale niveau (99)!`);
      return;
    }

    setIsTraining(attribute);
    setTrainingFeedback(null);

    setTimeout(() => {
      const increase = Math.floor(Math.random() * 2) + 1; // 1 or 2 points
      const newVal = Math.min(99, currentVal + increase);

      const updatedStats = {
        ...person.stats,
        [attribute]: newVal
      };

      // Recalculate overall rating
      const total = updatedStats.speed + updatedStats.shooting + updatedStats.passing + updatedStats.defense + updatedStats.physical;
      updatedStats.rating = Math.round(total / 5);

      const updatedPersons = db.persons.map(p => {
        if (p.id === person.id) {
          return { ...p, stats: updatedStats };
        }
        return p;
      });

      const updatedDb = {
        ...db,
        persons: updatedPersons
      };

      onUpdateDb(updatedDb);
      setIsTraining(null);

      const skillNames: Record<string, string> = {
        speed: 'Snelheid',
        shooting: 'Schotkracht',
        passing: 'Paskwaliteit',
        defense: 'Defensieposities',
        physical: 'Fysieke Kracht'
      };

      setTrainingFeedback(`Training succesvol! Je ${skillNames[attribute]} is gestegen met +${increase} naar ${newVal}!`);
    }, 1000);
  };

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!person || !eqBrand || !eqModel) return;

    const itemSpec: Record<string, any> = {};
    if (eqType === 'stick') {
      itemSpec.flex = eqSpecNumber;
      itemSpec.curve = eqSpecValue || 'P92';
    } else if (eqType === 'skates') {
      itemSpec.size = eqSpecNumber;
    } else {
      itemSpec.color = eqSpecValue || 'Zwart';
    }

    const updatedDb = addEquipment(person.id, {
      type: eqType,
      brand: eqBrand,
      model: eqModel,
      specifications: itemSpec,
      condition: 100
    });

    onUpdateDb(updatedDb);
    setEqBrand('');
    setEqModel('');
    setEqSpecValue('');
    setShowAddEquipmentForm(false);
  };

  const handleMaintainEquipment = (equipmentId: string, type: string) => {
    if (!person) return;
    const updatedDb = updateEquipment(person.id, equipmentId, { condition: 100 });
    onUpdateDb(updatedDb);

    const maintainActions: Record<string, string> = {
      stick: 'Stick opnieuw ingetaped!',
      skates: 'Schaatsen vlijmscherp geslepen!',
      helmet: 'Helm vizier gepoetst en schroeven aangedraaid!',
      gloves: 'Handschoenen gedesinfecteerd en leer ingevet!'
    };

    alert(maintainActions[type] || 'Uitrusting succesvol onderhouden!');
  };

  const handleDeleteEquipmentItem = (equipmentId: string) => {
    if (!person) return;
    const isConfirmed = window.confirm('Weet je zeker dat je dit uitrustingsstuk wilt weggooien?');
    if (isConfirmed) {
      const updatedDb = deleteEquipment(person.id, equipmentId);
      onUpdateDb(updatedDb);
    }
  };

  const handleTransferRequest = (teamId: string | null, poolType: Person['playerPool'] = 'None') => {
    if (!person) return;

    let updatedDb: AppDatabase;
    if (teamId) {
      const team = db.teams.find(t => t.id === teamId);
      if (!team) return;
      updatedDb = movePlayerToTeam(person.id, teamId, 'None');
      alert(`Transfer verzoek geaccepteerd! Je speelt nu voor de ${team.name}!`);
    } else {
      updatedDb = movePlayerToTeam(person.id, null, poolType);
      alert(`Je bent nu verplaatst naar de globale spelerpool: "${poolType}"!`);
    }

    onUpdateDb(updatedDb);
  };

  // Find linked player teams
  const playerTeams = db.teams.filter(t => person?.teamIds?.includes(t.id));

  // Find matches of the player's teams
  const teamIds = playerTeams.map(t => t.id);
  const playerMatches = db.matches.filter(m => teamIds.includes(m.homeTeamId) || teamIds.includes(m.awayTeamId));

  // Count personal match contributions (goals / assists)
  const getPersonalContributions = (match: Match) => {
    if (!person || !match.events) return { goals: 0, assists: 0 };
    let goals = 0;
    let assists = 0;

    match.events.forEach(e => {
      if (e.type === 'Goal') {
        if (e.personId === person.id) goals++;
        if (e.assistPersonId === person.id) assists++;
      }
    });

    return { goals, assists };
  };

  return (
    <div className="space-y-6" id="standard-user-view">{/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-md relative overflow-hidden">
<div className="absolute right-0 top-0 opacity-10 transform translate-x-8 -translate-y-4">
<Award className="w-64 h-64" />
        </div>
        <div className="relative z-10 space-y-2">
<div className="flex items-center space-x-2">
<span className="bg-slate-100/30 text-slate-900 border border-slate-200/20 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              Standard User Dashboard
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Mijn Speler Kleedkamer</h2>
          <p className="text-xs text-slate-900 max-w-2xl">
            Beheer hier uw persoonlijke sport-paspoort. Train uw vaardigheden, onderhoud uw uitrusting, controleer uw wedstrijdstatistieken en regel uw teamtransfers.
          </p>
        </div>
      </div>

      {/* 2. Check if linked to a player */}
      {!person ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center max-w-3xl mx-auto space-y-6 shadow-sm" id="player-not-linked">
<div className="w-16 h-16 bg-slate-100 text-slate-900 border border-slate-200 rounded-full flex items-center justify-center mx-auto">
<User className="w-8 h-8" />
          </div>
          <div className="space-y-2">
<h3 className="text-lg font-bold text-slate-800">Koppel een Sporter</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Als Standard User bent u momenteel niet gekoppeld aan een actieve speler in de database. Kies hieronder een bestaande speler om direct diens paspoort te beheren, of maak een volledig nieuwe speler aan!
            </p>
          </div>

          {!showCreatePlayerForm ? (
            <div className="space-y-6 pt-2">
<form onSubmit={handleLinkToPlayer} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
<select
                  value={selectedExistingPlayerId}
                  onChange={(e) => setSelectedExistingPlayerId(e.target.value)}
                  className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
required
                >
                  <option value="">-- Kies een speler uit de database --</option>
                  {allPlayers.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.nationality} | Rating: {p.stats?.rating || 70})
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
disabled={!selectedExistingPlayerId}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold py-3 px-6 rounded-xl transition shadow-md shadow-blue-100 cursor-pointer disabled:opacity-50">
                  Koppel Speler
                </button>
              </form>

              <div className="relative flex py-2 items-center">
<div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-xs text-slate-400 font-bold uppercase tracking-wider">Of</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              <button
                onClick={() => setShowCreatePlayerForm(true)}
                className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-3 px-6 rounded-xl border border-slate-200 transition flex items-center justify-center space-x-2 mx-auto cursor-pointer">
<UserPlus className="w-4 h-4 text-slate-500" />
                <span>Nieuwe Eigen Speler Creëren &amp; Koppelen</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleCreateAndLinkPlayer} className="bg-slate-50 p-6 rounded-3xl border border-slate-200/60 text-left max-w-lg mx-auto space-y-4">
<h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider pb-2 border-b border-slate-200 flex justify-between items-center">
<span>Nieuw Speler Profiel</span>
                <button
                  type="button"
onClick={() => setShowCreatePlayerForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                  Annuleren
                </button>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
                  <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Volledige Naam</label>
                  <input
                    type="text"
value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    placeholder="bijv. Dennis van de Berg"
                    className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
required
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Geboortedatum</label>
                  <input
                    type="date"
value={newPlayerBirthdate}
                    onChange={(e) => setNewPlayerBirthdate(e.target.value)}
                    className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
                  <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Nationaliteit</label>
                  <input
                    type="text"
value={newPlayerNationality}
                    onChange={(e) => setNewPlayerNationality(e.target.value)}
                    placeholder="bijv. Nederlands"
                    className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none"
required
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Avatar Afbeelding URL</label>
                  <input
                    type="url"
value={newPlayerAvatar}
                    onChange={(e) => setNewPlayerAvatar(e.target.value)}
                    className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none"
required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Biografie / Speelstijl</label>
                <textarea
                  rows={2}
                  value={newPlayerBio}
                  onChange={(e) => setNewPlayerBio(e.target.value)}
                  placeholder="bijv. Rechtshandige aanvaller met een vlijmscherp polsschot."
                  className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none"
/>
              </div>

              <button
                type="submit"
className="w-full bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition shadow shadow-blue-100 cursor-pointer">
                Genereer Speler &amp; Koppel Direct
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="space-y-6">{/* Active linked player header widget */}
          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
<div className="flex items-center space-x-4">
<img
                src={person.avatar}
                alt={person.name}
                className="w-14 h-14 rounded-full border border-slate-200 object-cover shadow-sm"
referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center space-x-2">
<h3 className="font-bold text-slate-800 text-base">{person.name}</h3>
                  <span className="text-xs bg-slate-100 text-slate-900 border border-slate-200 px-2.5 py-0.5 rounded-full font-bold font-mono">
                    Rating {person.stats?.rating || 75}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Gekoppeld als uw actieve spelerspaspoort | {person.nationality} | Geboren op {person.birthdate}
                </p>
                {playerTeams.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mt-1.5">{playerTeams.map(t => (
                      <span key={t.id} className="text-[10px] bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md font-medium flex items-center space-x-1">
<TeamLogo logo={t.logo} name={t.name} size="xs" />
                        <span>{t.name}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-900 font-bold mt-1.5 flex items-center space-x-1">
<span>Momenteel contractloos (Spelerpool: {person.playerPool || 'Vrije Agenten'})</span>
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleUnlinkPlayer}
              className="bg-slate-100 hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer">
              Koppel Los van Speler
            </button>
          </div>

          {/* Tab buttons for sections */}
          <div className="flex border-b border-slate-200 space-x-2">
<button
              onClick={() => setActiveTabSection('stats')}
              className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 ${
                activeTabSection === 'stats'
                  ? 'border-slate-200 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              <span>Vaardigheden &amp; Training</span>
            </button>
            <button
              onClick={() => setActiveTabSection('locker')}
              className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 ${
                activeTabSection === 'locker'
                  ? 'border-slate-200 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Tas &amp; Uitrusting ({person.equipment?.length || 0})</span>
            </button>
            <button
              onClick={() => setActiveTabSection('matches')}
              className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 ${
                activeTabSection === 'matches'
                  ? 'border-slate-200 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Wedstrijdschema &amp; Stats ({playerMatches.length})</span>
            </button>
            <button
              onClick={() => setActiveTabSection('transfer')}
              className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 ${
                activeTabSection === 'transfer'
                  ? 'border-slate-200 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Transfer Beheer</span>
            </button>
          </div>

          {/* SECTION A: STATS & TRAINING */}
          {activeTabSection === 'stats' && (

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">{/* Left column: Skills dashboard */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
<div className="flex justify-between items-center pb-3 border-b border-slate-100">
<div>
                    <h3 className="font-bold text-sm text-slate-800">Technisch Paspoort</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Slijp uw vaardigheden door gerichte trainingen te doen.</p>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-900 border border-slate-200 px-3 py-1 rounded-full font-mono font-bold flex items-center space-x-1">
<Zap className="w-3.5 h-3.5 text-slate-900" />
                    <span>Algemeen: {person.stats?.rating || 75}</span>
                  </span>
                </div>

                {trainingFeedback && (
                  <div className="bg-slate-100 border border-slate-200 text-slate-900 p-4 rounded-3xl text-xs font-bold flex items-center space-x-2 animate-bounce">
<Sparkles className="w-4 h-4 text-slate-900" />
                    <span>{trainingFeedback}</span>
                  </div>
                )}

                <div className="space-y-5">{/* Skill speed */}
                  <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div className="flex-1 space-y-1">
<div className="flex justify-between items-center text-xs">
<span className="font-bold text-slate-700 flex items-center space-x-1.5">
<span>Snelheid (Speed)</span>
                        </span>
                        <span className="font-mono font-bold text-slate-900">{person.stats?.speed || 70} / 99</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
<div
                          className="bg-slate-100 h-2 rounded-full transition-all duration-500"
style={{ width: `${person.stats?.speed || 70}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      disabled={isTraining !== null}
                      onClick={() => handleTrainAttribute('speed')}
                      className="bg-slate-100 hover:bg-slate-100 disabled:bg-slate-300 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1 cursor-pointer self-start sm:self-auto">{isTraining === 'speed' ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Bezig...</span>
                        </>
                      ) : (
                        <>
                          <Dumbbell className="w-3.5 h-3.5" />
                          <span>Train Snelheid</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Skill shooting */}
                  <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div className="flex-1 space-y-1">
<div className="flex justify-between items-center text-xs">
<span className="font-bold text-slate-700 flex items-center space-x-1.5">
<span>Schieten (Shooting)</span>
                        </span>
                        <span className="font-mono font-bold text-slate-900">{person.stats?.shooting || 70} / 99</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
<div
                          className="bg-slate-100 h-2 rounded-full transition-all duration-500"
style={{ width: `${person.stats?.shooting || 70}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      disabled={isTraining !== null}
                      onClick={() => handleTrainAttribute('shooting')}
                      className="bg-slate-100 hover:bg-slate-100 disabled:bg-slate-300 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1 cursor-pointer self-start sm:self-auto">{isTraining === 'shooting' ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Bezig...</span>
                        </>
                      ) : (
                        <>
                          <Dumbbell className="w-3.5 h-3.5" />
                          <span>Train Schieten</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Skill passing */}
                  <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div className="flex-1 space-y-1">
<div className="flex justify-between items-center text-xs">
<span className="font-bold text-slate-700 flex items-center space-x-1.5">
<span>Passen (Passing)</span>
                        </span>
                        <span className="font-mono font-bold text-xsurple-600">{person.stats?.passing || 70} / 99</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
<div
                          className="bg-slate-100 h-2 rounded-full transition-all duration-500"
style={{ width: `${person.stats?.passing || 70}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      disabled={isTraining !== null}
                      onClick={() => handleTrainAttribute('passing')}
                      className="bg-slate-100 hover:bg-slate-100 disabled:bg-slate-300 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1 cursor-pointer self-start sm:self-auto">{isTraining === 'passing' ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Bezig...</span>
                        </>
                      ) : (
                        <>
                          <Dumbbell className="w-3.5 h-3.5" />
                          <span>Train Passen</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Skill defense */}
                  <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div className="flex-1 space-y-1">
<div className="flex justify-between items-center text-xs">
<span className="font-bold text-slate-700 flex items-center space-x-1.5">
<span>Verdediging (Defense)</span>
                        </span>
                        <span className="font-mono font-bold text-slate-900">{person.stats?.defense || 70} / 99</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
<div
                          className="bg-slate-100 h-2 rounded-full transition-all duration-500"
style={{ width: `${person.stats?.defense || 70}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      disabled={isTraining !== null}
                      onClick={() => handleTrainAttribute('defense')}
                      className="bg-slate-100 hover:bg-slate-100 disabled:bg-slate-300 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1 cursor-pointer self-start sm:self-auto">{isTraining === 'defense' ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Bezig...</span>
                        </>
                      ) : (
                        <>
                          <Dumbbell className="w-3.5 h-3.5" />
                          <span>Train Defensie</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Skill physical */}
                  <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div className="flex-1 space-y-1">
<div className="flex justify-between items-center text-xs">
<span className="font-bold text-slate-700 flex items-center space-x-1.5">
<span>Fysieke Kracht (Physical)</span>
                        </span>
                        <span className="font-mono font-bold text-slate-900">{person.stats?.physical || 70} / 99</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
<div
                          className="bg-slate-100 h-2 rounded-full transition-all duration-500"
style={{ width: `${person.stats?.physical || 70}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      disabled={isTraining !== null}
                      onClick={() => handleTrainAttribute('physical')}
                      className="bg-slate-100 hover:bg-slate-100 disabled:bg-slate-300 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1 cursor-pointer self-start sm:self-auto">{isTraining === 'physical' ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Bezig...</span>
                        </>
                      ) : (
                        <>
                          <Dumbbell className="w-3.5 h-3.5" />
                          <span>Train Fysiek</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right column: Stats Overview Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
<h3 className="font-bold text-sm text-slate-800 pb-3 border-b border-slate-100 flex items-center space-x-2">
<TrendingUp className="w-4 h-4 text-slate-900" />
                  <span>Carrière Statistieken</span>
                </h3>

                <div className="grid grid-cols-2 gap-4">
<div className="bg-slate-100/50 p-4 rounded-3xl border border-slate-200/50 text-center">
<span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">Wedstrijden</span>
                    <span className="text-2xl font-mono font-bold text-slate-900 mt-1 block">{person.stats?.gamesPlayed || 0}
                    </span>
                  </div>

                  <div className="bg-slate-100/50 p-4 rounded-3xl border border-slate-200/50 text-center">
<span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">Doelpunten</span>
                    <span className="text-2xl font-mono font-bold text-slate-900 mt-1 block">{person.stats?.goals || 0}
                    </span>
                  </div>

                  <div className="bg-slate-100/50 p-4 rounded-3xl border border-slate-200/50 text-center">
<span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">Assists</span>
                    <span className="text-2xl font-mono font-bold text-xsurple-700 mt-1 block">{person.stats?.assists || 0}
                    </span>
                  </div>

                  <div className="bg-slate-100/50 p-4 rounded-3xl border border-slate-200/50 text-center">
<span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">Punten</span>
                    <span className="text-2xl font-mono font-bold text-slate-900 mt-1 block">{person.stats?.points || 0}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
<div className="flex justify-between items-center text-xs">
<span className="text-slate-500 font-bold">Strafminuten (PIM)</span>
                    <span className="font-mono font-bold text-slate-700">{person.stats?.penaltyMinutes || 0} min</span>
                  </div>
                </div>

                <div className="text-center py-4 bg-slate-50 rounded-3xl border border-slate-100 space-y-2">
<p className="text-xs font-bold text-slate-700">Persoonlijke Quote</p>
                  <p className="text-xs text-slate-400 italic px-4">
                    &ldquo;{person.bio}&rdquo;
                  </p>
                </div>
              </div>
            </div>

          )}

          {/* SECTION B: LOCKER / EQUIPMENT */}
          {activeTabSection === 'locker' && (

              <div className="space-y-6 animate-fade-in">
<div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-6">
<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-3 border-b border-slate-100">
<div>
                    <h3 className="font-bold text-sm text-slate-800">Mijn Sporttas</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Beheer je sticks, schaatsen, helm en handschoenen. Houd ze in topconditie!</p>
                  </div>

                  <button
                    onClick={() => setShowAddEquipmentForm(!showAddEquipmentForm)}
                    className="bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto">
<PlusCircle className="w-4 h-4" />
                    <span>Nieuw Item Toevoegen</span>
                  </button>
                </div>

                {/* Add Equipment Form */}
                {showAddEquipmentForm && (
                  <form onSubmit={handleAddEquipment} className="bg-slate-50 p-5 rounded-3xl border border-slate-200/60 space-y-4 max-w-xl">
<h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider pb-1 border-b border-slate-200">
                      Nieuwe Uitrusting Registreren
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div>
                        <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Type Item</label>
                        <select
                          value={eqType}
                          onChange={(e) => setEqType(e.target.value as any)}
                          className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none">
<option value="stick">Stick</option>
                          <option value="skates">Schaatsen</option>
                          <option value="helmet">Helm</option>
                          <option value="gloves">Handschoenen</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Merk / Brand</label>
                        <input
                          type="text"
placeholder="bijv. Bauer, CCM, Warrior"
                          value={eqBrand}
                          onChange={(e) => setEqBrand(e.target.value)}
                          className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none"
required
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Modelnaam</label>
                        <input
                          type="text"
placeholder="bijv. Vapor Hyperlite 2"
                          value={eqModel}
                          onChange={(e) => setEqModel(e.target.value)}
                          className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none"
required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{eqType === 'stick' && (
                        <>
                          <div>
                            <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Stick Flex (Stijfheid)</label>
                            <input
                              type="number"
min="40"
                              max="110"
                              value={eqSpecNumber}
                              onChange={(e) => setEqSpecNumber(Number(e.target.value))}
                              className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none"
/>
                          </div>
                          <div>
                            <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Curve Bocht</label>
                            <input
                              type="text"
placeholder="bijv. P92, P29, W03"
                              value={eqSpecValue}
                              onChange={(e) => setEqSpecValue(e.target.value)}
                              className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none"
/>
                          </div>
                        </>
                      )}

                      {eqType === 'skates' && (
                        <div>
                          <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Schoenmaat</label>
                          <input
                            type="number"
step="0.5"
                            min="35"
                            max="49"
                            value={eqSpecNumber}
                            onChange={(e) => setEqSpecNumber(Number(e.target.value))}
                            className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none"
/>
                        </div>
                      )}

                      {(eqType === 'helmet' || eqType === 'gloves') && (
                        <div>
                          <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Kleurstelling</label>
                          <input
                            type="text"
placeholder="bijv. Zwart, Wit, Navy, Rood"
                            value={eqSpecValue}
                            onChange={(e) => setEqSpecValue(e.target.value)}
                            className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none"
/>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 pt-2">
<button
                        type="submit"
className="bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition cursor-pointer">
                        Item Toevoegen aan Tas
                      </button>
                      <button
                        type="button"
onClick={() => setShowAddEquipmentForm(false)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl transition cursor-pointer">
                        Annuleren
                      </button>
                    </div>
                  </form>
                )}

                {/* Equipment Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{person.equipment && person.equipment.map((item) => (
                    <div key={item.id} className="bg-slate-50/50 p-5 rounded-3xl border border-slate-200/70 flex flex-col justify-between space-y-4">
<div className="flex justify-between items-start">
<div className="flex items-center space-x-3">
<span className="p-2 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-center">{item.type === 'stick' && <Zap className="w-5 h-5 text-slate-900" />}
                            {item.type === 'skates' && <TrendingUp className="w-5 h-5 text-slate-900" />}
                            {item.type === 'helmet' && <Shield className="w-5 h-5 text-xsurple-500" />}
                            {item.type === 'gloves' && <Heart className="w-5 h-5 text-slate-900" />}
                          </span>
                          <div>
                            <span className="text-xs text-slate-400 uppercase font-mono font-bold tracking-wider">{item.type}</span>
                            <h4 className="font-bold text-xs text-slate-800 mt-0.5">{item.brand} {item.model}</h4>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteEquipmentItem(item.id)}
                          className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
title="Gooi weg uit tas">
<Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs text-slate-500 space-y-1 font-mono">{item.type === 'stick' && (
                          <>
                            <p><span className="text-slate-400">Flex:</span> {item.specifications.flex}</p>
                            <p><span className="text-slate-400">Curve:</span> {item.specifications.curve}</p>
                          </>
                        )}
                        {item.type === 'skates' && (
                          <p><span className="text-slate-400">Maat:</span> {item.specifications.size}</p>
                        )}
                        {(item.type === 'helmet' || item.type === 'gloves') && (
                          <p><span className="text-slate-400">Kleur:</span> {item.specifications.color || 'Standaard'}</p>
                        )}
                      </div>

                      {/* Condition slider bar */}
                      <div className="space-y-1.5">
<div className="flex justify-between text-xs font-bold">
<span className="text-slate-500">Conditie / Slijtage</span>
                          <span className={`font-mono ${item.condition < 40 ? 'text-slate-900' : item.condition < 75 ? 'text-slate-900' : 'text-slate-900'}`}>
                            {item.condition}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
<div
                            className={`h-full rounded-full transition-all duration-300 ${
                              item.condition < 40 ? 'bg-slate-100' : item.condition < 75 ? 'bg-slate-100' : 'bg-slate-100'
                            }`}
                            style={{ width: `${item.condition}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Maintain button */}
                      <button
                        onClick={() => handleMaintainEquipment(item.id, item.type)}
                        disabled={item.condition === 100}
                        className="w-full bg-white hover:bg-slate-50 disabled:bg-slate-50 text-slate-700 disabled:text-slate-400 text-xs font-bold py-2 px-3 rounded-xl border border-slate-200 transition flex items-center justify-center space-x-1.5 cursor-pointer">
<Wrench className="w-3.5 h-3.5 text-slate-500" />
                        <span>
                          {item.type === 'stick' ? 'Stick opnieuw tapen' : item.type === 'skates' ? 'Schaatsen slijpen' : 'Schoonmaken & polijsten'}
                        </span>
                      </button>
                    </div>
                  ))}

                  {(!person.equipment || person.equipment.length === 0) && (
                    <div className="col-span-2 text-center py-8 text-slate-400 text-xs">
                      Je hebt op dit moment geen spullen in je uitrustingtas liggen. Maak er snel hierboven een aan!
                    </div>
                  )}
                </div>
              </div>
            </div>

          )}

          {/* SECTION C: MATCH SCHEDULE & PERSONAL STATS */}
          {activeTabSection === 'matches' && (

              <div className="space-y-6 animate-fade-in">
<div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-6">
<div>
                  <h3 className="font-bold text-sm text-slate-800">Mijn Wedstrijden &amp; Persoonlijke Stats</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Hieronder ziet u de wedstrijden van uw teams. Uw eigen bijdragen aan het scorebord zijn met sterren gemarkeerd!</p>
                </div>

                <div className="space-y-4">{playerMatches.map((match) => {
                    const homeTeam = db.teams.find(t => t.id === match.homeTeamId);
                    const awayTeam = db.teams.find(t => t.id === match.awayTeamId);
                    const league = db.leagues.find(l => l.id === match.leagueId);

                    const contribs = getPersonalContributions(match);
                    const hasContrib = contribs.goals > 0 || contribs.assists > 0;

                    return (
                      <div
                        key={match.id}
                        className={`p-4 rounded-3xl border transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                          hasContrib
                            ? 'bg-slate-100/50 border-slate-200 shadow-sm'
                            : 'bg-slate-50/50 border-slate-200/70'
                        }`}
                      >
                        {/* Match details & Teams */}
                        <div className="flex-1 space-y-1.5">
<div className="flex items-center space-x-2 text-xs font-bold">
<span className="text-slate-400">{match.date}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-900 uppercase font-mono">{league?.name}</span>
                            <span className="text-slate-300">•</span>
                            <span className={`px-1.5 py-0.2 rounded ${
                              match.status === 'Played' ? 'bg-slate-200 text-slate-700' : 'bg-slate-100 text-slate-900'
                            }`}>
                              {match.status === 'Played' ? 'Gespeeld' : 'Gepland'}
                            </span>
                          </div>

                          <div className="flex items-center space-x-3 text-xs">
<span className="font-bold text-slate-800 flex items-center space-x-1">
<TeamLogo logo={homeTeam?.logo} name={homeTeam?.name} size="xs" />
                              <span>{homeTeam?.name}</span>
                            </span>
                            <span className="font-mono text-slate-500 font-bold">{match.status === 'Played' ? `${match.homeScore} - ${match.awayScore}` : 'VS'}
                            </span>
                            <span className="font-bold text-slate-800 flex items-center space-x-1">
<TeamLogo logo={awayTeam?.logo} name={awayTeam?.name} size="xs" />
                              <span>{awayTeam?.name}</span>
                            </span>
                          </div>
                        </div>

                        {/* Personal contributions highlighted */}
                        {match.status === 'Played' && (
                          <div className="flex items-center space-x-2">{hasContrib ? (
                              <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 flex items-center space-x-2 text-xs font-bold text-slate-900 shadow-sm animate-pulse">
<Star className="w-4 h-4 text-slate-900 fill-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                                <div>
                                  <p className="font-extrabold">JOUW MATCH CONTRIBUTE!</p>
                                  <p className="text-xs text-slate-900 font-mono">{contribs.goals > 0 && `${contribs.goals} Goal(s)`}
                                    {contribs.goals > 0 && contribs.assists > 0 && '  |  '}
                                    {contribs.assists > 0 && `${contribs.assists} Assist(s)`}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400 font-bold font-mono">Groot teamspel geleverd</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {playerMatches.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      Uw team heeft momenteel geen geplande of gespeelde wedstrijden geregistreerd in de competities.
                    </div>
                  )}
                </div>
              </div>
            </div>

          )}

          {/* SECTION D: TRANSFERS */}
          {activeTabSection === 'transfer' && (

              <div className="space-y-6 animate-fade-in">
<div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-6">
<div>
                  <h3 className="font-bold text-sm text-slate-800">Transfer- &amp; Contractbeheer</h3>
                  <p className="text-xs text-slate-400 mt-0.5">U kunt hier uw eigen clubtoewijzing aanvragen of uzelf in een van de globale pools plaatsen.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{/* Left: Transfer pool selectors */}
                  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/60 space-y-4">
<h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider pb-1 border-b border-slate-200 flex items-center space-x-1.5">
<RefreshCw className="w-4 h-4 text-xsurple-600" />
                      <span>Pool Toewijzing</span>
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      Wilt u tijdelijk contractloos zijn om uw diensten aan te bieden aan andere clubs of competities? Verplaats uzelf naar een globale pool:
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2">
<button
                        onClick={() => handleTransferRequest(null, 'Leenspelers')}
                        disabled={person.playerPool === 'Leenspelers'}
                        className={`flex-1 py-3 px-4 rounded-xl border font-bold text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                          person.playerPool === 'Leenspelers'
                            ? 'bg-slate-100 border-slate-200 text-slate-900 cursor-not-allowed'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span>Ga naar Leenspelers pool</span>
                      </button>

                      <button
                        onClick={() => handleTransferRequest(null, 'Vrije Agenten')}
                        disabled={person.playerPool === 'Vrije Agenten'}
                        className={`flex-1 py-3 px-4 rounded-xl border font-bold text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                          person.playerPool === 'Vrije Agenten'
                            ? 'bg-slate-100 border-slate-200 text-xsurple-600 cursor-not-allowed'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span>Word Vrije Agent</span>
                      </button>
                    </div>
                  </div>

                  {/* Right: Direct Team Sign-up */}
                  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/60 space-y-4">
<h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider pb-1 border-b border-slate-200 flex items-center space-x-1.5">
<Trophy className="w-4 h-4 text-slate-900" />
                      <span>Direct Tekenen bij een Club</span>
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      Kies een club uit de actieve competities om u direct aan de selectie toe te voegen en uw contract te tekenen:
                    </p>

                    <div className="space-y-2 max-h-[160px] overflow-y-auto hide-scrollbar hide-scrollbar">{db.teams.map((team) => {
                        const isMember = person.teamIds?.includes(team.id);
                        return (
                          <div
                            key={team.id}
                            className="bg-white p-2.5 rounded-xl border border-slate-200/70 flex justify-between items-center text-xs">
<span className="font-bold text-slate-800 flex items-center space-x-1.5">
<TeamLogo logo={team.logo} name={team.name} size="xs" />
                              <span>{team.name} ({team.city})</span>
                            </span>
                            {isMember ? (
                              <span className="text-xs font-extrabold bg-slate-100 text-slate-900 border border-slate-200 px-2 py-0.5 rounded">
                                ACTIEVE CLUB
                              </span>
                            ) : (
                              <button
                                onClick={() => handleTransferRequest(team.id, 'None')}
                                className="bg-slate-900 hover:bg-slate-950 text-white text-[10px] font-extrabold px-3 py-1 rounded transition cursor-pointer">
                                TEKEN CONTRACT
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )}
        </div>
      )}
    </div>
  );
};
