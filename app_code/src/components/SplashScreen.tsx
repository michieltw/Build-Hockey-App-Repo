import React, { useState } from 'react';
import { AppDatabase, UserRole, Person } from '../types';
import { LogIn, UserPlus, ArrowRight, Mail, User, Trophy, Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import { HouseLeagueLogo } from './HouseLeagueLogo';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  db: AppDatabase;
  onLogin: (role: UserRole, personId: string | null, username: string, email: string) => void;
  onRegister: (person: Omit<Person, 'id'>, systemRole: UserRole, email: string) => void;
  onContinueAsGuest: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  db,
  onLogin,
  onRegister,
  onContinueAsGuest,
}) => {
  const [introStage, setIntroStage] = useState<'countdown' | 'video' | 'splash'>('countdown');
  const [countdown, setCountdown] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (introStage === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setIntroStage('video');
      }
    }
  }, [introStage, countdown]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 33 && !showPopup) {
      setShowPopup(true);
    }
  };

  const handleSkip = () => {
    setIntroStage('splash');
    setShowPopup(true);
  };

  const [activeMode, setActiveMode] = useState<'login' | 'register'>('login');

  // Login states
  const [loginMethod, setLoginMethod] = useState<'quick' | 'manual'>('quick');
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regBirthdate, setRegBirthdate] = useState('1995-05-15');
  const [regNationality, setRegNationality] = useState('Nederlands');
  const [regBio, setRegBio] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('StandardUser');
  const [regError, setRegError] = useState('');

  // List of pre-seeded quick identities
  const quickIdentities = [
    {
      id: 'person-admin',
      name: 'Admin Gebruiker',
      role: 'MultiLeagueOfficer' as UserRole,
      roleLabel: 'Multi-League Officer',
      email: 'admin@test.nl',
      avatar: 'https://cdn.shopify.com/s/files/1/1038/7203/7203/files/placeholder_profile_male.png?v=1784405792',
      desc: 'Beheert het gehele Groningen House League ecosysteem.',
    },
    {
      id: 'person-lo',
      name: 'Competitie Beheerder',
      role: 'LeagueOfficer' as UserRole,
      roleLabel: 'League Officer',
      email: 'lo@test.nl',
      avatar: 'https://cdn.shopify.com/s/files/1/1038/7203/7203/files/placeholder_profile_female.png?v=1784405791',
      desc: 'Competitieleider van de Groningen House League.',
    },
    {
      id: 'person-manager',
      name: 'Team Manager',
      role: 'Manager' as UserRole,
      roleLabel: 'Team Manager & Player',
      email: 'manager@test.nl',
      avatar: 'https://cdn.shopify.com/s/files/1/1038/7203/7203/files/placeholder_profile_player_male.png?v=1784405789',
      desc: 'Beheert een specifiek team.',
    },
    {
      id: 'person-player',
      name: 'Standaard Speler',
      role: 'StandardUser' as UserRole,
      roleLabel: 'Standard Player',
      email: 'speler@test.nl',
      avatar: 'https://cdn.shopify.com/s/files/1/1038/7203/7203/files/placeholder_profile_player_male.png?v=1784405789',
      desc: 'Een speler in het systeem.',
    }
  ];

  const handleQuickLogin = (id: typeof quickIdentities[0]) => {
    onLogin(id.role, id.id, id.name, id.email);
  };

  const handleManualLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) {
      setLoginError('Vul a.u.b. een naam of gebruikersnaam in.');
      return;
    }

    const email = manualEmail.trim() || `${manualName.toLowerCase().replace(/\s+/g, '')}@test.nl`;

    // Check if there is an existing person with this exact name (case insensitive)
    const existingPerson = db.persons.find(
      p => p.name.toLowerCase() === manualName.trim().toLowerCase()
    );

    if (existingPerson) {
      // Find what role this person holds or fallback to StandardUser
      let detectedRole: UserRole = 'StandardUser';
      if (existingPerson.roles.includes('MultiLeagueOfficer')) detectedRole = 'MultiLeagueOfficer';
      else if (existingPerson.roles.includes('LeagueOfficer')) detectedRole = 'LeagueOfficer';
      else if (existingPerson.roles.includes('Manager')) detectedRole = 'Manager';

      onLogin(detectedRole, existingPerson.id, existingPerson.name, email);
    } else {
      // Create on the fly as a standard user
      onLogin('StandardUser', null, manualName.trim(), email);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) {
      setRegError('Vul a.u.b. een volledige naam in.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError('Vul a.u.b. een geldig e-mailadres in.');
      return;
    }

    // Prepare roles array
    const roles: Person['roles'] = ['User'];
    if (regRole === 'StandardUser') roles.push('Player');
    if (regRole === 'Manager') roles.push('Manager');
    if (regRole === 'LeagueOfficer') roles.push('LeagueOfficer');
    if (regRole === 'MultiLeagueOfficer') roles.push('MultiLeagueOfficer');

    const newPersonData: Omit<Person, 'id'> = {
      name: regName.trim(),
      avatar: 'https://cdn.shopify.com/s/files/1/1038/7203/7203/files/placeholder_profile_male.png?v=1784405792',
      birthdate: regBirthdate,
      nationality: regNationality,
      bio: regBio.trim() || `Nieuw geregistreerde ${regRole.toLowerCase()} op de Groningen House League Hub.`,
      roles,
      teamIds: [],
      playerPool: regRole === 'StandardUser' ? 'Vrije Agenten' : 'None'
    };

    onRegister(newPersonData, regRole, regEmail.trim());
  };

  if (introStage === 'countdown') {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
        <div className="absolute top-8 right-8">
          <button
            onClick={handleSkip}
            className="text-white border border-white px-6 py-2 rounded-xl font-bold uppercase tracking-wider hover:bg-white hover:text-black transition"
          >
            Skip intro
          </button>
        </div>
        <div className="text-white text-9xl font-mono font-black animate-pulse">
          {countdown}
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto hide-scrollbar flex items-center justify-center min-h-screen p-4 bg-slate-50 relative"
      style={introStage === 'splash' ? {
        backgroundImage: `linear-gradient(to bottom, rgba(248, 250, 252, 0.45), rgba(248, 250, 252, 0.95)), url('https://cdn.shopify.com/s/files/1/1038/7203/7203/files/kardinge2.png?v=1784547269')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      } : { backgroundColor: 'black' }}
    >
      {introStage === 'video' && (
        <>
          <video
            ref={videoRef}
            src="https://cdn.shopify.com/videos/c/o/v/6136477fae404e9b963710cf98c89366.mp4"
            autoPlay
            playsInline
            loop
            onTimeUpdate={handleTimeUpdate}
            className="fixed inset-0 w-full h-full object-cover z-0"
          />
          {showPopup && <div className="fixed inset-0 bg-black/30 z-0 transition-opacity duration-1000" />}
        </>
      )}

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-4xl bg-white/40 backdrop-blur-xl border border-slate-200 rounded-3xl overflow-hidden shadow-[2px_10px_40px_rgba(0,0,0,0.1)] my-8 flex flex-col md:flex-row min-h-[580px] relative z-10"
          >

        {/* Left Side: Brand presentation */}
        <div className="w-full md:w-5/12 bg-white/80 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r-4 border-slate-100 relative overflow-hidden">
          {/* Accent light decoration */}
          <div className="absolute top-0 left-0 w-36 h-36 bg-slate-900/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-36 h-36 bg-slate-900/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo Brand Header */}
          <div className="relative z-10 flex items-center gap-3">
            <HouseLeagueLogo size={56} />
            <div>
              <h1 className="font-display font-black text-xsl text-slate-950 tracking-tight leading-none">
                GIJS <span className="text-slate-900">GRONINGEN</span>
              </h1>
              <p className="text-xs font-mono font-black text-slate-900 uppercase tracking-wider mt-0.5">
                House League Manager
              </p>
            </div>
          </div>

          {/* Slogan & Welcome content */}
          <div className="relative z-10 my-8 space-y-4">
            <span className="inline-flex items-center gap-1 text-xs bg-slate-900/10 text-slate-900 border border-[#DC2626]/30 px-2.5 py-1 rounded-full font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 animate-spin" /> Official Closed Alpha Portal v0.7 - App ed.
            </span>
            <h2 className="text-2xl font-black text-slate-950 leading-tight tracking-tight uppercase">
              Stap op het ijs van <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-amber-600 to-amber-700">
                {db.association.locations[0].name}
              </span>
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              Beheer competities, bepaal teamtactieken, bekijk live standen en ervaar de meest complete manier om jouw game vanuit elk perspectief te beleven.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-600 font-bold">
                <Trophy className="w-4 h-4 text-slate-900 shrink-0" />
                <span>Multi-league Ecosystem Manager</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600 font-bold">
                <Calendar className="w-4 h-4 text-slate-900 shrink-0" />
                <span>Plan Wedstrijden, RSVP Trainingen en Organiseer Events</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600 font-bold">
                <ShieldCheck className="w-4 h-4 text-slate-900 shrink-0" />
                <span>Beheer jouw Persoonlijke Spelersprofiel</span>
              </div>
            </div>
          </div>

          {/* Footer of brand */}
          <div className="relative z-10 pt-4 border-t border-slate-200 flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">
              Custom edition - Custom Manager Game
            </span>
            <img
              src="https://cdn.shopify.com/s/files/1/1038/7203/7203/files/BOLOGOBLACK.png?v=1784323868"
              alt="App Logo"
              className="h-6 w-auto object-contain opacity-60"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right Side: Auth Tabs & Inputs */}
        <div className="w-full md:w-7/12 bg-slate-50/65 p-8 flex flex-col justify-between">
          <div className="space-y-6">

            {/* Tabs for Login & Register */}
            <div className="flex border-b border-slate-200 pb-px">
              <button
                onClick={() => setActiveMode('login')}
                className={`flex-1 pb-3 text-sm font-black uppercase tracking-wider border-b-2 transition-all ${
                  activeMode === 'login'
                    ? 'border-slate-950 text-slate-950'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Inloggen
              </button>
              <button
                onClick={() => setActiveMode('register')}
                className={`flex-1 pb-3 text-sm font-black uppercase tracking-wider border-b-2 transition-all ${
                  activeMode === 'register'
                    ? 'border-slate-950 text-slate-950'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Registreren
              </button>
            </div>

            {/* TAB CONTENT: LOGIN */}
            {activeMode === 'login' && (
              <div className="space-y-5">
                {/* Selector for quick vs manual login */}
                <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200 text-xs font-bold uppercase">
                  <button
                    onClick={() => setLoginMethod('quick')}
                    className={`flex-1 py-1.5 rounded-lg transition-all ${
                      loginMethod === 'quick'
                        ? 'bg-white text-slate-950 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Snel Inloggen (Simulatie)
                  </button>
                  <button
                    onClick={() => setLoginMethod('manual')}
                    className={`flex-1 py-1.5 rounded-lg transition-all ${
                      loginMethod === 'manual'
                        ? 'bg-white text-slate-950 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Handmatig Inloggen
                  </button>
                </div>

                {/* LOGIN METHOD 1: QUICK SIMULATOR LOGIN */}
                {loginMethod === 'quick' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600 font-semibold">
                      Kies een bestaande identiteit om direct met hun rechten &amp; specifieke dashboard te spelen:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {quickIdentities.map((id) => (
                        <button
                          key={id.id}
                          onClick={() => handleQuickLogin(id)}
                          className="text-left bg-white/60 hover:bg-white border border-slate-200 hover:border-slate-300 p-3 rounded-3xl transition duration-200 group flex items-start space-x-3 text-slate-950"
                        >
                          <img
                            src={id.avatar}
                            alt={id.name}
                            className="w-10 h-10 rounded-full border-2 border-slate-200 group-hover:border-[#F59E0B] object-cover bg-slate-100 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-grow">
                            <h4 className="font-extrabold text-xs text-slate-950 truncate leading-snug group-hover:text-slate-900">
                              {id.name}
                            </h4>
                            <span className="inline-block text-[10px] font-mono font-bold uppercase text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 mt-1">
                              {id.roleLabel}
                            </span>
                            <p className="text-[10px] text-slate-500 font-semibold line-clamp-1 mt-1 leading-normal">
                              {id.desc}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* LOGIN METHOD 2: MANUAL CREDENTIALS */}
                {loginMethod === 'manual' && (
                  <form onSubmit={handleManualLoginSubmit} className="space-y-4">
                    <p className="text-xs text-slate-600 font-semibold">
                      Voer je gebruikersnaam of e-mailadres in. Als de naam overeenkomt met een speler, log je in op diens profiel.
                    </p>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                          Gebruikersnaam of Volledige Naam
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Bijv. Jan Smit"
                            value={manualName}
                            onChange={(e) => {
                              setManualName(e.target.value);
                              setLoginError('');
                            }}
                            className="w-full bg-white/80 text-slate-950 font-semibold text-xs border border-slate-300 focus:border-slate-950 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                          E-mailadres <span className="text-slate-400">(Optioneel)</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            placeholder="naam@voorbeeld.nl"
                            value={manualEmail}
                            onChange={(e) => setManualEmail(e.target.value)}
                            className="w-full bg-white/80 text-slate-950 font-semibold text-xs border border-slate-300 focus:border-slate-950 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    </div>

                    {loginError && (
                      <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold">
                        {loginError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-slate-950 hover:bg-slate-800 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-slate-950 shadow-md"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Inloggen en doorgaan</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB CONTENT: REGISTER */}
            {activeMode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 font-semibold">
                  Maak een gloednieuw profiel aan in de database om je eigen speler, team of bondskantoor te beheren.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      Volledige Naam
                    </label>
                    <input
                      type="text"
                      placeholder="Bijv. Thomas de Boer"
                      value={regName}
                      onChange={(e) => {
                        setRegName(e.target.value);
                        setRegError('');
                      }}
                      className="w-full bg-white/80 text-slate-950 font-semibold text-xs border border-slate-300 focus:border-slate-950 rounded-xl px-3 py-2.5 focus:outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      E-mailadres
                    </label>
                    <input
                      type="email"
                      placeholder="info@domein.nl"
                      value={regEmail}
                      onChange={(e) => {
                        setRegEmail(e.target.value);
                        setRegError('');
                      }}
                      className="w-full bg-white/80 text-slate-950 font-semibold text-xs border border-slate-300 focus:border-slate-950 rounded-xl px-3 py-2.5 focus:outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      Geboortedatum
                    </label>
                    <input
                      type="date"
                      value={regBirthdate}
                      onChange={(e) => setRegBirthdate(e.target.value)}
                      className="w-full bg-white/80 text-slate-950 font-semibold text-xs border border-slate-300 focus:border-slate-950 rounded-xl px-3 py-2.5 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      Nationaliteit
                    </label>
                    <input
                      type="text"
                      placeholder="Nederlands"
                      value={regNationality}
                      onChange={(e) => setRegNationality(e.target.value)}
                      className="w-full bg-white/80 text-slate-950 font-semibold text-xs border border-slate-300 focus:border-slate-950 rounded-xl px-3 py-2.5 focus:outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Selecteer Systeemrol &amp; Machtigingen
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as UserRole)}
                    className="w-full bg-white/80 text-slate-950 font-semibold text-xs border border-slate-300 focus:border-slate-950 rounded-xl px-3 py-2.5 focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="StandardUser">Speler / Standard User (Eigen spelerstatistieken &amp; uitrusting)</option>
                    <option value="Manager">Team Manager (Beheer tactieken, opstellingen &amp; transfermarkt)</option>
                    <option value="LeagueOfficer">League Officer (Beheer wedstrijden, scheidsrechters &amp; toernooien)</option>
                    <option value="MultiLeagueOfficer">Multi-League Officer (Volledige controle over alles en iedereen)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Korte Bio / Introductie
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Vertel iets over jezelf of je ambities..."
                    value={regBio}
                    onChange={(e) => setRegBio(e.target.value)}
                    className="w-full bg-white/80 text-slate-950 font-semibold text-xs border border-slate-300 focus:border-slate-950 rounded-xl px-3 py-2.5 focus:outline-none transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>

                {regError && (
                  <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold">
                    {regError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-slate-200 shadow-md hover:brightness-110"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Profiel aanmaken &amp; inloggen</span>
                </button>
              </form>
            )}

          </div>

          {/* Guest Continuation Option */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-xs font-black text-slate-950 uppercase tracking-tight">Geen account nodig?</h4>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5 leading-normal">
                Verken de standen, statistieken en kalender zonder profiel of schrijfrechten.
              </p>
            </div>

            <button
              onClick={onContinueAsGuest}
              className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs rounded-xl uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1.5 border border-slate-200 hover:border-slate-300"
            >
              <span>Verder als gast</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
