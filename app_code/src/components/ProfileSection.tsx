import React, { useState } from 'react';
import { AppDatabase, Person, PersonRoleType } from '../types';
import { updatePersonProfile, createPerson, switchUserRole } from '../services';
import { User, Award, Shield, PlusCircle, PenTool, CheckCircle, ListPlus, Sliders } from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface ProfileSectionProps {
  db: AppDatabase;
  onUpdateDb: (updatedDb: AppDatabase) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ db, onUpdateDb}) => {
  const currentPersonId = db.currentUser.personId;
  const person = db.persons.find((p) => p.id === currentPersonId);

  // Profile Form States
  const [name, setName] = useState(person?.name || db.currentUser.username);
  const [birthdate, setBirthdate] = useState(person?.birthdate || '1995-01-01');
  const [nationality, setNationality] = useState(person?.nationality || 'Nederlands');
  const [bio, setBio] = useState(person?.bio || '');
  const [avatar, setAvatar] = useState(person?.avatar || 'https://cdn.shopify.com/s/files/1/1038/7203/7203/files/placeholder_profile_male.png?v=1784405792');

  // Multiple Roles State (Player, Manager, or both!)
  const [isPlayer, setIsPlayer] = useState(person?.roles.includes('Player') || false);
  const [isManager, setIsManager] = useState(person?.roles.includes('Manager') || false);

  // Player pool choice
  const [playerPool, setPlayerPool] = useState<Person['playerPool']>(person?.playerPool || 'None');

  // Multi-team choice: Speler kan in meerdere teams / competities spelen!
  const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>(person?.teamIds || []);

  const [isSaving, setIsSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Sync state with db loaded profile
  React.useEffect(() => {
    if (person) {
      setName(person.name);
      setBirthdate(person.birthdate);
      setNationality(person.nationality);
      setBio(person.bio);
      setAvatar(person.avatar);
      setIsPlayer(person.roles.includes('Player'));
      setIsManager(person.roles.includes('Manager'));
      setPlayerPool(person.playerPool || 'None');
      setSelectedTeamIds(person.teamIds || []);
    }
  }, [person]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const roles: PersonRoleType[] = [];
    if (isPlayer) roles.push('Player');
    if (isManager) roles.push('Manager');

    if (roles.length === 0) {
      alert('Kies minimaal 1 rol voor je profiel (Speler of Manager)!');
      setIsSaving(false);
      return;
    }

    let updatedDb: AppDatabase;

    if (person) {
      // 1. Update existing profile
      updatedDb = updatePersonProfile(person.id, {
        name,
        birthdate,
        nationality,
        bio,
        avatar,
        roles,
        playerPool: isPlayer ? playerPool : 'None',
        teamIds: isPlayer ? selectedTeamIds : [],
      });

      // Also ensure current user username matches updated name
      updatedDb.currentUser.username = name;
      // Sync team player rosters dynamically
      updatedDb.teams = updatedDb.teams.map((t) => {
        const shouldBeInTeam = selectedTeamIds.includes(t.id) && isPlayer;
        const isInTeam = t.playerIds.includes(person.id);

        if (shouldBeInTeam && !isInTeam) {
          return { ...t, playerIds: [...t.playerIds, person.id] };
        } else if (!shouldBeInTeam && isInTeam) {
          return { ...t, playerIds: t.playerIds.filter((pid) => pid !== person.id) };
        }
        return t;
      });

      onUpdateDb(updatedDb);
    } else {
      // 2. Create a brand new Person profile and link it to the user
      const tempId = `person-${Date.now()}`;
      const newPerson: Person = {
        id: tempId,
        name,
        avatar,
        birthdate,
        nationality,
        bio,
        roles,
        playerPool: isPlayer ? playerPool : 'None',
        teamIds: isPlayer ? selectedTeamIds : [],
        equipment: isPlayer ? [
          {
            id: `eq-${Date.now()}`,
            type: 'stick',
            brand: 'Bauer',
            model: 'Nexus Sync',
            specifications: { flex: 77, curve: 'P92' },
            condition: 100,
          },
        ] : [],
        stats: isPlayer ? {
          gamesPlayed: 0,
          goals: 0,
          assists: 0,
          points: 0,
          penaltyMinutes: 0,
          rating: 80,
          speed: 80,
          shooting: 80,
          passing: 80,
          defense: 80,
          physical: 80,
        } : undefined,
      };

      updatedDb = db;
      updatedDb.persons.push(newPerson);
      updatedDb.currentUser.personId = tempId;
      updatedDb.currentUser.username = name;

      // Sync teams
      updatedDb.teams = updatedDb.teams.map((t) => {
        if (selectedTeamIds.includes(t.id) && isPlayer) {
          return { ...t, playerIds: [...t.playerIds, tempId] };
        }
        return t;
      });

      onUpdateDb(updatedDb);
    }

    setIsSaving(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleToggleTeamSelection = (teamId: string) => {
    if (selectedTeamIds.includes(teamId)) {
      setSelectedTeamIds(selectedTeamIds.filter((id) => id !== teamId));
    } else {
      setSelectedTeamIds([...selectedTeamIds, teamId]);
    }
  };

  // Switch between other pre-defined personas to experience their views
  const handleLinkExistingProfile = (pId: string) => {
    const targetPerson = db.persons.find((p) => p.id === pId);
    if (!targetPerson) return;

    // Automatically set the appropriate systemRole based on the chosen Person
    let targetSystemRole = db.currentUser.systemRole;
    if (targetSystemRole !== 'StandardUser') {
      if (targetPerson.roles.includes('Manager')) {
        targetSystemRole = 'Manager';
      } else if (targetPerson.roles.includes('Player')) {
        targetSystemRole = 'Guest'; // Guests can view statistics
      }
    }

    const updated = switchUserRole(targetSystemRole, pId);
    onUpdateDb(updated);
  };

  return (

      <div className="space-y-6" id="profile-view">{/* Introduction Banner */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
<User className="w-5 h-5 text-slate-900" />
            <span>Profielinrichting &amp; Persoonskoppeling</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Richt hier je uitgebreide sport-paspoort in. Koppel meerdere rollen (Speler en/of Manager) aan je identiteit.
          </p>
        </div>

        {/* Form notification toast */}
        {showNotification && (
          <div className="bg-slate-100 border border-slate-200 text-slate-900 text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 animate-bounce shadow-sm">
<CheckCircle className="w-4 h-4 text-slate-900" />
            <span className="font-semibold">Profiel succesvol gesynchroniseerd!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">{/* Profile Form */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6">
<h3 className="font-bold text-sm text-slate-800 mb-5 flex items-center space-x-1.5 pb-3 border-b border-slate-100">
<PenTool className="w-4 h-4 text-slate-900" />
            <span>Persoonlijke Gegevens</span>
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-5">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
                <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Volledige Naam</label>
                <input
                  type="text"
value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 hover:border-slate-300 focus:outline-none focus:border-slate-200 focus:ring-1 focus:ring-blue-500 transition-all"
required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Geboortedatum</label>
                <input
                  type="date"
value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 hover:border-slate-300 focus:outline-none focus:border-slate-200 focus:ring-1 focus:ring-blue-500 transition-all"
required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
                <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Nationaliteit</label>
                <input
                  type="text"
value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 hover:border-slate-300 focus:outline-none focus:border-slate-200 focus:ring-1 focus:ring-blue-500 transition-all"
required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Avatar Afbeelding URL</label>
                <input
                  type="url"
value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 hover:border-slate-300 focus:outline-none focus:border-slate-200 focus:ring-1 focus:ring-blue-500 transition-all"
required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Biografie / Ervaring</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 hover:border-slate-300 focus:outline-none focus:border-slate-200 focus:ring-1 focus:ring-blue-500 transition-all"
placeholder="Schrijf hier iets over je sport carrière..."
              />
            </div>

            {/* Multiple Roles Checkbox Group */}
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
<label className="block text-xs text-slate-700 font-bold mb-3">Persoonlijke Rollen (Kies meerdere!)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<label className="flex items-start space-x-3 cursor-pointer p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all">
<input
                    type="checkbox"
checked={isPlayer}
                    onChange={(e) => setIsPlayer(e.target.checked)}
                    className="mt-1 accent-blue-600 rounded"
/>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Speler (Player)</span>
                    <span className="text-xs text-slate-500">Geeft je sticks, statistieken, teamselecties en poolopties.</span>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all">
<input
                    type="checkbox"
checked={isManager}
                    onChange={(e) => setIsManager(e.target.checked)}
                    className="mt-1 accent-amber-600 rounded"
/>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Manager</span>
                    <span className="text-xs text-slate-500">Geeft je bevoegdheden om clubs te trainen en opstellingen te maken.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Conditional Spelersectie */}
            {isPlayer && (
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 space-y-5 animate-fade-in">
<h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1">
<span>Extra Spelerinstellingen</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
                    <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Spelerpool</label>
                    <select
                      value={playerPool}
                      onChange={(e) => setPlayerPool(e.target.value as any)}
                      className="w-full bg-white text-slate-800 text-xs border border-slate-200 rounded-lg p-2.5 hover:border-slate-300 focus:outline-none focus:border-slate-200 focus:ring-1 focus:ring-blue-500 transition-all">
<option value="None">Geen Pool (Vaste speler)</option>
                      <option value="Leenspelers">Leenspelers (Onderdeel van leen-pool)</option>
                      <option value="Vrije Agenten">Vrije Agenten (Transfervrij)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Gekoppeld aan Teams (Kan meerdere!)</label>
                    <div className="space-y-2 max-h-[120px] overflow-y-auto hide-scrollbar pr-2">{db.teams.map((t) => {
                        const isSelected = selectedTeamIds.includes(t.id);
                        return (
                          <button
                            key={t.id}
                            type="button"
onClick={() => handleToggleTeamSelection(t.id)}
                            className={`w-full text-left p-2 rounded text-xs flex justify-between items-center transition border ${
                              isSelected
                                ? 'bg-slate-100 border-slate-200 text-slate-900 font-bold shadow-sm'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <span className="flex items-center space-x-1.5">
<TeamLogo logo={t.logo} name={t.name} size="xs" />
                              <span>{t.name} ({t.city})</span>
                            </span>
                            {isSelected && <span className="text-xs bg-slate-100 text-white px-1.5 py-0.5 rounded-md">Actief</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {person?.stats && (
                  <div>
                    <h5 className="text-xs font-bold text-slate-700 uppercase mb-3">Jouw Speler Statistieken</h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
<div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
<span className="text-xs text-slate-500 block">Gespeelde Wedstrijden</span>
                        <span className="text-sm font-mono font-bold text-slate-800">{person.stats.gamesPlayed}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
<span className="text-xs text-slate-500 block">Doelpunten / Goals</span>
                        <span className="text-sm font-mono font-bold text-slate-900">{person.stats.goals}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
<span className="text-xs text-slate-500 block">Assists</span>
                        <span className="text-sm font-mono font-bold text-slate-900">{person.stats.assists}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
disabled={isSaving}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-blue-100 cursor-pointer">{isSaving ? 'Opslaan...' : 'Mijn Profiel Opslaan & Synchroniseren'}
            </button>
          </form>
        </div>

        {/* Identity & Person Link Status */}
        <div className="space-y-6">
<div className="bg-white border border-slate-200 rounded-3xl overflow-hidden p-5 shadow-sm">
<h3 className="font-bold text-sm text-slate-800 mb-3 flex items-center space-x-1.5 pb-2 border-b border-slate-100">
<Award className="w-4 h-4 text-slate-900" />
              <span>Sport Paspoort</span>
            </h3>

            {person ? (
              <div className="text-center py-4 space-y-4">
<div className="relative inline-block">
<img
                    src={avatar}
                    alt={name}
                    className="w-20 h-20 rounded-full border-2 border-slate-200 mx-auto object-cover referrer-no-referrer shadow-sm"
referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 bg-slate-100 border border-white text-[10px] font-bold text-white rounded-full px-1.5 py-0.5 shadow">
                    GEKOPPELD
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800">{name}</h4>
                  <p className="text-xs text-slate-400">{nationality} | Geboren in {birthdate.substring(0, 4)}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center">{person.roles.map((r, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold bg-slate-100 text-slate-900 border border-slate-200 px-2.5 py-0.5 rounded-full">{r === 'Player' ? 'Player' : 'Manager'}
                    </span>
                  ))}
                  {person.playerPool && person.playerPool !== 'None' && (
                    <span className="text-[10px] font-bold bg-slate-100 text-xsurple-600 border border-slate-200 px-2.5 py-0.5 rounded-full">
                      Pool: {person.playerPool}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-3xl border border-slate-100">
                  &ldquo;{bio || 'Geen bio ingevuld.'}&rdquo;
                </p>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
<User className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500">Je bent momenteel niet gekoppeld aan een Person profiel.</p>
                <p className="text-xs text-slate-400">Vul het formulier links in om direct je profiel te creëren!</p>
              </div>
            )}
          </div>

          {/* Quick links to predefined persons */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden p-5 shadow-sm">
<h3 className="font-bold text-sm text-slate-800 mb-3 flex items-center space-x-1.5 pb-2 border-b border-slate-100">
<ListPlus className="w-4 h-4 text-xsurple-500" />
              <span>Snelkoppeling Identiteit</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Koppel je account direct aan een van de actieve personen in het sport-universum:
            </p>

            <div className="space-y-2">{db.persons.map((p) => {
                const isSelected = p.id === currentPersonId;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleLinkExistingProfile(p.id)}
                    className={`w-full text-left p-2 rounded-xl border transition-all flex items-center space-x-2.5 ${
                      isSelected
                        ? 'bg-slate-100 border-slate-200 shadow-sm'
                        : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-6 h-6 rounded-full object-cover referrer-no-referrer"
referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline">
<span className="text-xs font-bold text-slate-800 truncate">{p.name}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">{p.nationality}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">
                        Rollen: {p.roles.join(' & ')}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
