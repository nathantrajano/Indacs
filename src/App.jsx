import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  Compass,
  HelpCircle,
  Calendar as CalendarIcon,
  ClipboardCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  ShieldAlert,
  Mic,
  MicOff
} from 'lucide-react';
import {
  APP_METADATA,
  INDICATORS,
  ROUTINE_SEARCH_CHIPS
} from './data/indacsData';
import IntentionWelcomeBanner from './components/IntentionWelcomeBanner';
import IndicatorDetailModal from './components/IndicatorDetailModal';
import CalendarJornadas from './components/CalendarJornadas';
import WorkshopGovernance from './components/WorkshopGovernance';

const STORAGE_KEYS = {
  MARKS: 'indacs2_journey_marks_v1',
  INTENTION: 'indacs2_next_intention_v1',
  MODULE_DISABLED: 'indacs2_calendar_disabled_v1'
};

const normalizeText = (str = '') =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?;:"'()[\]{}]/g, ' ');

const PT_STOPWORDS = new Set([
  'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas',
  'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas',
  'por', 'para', 'com', 'sem', 'sob', 'sobre', 'ate', 'entre',
  'que', 'qual', 'quais', 'como', 'quando', 'onde', 'quem',
  'e', 'ou', 'mas', 'se', 'ao', 'aos', 'pelo', 'pela',
  'fazer', 'preciso', 'saber', 'hoje', 'quero', 'ver', 'mostrar',
  'buscar', 'procurar', 'filtrar', 'abrir', 'me', 'mostra', 'fale',
  'diga', 'orientacao', 'duvida', 'sobre', 'indicador', 'competencia',
  'nota', 'metodologica', 'cartilha', 'indacs', 'favor', 'bom', 'dia',
  'tarde', 'noite', 'ola', 'oi'
]);

const preprocessVoiceAndTextQuery = (raw = '') => {
  let text = normalizeText(raw);
  // Map spoken indicator numbers/names (e.g. "c 2", "indicador dois", "competencia 4")
  const numberWords = {
    um: '1',
    dois: '2',
    duas: '2',
    tres: '3',
    quatro: '4',
    cinco: '5',
    seis: '6',
    sete: '7'
  };
  Object.entries(numberWords).forEach(([word, digit]) => {
    text = text.replace(new RegExp(`\\b(c|indicador|competencia|nota)\\s+${word}\\b`, 'g'), `c${digit}`);
  });
  text = text.replace(/\b(c|indicador|competencia|nota)\s+([1-7])\b/g, 'c$2');
  return text.trim();
};

