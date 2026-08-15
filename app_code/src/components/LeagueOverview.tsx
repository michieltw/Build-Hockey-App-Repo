import React, { useState } from 'react';
import { AppDatabase, Person, Team, Match, CalendarEvent } from '../types';
import { HouseLeagueLogo } from './HouseLeagueLogo';
import {
  Search, Mail, Phone, MapPin, Send, CheckCircle,
  User, Shield, Calendar, Trophy, BookOpen, Clock, HelpCircle
} from 'lucide-react';
import { TeamLogo } from './TeamLogo';

interface LeagueOverviewProps {
  db: AppDatabase;
  setActiveTab: (tab: string) => void;
}

export const LeagueOverview: React.FC<LeagueOverviewProps> = ({ db, setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const location = db.association.locations[0];

  // Contact Form local state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Algemene Vraag');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    // Simulate API call or save to database / local notification
    setIsSubmitted(true);
    setTimeout(() => {
      // Clear form after a brief period of success
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 5000);
  };

  // Perform multi-category search
  const getSearchResults = () => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();

    const matchedPlayers = db.persons.filter(p =>
      p.roles.includes('Player') &&
      (p.name.toLowerCase().includes(query) || p.bio.toLowerCase().includes(query))
    );

    const matchedTeams = db.teams.filter(t =>
      t.name.toLowerCase().includes(query) || t.city.toLowerCase().includes(query) || t.stadium.toLowerCase().includes(query)
    );

    const matchedMatches = db.matches.filter(m => {
      const homeTeam = db.teams.find(t => t.id === m.homeTeamId);
      const awayTeam = db.teams.find(t => t.id === m.awayTeamId);
      return (
        homeTeam?.name.toLowerCase().includes(query) ||
        awayTeam?.name.toLowerCase().includes(query) ||
        m.stadium.toLowerCase().includes(query)
      );
    });

    const matchedEvents = (db.calendarEvents || []).filter(e =>
      e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query)
    );

    // Hardcoded rule keywords search
    const rules = [
      { id: 'offside', title: 'Spelregel 1', desc: 'Basis sportregel 1' },
      { id: 'icing', title: 'Spelregel 2', desc: 'Basis sportregel 2' },
      { id: 'contact', title: 'Fysiek Contact & Checking', desc: 'In de House League is de nadruk gelegd op plezier en veiligheid. Gecontroleerd fysiek contact is toegestaan, maar gevaarlijk tackelen of boarding is streng verboden.' },
      { id: 'straf', title: 'Straftijden & Boarding', desc: 'Kleine straffen duren 2 minuten, grote straffen duren 5 minuten en kunnen leiden tot uitsluiting.' }
    ];
    const matchedRules = rules.filter(r =>
      r.title.toLowerCase().includes(query) || r.desc.toLowerCase().includes(query)
    );

    return {
      players: matchedPlayers,
      teams: matchedTeams,
      matches: matchedMatches,
      events: matchedEvents,
      rules: matchedRules,
      totalCount: matchedPlayers.length + matchedTeams.length + matchedMatches.length + matchedEvents.length + matchedRules.length
    };
  };

  const results = getSearchResults();

  return (
    <div className="space-y-8 animate-fade-in" id="league-overview-page">

      {/* 1. HERO LOGO BANNER SECTION */}
      <div className="relative bg-slate-950 border border-slate-200 rounded-3xl overflow-hidden p-8 flex flex-col items-center justify-center text-center space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://cdn.shopify.com/s/files/1/1038/7203/7203/files/hlalternate_background.png?v=1784150190')] opacity-5 mix-blend-overlay" />

        <div className="relative z-10 transition-transform duration-300 hover:scale-105">
          <HouseLeagueLogo size={180} />
        </div>

        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
            GIJS Groningen House League
          </h2>
          <div className="w-20 h-1.5 bg-slate-900 mx-auto rounded-full" />
          <p className="text-slate-400 font-mono text-xs sm:text-xs font-bold uppercase tracking-widest pt-1">
            EST. 2024 &bull; Groningen &bull; Nederland
          </p>
        </div>
      </div>

      {/* 2. SEARCH BAR & DYNAMIC SEARCH RESULTS */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="font-extrabold text-lg text-slate-950 mb-1 flex items-center gap-2">
          <Search className="w-5 h-5 text-slate-900" />
          Platform-breed zoeken
        </h3>
        <p className="text-xs text-slate-500 font-semibold mb-4">
          Typ trefwoorden om direct spelers, clubs, wedstrijden, speelschema&apos;s of reglementen te vinden.
        </p>

        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Zoek naar 'Jan', 'Tijgers', 'Straf', 'Training'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-red-500 bg-white text-slate-900 font-bold shadow-sm"
          />
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-2.5 text-xs text-slate-400 hover:text-slate-950 font-black px-1.5 py-0.5"
            >
              Wissen
            </button>
          )}
        </div>

        {/* Live Search Results */}
        {results !== null && (
          <div className="mt-6 border-t border-slate-100 pt-5 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-black uppercase text-slate-400 tracking-wider">
                Zoekresultaten voor &ldquo;{searchQuery}&rdquo;
              </span>
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                {results.totalCount} resultaten
              </span>
            </div>

            {results.totalCount === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs italic font-semibold">
                Geen directe resultaten gevonden voor deze zoekopdracht. Probeer een ander trefwoord!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* 1. Matched Teams */}
                {results.teams.map(team => (
                  <div
                    key={team.id}
                    onClick={() => { setActiveTab('comp-teams'); }}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-slate-100/80 transition-all flex items-center space-x-3"
                  >
                    <div className="shrink-0">
                      <TeamLogo logo={team.logo} name={team.name} size="sm" />
                    </div>
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-slate-100 text-slate-900 px-1.5 py-0.2 rounded font-mono font-extrabold uppercase">Team</span>
                      </div>
                      <h4 className="text-xs font-black text-slate-950 truncate mt-0.5">{team.name}</h4>
                      <p className="text-xs text-slate-500 font-semibold truncate">{team.city} &bull; {team.stadium}</p>
                    </div>
                  </div>
                ))}

                {/* 2. Matched Players */}
                {results.players.map(player => (
                  <div
                    key={player.id}
                    onClick={() => { setActiveTab('comp-spelers'); }}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-slate-100/80 transition-all flex items-center space-x-3"
                  >
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-9 h-9 rounded-lg border border-slate-300 object-cover bg-slate-100 shrink-0"
                    />
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-slate-100 text-slate-900 px-1.5 py-0.2 rounded font-mono font-extrabold uppercase">Speler</span>
                      </div>
                      <h4 className="text-xs font-black text-slate-950 truncate mt-0.5">{player.name}</h4>
                      <p className="text-xs text-slate-500 font-semibold truncate">{player.nationality || 'Groningen'}</p>
                    </div>
                  </div>
                ))}

                {/* 3. Matched Matches */}
                {results.matches.map(match => {
                  const home = db.teams.find(t => t.id === match.homeTeamId);
                  const away = db.teams.find(t => t.id === match.awayTeamId);
                  return (
                    <div
                      key={match.id}
                      onClick={() => { setActiveTab('comp-speelschema'); }}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-slate-100/80 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] bg-slate-100 text-slate-900 px-1.5 py-0.2 rounded font-mono font-extrabold uppercase">Match</span>
                        <span className="text-[10px] font-mono font-bold text-slate-400">{match.date}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-extrabold text-slate-950 truncate">{home?.name} vs {away?.name}</span>
                        {match.status === 'Completed' ? (
                          <span className="text-xs font-black text-slate-800">{match.stats?.homeScore} - {match.stats?.awayScore}</span>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Gepland</span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* 4. Matched Calendar Events */}
                {results.events.map(event => (
                  <div
                    key={event.id}
                    onClick={() => { setActiveTab('comp-kalender'); }}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-slate-100/80 transition-all flex items-start space-x-3"
                  >
                    <div className="p-1.5 bg-slate-100 text-white rounded-lg mt-0.5">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-slate-100 text-slate-900 px-1.5 py-0.2 rounded font-mono font-extrabold uppercase">Event</span>
                      </div>
                      <h4 className="text-xs font-black text-slate-950 truncate mt-0.5">{event.title}</h4>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5 truncate">{event.date} &bull; {location?.name || event.location || 'Hoofdlocatie'}</p>
                    </div>
                  </div>
                ))}

                {/* 5. Matched Rules */}
                {results.rules.map(rule => (
                  <div
                    key={rule.id}
                    onClick={() => { setActiveTab('comp-reglementen'); }}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-slate-100/80 transition-all flex items-start space-x-3"
                  >
                    <div className="p-1.5 bg-slate-100 text-white rounded-lg mt-0.5">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-slate-100 text-xsurple-800 px-1.5 py-0.2 rounded font-mono font-extrabold uppercase">Reglement</span>
                      </div>
                      <h4 className="text-xs font-black text-slate-950 mt-0.5">{rule.title}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-1 leading-snug">{rule.desc}</p>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. TWO-COLUMN: INTRODUCTORY TEXT & GENERAL INFORMATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Introductie text */}
        <div className="lg:col-span-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
            <Trophy className="w-5 h-5 text-slate-900" />
            <h3 className="font-extrabold text-base text-slate-950 uppercase tracking-tight">
              Over de GIJS Groningen House League
            </h3>
          </div>

          <div className="space-y-3.5 text-xs text-slate-700 font-medium leading-relaxed">
            <p>
              De <strong className="text-slate-950">De Sport Competitie</strong> is de ultieme recreatieve competitie voor sporters in de regio. Wij geloven dat sport voor iedereen is: van gedreven veteranen tot enthousiaste nieuwkomers die net hun eerste stappen in het veld zetten.
            </p>
            <p>
              Gevestigd in het prachtige <strong className="text-slate-950">{location.name}</strong> in Groningen, biedt onze competitie een veilige, gestructureerde en vooral ontzettend sportieve omgeving. Fair-play, plezier en kameraadschap staan bij ons met stip op nummer één.
            </p>
            <p>
              Met ons innovatieve management- en draft-systeem zorgen we voor gebalanceerde teams, waardoor elke wedstrijd een spannende strijd op het scherpst van de snede is. Of je nu speler bent, coach, scheidsrechter, of een trouwe supporter langs de boarding, deze competitie is jouw sport-thuis.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="text-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="block text-xsl font-black text-slate-900 font-mono">4</span>
              <span className="text-xs font-bold text-slate-500 uppercase">Actieve Clubs</span>
            </div>
            <div className="text-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="block text-xsl font-black text-slate-950 font-mono">80+</span>
              <span className="text-xs font-bold text-slate-500 uppercase">Geregistreerde Leden</span>
            </div>
            <div className="text-center p-3 bg-slate-50 border border-slate-200 rounded-xl col-span-2 sm:col-span-1">
              <span className="block text-xsl font-black text-slate-900 font-mono">100%</span>
              <span className="text-xs font-bold text-slate-500 uppercase">Sport Passie</span>
            </div>
          </div>
        </div>

        {/* Quick Links / Highlights */}
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
              <Clock className="w-5 h-5 text-slate-900" />
              <h3 className="font-extrabold text-base text-slate-950 uppercase tracking-tight">
                Snelkoppelingen
              </h3>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('comp-gamecenter')}
                className="w-full text-left p-2.5 hover:bg-slate-50 rounded-xl border border-slate-150 transition flex items-center justify-between"
              >
                <span className="text-xs font-extrabold text-slate-800">Wedstrijd Center</span>
                <Clock className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('comp-speelschema')}
                className="w-full text-left p-2.5 hover:bg-slate-50 rounded-xl border border-slate-150 transition flex items-center justify-between"
              >
                <span className="text-xs font-extrabold text-slate-800">Volledig Speelschema</span>
                <Calendar className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('comp-reglementen')}
                className="w-full text-left p-2.5 hover:bg-slate-50 rounded-xl border border-slate-150 transition flex items-center justify-between"
              >
                <span className="text-xs font-extrabold text-slate-800">Reglementen & Fair Play</span>
                <BookOpen className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('comp-playerdraft')}
                className="w-full text-left p-2.5 hover:bg-slate-50 rounded-xl border border-slate-150 transition flex items-center justify-between"
              >
                <span className="text-xs font-extrabold text-slate-800">Interactive Player Draft</span>
                <Trophy className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center mt-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Volgende Training</span>
            <span className="text-xs font-black text-slate-800">Donderdagavond &bull; 21:15</span>
          </div>
        </div>

      </div>

      {/* 4. CONTACT SECTION */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="border-b border-slate-100 pb-3 mb-6">
          <h3 className="font-extrabold text-base text-slate-950 uppercase tracking-tight flex items-center gap-2">
            <Mail className="w-5 h-5 text-slate-900" />
            Contact &amp; Ondersteuning
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Heb je vragen over inschrijvingen, regelgeving of wil je lid worden? Neem direct contact op met het het bestuur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Contact details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <MapPin className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-slate-950">Locatie / Thuisbasis</h4>
                  <p className="text-xs text-slate-500 font-medium">{location.name}</p>
                  <p className="text-xs text-slate-400">{location.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <Mail className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-slate-950">E-mailadres</h4>
                  <p className="text-xs text-slate-500 font-medium select-all">info@groningenhouseleague.nl</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <Phone className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-slate-950">Sport Hotline (Alleen WhatsApp)</h4>
                  <p className="text-xs text-slate-500 font-medium">+31 (0) 6 12345678</p>
                </div>
              </div>
            </div>

            {/* Quick map representation */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative h-36 bg-slate-100 flex items-center justify-center">
              <img
                src="https://cdn.shopify.com/s/files/1/1038/7203/7203/files/Hoofdlocatie_map_placeholder.png?v=1784511210"
                alt={location.name}
                className="w-full h-full object-cover opacity-80"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-slate-950/20" />
              <div className="absolute bg-white/95 px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-black text-slate-950 uppercase">{location.name}</p>
                <p className="text-[10px] font-bold text-slate-500">Locatie Groningen House League</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="border-2 border-slate-200 bg-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-3 animate-bounce">
                <CheckCircle className="w-12 h-12 text-slate-900" />
                <h4 className="text-base font-black text-slate-900">Bericht succesvol verzonden!</h4>
                <p className="text-xs text-slate-900 max-w-sm">
                  Bedankt voor je bericht. Het het bestuur zal binnen 24 uur contact met je opnemen op het opgegeven e-mailadres.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-extrabold uppercase tracking-wider text-slate-900 border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
                >
                  Nieuw Bericht Sturen
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-black text-slate-500 mb-1">Volledige Naam</label>
                    <input
                      type="text"
                      required
                      placeholder="Bijv. Jan Smit"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-red-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-black text-slate-500 mb-1">E-mailadres</label>
                    <input
                      type="email"
                      required
                      placeholder="voorbeeld@mail.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-red-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-black text-slate-500 mb-1">Onderwerp</label>
                  <select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:outline-none bg-white font-semibold cursor-pointer"
                  >
                    <option value="Algemene Vraag">Algemene Vraag / Informatie</option>
                    <option value="Inschrijving">Inschrijving nieuwe speler</option>
                    <option value="Pers / Media">Pers / Sponsoring aanvraag</option>
                    <option value="Klacht of Melding">Klacht of Geschil overdracht</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-black text-slate-500 mb-1">Bericht of Vraag</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Typ hier je vraag aan het het bestuur..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-red-500 bg-white font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-xl border border-slate-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Bericht verzenden
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
