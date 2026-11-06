import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trash2,
  EyeOff,
  Eye,
  ShieldCheck,
  HeartHandshake,
  RotateCcw,
  Check,
  X
} from 'lucide-react';
import { INTENTION_SUGGESTIONS } from '../data/indacsData';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function CalendarJornadas({
  journeyMarks,
  onToggleDayMark,
  onSaveDayReflection,
  intentionData,
  onSaveIntention,
  onClearIntention,
  onClearAllRecords,
  isDemoSharedMode,
  onToggleDemoSharedMode,
  isModuleDisabled,
  onToggleModuleDisabled,
  onSimulateNextDayReturn
}) {
  // Default to November 2026 (workshop date)
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(10); // 0-indexed: 10 = Novembro
  const [selectedDateKey, setSelectedDateKey] = useState('2026-11-06');
  const [showBridgePromptForKey, setShowBridgePromptForKey] = useState(null);
  const [reflectionDraft, setReflectionDraft] = useState(
    journeyMarks['2026-11-06']?.reflection || ''
  );
  const [intentionDraft, setIntentionDraft] = useState(intentionData?.text || '');
  const [confirmClearModal, setConfirmClearModal] = useState(false);
  const [savedNotice, setSavedNotice] = useState('');

  if (isModuleDisabled) {
    return (
      <div className="rounded-3xl border-2 border-indacs-primary/25 bg-indacs-creamCard p-6 text-center shadow-sm space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indacs-cream text-indacs-primary">
          <EyeOff className="h-7 w-7" />
        </div>
        <h2 className="text-lg sm:text-xl font-extrabold text-indacs-ink">
          Módulo “Jornadas que Cuidam” desativado
        </h2>
        <p className="mx-auto max-w-md text-sm text-indacs-muted">
          O calendário é uma experiência 100% opcional de reconhecimento pessoal. Você pode usar o INDACS 2.0 apenas para consultar os 7 indicadores ou reativar o calendário quando desejar.
        </p>
        <button
          type="button"
          onClick={onToggleModuleDisabled}
          className="inline-flex items-center gap-2 rounded-xl bg-indacs-primary px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-indacs-dark"
        >
          <Eye className="h-4 w-4" />
          Reativar “Jornadas que Cuidam”
        </button>
      </div>
    );
  }

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const formatDateKey = (year, month, day) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const formatHumanDate = (dateKey) => {
    if (!dateKey) return '';
    const [y, m, d] = dateKey.split('-');
    return `${d}/${m}/${y}`;
  };

  const handleSelectDay = (day) => {
    const key = formatDateKey(viewYear, viewMonth, day);
    setSelectedDateKey(key);
    setReflectionDraft(journeyMarks[key]?.reflection || '');
  };

  const handleToggleX = (dateKey) => {
    const currentlyMarked = Boolean(journeyMarks[dateKey]?.marked);
    onToggleDayMark(dateKey);
    if (!currentlyMarked) {
      // Just marked X! Open Tela 4 bridge prompt gently
      setShowBridgePromptForKey(dateKey);
      setIntentionDraft(intentionData?.text || '');
    } else {
      if (showBridgePromptForKey === dateKey) {
        setShowBridgePromptForKey(null);
      }
    }
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSaveReflectionClick = () => {
    onSaveDayReflection(selectedDateKey, reflectionDraft.trim());
    setSavedNotice('Reflexão privada salva neste navegador.');
    setTimeout(() => setSavedNotice(''), 2500);
  };

  const handleSaveBridgeIntention = () => {
    if (intentionDraft.trim()) {
      onSaveIntention(intentionDraft.trim(), formatHumanDate(selectedDateKey));
      setSavedNotice('Intenção guardada para a próxima jornada.');
      setTimeout(() => setSavedNotice(''), 2500);
    }
    setShowBridgePromptForKey(null);
  };

  const selectedDayRecord = journeyMarks[selectedDateKey] || {
    marked: false,
    reflection: ''
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Header Banner of Tela 3 & Tela 4 */}
      <div className="rounded-3xl bg-indacs-primary p-5 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indacs-cream text-indacs-primary shadow-inner">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indacs-cream">
                Telas 3 e 4 • Experiência Opcional
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold">
                Jornadas que Cuidam
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onSimulateNextDayReturn}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indacs-cream px-3 py-2 text-xs font-extrabold text-indacs-dark shadow-sm hover:bg-white transition"
              title="Testar como o aplicativo acolhe o ACS ao voltar em outra data"
            >
              <Sparkles className="h-4 w-4 text-indacs-primary" />
              Testar retorno em novo dia (Tela 4)
            </button>
            <button
              type="button"
              onClick={onToggleModuleDisabled}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-xs font-bold text-white hover:bg-white/25 transition"
            >
              <EyeOff className="h-4 w-4" />
              Desativar módulo
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs sm:text-sm text-indacs-cream/95 leading-relaxed">
          O <strong>X</strong> significa <strong>“reconheço minha jornada”</strong> — nunca “cumpri metas”, “registrei visitas” ou “provei presença”. Não há ranking, sequência obrigatória nem vigilância.
        </p>
        <p className="mt-1.5 text-xs italic text-indacs-cream/85">
          Princípio da experiência: “Cada dia vivido merece reconhecimento. Cada novo dia merece a liberdade de recomeçar.”
        </p>
      </div>

      {/* Privacy & Shared Device Mode Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border-2 border-indacs-primary/25 bg-white p-4 shadow-sm">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="h-5 w-5 text-indacs-primary shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-indacs-ink">
              Privacidade e Aparelho Compartilhado:
            </span>{' '}
            <span className="text-indacs-muted">
              {isDemoSharedMode
                ? 'Modo Demonstração ATIVO (registros ficam apenas na memória temporária e somem ao fechar a aba).'
                : 'Salvando apenas neste navegador (localStorage). Nenhum dado é enviado para servidores.'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleDemoSharedMode}
            className={`rounded-xl px-3 py-2 text-xs font-bold border transition ${
              isDemoSharedMode
                ? 'bg-amber-100 border-amber-400 text-amber-950'
                : 'bg-indacs-creamLight border-indacs-primary/30 text-indacs-ink hover:bg-indacs-cream'
            }`}
          >
            {isDemoSharedMode
              ? 'Modo Aparelho Compartilhado: ON'
              : 'Ativar Modo Aparelho Compartilhado'}
          </button>

          <button
            type="button"
            onClick={() => setConfirmClearModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-800 hover:bg-red-100 transition"
          >
            <Trash2 className="h-4 w-4" />
            Apagar registros
          </button>
        </div>
      </div>

      {confirmClearModal && (
        <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-4 text-sm text-red-950 shadow-sm">
          <p className="font-bold">
            Tem certeza que deseja apagar todos os X, reflexões e intenções salvos neste navegador?
          </p>
          <p className="mt-1 text-xs text-red-800">
            Esta ação limpa imediatamente os dados locais para proteger sua privacidade.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                onClearAllRecords();
                setReflectionDraft('');
                setIntentionDraft('');
                setShowBridgePromptForKey(null);
                setConfirmClearModal(false);
              }}
              className="rounded-xl bg-red-700 px-4 py-2 text-xs font-bold text-white hover:bg-red-800"
            >
              Sim, apagar tudo agora
            </button>
            <button
              type="button"
              onClick={() => setConfirmClearModal(false)}
              className="rounded-xl border border-red-300 bg-white px-4 py-2 text-xs font-bold text-red-900 hover:bg-red-100"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Calendar (Tela 3) + Selected Day / Bridge (Tela 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Calendar Monthly Grid */}
        <div className="lg:col-span-7 rounded-3xl border-2 border-indacs-primary/20 bg-white p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="inline-flex items-center justify-center rounded-xl border border-indacs-primary/25 bg-indacs-creamLight p-2.5 text-indacs-ink hover:bg-indacs-cream"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-extrabold text-indacs-ink flex items-center justify-center gap-2">
                <CalendarIcon className="h-5 w-5 text-indacs-primary" />
                {MONTH_NAMES[viewMonth]} de {viewYear}
              </h2>
              <p className="text-xs text-indacs-muted">
                Toque em um dia para selecionar • Marque ou desmarque o <strong>X</strong> livremente
              </p>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="inline-flex items-center justify-center rounded-xl border border-indacs-primary/25 bg-indacs-creamLight p-2.5 text-indacs-ink hover:bg-indacs-cream"
              aria-label="Próximo mês"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-indacs-muted mb-2">
            {WEEKDAYS.map((w) => (
              <div key={w} className="py-1">
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-12 sm:h-14 rounded-xl bg-transparent" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const dateKey = formatDateKey(viewYear, viewMonth, day);
              const dayRecord = journeyMarks[dateKey];
              const isMarked = Boolean(dayRecord?.marked);
              const hasReflection = Boolean(dayRecord?.reflection);
              const isSelected = selectedDateKey === dateKey;
              const isWorkshopDay = dateKey === '2026-11-06';

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  onDoubleClick={() => handleToggleX(dateKey)}
                  aria-label={`Dia ${day} de ${MONTH_NAMES[viewMonth]}${isMarked ? ', jornada reconhecida com X' : ''}`}
                  className={`relative flex flex-col items-center justify-between rounded-2xl p-1.5 sm:p-2 h-14 sm:h-16 border-2 transition ${
                    isSelected
                      ? 'border-indacs-dark bg-indacs-cream ring-2 ring-indacs-primary/30'
                      : isMarked
                      ? 'border-indacs-primary bg-indacs-creamLight'
                      : 'border-indacs-primary/15 bg-indacs-creamCard hover:bg-indacs-creamLight'
                  }`}
                >
                  <div className="flex w-full items-center justify-between px-0.5">
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        isWorkshopDay ? 'text-indacs-primary underline' : 'text-indacs-ink'
                      }`}
                    >
                      {day}
                    </span>
                    {hasReflection && (
                      <span
                        className="h-2 w-2 rounded-full bg-indacs-primary"
                        title="Possui reflexão privada"
                      />
                    )}
                  </div>

                  {/* Hand-drawn style reversible X */}
                  <div className="flex flex-1 items-center justify-center">
                    {isMarked ? (
                      <span
                        className="text-xl sm:text-2xl font-black text-indacs-primary select-none leading-none drop-shadow-sm"
                        title="Jornada reconhecida com X"
                      >
                        ✕
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-indacs-muted/50">
                        •
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-indacs-creamLight p-3 text-xs text-indacs-muted">
            <span>
              <strong>Dica:</strong> Selecione o dia e toque no botão ao lado para marcar ou desmarcar o <strong>X</strong>.
            </span>
            <span>Dia da oficina: 06/11/2026</span>
          </div>
        </div>

        {/* Right Column: Day Recognition + Optional Reflection + Bridge to Next Journey (Tela 4) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Mark/Unmark X on Selected Day */}
          <div className="rounded-3xl border-2 border-indacs-primary/25 bg-white p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-indacs-cream px-3 py-1 text-xs font-extrabold text-indacs-dark">
                Dia selecionado: {formatHumanDate(selectedDateKey)}
              </span>
              {selectedDayRecord.marked && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-900">
                  ✕ Jornada reconhecida
                </span>
              )}
            </div>

            <h3 className="mt-3 text-base sm:text-lg font-extrabold text-indacs-ink">
              Reconhecimento do dia vivido
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-indacs-muted">
              Marcar o <strong>X</strong> é um gesto voluntário e reversível para reconhecer seu dia de trabalho e cuidado.
            </p>

            <button
              type="button"
              onClick={() => handleToggleX(selectedDateKey)}
              className={`mt-3 w-full flex items-center justify-center gap-2.5 rounded-2xl px-4 py-3.5 text-sm sm:text-base font-extrabold shadow transition active:scale-[0.99] ${
                selectedDayRecord.marked
                  ? 'border-2 border-indacs-primary bg-indacs-creamLight text-indacs-dark hover:bg-indacs-cream'
                  : 'bg-indacs-primary text-white hover:bg-indacs-dark'
              }`}
            >
              {selectedDayRecord.marked ? (
                <>
                  <RotateCcw className="h-5 w-5" />
                  <span>Desmarcar o X deste dia ({formatHumanDate(selectedDateKey)})</span>
                </>
              ) : (
                <>
                  <span className="text-lg leading-none">✕</span>
                  <span>Marcar X — Reconheço minha jornada em {formatHumanDate(selectedDateKey)}</span>
                </>
              )}
            </button>

            {/* Optional Private Reflection */}
            <div className="mt-4 pt-4 border-t border-indacs-primary/15">
              <label
                htmlFor="day-reflection"
                className="block text-xs sm:text-sm font-bold text-indacs-ink"
              >
                Reflexão pessoal do dia (opcional e privada):
              </label>
              <p className="text-[11px] text-indacs-muted mb-2">
                Atenção: não escreva nomes, endereços, CPF, CNS ou casos identificáveis de pacientes.
              </p>
              <textarea
                id="day-reflection"
                rows={2}
                value={reflectionDraft}
                onChange={(e) => setReflectionDraft(e.target.value)}
                placeholder="Se quiser, anote um sentimento ou aprendizado desta jornada..."
                className="w-full rounded-xl border-2 border-indacs-primary/25 bg-indacs-creamLight/40 p-3 text-sm text-indacs-ink focus:border-indacs-primary focus:bg-white focus:outline-none"
              />
              <div className="mt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleSaveReflectionClick}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indacs-dark px-4 py-2 text-xs font-bold text-white hover:bg-indacs-primary transition"
                >
                  <Check className="h-4 w-4" />
                  Salvar reflexão opcional
                </button>
                {savedNotice && (
                  <span className="text-xs font-bold text-emerald-800">
                    ✓ {savedNotice}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Tela 4 — A ponte para a próxima jornada */}
          <div
            className={`rounded-3xl border-2 p-4 sm:p-5 shadow-sm transition ${
              showBridgePromptForKey
                ? 'border-indacs-primary bg-indacs-creamLight ring-2 ring-indacs-primary/30'
                : 'border-indacs-primary/25 bg-white'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indacs-primary">
                <Sparkles className="h-4 w-4" />
                Tela 4 • A ponte para a próxima jornada
              </span>
              {showBridgePromptForKey && (
                <span className="rounded-full bg-indacs-primary px-2.5 py-0.5 text-[11px] font-bold text-white">
                  Novo X marcado!
                </span>
              )}
            </div>

            <h3 className="mt-1.5 text-base sm:text-lg font-extrabold text-indacs-ink">
              “O que você gostaria de levar para a próxima jornada?”
            </h3>
            <p className="mt-1 text-xs text-indacs-muted">
              Ao retornar ao aplicativo em outra data, esta intenção aparecerá sem cobrança, alerta de atraso ou julgamento. Você também pode pular se preferir.
            </p>

            {/* Quick suggestion chips */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {INTENTION_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIntentionDraft(sug)}
                  className="rounded-xl border border-indacs-primary/25 bg-white px-2.5 py-1.5 text-xs font-semibold text-indacs-ink hover:bg-indacs-cream text-left transition"
                >
                  + {sug}
                </button>
              ))}
            </div>

            <div className="mt-3">
              <textarea
                rows={2}
                value={intentionDraft}
                onChange={(e) => setIntentionDraft(e.target.value)}
                placeholder="Escreva uma intenção pessoal ou escolha uma sugestão acima..."
                className="w-full rounded-xl border-2 border-indacs-primary/30 bg-white p-3 text-sm text-indacs-ink focus:border-indacs-primary focus:outline-none"
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleSaveBridgeIntention}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indacs-primary px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow hover:bg-indacs-dark"
              >
                <Check className="h-4 w-4" />
                Guardar intenção para a próxima jornada
              </button>

              <button
                type="button"
                onClick={() => setShowBridgePromptForKey(null)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-indacs-primary/25 bg-white px-3.5 py-2.5 text-xs font-bold text-indacs-muted hover:bg-indacs-cream"
              >
                Pular por agora
              </button>

              {intentionData?.text && (
                <button
                  type="button"
                  onClick={() => {
                    onClearIntention();
                    setIntentionDraft('');
                  }}
                  className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-800 hover:bg-red-100"
                >
                  <X className="h-4 w-4" />
                  Abandonar intenção atual
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

