import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  BookOpen,
  Scale,
  HelpCircle,
  Image as ImageIcon,
  FileCheck2,
  Eye,
  MessageSquareWarning,
  UserCheck
} from 'lucide-react';

export default function IndicatorDetailModal({
  indicator,
  initialTab = 'orientacao',
  onClose,
  onSelectIndicator,
  allIndicators
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [cartilhaPageIdx, setCartilhaPageIdx] = useState(0);

  if (!indicator) return null;

  const scenario = indicator.scenario;
  const selectedOption = scenario?.options?.find((o) => o.id === selectedOptionId);
  const cartilhaPages = [
    indicator.cartilhaPageImg,
    ...(indicator.cartilhaPageImg2 ? [indicator.cartilhaPageImg2] : [])
  ];

  const handleSwitchIndicator = (nextInd) => {
    setSelectedOptionId(null);
    setCartilhaPageIdx(0);
    onSelectIndicator(nextInd);
  };

  return (
    <div className="space-y-4 pb-10">
      {/* Top Navigation Bar inspired by Kalilka's Cartilha */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-indacs-primary px-4 py-3 text-white shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight">Indacs</span>
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold">
            {indicator.code} • {indicator.shortTitle}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 rounded-full bg-indacs-cream px-4 py-1.5 text-sm font-bold text-indacs-dark shadow-sm hover:bg-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos 7 indicadores
        </button>
      </div>

      {/* Quick switcher between C1-C7 */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {allIndicators.map((ind) => {
          const isCurrent = ind.id === indicator.id;
          return (
            <button
              key={ind.id}
              type="button"
              onClick={() => handleSwitchIndicator(ind)}
              className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${
                isCurrent
                  ? 'bg-indacs-primary text-white shadow-sm'
                  : 'bg-indacs-creamCard text-indacs-ink border border-indacs-primary/20 hover:bg-white'
              }`}
            >
              {ind.code} • {ind.shortTitle}
            </button>
          );
        })}
      </div>

      {/* Main Banner Card matching Kalilka's Cartilha layout */}
      <div className="rounded-3xl bg-indacs-creamLight border-2 border-indacs-primary/20 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-indacs-primary p-4 text-white shadow-sm">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-indacs-cream bg-indacs-cream p-2 shadow-inner">
            <img
              src={indicator.icon}
              alt={`Ícone ${indicator.code}`}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  indicator.validationStatus === 'validado_prioritario'
                    ? 'bg-emerald-200 text-emerald-950'
                    : 'bg-amber-200 text-amber-950'
                }`}
              >
                {indicator.validationStatus === 'validado_prioritario'
                  ? '✓ Conteúdo e Caso Validados (Foco da Oficina)'
                  : '⏳ Em revisão complementar pela equipe de saúde'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">
              {indicator.cartilhaTitle}
            </h1>
            <p className="mt-0.5 text-xs sm:text-sm text-indacs-cream/90">
              {indicator.fullTitle}
            </p>
          </div>
        </div>

        {/* Sub-navigation Tabs inside the Indicator */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'orientacao'}
            onClick={() => setActiveTab('orientacao')}
            className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold transition ${
              activeTab === 'orientacao'
                ? 'bg-indacs-dark text-white shadow-sm'
                : 'bg-white text-indacs-ink border border-indacs-primary/25 hover:bg-indacs-cream'
            }`}
          >
            <UserCheck className="h-4 w-4 shrink-0" />
            <span>O que cabe ao ACS</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'cenario'}
            onClick={() => setActiveTab('cenario')}
            className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold transition ${
              activeTab === 'cenario'
                ? 'bg-indacs-dark text-white shadow-sm'
                : 'bg-white text-indacs-ink border border-indacs-primary/25 hover:bg-indacs-cream'
            }`}
          >
            <HelpCircle className="h-4 w-4 shrink-0" />
            <span>Situação Interativa</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'limites'}
            onClick={() => setActiveTab('limites')}
            className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold transition ${
              activeTab === 'limites'
                ? 'bg-indacs-dark text-white shadow-sm'
                : 'bg-white text-indacs-ink border border-indacs-primary/25 hover:bg-indacs-cream'
            }`}
          >
            <Scale className="h-4 w-4 shrink-0" />
            <span>Limites e Critérios</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'cartilha'}
            onClick={() => setActiveTab('cartilha')}
            className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold transition ${
              activeTab === 'cartilha'
                ? 'bg-indacs-dark text-white shadow-sm'
                : 'bg-white text-indacs-ink border border-indacs-primary/25 hover:bg-indacs-cream'
            }`}
          >
            <ImageIcon className="h-4 w-4 shrink-0" />
            <span>Cartilha Original</span>
          </button>
        </div>

        {/* TAB 1: O QUE COMPETE AO ACS (Cartilha + Síntese Visual) */}
        {activeTab === 'orientacao' && (
          <div className="mt-5 space-y-5">
            {/* Direct Goal Callout */}
            <div className="rounded-2xl border-2 border-indacs-primary/30 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indacs-primary/10 px-3 py-1 text-xs font-extrabold text-indacs-primary">
                  <FileCheck2 className="h-4 w-4" />
                  {indicator.directAcsGoal.badge}
                </span>
                <span className="text-xs font-semibold text-indacs-muted">
                  Fonte: {indicator.sources.cartilha}
                </span>
              </div>
              <p className="mt-2 text-sm sm:text-base font-medium text-indacs-ink leading-relaxed">
                {indicator.directAcsGoal.description}
              </p>
            </div>

            {/* Checklist of ACS Competencies */}
            <div className="rounded-2xl bg-white p-4 sm:p-5 border border-indacs-primary/20 shadow-sm">
              <h2 className="text-base sm:text-lg font-extrabold text-indacs-primary border-b border-indacs-primary/20 pb-2 mb-3">
                O que compete ao ACS na rotina ({indicator.code})
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {indicator.acsCompetencies.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl bg-indacs-creamLight/70 p-3 text-sm font-medium text-indacs-ink"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-indacs-primary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Original Dialogue + Illustration from Kalilka's Cartilha */}
            <div className="rounded-2xl bg-gradient-to-b from-indacs-cream/60 to-indacs-light/25 border border-indacs-primary/20 p-4 sm:p-5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-7 space-y-3">
                  <div className="inline-block rounded-2xl rounded-bl-none border-2 border-indacs-dark bg-indacs-cream px-4 py-3 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-indacs-muted">
                      Dúvida da rotina
                    </p>
                    <p className="text-sm sm:text-base font-bold text-indacs-ink">
                      “{indicator.summaryQuestion}”
                    </p>
                  </div>

                  <div className="rounded-2xl rounded-br-none bg-indacs-primary p-4 text-white shadow-md">
                    <p className="text-xs font-bold uppercase tracking-wider text-indacs-cream">
                      Resposta do ACS (Cartilha INDACS)
                    </p>
                    <p className="mt-1 text-sm sm:text-base font-medium leading-relaxed">
                      “{indicator.summaryAnswer}”
                    </p>
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('cenario')}
                      className="inline-flex items-center gap-2 rounded-xl bg-indacs-dark px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow hover:bg-indacs-primary transition"
                    >
                      <HelpCircle className="h-4 w-4" />
                      Praticar com a Situação Interativa de {indicator.code} →
                    </button>
                  </div>
                </div>

                <div className="md:col-span-5 flex flex-col items-center">
                  <img
                    src={indicator.illustration}
                    alt={`Ilustração original da Cartilha INDACS para ${indicator.code}`}
                    className="max-h-60 w-auto object-contain drop-shadow-md"
                  />
                  <span className="mt-1 text-[11px] font-medium text-indacs-muted">
                    Ilustração original da Cartilha INDACS (Kalilka / PET Saúde Digital)
                  </span>
                </div>
              </div>
            </div>

            {/* Source Footer */}
            <div className="rounded-xl bg-white/90 border border-indacs-primary/20 p-3.5 text-xs text-indacs-muted space-y-1">
              <p className="font-bold text-indacs-ink flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-indacs-primary" />
                Fontes documentais verificáveis deste cartão:
              </p>
              <p>• <strong>Cartilha:</strong> {indicator.sources.cartilha}</p>
              <p>• <strong>Nota Metodológica MS:</strong> {indicator.sources.nota}</p>
              <p>• <strong>Validação:</strong> {indicator.sources.reviewNote}</p>
            </div>
          </div>
        )}

        {/* TAB 2: TELA 2 — ORIENTAÇÃO CONTEXTUALIZADA E SITUAÇÃO INTERATIVA */}
        {activeTab === 'cenario' && scenario && (
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border-2 border-indacs-primary/30 bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                    scenario.isPriorityValidated
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {scenario.badge}
                </span>
                <span className="text-xs font-semibold text-indacs-muted">
                  Situação inteiramente fictícia • Sem dados de pacientes
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-indacs-ink">
                {scenario.title}
              </h2>
              <p className="mt-2 rounded-xl bg-indacs-creamLight p-3.5 text-sm sm:text-base text-indacs-ink leading-relaxed border border-indacs-primary/15">
                {scenario.context}
              </p>

              {/* 3 Structured Guidance Cards required by Tela 2 of the Roteiro */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-xl border border-indacs-primary/20 bg-indacs-creamLight/50 p-3.5">
                  <h3 className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-indacs-primary">
                    <Eye className="h-4 w-4 shrink-0" />
                    1. O que observar
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-indacs-ink">
                    {scenario.whatToObserve.map((obs, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold text-indacs-primary">•</span>
                        <span>{obs}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-indacs-primary/20 bg-indacs-creamLight/50 p-3.5">
                  <h3 className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-indacs-primary">
                    <UserCheck className="h-4 w-4 shrink-0" />
                    2. O que cabe ao ACS
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-indacs-ink">
                    {scenario.whatBelongsToAcs.map((act, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold text-indacs-primary">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-3.5">
                  <h3 className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-amber-900">
                    <MessageSquareWarning className="h-4 w-4 shrink-0" />
                    3. Quando comunicar à equipe
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-amber-950">
                    {scenario.whenToCommunicateTeam.map((com, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold text-amber-800">•</span>
                        <span>{com}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Exact Source Citation */}
              <div className="mt-3 rounded-xl bg-indacs-cream/60 px-3.5 py-2.5 text-xs text-indacs-ink">
                <strong>Fonte exata desta orientação:</strong> {scenario.exactSource}
              </div>
            </div>

            {/* Interactive Decision Question with Immediate Feedback */}
            <div className="rounded-2xl border-2 border-indacs-dark/30 bg-white p-4 sm:p-5 shadow-md">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indacs-primary">
                <HelpCircle className="h-4 w-4" />
                Pergunta de decisão e encaminhamento seguro
              </div>
              <h3 className="mt-1 text-base sm:text-lg font-extrabold text-indacs-ink">
                {scenario.question}
              </h3>
              <p className="mt-0.5 text-xs text-indacs-muted">
                Toque em uma das opções abaixo para conferir o feedback baseado nas Notas Metodológicas:
              </p>

              <div className="mt-3 space-y-2.5">
                {scenario.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let btnStyle =
                    'border-indacs-primary/25 bg-indacs-creamLight/60 text-indacs-ink hover:bg-indacs-cream';
                  if (isSelected) {
                    btnStyle = opt.isCorrect
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/40'
                      : 'border-amber-600 bg-amber-50 text-amber-950 ring-2 ring-amber-500/40';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`w-full text-left rounded-xl border-2 p-3.5 transition flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indacs-primary text-xs font-extrabold uppercase text-white mt-0.5">
                        {opt.id}
                      </span>
                      <span className="text-sm sm:text-base font-semibold leading-snug">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedOption && (
                <div
                  role="status"
                  className={`mt-4 rounded-2xl border-2 p-4 ${
                    selectedOption.isCorrect
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                      : 'border-amber-600 bg-amber-50 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base">
                    {selectedOption.isCorrect ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0" />
                        <span>Conduta segura e alinhada à Nota Metodológica!</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0" />
                        <span>Atenção aos limites de atribuição e prazos da Nota!</span>
                      </>
                    )}
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed">
                    {selectedOption.feedback}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold opacity-85">
                    Fonte normativa: {scenario.exactSource}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: DIFERENCIAÇÃO EXPLÍCITA (CRITÉRIOS DO INDICADOR VS. ATRIBUIÇÕES DO ACS VS. OUTROS PROFISSIONAIS) */}
        {activeTab === 'limites' && (
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border-2 border-indacs-primary/30 bg-white p-4 sm:p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-extrabold text-indacs-primary">
                <Scale className="h-5 w-5" />
                1. Critérios de cálculo do indicador ({indicator.code}) no SIAPS / e-SUS APS
              </h2>
              <p className="mt-2 text-sm text-indacs-ink leading-relaxed">
                {indicator.calculationCriteria.formula}
              </p>
              <div className="mt-3 rounded-xl bg-indacs-creamLight p-3 text-xs sm:text-sm text-indacs-ink">
                <strong>Parâmetros da Nota Metodológica:</strong> {indicator.calculationCriteria.parameters}
              </div>
              <div className="mt-2.5 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs sm:text-sm text-amber-950">
                <strong>Importante (Regra Pedagógica INDACS 2.0):</strong> {indicator.calculationCriteria.note} Esses critérios de pontuação não são, por si só, descrição completa dos deveres individuais nem substituem o cuidado integral.
              </div>
            </div>

            <div className="rounded-2xl border-2 border-red-200 bg-white p-4 sm:p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-extrabold text-red-900">
                <ShieldAlert className="h-5 w-5 text-red-700" />
                2. Limites de atuação: o que NÃO compete ao ACS
              </h2>
              <p className="mt-2 text-sm font-medium text-red-950 leading-relaxed">
                {indicator.professionalBoundaries.notAcsRole}
              </p>
              <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs sm:text-sm text-slate-800">
                <strong className="block text-slate-900 mb-1">
                  Ações privativas ou compartilhadas de outros profissionais da equipe (conforme CBOs da Nota Metodológica):
                </strong>
                {indicator.professionalBoundaries.otherProfessionals}
              </div>
            </div>

            <div className="rounded-xl bg-white/90 border border-indacs-primary/20 p-3.5 text-xs text-indacs-muted space-y-1">
              <p className="font-bold text-indacs-ink">Referência documental exata:</p>
              <p>• {indicator.sources.cartilha}</p>
              <p>• {indicator.sources.nota}</p>
            </div>
          </div>
        )}

        {/* TAB 4: PÁGINA ORIGINAL DA CARTILHA DE KALILKA */}
        {activeTab === 'cartilha' && (
          <div className="mt-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-3 border border-indacs-primary/20">
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-indacs-ink">
                  Arte original da Cartilha INDACS ({indicator.code})
                </h2>
                <p className="text-xs text-indacs-muted">
                  Autoria visual e ilustrações: Kalilka • GAT 8 / PET Saúde Digital UFCG
                </p>
              </div>
              {cartilhaPages.length > 1 && (
                <div className="flex gap-1.5">
                  {cartilhaPages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCartilhaPageIdx(idx)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                        cartilhaPageIdx === idx
                          ? 'bg-indacs-primary text-white'
                          : 'bg-indacs-cream text-indacs-ink'
                      }`}
                    >
                      Página {idx + 1} de {cartilhaPages.length}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center rounded-2xl bg-white p-3 border border-indacs-primary/20 shadow-inner">
              <img
                src={cartilhaPages[cartilhaPageIdx]}
                alt={`Página original da Cartilha INDACS - ${indicator.code}`}
                className="max-h-[750px] w-auto rounded-xl object-contain shadow"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

