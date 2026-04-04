import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  LayoutDashboard, 
  List, 
  Star, 
  ChevronRight, 
  AlertCircle, 
  Heart, 
  Tv, 
  Clapperboard, 
  Type, 
  Lightbulb, 
  Music, 
  Activity, 
  Home,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Power,
  X,
  Plus,
  Settings,
  ArrowRight,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { SECTIONS, Section, Phrase } from "./constants";

const TypeBadge = ({ type }: { type: "native" | "routine" }) => (
  <span className={`
    inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
    ${type === "native" 
      ? "bg-emerald-100 text-emerald-700 border border-emerald-200" 
      : "bg-amber-100 text-amber-700 border border-amber-200"}
  `}>
    {type === "native" ? "Native" : "Routine"}
  </span>
);

const IconMap: Record<string, any> = {
  "📺": Tv,
  "🎬": Clapperboard,
  "🔠": Type,
  "💡": Lightbulb,
  "🎵": Music,
  "💜": Heart,
  "🏠": Home,
};

type Favorite = {
  text: string;
  sectionId: number;
  commandName: string;
};

export default function App() {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "native" | "routine">("all");
  const [filterSenior, setFilterSenior] = useState(false);
  const [expandedCmd, setExpandedCmd] = useState<string | null>(null);
  const [view, setView] = useState<"overview" | "browse" | "search">("overview");
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const saved = localStorage.getItem("alexa_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Wizard State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [newCmd, setNewCmd] = useState({
    trigger: "",
    action: "",
    device: "",
    setting: "",
  });

  useEffect(() => {
    localStorage.setItem("alexa_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const allPhrases = useMemo(() => {
    const arr: (Phrase & { section: Section; command: any })[] = [];
    SECTIONS.forEach(s => s.commands.forEach(c => c.phrases.forEach(p => {
      arr.push({ ...p, section: s, command: c });
    })));
    return arr;
  }, []);

  const favoritePhrases = useMemo(() => {
    return favorites.map(f => {
      const phrase = allPhrases.find(p => p.text === f.text && p.section.id === f.sectionId);
      return phrase;
    }).filter(Boolean) as (Phrase & { section: Section; command: any })[];
  }, [favorites, allPhrases]);

  const toggleFavorite = (p: Phrase & { section: Section; command: any }) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.text === p.text && f.sectionId === p.section.id);
      if (exists) {
        return prev.filter(f => !(f.text === p.text && f.sectionId === p.section.id));
      }
      return [...prev, { text: p.text, sectionId: p.section.id, commandName: p.command.name }];
    });
  };

  const isFavorite = (p: Phrase & { section: Section; command: any }) => {
    return favorites.some(f => f.text === p.text && f.sectionId === p.section.id);
  };

  const handleWizardNext = () => setWizardStep(prev => prev + 1);
  const handleWizardBack = () => setWizardStep(prev => prev - 1);
  const resetWizard = () => {
    setIsWizardOpen(false);
    setWizardStep(1);
    setNewCmd({ trigger: "", action: "", device: "", setting: "" });
  };

  const filteredPhrases = useMemo(() => {
    let r = allPhrases;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      r = r.filter(p =>
        p.text.toLowerCase().includes(q) ||
        p.command.name.toLowerCase().includes(q) ||
        p.note.toLowerCase().includes(q) ||
        p.command.desc.toLowerCase().includes(q)
      );
    }
    if (filterType !== "all") r = r.filter(p => p.type === filterType);
    if (filterSenior) r = r.filter(p => p.senior);
    if (activeSection !== null) r = r.filter(p => p.section.id === activeSection);
    return r;
  }, [allPhrases, searchQuery, filterType, filterSenior, activeSection]);

  const totalNative = SECTIONS.reduce((a, s) => a + s.nativeCount, 0);
  const totalRoutine = SECTIONS.reduce((a, s) => a + s.routineCount, 0);
  const totalAll = totalNative + totalRoutine;

  const statsCards = [
    { label: "Total Commands", value: `~${totalAll}`, icon: <Activity className="w-4 h-4" />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Native Support", value: totalNative, icon: <Play className="w-4 h-4" />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Custom Routines", value: `~${totalRoutine}`, icon: <Activity className="w-4 h-4" />, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Categories", value: SECTIONS.length, icon: <LayoutDashboard className="w-4 h-4" />, color: "text-pink-600", bg: "bg-pink-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
                  Mom's Alexa Command Center
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Built with love for Mom • {totalAll} commands
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-200"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Command</span>
            </button>
          </div>

          <nav className="flex gap-1 mt-6 p-1 bg-slate-100 rounded-xl w-fit">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "browse", label: "Browse", icon: List },
              { id: "search", label: "Search", icon: Search },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => { setView(t.id as any); if (t.id === "overview") setActiveSection(null); }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${view === t.id 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-white/50"}
                `}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Favorites Section */}
              {favoritePhrases.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      Mom's Favorites
                    </h2>
                    <button 
                      onClick={() => setView("browse")}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                    >
                      Manage All
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {favoritePhrases.map((p, i) => (
                      <motion.div
                        key={i}
                        layoutId={`fav-${p.text}`}
                        className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-all group relative shadow-sm"
                      >
                        <button 
                          onClick={() => toggleFavorite(p)}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-100 hover:text-rose-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border border-slate-100 shadow-inner" style={{ backgroundColor: `${p.section.color}11`, color: p.section.color }}>
                            {p.section.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <code className="text-sm font-mono text-indigo-700 font-bold block truncate">"{p.text}"</code>
                            <p className="text-[10px] text-slate-500 mt-1 font-medium">{p.command.name}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statsCards.map((s, i) => (
                  <div key={i} className={`${s.bg} border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-all`}>
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                      {s.icon}
                      <span className="text-[10px] font-bold uppercase tracking-wider">{s.label}</span>
                    </div>
                    <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Completion Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-emerald-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Star className="w-24 h-24 text-indigo-600" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    Project Status: 100% Complete
                  </h3>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500" 
                    />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    All 7 sections are fully documented with specialized senior-friendly routines.
                    Optimized for accessibility and intuitive voice interaction.
                  </p>
                </div>
              </div>

              {/* Sections List */}
              <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 px-1">Command Categories</h2>
                <div className="grid gap-3">
                  {SECTIONS.map(s => {
                    const Icon = IconMap[s.icon] || LayoutDashboard;
                    return (
                      <button
                        key={s.id}
                        onClick={() => { setActiveSection(s.id); setView("browse"); }}
                        className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all text-left group shadow-sm"
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-slate-100 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${s.color}11`, color: s.color }}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {s.title}
                          </h3>
                          <p className="text-xs text-slate-500 truncate">{s.description}</p>
                          <div className="flex gap-3 mt-2">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">● {s.nativeCount} Native</span>
                            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-tighter">● {s.routineCount} Routines</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Emergency Section */}
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
                <h3 className="text-rose-600 font-bold flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5" />
                  Emergency Quick Reference
                </h3>
                <div className="grid gap-3">
                  {[
                    { text: "Alexa, call 911", desc: "Emergency services" },
                    { text: "Alexa, I fell", desc: "Full lights + Erik alerted" },
                    { text: "Alexa, I need help", desc: "Erik alerted immediately" },
                    { text: "Alexa, I'm scared", desc: "Lights on + Erik alerted" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-rose-100 shadow-sm">
                      <code className="text-rose-700 font-mono text-sm font-bold">"{item.text}"</code>
                      <span className="text-[10px] font-bold uppercase text-rose-500 tracking-wider">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {view === "browse" && (
            <motion.div
              key="browse"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              {/* Category Filter Bar */}
              <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                <button
                  onClick={() => setActiveSection(null)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeSection === null ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
                >
                  All Categories
                </button>
                {SECTIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeSection === s.id ? "bg-white text-slate-900 border-2 shadow-sm" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"}`}
                    style={activeSection === s.id ? { borderColor: s.color, color: s.color } : {}}
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              {/* Type Filters */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  {["all", "native", "routine"].map(t => (
                    <button
                      key={t}
                      onClick={() => setFilterType(t as any)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${filterType === t ? "bg-indigo-100 text-indigo-700 border border-indigo-200" : "bg-white text-slate-500 border border-slate-200"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setFilterSenior(!filterSenior)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${filterSenior ? "bg-pink-100 text-pink-700 border border-pink-200" : "bg-white text-slate-500 border border-slate-200"}`}
                >
                  <Star className={`w-3 h-3 ${filterSenior ? "fill-pink-600" : ""}`} />
                  Senior Priority
                </button>
              </div>

              {/* Commands List */}
              <div className="space-y-6">
                {(activeSection ? [SECTIONS.find(s => s.id === activeSection)] : SECTIONS).map(section => {
                  if (!section) return null;
                  const Icon = IconMap[section.icon] || LayoutDashboard;
                  
                  return (
                    <div key={section.id} className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-100" style={{ backgroundColor: `${section.color}11`, color: section.color }}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="font-bold text-slate-900">{section.title}</h2>
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{section.description}</p>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        {section.commands.map((cmd, ci) => {
                          const cmdPhrases = cmd.phrases.filter(p => {
                            if (filterType !== "all" && p.type !== filterType) return false;
                            if (filterSenior && !p.senior) return false;
                            return true;
                          });
                          if (cmdPhrases.length === 0) return null;
                          const cmdKey = `${section.id}-${ci}`;
                          const isExpanded = expandedCmd === cmdKey;

                          return (
                            <div key={ci} className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all hover:border-slate-300 shadow-sm">
                              <button 
                                onClick={() => setExpandedCmd(isExpanded ? null : cmdKey)}
                                className="w-full flex items-center justify-between p-4 text-left group"
                              >
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{cmd.name}</h4>
                                  <p className="text-[10px] text-slate-500 mt-0.5">{cmd.desc}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                    {cmdPhrases.length}
                                  </span>
                                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                                </div>
                              </button>

                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden bg-slate-50 border-t border-slate-100"
                                  >
                                    <div className="p-4 space-y-3">
                                      {cmdPhrases.map((p, pi) => {
                                        const fullPhrase = { ...p, section, command: cmd };
                                        return (
                                          <div key={pi} className="p-3 bg-white rounded-lg border border-slate-200 group relative shadow-sm">
                                            <div className="flex items-start justify-between gap-4">
                                              <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                  <code className="text-sm font-mono text-indigo-700 font-bold italic">"{p.text}"</code>
                                                  {p.senior && <Star className="w-3 h-3 text-amber-500 fill-amber-500" />}
                                                </div>
                                                <p className="text-[10px] text-slate-600 leading-relaxed font-medium">{p.note}</p>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <button 
                                                  onClick={() => toggleFavorite(fullPhrase)}
                                                  className={`p-1.5 rounded-lg transition-all ${isFavorite(fullPhrase) ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-400 hover:text-slate-600"}`}
                                                >
                                                  <Star className={`w-3.5 h-3.5 ${isFavorite(fullPhrase) ? "fill-amber-500" : ""}`} />
                                                </button>
                                                <TypeBadge type={p.type} />
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {view === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search commands, phrases, or notes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {["pause", "Netflix", "captions", "lights", "volume", "sleep", "help", "morning"].map(q => (
                  <button
                    key={q}
                    onClick={() => setSearchQuery(q)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${searchQuery === q ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"}`}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {filteredPhrases.length} Results Found
                  </span>
                </div>
                
                <div className="grid gap-3">
                  {filteredPhrases.slice(0, 50).map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-all shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <code className="text-sm font-mono text-indigo-700 font-bold italic">"{p.text}"</code>
                            {p.senior && <Star className="w-3 h-3 text-amber-500 fill-amber-500" />}
                          </div>
                          <p className="text-[10px] text-slate-600 font-medium">{p.note}</p>
                        </div>
                        <TypeBadge type={p.type} />
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-50 text-slate-500 flex items-center gap-1 border border-slate-100">
                          {p.section.icon} {p.section.title}
                        </span>
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                        <span className="text-[10px] font-bold text-slate-400">{p.command.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredPhrases.length === 0 && (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                      <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-slate-500 text-sm">No commands found matching your search.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-12 text-center border-t border-white/5">
        <Heart className="w-6 h-6 text-pink-500/50 mx-auto mb-4" />
        <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
          Designed to make technology accessible, intuitive, and joyful for Mom.
          Every command is a bridge to connection.
        </p>
      </footer>

      {/* Custom Command Wizard Modal */}
      <AnimatePresence>
        {isWizardOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetWizard}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Wizard Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">New Custom Command</h2>
                  <p className="text-xs text-slate-500">Step {wizardStep} of 4</p>
                </div>
                <button onClick={resetWizard} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Wizard Content */}
              <div className="p-8 min-h-[300px]">
                <AnimatePresence mode="wait">
                  {wizardStep === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-indigo-600 uppercase tracking-wider">1. Trigger Phrase</label>
                        <p className="text-xs text-slate-500">What will Mom say to Alexa?</p>
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono italic">"Alexa,</span>
                        <input 
                          type="text" 
                          placeholder="e.g. murder shows"
                          value={newCmd.trigger}
                          onChange={e => setNewCmd({...newCmd, trigger: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-20 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                      </div>
                      <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <p className="text-[10px] text-indigo-600 leading-relaxed font-medium">
                          Tip: Use natural, everyday phrases that Mom already uses. Short and punchy works best!
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-indigo-600 uppercase tracking-wider">2. Desired Action</label>
                        <p className="text-xs text-slate-500">What should happen when she says it?</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: "app", label: "Open App", icon: Clapperboard },
                          { id: "light", label: "Lighting", icon: Lightbulb },
                          { id: "music", label: "Music", icon: Music },
                          { id: "tv", label: "TV Control", icon: Tv },
                          { id: "scene", label: "Scene", icon: Home },
                          { id: "other", label: "Other", icon: Settings },
                        ].map(action => (
                          <button
                            key={action.id}
                            onClick={() => setNewCmd({...newCmd, action: action.id})}
                            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${newCmd.action === action.id ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"}`}
                          >
                            <action.icon className="w-6 h-6" />
                            <span className="text-xs font-bold">{action.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-indigo-600 uppercase tracking-wider">3. Specific Settings</label>
                        <p className="text-xs text-slate-500">Fine-tune the details of the action.</p>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Target Device / App</span>
                          <input 
                            type="text" 
                            placeholder="e.g. Netflix, Living Room Light"
                            value={newCmd.device}
                            onChange={e => setNewCmd({...newCmd, device: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Value / Setting</span>
                          <input 
                            type="text" 
                            placeholder="e.g. 50%, Warm White, Open"
                            value={newCmd.setting}
                            onChange={e => setNewCmd({...newCmd, setting: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 4 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8 text-center"
                    >
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-900">Ready to Save!</h3>
                        <p className="text-sm text-slate-500">Review the command details below.</p>
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Trigger</span>
                          <span className="text-sm font-mono text-indigo-700 font-bold">"Alexa, {newCmd.trigger}"</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Action</span>
                          <span className="text-sm text-slate-900 capitalize font-medium">{newCmd.action}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Target</span>
                          <span className="text-sm text-slate-900 font-medium">{newCmd.device}</span>
                        </div>
                        {newCmd.setting && (
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Setting</span>
                            <span className="text-sm text-slate-900 font-medium">{newCmd.setting}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wizard Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button 
                  onClick={wizardStep === 1 ? resetWizard : handleWizardBack}
                  className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  {wizardStep === 1 ? "Cancel" : "Back"}
                </button>
                <button 
                  onClick={wizardStep === 4 ? resetWizard : handleWizardNext}
                  disabled={wizardStep === 1 && !newCmd.trigger}
                  className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition-all shadow-xl shadow-indigo-200"
                >
                  {wizardStep === 4 ? "Save Command" : "Continue"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