export default function App() {
  // Navigation state: 'tela1' | 'tela2_cenarios' | 'tela3_calendario' | 'oficina'
  const [activeScreen, setActiveScreen] = useState('tela1');
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const [initialModalTab, setInitialModalTab] = useState('orientacao');

  // Search & Voice Filter state on Tela 1
  const [searchQuery, setSearchQuery] = useState('');
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const recognitionRef = useRef(null);

  const isVoiceSupported = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }, []);

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors
      }
    }
    setIsListeningVoice(false);
  };

  const handleToggleVoiceSearch = () => {
    setVoiceError('');
    if (isListeningVoice) {
      stopVoiceSearch();
      setVoiceFeedback('');
      return;
    }

    const SpeechRecognitionAPI =
      typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognitionAPI) {
      setVoiceError(
        'Seu navegador não suporta busca por voz nativa. Tente usar o Google Chrome ou Safari no celular, ou toque nas sugestões rápidas abaixo.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = 'pt-BR';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListeningVoice(true);
        setVoiceFeedback('Ouvindo sua voz... Fale o que procura (ex.: "diabetes", "recém-nascido", "vacina HPV", "C2").');
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        const cleaned = transcript.replace(/[.,!?]+$/g, '').trim();
        setSearchQuery(cleaned);
        setVoiceFeedback(`Filtrando por voz: “${cleaned}”`);
      };

      recognition.onerror = (event) => {
        setIsListeningVoice(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setVoiceError(
            'Permissão de microfone negada. Toque no ícone de cadeado na barra de endereço do navegador para permitir o microfone.'
          );
        } else if (event.error === 'no-speech') {
          setVoiceError('Nenhuma fala detectada. Toque no microfone e fale próximo ao aparelho.');
        } else {
          setVoiceError('Não foi possível capturar o áudio. Tente novamente ou digite na barra.');
        }
      };

      recognition.onend = () => {
        setIsListeningVoice(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListeningVoice(false);
      setVoiceError('Não foi possível iniciar o microfone neste dispositivo.');
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  // Shared device / Demo mode (no persistent localStorage)
  const [isDemoSharedMode, setIsDemoSharedMode] = useState(false);

  // Calendar module disabled state
  const [isModuleDisabled, setIsModuleDisabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.MODULE_DISABLED) === 'true';
    } catch {
      return false;
    }
  });

  // Journey marks: { 'YYYY-MM-DD': { marked: true, reflection: '...' } }
  const [journeyMarks, setJourneyMarks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MARKS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Intention for the next journey (Tela 4)
  const [intentionData, setIntentionData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INTENTION);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showWelcomeIntentionBanner, setShowWelcomeIntentionBanner] = useState(true);
  const [isSimulatedReturn, setIsSimulatedReturn] = useState(false);

  // Persist to localStorage only when NOT in Demo/Shared Device mode
  useEffect(() => {
    if (isDemoSharedMode) return;
    try {
      localStorage.setItem(STORAGE_KEYS.MARKS, JSON.stringify(journeyMarks));
    } catch {
      // Ignore storage quota errors
    }
  }, [journeyMarks, isDemoSharedMode]);

  useEffect(() => {
    if (isDemoSharedMode) return;
    try {
      if (intentionData) {
        localStorage.setItem(STORAGE_KEYS.INTENTION, JSON.stringify(intentionData));
      } else {
        localStorage.removeItem(STORAGE_KEYS.INTENTION);
      }
    } catch {
      // Ignore
    }
  }, [intentionData, isDemoSharedMode]);

  useEffect(() => {
    if (isDemoSharedMode) return;
    try {
      localStorage.setItem(STORAGE_KEYS.MODULE_DISABLED, String(isModuleDisabled));
    } catch {
      // Ignore
    }
  }, [isModuleDisabled, isDemoSharedMode]);

  // Search & Voice filtering across C1–C7
  const filteredIndicators = useMemo(() => {
    const processed = preprocessVoiceAndTextQuery(searchQuery);
    if (!processed) return INDICATORS;

    const rawTerms = processed.split(/\s+/).filter(Boolean);
    const meaningfulTerms = rawTerms.filter((t) => !PT_STOPWORDS.has(t));
    const terms = meaningfulTerms.length > 0 ? meaningfulTerms : rawTerms;

    const buildCorpus = (ind) =>
      normalizeText(
        [
          ind.code,
          ind.shortTitle,
          ind.fullTitle,
          ind.summaryQuestion,
          ind.summaryAnswer,
          ind.directAcsGoal.badge,
          ind.directAcsGoal.description,
          ...ind.tags,
          ...ind.acsCompetencies,
          ind.professionalBoundaries.notAcsRole,
          ind.scenario?.title,
          ind.scenario?.context
        ].join(' ')
      );

    // First try strict AND match of all meaningful terms
    const strictMatches = INDICATORS.filter((ind) => {
      const corpus = buildCorpus(ind);
      return terms.every((t) => corpus.includes(t));
    });

    if (strictMatches.length > 0) return strictMatches;

    // Fallback for long spoken sentences: rank by number of matching terms
    const scored = INDICATORS.map((ind) => {
      const corpus = buildCorpus(ind);
      const matchCount = terms.filter((t) => corpus.includes(t)).length;
      return { ind, matchCount };
    })
      .filter((item) => item.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);

    return scored.map((item) => item.ind);
  }, [searchQuery]);

  // Handlers for Indicator Selection
  const openIndicator = (ind, tab = 'orientacao') => {
    setSelectedIndicator(ind);
    setInitialModalTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers for Calendar & Bridge (Tela 3 & Tela 4)
  const handleToggleDayMark = (dateKey) => {
    setJourneyMarks((prev) => {
      const current = prev[dateKey] || { marked: false, reflection: '' };
      return {
        ...prev,
        [dateKey]: {
          ...current,
          marked: !current.marked
        }
      };
    });
  };

  const handleSaveDayReflection = (dateKey, reflectionText) => {
    setJourneyMarks((prev) => {
      const current = prev[dateKey] || { marked: false, reflection: '' };
      return {
        ...prev,
        [dateKey]: {
          ...current,
          reflection: reflectionText
        }
      };
    });
  };

  const handleSaveIntention = (text, dateLabel = '06/11/2026') => {
    setIntentionData({
      text,
      dateLabel,
      updatedAt: new Date().toISOString()
    });
    setShowWelcomeIntentionBanner(true);
  };

  const handleUpdateIntention = (newText) => {
    setIntentionData((prev) => ({
      ...(prev || {}),
      text: newText,
      dateLabel: prev?.dateLabel || 'Jornada anterior',
      updatedAt: new Date().toISOString()
    }));
  };

  const handleClearIntention = () => {
    setIntentionData(null);
    setIsSimulatedReturn(false);
  };

  const handleClearAllRecords = () => {
    setJourneyMarks({});
    setIntentionData(null);
    setIsSimulatedReturn(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.MARKS);
      localStorage.removeItem(STORAGE_KEYS.INTENTION);
    } catch {
      // Ignore
    }
  };

  const handleToggleDemoSharedMode = () => {
    setIsDemoSharedMode((prev) => {
      const next = !prev;
      if (next) {
        // Clear persistent storage when activating shared device mode
        try {
          localStorage.removeItem(STORAGE_KEYS.MARKS);
          localStorage.removeItem(STORAGE_KEYS.INTENTION);
        } catch {
          // Ignore
        }
      }
      return next;
    });
  };

  const handleSimulateNextDayReturn = () => {
    if (!intentionData?.text) {
      setIntentionData({
        text: 'Escutar com calma antes de orientar e lembrar que meu papel tem limites seguros.',
        dateLabel: '06/11/2026'
      });
    }
    setIsSimulatedReturn(true);
    setShowWelcomeIntentionBanner(true);
    setSelectedIndicator(null);
    setActiveScreen('tela1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-indacs-cream text-indacs-ink">
      {/* Educational & Privacy Safety Top Ribbon */}
      <div className="bg-indacs-dark text-indacs-cream px-3 py-1.5 text-[11px] sm:text-xs font-medium text-center border-b border-white/10">
        <span>
          <strong>Protótipo educativo INDACS 2.0</strong> • Não substitui normas, supervisão profissional ou sistemas do SUS (e-SUS APS) • Sem coleta de dados de pacientes.
        </span>
      </div>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-3 sm:px-6 pt-4 pb-24 sm:pb-12">
        {/* Hero Header inspired by Kalilka's Cover Page */}
        <header className="mb-5 rounded-[2rem] bg-indacs-primary px-5 py-5 sm:px-8 sm:py-6 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-0.5 text-xs font-bold tracking-wide text-indacs-cream mb-1">
                <span>{APP_METADATA.project}</span>
                <span>•</span>
                <span>Campina Grande - PB</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Indacs <span className="text-indacs-light text-2xl sm:text-3xl">2.0</span>
              </h1>
              <p className="mt-1 max-w-xl text-xs sm:text-sm font-medium text-indacs-cream/95 leading-snug">
                {APP_METADATA.subtitle}
              </p>
            </div>

            {/* Desktop/Tablet Primary Navigation */}
            <nav
              aria-label="Navegação principal"
              className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedIndicator(null);
                  setActiveScreen('tela1');
                }}
                className={`flex items-center justify-center gap-1.5 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-extrabold transition ${
                  activeScreen === 'tela1' && !selectedIndicator
                    ? 'bg-indacs-cream text-indacs-dark shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Compass className="h-4 w-4 shrink-0" />
                <span>Indicadores (C1–C7)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedIndicator(null);
                  setActiveScreen('tela2_cenarios');
                }}
                className={`flex items-center justify-center gap-1.5 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-extrabold transition ${
                  activeScreen === 'tela2_cenarios' && !selectedIndicator
                    ? 'bg-indacs-cream text-indacs-dark shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <HelpCircle className="h-4 w-4 shrink-0" />
                <span>Situações (C2 e C4)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedIndicator(null);
                  setActiveScreen('tela3_calendario');
                }}
                className={`flex items-center justify-center gap-1.5 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-extrabold transition ${
                  activeScreen === 'tela3_calendario' && !selectedIndicator
                    ? 'bg-indacs-cream text-indacs-dark shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <CalendarIcon className="h-4 w-4 shrink-0" />
                <span>Jornadas (X)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedIndicator(null);
                  setActiveScreen('oficina');
                }}
                className={`flex items-center justify-center gap-1.5 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-extrabold transition ${
                  activeScreen === 'oficina' && !selectedIndicator
                    ? 'bg-indacs-cream text-indacs-dark shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <ClipboardCheck className="h-4 w-4 shrink-0" />
                <span>Oficina & Fontes</span>
              </button>
            </nav>
          </div>
        </header>

        {/* TELA 4 WELCOME BANNER: Shown when returning to the app with a saved intention */}
        {!isModuleDisabled &&
          showWelcomeIntentionBanner &&
          intentionData?.text &&
          !selectedIndicator && (
            <IntentionWelcomeBanner
              intentionData={intentionData}
              onUpdateIntention={handleUpdateIntention}
              onClearIntention={handleClearIntention}
              onDismissBanner={() => setShowWelcomeIntentionBanner(false)}
              isSimulatedReturn={isSimulatedReturn}
            />
          )}

        {/* MODAL / DETAIL VIEW when an indicator card C1–C7 is opened */}
        {selectedIndicator ? (
          <IndicatorDetailModal
            indicator={selectedIndicator}
            initialTab={initialModalTab}
            onClose={() => setSelectedIndicator(null)}
            onSelectIndicator={(nextInd) => setSelectedIndicator(nextInd)}
            allIndicators={INDICATORS}
          />
        ) : (
          <>
            {/* ========================================================= */}
            {/* TELA 1 — O QUE PRECISO SABER HOJE?                        */}
            {/* ========================================================= */}
            {activeScreen === 'tela1' && (
              <div className="space-y-6">
                {/* Search Box by Routine Words & Voice Filter */}
                <section
                  aria-label="Pesquisa rápida por texto ou voz na rotina do ACS"
                  className="rounded-3xl border-2 border-indacs-primary/25 bg-indacs-creamCard p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-indacs-ink">
                        O que preciso saber hoje?
                      </h2>
                      <p className="text-xs font-semibold text-indacs-muted">
                        Toque em um cartão C1–C7, digite ou use o <strong>filtro por voz</strong>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleToggleVoiceSearch}
                      aria-pressed={isListeningVoice}
                      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-extrabold shadow-sm transition active:scale-[0.98] ${
                        isListeningVoice
                          ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-400/40'
                          : 'bg-indacs-primary text-white hover:bg-indacs-dark'
                      }`}
                    >
                      {isListeningVoice ? (
                        <>
                          <MicOff className="h-4 w-4 shrink-0" />
                          <span>Parar escuta de voz</span>
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 shrink-0" />
                          <span>Filtrar por Voz</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative mt-2">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-indacs-primary" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (!e.target.value) setVoiceFeedback('');
                      }}
                      placeholder="Digite ou toque no microfone para falar (ex.: recém-nascido, 30 dias, pé diabético, vacina...)"
                      aria-label="Buscar orientação nos 7 indicadores por texto ou voz"
                      className={`w-full rounded-2xl border-2 bg-white py-3.5 pl-12 pr-24 text-sm sm:text-base font-medium text-indacs-ink placeholder:text-indacs-muted/70 focus:outline-none shadow-inner transition ${
                        isListeningVoice
                          ? 'border-red-500 ring-2 ring-red-300'
                          : 'border-indacs-primary/35 focus:border-indacs-primary'
                      }`}
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setVoiceFeedback('');
                          }}
                          aria-label="Limpar busca"
                          title="Limpar busca"
                          className="rounded-xl bg-indacs-cream p-2 text-indacs-ink hover:bg-indacs-primary hover:text-white transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleToggleVoiceSearch}
                        aria-label={isListeningVoice ? 'Parar filtro por voz' : 'Ativar filtro por voz'}
                        title={
                          isVoiceSupported
                            ? 'Falar para filtrar os indicadores (pt-BR)'
                            : 'Filtro por voz'
                        }
                        className={`rounded-xl p-2 transition ${
                          isListeningVoice
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-indacs-cream text-indacs-primary hover:bg-indacs-primary hover:text-white'
                        }`}
                      >
                        {isListeningVoice ? (
                          <MicOff className="h-4 w-4" />
                        ) : (
                          <Mic className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Live Voice Listening Status / Error Feedback */}
                  {isListeningVoice && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="mt-3 flex items-center justify-between gap-2 rounded-2xl border-2 border-red-300 bg-red-50 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-red-950"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-red-600 animate-ping shrink-0" />
                        <span>{voiceFeedback || 'Ouvindo... Fale agora perto do microfone.'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={stopVoiceSearch}
                        className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-extrabold text-white hover:bg-red-700"
                      >
                        Concluir
                      </button>
                    </div>
                  )}

                  {!isListeningVoice && voiceFeedback && searchQuery && (
                    <div
                      role="status"
                      className="mt-2.5 flex items-center justify-between gap-2 rounded-xl bg-indacs-creamLight border border-indacs-primary/25 px-3 py-1.5 text-xs font-semibold text-indacs-dark"
                    >
                      <span className="flex items-center gap-1.5">
                        <Mic className="h-3.5 w-3.5 text-indacs-primary" />
                        {voiceFeedback} ({filteredIndicators.length}{' '}
                        {filteredIndicators.length === 1 ? 'indicador encontrado' : 'indicadores encontrados'})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setVoiceFeedback('');
                        }}
                        className="underline font-bold text-indacs-primary"
                      >
                        Limpar filtro
                      </button>
                    </div>
                  )}

                  {voiceError && (
                    <div
                      role="alert"
                      className="mt-2.5 flex items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-950"
                    >
                      <span>{voiceError}</span>
                      <button
                        type="button"
                        onClick={() => setVoiceError('')}
                        className="font-bold underline"
                      >
                        Fechar
                      </button>
                    </div>
                  )}

                  {/* Quick Routine Chips */}
                  <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1">
                    <span className="text-xs font-bold text-indacs-muted shrink-0 mr-1">
                      Buscas rápidas:
                    </span>
                    {ROUTINE_SEARCH_CHIPS.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setVoiceFeedback('');
                          setSearchQuery(
                            searchQuery === chip.query ? '' : chip.query
                          );
                        }}
                        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                          searchQuery === chip.query
                            ? 'bg-indacs-primary text-white shadow-sm'
                            : 'bg-indacs-cream text-indacs-dark hover:bg-indacs-primary/15'
                        }`}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Priority Highlight Bar for C2 and C4 */}
                {!searchQuery && (
                  <section
                    aria-label="Casos interativos prioritários da oficina"
                    className="rounded-3xl border-2 border-emerald-700/30 bg-gradient-to-r from-indacs-primary to-indacs-medium p-4 sm:p-5 text-white shadow-md"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-200 px-3 py-0.5 text-xs font-extrabold text-emerald-950">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Foco Validado para o Teste Exploratório na UBS
                        </span>
                        <h3 className="mt-1.5 text-base sm:text-lg font-extrabold">
                          Pratique as duas situações interativas prioritárias (C2 e C4)
                        </h3>
                        <p className="text-xs sm:text-sm text-indacs-cream/90">
                          Desenvolvimento infantil (visitas até 30 dias e até 6 meses) e Diabetes (2 visitas em 12 meses com intervalo mínimo de 30 dias e sinais de risco nos pés).
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => openIndicator(INDICATORS[1], 'cenario')}
                          className="inline-flex items-center gap-1.5 rounded-2xl bg-indacs-cream px-4 py-2.5 text-xs sm:text-sm font-extrabold text-indacs-dark shadow hover:bg-white transition"
                        >
                          <span>Caso C2 • Bebê 18 dias</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openIndicator(INDICATORS[3], 'cenario')}
                          className="inline-flex items-center gap-1.5 rounded-2xl bg-indacs-cream px-4 py-2.5 text-xs sm:text-sm font-extrabold text-indacs-dark shadow hover:bg-white transition"
                        >
                          <span>Caso C4 • Diabetes e Pés</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </section>
                )}

                {/* 7 Indicator Cards Grid (C1 to C7) */}
                <section aria-label="Sete indicadores da Atenção Primária à Saúde">
                  {filteredIndicators.length === 0 ? (
                    <div className="rounded-3xl border-2 border-indacs-primary/20 bg-white p-8 text-center">
                      <p className="text-base font-bold text-indacs-ink">
                        Nenhum indicador encontrado para “{searchQuery}”.
                      </p>
                      <p className="mt-1 text-xs sm:text-sm text-indacs-muted">
                        Tente buscar por termos como “criança”, “vacina”, “diabetes”, “pés”, “pressão”, “gestante”, “idosa” ou “câncer”.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="mt-4 rounded-xl bg-indacs-primary px-4 py-2 text-xs font-bold text-white"
                      >
                        Mostrar todos os 7 indicadores (C1–C7)
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredIndicators.map((ind) => {
                        const isPriority =
                          ind.validationStatus === 'validado_prioritario';
                        return (
                          <article
                            key={ind.id}
                            className={`flex flex-col justify-between rounded-3xl border-2 bg-indacs-creamCard p-4 sm:p-5 shadow-sm transition hover:shadow-md ${
                              isPriority
                                ? 'border-indacs-primary ring-1 ring-indacs-primary/20'
                                : 'border-indacs-primary/25'
                            }`}
                          >
                            <div>
                              {/* Card Top Row: Original Icon + Code + Validation Status Badge */}
                              <div className="flex items-start gap-3.5">
                                <button
                                  type="button"
                                  onClick={() => openIndicator(ind, 'orientacao')}
                                  className="group relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full border-2 border-indacs-primary bg-indacs-cream p-2 shadow-inner transition group-hover:scale-105"
                                  aria-label={`Abrir ${ind.code} - ${ind.shortTitle}`}
                                >
                                  <img
                                    src={ind.icon}
                                    alt={ind.shortTitle}
                                    className="h-full w-full object-contain"
                                  />
                                </button>

                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="rounded-lg bg-indacs-primary px-2.5 py-0.5 text-xs font-extrabold text-white">
                                      {ind.code}
                                    </span>
                                    {isPriority ? (
                                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-900 border border-emerald-300">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Validado (Foco Oficina)
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 border border-amber-300">
                                        <Clock className="h-3 w-3" />
                                        Cartilha + Nota • Em revisão
                                      </span>
                                    )}
                                  </div>

                                  <h3 className="mt-1.5 text-lg sm:text-xl font-extrabold text-indacs-ink leading-tight">
                                    {ind.shortTitle}
                                  </h3>
                                  <p className="mt-0.5 text-xs text-indacs-muted">
                                    {ind.fullTitle}
                                  </p>
                                </div>
                              </div>

                              {/* Direct ACS Goal Pill */}
                              <div className="mt-3.5 rounded-2xl bg-indacs-creamLight border border-indacs-primary/20 p-3">
                                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-indacs-primary">
                                  {ind.directAcsGoal.badge}
                                </span>
                                <p className="mt-1 text-xs sm:text-sm font-medium text-indacs-ink leading-snug">
                                  {ind.summaryAnswer}
                                </p>
                              </div>

                              {/* Preview of Top 3 Competencies */}
                              <ul className="mt-3 space-y-1 text-xs text-indacs-muted">
                                {ind.acsCompetencies.slice(0, 3).map((comp, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="font-bold text-indacs-primary">✓</span>
                                    <span className="line-clamp-1">{comp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Action Buttons (Large touch targets for mobile/tablet) */}
                            <div className="mt-4 pt-3 border-t border-indacs-primary/15 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => openIndicator(ind, 'orientacao')}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-indacs-primary px-3.5 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-sm hover:bg-indacs-dark transition"
                              >
                                <BookOpen className="h-4 w-4 shrink-0" />
                                <span>O que cabe ao ACS</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => openIndicator(ind, 'cenario')}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-2xl border-2 border-indacs-primary bg-white px-3.5 py-2.5 text-xs sm:text-sm font-extrabold text-indacs-primary hover:bg-indacs-cream transition"
                              >
                                <HelpCircle className="h-4 w-4 shrink-0" />
                                <span>Situação Prática</span>
                              </button>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </section>

                {/* Optional Invitation Card to Tela 3 & 4 ("Jornadas que Cuidam") */}
                <section
                  aria-label="Convite ao calendário Jornadas que Cuidam"
                  className="rounded-3xl border-2 border-indacs-primary/30 bg-indacs-creamCard p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indacs-primary text-white font-black text-xl">
                      ✕
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-indacs-primary">
                        Reconhecimento e Continuidade (Opcional)
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-indacs-ink">
                        Calendário “Jornadas que Cuidam”
                      </h3>
                      <p className="text-xs sm:text-sm text-indacs-muted">
                        Marque um <strong>X</strong> voluntário no dia vivido e deixe uma intenção pessoal para a próxima jornada — sem metas, sem ranking e sem cobrança.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveScreen('tela3_calendario')}
                    className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-indacs-dark px-5 py-3 text-xs sm:text-sm font-extrabold text-white shadow hover:bg-indacs-primary transition"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    <span>Abrir Meu Calendário</span>
                  </button>
                </section>
              </div>
            )}

            {/* ========================================================= */}
            {/* TELA 2 — ORIENTAÇÃO CONTEXTUALIZADA (LISTA DE CENÁRIOS)   */}
            {/* ========================================================= */}
            {activeScreen === 'tela2_cenarios' && (
              <div className="space-y-5">
                <div className="rounded-3xl bg-indacs-primary p-5 text-white shadow-md">
                  <span className="text-xs font-bold uppercase tracking-wider text-indacs-cream">
                    Tela 2 • Orientação Contextualizada e Decisão Segura
                  </span>
                  <h2 className="mt-1 text-xl sm:text-2xl font-extrabold">
                    Situações Interativas da Rotina do ACS
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-indacs-cream/95 leading-relaxed">
                    Cada cartão apresenta uma situação fictícia, <strong>o que observar</strong>, <strong>o que cabe ao ACS</strong>, <strong>quando comunicar à equipe</strong>, a <strong>fonte exata</strong> e uma pergunta de escolha com feedback. Nunca infere diagnóstico nem prescreve conduta.
                  </p>
                </div>

                {/* Priority Validated Cases: C2 and C4 */}
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-indacs-primary px-1">
                    Casos Prioritários Validados na Oficina (C2 e C4)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[INDICATORS[1], INDICATORS[3]].map((ind) => (
                      <div
                        key={ind.id}
                        className="rounded-3xl border-2 border-indacs-primary bg-white p-5 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-extrabold text-emerald-900 border border-emerald-300">
                              ✓ {ind.scenario.badge}
                            </span>
                            <span className="text-xs font-extrabold text-indacs-primary">
                              {ind.code}
                            </span>
                          </div>
                          <h4 className="mt-2 text-lg font-extrabold text-indacs-ink">
                            {ind.scenario.title}
                          </h4>
                          <p className="mt-1.5 text-xs sm:text-sm text-indacs-muted line-clamp-3">
                            {ind.scenario.context}
                          </p>
                          <div className="mt-3 rounded-xl bg-indacs-creamLight p-2.5 text-xs text-indacs-ink">
                            <strong>Critério na Nota:</strong> {ind.directAcsGoal.badge}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => openIndicator(ind, 'cenario')}
                          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-indacs-primary px-4 py-3 text-sm font-extrabold text-white shadow hover:bg-indacs-dark transition"
                        >
                          <HelpCircle className="h-4 w-4" />
                          <span>Abrir Situação e Responder Pergunta ({ind.code})</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complementary Cases in Review: C1, C3, C5, C6, C7 */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-indacs-muted px-1">
                    Cenários Complementares em Revisão Técnica (C1, C3, C5, C6 e C7)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {INDICATORS.filter(
                      (i) => i.id !== 'C2' && i.id !== 'C4'
                    ).map((ind) => (
                      <div
                        key={ind.id}
                        className="rounded-3xl border-2 border-indacs-primary/20 bg-indacs-creamCard p-4 sm:p-5 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 border border-amber-300">
                              ⏳ {ind.scenario.badge}
                            </span>
                            <span className="text-xs font-extrabold text-indacs-primary">
                              {ind.code} • {ind.shortTitle}
                            </span>
                          </div>
                          <h4 className="mt-2 text-base font-extrabold text-indacs-ink">
                            {ind.scenario.title}
                          </h4>
                          <p className="mt-1 text-xs text-indacs-muted line-clamp-2">
                            {ind.scenario.context}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => openIndicator(ind, 'cenario')}
                          className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-indacs-primary bg-white px-3.5 py-2.5 text-xs font-extrabold text-indacs-primary hover:bg-indacs-cream transition"
                        >
                          <span>Explorar caso em revisão ({ind.code})</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TELA 3 E TELA 4 — JORNADAS QUE CUIDAM                     */}
            {/* ========================================================= */}
            {activeScreen === 'tela3_calendario' && (
              <CalendarJornadas
                journeyMarks={journeyMarks}
                onToggleDayMark={handleToggleDayMark}
                onSaveDayReflection={handleSaveDayReflection}
                intentionData={intentionData}
                onSaveIntention={handleSaveIntention}
                onClearIntention={handleClearIntention}
                onClearAllRecords={handleClearAllRecords}
                isDemoSharedMode={isDemoSharedMode}
                onToggleDemoSharedMode={handleToggleDemoSharedMode}
                isModuleDisabled={isModuleDisabled}
                onToggleModuleDisabled={() =>
                  setIsModuleDisabled((prev) => !prev)
                }
                onSimulateNextDayReturn={handleSimulateNextDayReturn}
              />
            )}

            {/* ========================================================= */}
            {/* OFICINA, LIMITAÇÕES, CHECKLIST E TESTE EXPLORATÓRIO       */}
            {/* ========================================================= */}
            {activeScreen === 'oficina' && <WorkshopGovernance />}
          </>
        )}
      </main>

      {/* Footer matching Kalilka's Cartilha */}
      <footer className="mt-auto bg-indacs-primary text-white py-4 px-4 sm:px-8 border-t border-white/15">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight">Indacs 2.0</span>
            <span>•</span>
            <span className="text-indacs-cream/90">{APP_METADATA.municipality}</span>
          </div>
          <div className="text-indacs-cream/90 text-center sm:text-right">
            <span>{APP_METADATA.project} • Kalilka & Nathan</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar for easy thumb reach on smartphones */}
      <nav
        aria-label="Menu inferior para celular"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t-2 border-indacs-primary/25 bg-indacs-creamCard/95 backdrop-blur px-2 py-1.5 shadow-lg"
      >
        <button
          type="button"
          onClick={() => {
            setSelectedIndicator(null);
            setActiveScreen('tela1');
          }}
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 text-[11px] font-bold ${
            activeScreen === 'tela1' && !selectedIndicator
              ? 'text-indacs-primary bg-indacs-cream'
              : 'text-indacs-muted'
          }`}
        >
          <Compass className="h-5 w-5" />
          <span>C1–C7</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedIndicator(null);
            setActiveScreen('tela2_cenarios');
          }}
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 text-[11px] font-bold ${
            activeScreen === 'tela2_cenarios' && !selectedIndicator
              ? 'text-indacs-primary bg-indacs-cream'
              : 'text-indacs-muted'
          }`}
        >
          <HelpCircle className="h-5 w-5" />
          <span>Casos C2/C4</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedIndicator(null);
            setActiveScreen('tela3_calendario');
          }}
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 text-[11px] font-bold ${
            activeScreen === 'tela3_calendario' && !selectedIndicator
              ? 'text-indacs-primary bg-indacs-cream'
              : 'text-indacs-muted'
          }`}
        >
          <CalendarIcon className="h-5 w-5" />
          <span>Jornadas (X)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedIndicator(null);
            setActiveScreen('oficina');
          }}
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 text-[11px] font-bold ${
            activeScreen === 'oficina' && !selectedIndicator
              ? 'text-indacs-primary bg-indacs-cream'
              : 'text-indacs-muted'
          }`}
        >
          <ClipboardCheck className="h-5 w-5" />
          <span>Oficina</span>
        </button>
      </nav>
    </div>
  );
}

