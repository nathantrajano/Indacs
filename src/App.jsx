import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  Calendar as CalendarIcon,
  Mic,
  MicOff,
  ArrowLeft
} from 'lucide-react';
import {
  INDICATORS,
  ROUTINE_SEARCH_CHIPS
} from './data/indacsData';
import IntentionWelcomeBanner from './components/IntentionWelcomeBanner';
import IndicatorDetailModal from './components/IndicatorDetailModal';
import CalendarJornadas from './components/CalendarJornadas';

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
    text = text.replace(
      new RegExp(`\\b(c|indicador|competencia|nota)\\s+${word}\\b`, 'g'),
      `c${digit}`
    );
  });
  text = text.replace(/\b(c|indicador|competencia|nota)\s+([1-7])\b/g, 'c$2');
  return text.trim();
};

function CartilhaIconButton({ ind, onClick, showSnippet }) {
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => onClick(ind)}
        className="group flex flex-col items-center text-center focus:outline-none"
      >
        {/* Circular Icon with Top-Right Corner Pointer like Kalilka's Cartilha */}
        <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full border-2 border-indacs-primary bg-indacs-cream p-3 shadow-sm transition-transform group-hover:scale-105 group-active:scale-95">
          {/* Top-right corner triangle accent from original Cartilha */}
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute -right-1 -top-1 h-7 w-7 text-indacs-dark transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4 4 L22 2 L18 20 L13 11 Z" />
          </svg>

          <div className="flex h-full w-full items-center justify-center rounded-full bg-indacs-light/25 p-2.5">
            <img
              src={ind.icon}
              alt={ind.shortTitle}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Underlined C1..C7 Code + Label */}
        <span className="mt-2 text-2xl sm:text-3xl font-extrabold text-indacs-primary underline decoration-2 underline-offset-4">
          {ind.code}
        </span>
        <span className="mt-1 max-w-[160px] text-xs sm:text-sm font-bold text-indacs-primary underline decoration-1 underline-offset-2 leading-tight">
          {ind.shortTitle}
        </span>
      </button>

      {/* Quick Information Snippet when searching by voice or text */}
      {showSnippet && (
        <div
          onClick={() => onClick(ind)}
          className="mt-3 w-full max-w-xs cursor-pointer rounded-2xl border border-indacs-primary/25 bg-indacs-creamCard p-3 text-left shadow-sm hover:border-indacs-primary transition"
        >
          <p className="text-[11px] font-extrabold uppercase tracking-wide text-indacs-primary">
            {ind.directAcsGoal.badge}
          </p>
          <p className="mt-1 text-xs text-indacs-ink leading-snug">
            {ind.summaryAnswer}
          </p>
          <span className="mt-1.5 inline-block text-[11px] font-bold text-indacs-primary underline">
            Toque para abrir {ind.code} →
          </span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  // 'cartilha' | 'calendario'
  const [activeScreen, setActiveScreen] = useState('cartilha');
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  // Search & Voice Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const recognitionRef = useRef(null);

  // Calendar state
  const [isDemoSharedMode, setIsDemoSharedMode] = useState(false);
  const [isModuleDisabled, setIsModuleDisabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.MODULE_DISABLED) === 'true';
    } catch {
      return false;
    }
  });

  const [journeyMarks, setJourneyMarks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MARKS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

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

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
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
        'Seu navegador não suporta busca por voz nativa. Tente usar o Google Chrome ou Safari no celular.'
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
        setVoiceFeedback(
          'Ouvindo sua voz... Fale o que procura (ex.: "diabetes", "recém-nascido", "vacina", "C2").'
        );
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
        if (
          event.error === 'not-allowed' ||
          event.error === 'service-not-allowed'
        ) {
          setVoiceError(
            'Permissão de microfone negada. Permita o uso do microfone no navegador.'
          );
        } else if (event.error === 'no-speech') {
          setVoiceError('Nenhuma fala detectada. Toque no microfone para tentar novamente.');
        } else {
          setVoiceError('Não foi possível capturar o áudio. Tente novamente.');
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

  // Persist calendar data to localStorage
  useEffect(() => {
    if (isDemoSharedMode) return;
    try {
      localStorage.setItem(STORAGE_KEYS.MARKS, JSON.stringify(journeyMarks));
    } catch {
      // Ignore
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

    const strictMatches = INDICATORS.filter((ind) => {
      const corpus = buildCorpus(ind);
      return terms.every((t) => corpus.includes(t));
    });

    if (strictMatches.length > 0) return strictMatches;

    const scored = INDICATORS.map((ind) => {
      const corpus = buildCorpus(ind);
      const matchCount = terms.filter((t) => corpus.includes(t)).length;
      return { ind, matchCount };
    })
      .filter((item) => item.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);

    return scored.map((item) => item.ind);
  }, [searchQuery]);

  const openIndicator = (ind) => {
    setSelectedIndicator(ind);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calendar handlers
  const handleToggleDayMark = (dateKey) => {
    setJourneyMarks((prev) => {
      const current = prev[dateKey] || { marked: false, reflection: '' };
      return {
        ...prev,
        [dateKey]: { ...current, marked: !current.marked }
      };
    });
  };

  const handleSaveDayReflection = (dateKey, reflectionText) => {
    setJourneyMarks((prev) => {
      const current = prev[dateKey] || { marked: false, reflection: '' };
      return {
        ...prev,
        [dateKey]: { ...current, reflection: reflectionText }
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
    setActiveScreen('cartilha');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFiltering = Boolean(searchQuery.trim());

  return (
    <div className="min-h-screen flex flex-col bg-indacs-cream text-indacs-ink">
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 sm:px-6 pt-5 pb-12">
        {/* TELA 4 WELCOME BANNER: Shown only if user saved an intention in the calendar */}
        {!isModuleDisabled &&
          showWelcomeIntentionBanner &&
          intentionData?.text &&
          !selectedIndicator &&
          activeScreen === 'cartilha' && (
            <IntentionWelcomeBanner
              intentionData={intentionData}
              onUpdateIntention={handleUpdateIntention}
              onClearIntention={handleClearIntention}
              onDismissBanner={() => setShowWelcomeIntentionBanner(false)}
              isSimulatedReturn={isSimulatedReturn}
            />
          )}

        {/* INDICATOR PAGE (Identical to Pages 2-9 of CARTILHA INDACS.pdf) */}
        {selectedIndicator ? (
          <IndicatorDetailModal
            indicator={selectedIndicator}
            onClose={() => setSelectedIndicator(null)}
          />
        ) : activeScreen === 'calendario' ? (
          /* CALENDAR SCREEN ("Jornadas que Cuidam") */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveScreen('cartilha')}
                className="inline-flex items-center gap-1.5 rounded-full bg-indacs-primary px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indacs-dark transition"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar para a Cartilha Indacs</span>
              </button>
            </div>
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
              onToggleModuleDisabled={() => setIsModuleDisabled((prev) => !prev)}
              onSimulateNextDayReturn={handleSimulateNextDayReturn}
            />
          </div>
        ) : (
          /* HOME SCREEN (Identical to Page 1 of CARTILHA INDACS.pdf + Voice Filter) */
          <div className="space-y-6">
            {/* Cover Rounded Header Pill identical to Page 1 of Cartilha */}
            <header className="mx-auto max-w-2xl rounded-[2.75rem] bg-indacs-primary px-6 py-7 sm:px-10 sm:py-9 text-center text-white shadow-md">
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
                Indacs
              </h1>
              <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base font-medium text-white/95 leading-snug">
                Cartilha interativa dos indicadores de qualidade da Atenção Primária a Saúde para{' '}
                <strong className="font-extrabold">Agentes Comunitários de Saúde</strong>
              </p>
            </header>

            {/* Clean Search + Voice Filter Bar */}
            <section
              aria-label="Pesquisa por texto ou filtro por voz"
              className="mx-auto max-w-xl space-y-2.5"
            >
              <div className="relative flex items-center">
                <Search className="pointer-events-none absolute left-4 h-5 w-5 text-indacs-primary" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (!e.target.value) setVoiceFeedback('');
                  }}
                  placeholder="Buscar por palavra ou filtrar por voz (ex.: criança, diabetes, vacina...)"
                  aria-label="Buscar nos indicadores por texto ou voz"
                  className={`w-full rounded-full border-2 bg-white py-3 pl-11 pr-28 text-sm sm:text-base font-medium text-indacs-ink placeholder:text-indacs-muted/70 focus:outline-none shadow-sm transition ${
                    isListeningVoice
                      ? 'border-red-500 ring-2 ring-red-300'
                      : 'border-indacs-primary/40 focus:border-indacs-primary'
                  }`}
                />
                <div className="absolute right-2 flex items-center gap-1">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setVoiceFeedback('');
                      }}
                      aria-label="Limpar busca"
                      className="rounded-full bg-indacs-cream p-2 text-indacs-ink hover:bg-indacs-primary hover:text-white transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleToggleVoiceSearch}
                    aria-pressed={isListeningVoice}
                    title="Filtrar por voz"
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-extrabold transition ${
                      isListeningVoice
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-indacs-primary text-white hover:bg-indacs-dark'
                    }`}
                  >
                    {isListeningVoice ? (
                      <>
                        <MicOff className="h-4 w-4" />
                        <span>Parar</span>
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4" />
                        <span>Voz</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Voice Status / Error Feedback */}
              {isListeningVoice && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-center justify-between gap-2 rounded-2xl border border-red-300 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-950"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-ping shrink-0" />
                    {voiceFeedback || 'Ouvindo... Fale agora perto do microfone.'}
                  </span>
                  <button
                    type="button"
                    onClick={stopVoiceSearch}
                    className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-bold text-white"
                  >
                    Concluir
                  </button>
                </div>
              )}

              {!isListeningVoice && voiceFeedback && searchQuery && (
                <div className="flex items-center justify-between gap-2 rounded-xl bg-white/80 border border-indacs-primary/25 px-3 py-1.5 text-xs font-semibold text-indacs-dark">
                  <span className="flex items-center gap-1.5">
                    <Mic className="h-3.5 w-3.5 text-indacs-primary" />
                    {voiceFeedback} ({filteredIndicators.length}{' '}
                    {filteredIndicators.length === 1 ? 'resultado' : 'resultados'})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setVoiceFeedback('');
                    }}
                    className="underline font-bold text-indacs-primary"
                  >
                    Mostrar todos
                  </button>
                </div>
              )}

              {voiceError && (
                <div
                  role="alert"
                  className="flex items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-950"
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

              {/* Subtle Quick Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
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
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold transition ${
                      searchQuery === chip.query
                        ? 'bg-indacs-primary text-white shadow-sm'
                        : 'bg-white/75 text-indacs-dark border border-indacs-primary/20 hover:bg-white'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Cartilha Instruction Line */}
            <p className="text-center text-base sm:text-lg font-medium text-indacs-primary">
              <strong className="font-extrabold">Toque</strong> em cada ícone para navegar.
            </p>

            {/* 7 Circular Icons in Kalilka's 3 - 2 - 2 Cartilha Layout (or filtered list when searching) */}
            {filteredIndicators.length === 0 ? (
              <div className="mx-auto max-w-md rounded-3xl border border-indacs-primary/25 bg-white/90 p-6 text-center">
                <p className="text-sm sm:text-base font-bold text-indacs-ink">
                  Nenhum indicador encontrado para “{searchQuery}”.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setVoiceFeedback('');
                  }}
                  className="mt-3 rounded-full bg-indacs-primary px-5 py-2 text-xs font-bold text-white"
                >
                  Ver todos os 7 indicadores
                </button>
              </div>
            ) : !isFiltering ? (
              /* Exact 3 - 2 - 2 Pyramid Grid from Page 1 of CARTILHA INDACS.pdf */
              <div className="space-y-8 py-2">
                {/* Row 1: C1, C2, C3 */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 justify-items-center">
                  {INDICATORS.slice(0, 3).map((ind) => (
                    <CartilhaIconButton
                      key={ind.id}
                      ind={ind}
                      onClick={openIndicator}
                      showSnippet={false}
                    />
                  ))}
                </div>

                {/* Row 2: C4, C5 */}
                <div className="mx-auto max-w-md grid grid-cols-2 gap-4 sm:gap-8 justify-items-center">
                  {INDICATORS.slice(3, 5).map((ind) => (
                    <CartilhaIconButton
                      key={ind.id}
                      ind={ind}
                      onClick={openIndicator}
                      showSnippet={false}
                    />
                  ))}
                </div>

                {/* Row 3: C6, C7 */}
                <div className="mx-auto max-w-md grid grid-cols-2 gap-4 sm:gap-8 justify-items-center">
                  {INDICATORS.slice(5, 7).map((ind) => (
                    <CartilhaIconButton
                      key={ind.id}
                      ind={ind}
                      onClick={openIndicator}
                      showSnippet={false}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Filtered Results View with Direct Information Snippet */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center py-2">
                {filteredIndicators.map((ind) => (
                  <CartilhaIconButton
                    key={ind.id}
                    ind={ind}
                    onClick={openIndicator}
                    showSnippet={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer matching Page 1 of Cartilha + Discreet Calendar Button */}
      <footer className="mt-auto bg-indacs-primary text-white py-3.5 px-4 sm:px-8">
        <div className="mx-auto max-w-3xl flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setSelectedIndicator(null);
              setActiveScreen('cartilha');
            }}
            className="text-xl sm:text-2xl font-extrabold tracking-tight hover:opacity-90"
          >
            Indacs
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedIndicator(null);
                setActiveScreen(
                  activeScreen === 'calendario' ? 'cartilha' : 'calendario'
                );
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-indacs-cream hover:bg-white/25 transition"
            >
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>
                {activeScreen === 'calendario'
                  ? 'Ver Cartilha'
                  : 'Meu Calendário (X)'}
              </span>
            </button>
            <span className="text-xs sm:text-sm font-bold tracking-wide text-white/95">
              PET SAÚDE DIGITAL | UFCG
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
