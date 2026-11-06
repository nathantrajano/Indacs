import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  AlertCircle,
  Compass,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Download,
  FileCode2,
  Users
} from 'lucide-react';
import { APP_METADATA, LIMITATIONS_AND_CONTINGENCY } from '../data/indacsData';

const INITIAL_CHECKLIST = [
  { id: 'chk-1', label: 'Link abre em celular e tablet; ou versão local de contingência testada.', checked: true },
  { id: 'chk-2', label: 'C1–C7 acessíveis, com indicação clara de conteúdo ainda em revisão.', checked: true },
  { id: 'chk-3', label: 'Busca por palavras da rotina e duas situações interativas (C2 e C4) funcionam de ponta a ponta.', checked: true },
  { id: 'chk-4', label: 'Fontes exatas das orientações (Cartilha + Notas Metodológicas) e limites de atuação estão visíveis.', checked: true },
  { id: 'chk-5', label: 'X pode ser marcado e desmarcado no calendário; intenção pode ser recuperada, editada e apagada.', checked: true },
  { id: 'chk-6', label: 'Nenhum dado real de paciente (nome, CPF, CNS, endereço, prontuário) ou credencial foi inserido.', checked: true },
  { id: 'chk-7', label: 'Código, versão, limitações, responsáveis e plano de contingência registrados.', checked: true }
];

export default function WorkshopGovernance() {
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [obsNotes, setObsNotes] = useState({
    acs1Order: 'App INDACS 2.0 → PDF Original',
    acs1Notes: '',
    acs2Order: 'PDF Original → App INDACS 2.0',
    acs2Notes: '',
    pedagogicalClosing: ''
  });

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleChecklistItem = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleExportObservationSheet = () => {
    const content = [
      '==============================================================',
      'INDACS 2.0 - FOLHA DE OBSERVAÇÃO E REGISTRO DA OFICINA',
      `${APP_METADATA.project} | Versão: ${APP_METADATA.version}`,
      '==============================================================',
      '',
      '1. RESPONSÁVEIS E PAPÉIS:',
      `- Design e Conteúdo: ${APP_METADATA.authors.designAndContent}`,
      `- Implementação: ${APP_METADATA.authors.implementation}`,
      `- Facilitação: ${APP_METADATA.authors.facilitation}`,
      `- Validação Técnica: ${APP_METADATA.authors.technicalValidation}`,
      '',
      '2. CHECKLIST DE SAÍDA DA OFICINA:',
      ...checklist.map((c) => `[${c.checked ? 'X' : ' '}] ${c.label}`),
      '',
      '3. REGISTRO DO TESTE EXPLORATÓRIO NA UBS (Segunda-feira, 09/11, 8h):',
      `Tempo registrado no cronômetro de apoio: ${formatTimer(timerSeconds)}`,
      `- Participante ACS 1 (${obsNotes.acs1Order}):`,
      obsNotes.acs1Notes || '(Sem anotações registradas)',
      '',
      `- Participante ACS 2 (${obsNotes.acs2Order}):`,
      obsNotes.acs2Notes || '(Sem anotações registradas)',
      '',
      '4. FECHAMENTO PEDAGÓGICO DA DUPLA (Kalilka e Nathan):',
      '"O que conseguimos criar juntos que não teríamos concebido da mesma maneira trabalhando sozinhos?"',
      obsNotes.pedagogicalClosing || '(Espaço para síntese da dupla)',
      ''
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registro-oficina-indacs-2-0.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-3xl bg-indacs-primary p-5 text-white shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider text-indacs-cream">
          Governança, Transparência e Teste Exploratório
        </span>
        <h1 className="mt-1 text-xl sm:text-2xl font-extrabold">
          Documentação da Oficina INDACS 2.0
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-indacs-cream/95">
          {LIMITATIONS_AND_CONTINGENCY.prototypeNature}
        </p>
      </div>

      {/* Distinction between INDACS 2.0 and Anjo ACS + Authors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border-2 border-indacs-primary/25 bg-white p-4 sm:p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-base font-extrabold text-indacs-primary">
            <Compass className="h-5 w-5" />
            Separação explícita de funções
          </h2>
          <div className="mt-3 space-y-2.5 text-xs sm:text-sm">
            <div className="rounded-xl bg-indacs-creamLight p-3 border border-indacs-primary/20">
              <strong className="block text-indacs-dark">INDACS 2.0 (Este aplicativo):</strong>
              <span>{LIMITATIONS_AND_CONTINGENCY.scopeSeparation.indacs2}</span>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 text-slate-700">
              <strong className="block text-slate-900">Anjo ACS (Projeto distinto):</strong>
              <span>{LIMITATIONS_AND_CONTINGENCY.scopeSeparation.anjoAcs}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-indacs-primary/25 bg-white p-4 sm:p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-base font-extrabold text-indacs-primary">
            <Users className="h-5 w-5" />
            Autoria e Cocriação Interdisciplinar
          </h2>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-indacs-ink">
            <li>• <strong>Design e Conteúdo Original:</strong> {APP_METADATA.authors.designAndContent}</li>
            <li>• <strong>Implementação e Arquitetura:</strong> {APP_METADATA.authors.implementation}</li>
            <li>• <strong>Facilitação:</strong> {APP_METADATA.authors.facilitation}</li>
            <li>• <strong>Validação Técnica:</strong> {APP_METADATA.authors.technicalValidation}</li>
            <li>• <strong>Versão Congelada:</strong> <code className="rounded bg-indacs-cream px-1.5 py-0.5 font-bold">{APP_METADATA.version}</code></li>
          </ul>
        </div>
      </div>

      {/* Incomplete / In-Review Functionalities & Limitations */}
      <div className="rounded-2xl border-2 border-amber-300 bg-white p-4 sm:p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-base sm:text-lg font-extrabold text-amber-900">
          <AlertCircle className="h-5 w-5 text-amber-700" />
          Registro de Limitações e Funcionalidades em Revisão
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-indacs-muted">
          Em cumprimento às regras de conteúdo e segurança (Seção 7 do Roteiro), funcionalidades em revisão técnica não são apresentadas como normas definitivas nem simulam integração ao e-SUS:
        </p>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          {LIMITATIONS_AND_CONTINGENCY.incompleteOrInReviewFeatures.map((lim, i) => (
            <div key={i} className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5">
              <div className="flex items-center justify-between gap-2">
                <strong className="text-xs sm:text-sm text-amber-950">{lim.item}</strong>
                <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-[11px] font-bold text-amber-950">
                  {lim.status}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-amber-900 leading-relaxed">
                {lim.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contingency Plan */}
      <div className="rounded-2xl border-2 border-indacs-primary/25 bg-white p-4 sm:p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-base sm:text-lg font-extrabold text-indacs-primary">
              <FileCode2 className="h-5 w-5" />
              Plano de Contingência Offline para a UBS
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-indacs-muted">
              Caso o sinal de Wi-Fi/dados móveis oscile na UBS na segunda-feira (09/11 às 8h), utilize a versão local autocontida:
            </p>
          </div>
          <a
            href="./contingencia-offline.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-indacs-primary px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow hover:bg-indacs-dark"
          >
            <Download className="h-4 w-4" />
            Abrir Versão Estável de Contingência (.HTML)
          </a>
        </div>
      </div>

      {/* Section 8: Exploratory Test Script + Built-in Stopwatch & Observation Sheet */}
      <div className="rounded-2xl border-2 border-indacs-primary/30 bg-white p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indacs-primary/15 pb-3">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indacs-primary">
              Seção 8 do Roteiro • Folha de Observação e Cronômetro
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-indacs-ink">
              Teste Exploratório na UBS — {LIMITATIONS_AND_CONTINGENCY.exploratoryTestScript.date}
            </h2>
          </div>

          {/* Built-in Stopwatch required by Section 11 ("folha de observação e cronômetro") */}
          <div className="flex items-center gap-2 rounded-2xl bg-indacs-cream px-3.5 py-2 border border-indacs-primary/25">
            <Clock className="h-4 w-4 text-indacs-primary" />
            <span className="font-mono text-base font-extrabold text-indacs-dark">
              {formatTimer(timerSeconds)}
            </span>
            <button
              type="button"
              onClick={() => setTimerRunning((r) => !r)}
              className="rounded-lg bg-indacs-primary px-2.5 py-1 text-xs font-bold text-white hover:bg-indacs-dark"
            >
              {timerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(0);
              }}
              className="rounded-lg bg-white px-2 py-1 text-xs font-bold text-indacs-ink hover:bg-indacs-creamLight"
              title="Zerar cronômetro"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <p className="rounded-xl bg-indacs-creamLight p-3 text-xs sm:text-sm text-indacs-ink">
          <strong>Orientação ética inicial:</strong> {LIMITATIONS_AND_CONTINGENCY.exploratoryTestScript.ethicsNote}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LIMITATIONS_AND_CONTINGENCY.exploratoryTestScript.tasks.map((t) => (
            <div key={t.step} className="rounded-xl border border-indacs-primary/20 bg-indacs-creamCard p-3">
              <span className="text-xs font-extrabold text-indacs-primary">
                Tarefa {t.step}
              </span>
              <p className="text-sm font-bold text-indacs-ink mt-0.5">{t.task}</p>
              <p className="text-xs text-indacs-muted mt-1">
                <strong>Observar:</strong> {t.measures}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-bold text-indacs-ink mb-1">
              Anotações — ACS 1 (Ordem sugerida: Aplicação Web → PDF Original):
            </label>
            <textarea
              rows={3}
              value={obsNotes.acs1Notes}
              onChange={(e) => setObsNotes({ ...obsNotes, acs1Notes: e.target.value })}
              placeholder="Tempo, caminhos escolhidos, dúvidas, reação ao X e à intenção..."
              className="w-full rounded-xl border border-indacs-primary/30 bg-indacs-creamLight/40 p-2.5 text-xs sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-indacs-ink mb-1">
              Anotações — ACS 2 (Ordem alternada: PDF Original → Aplicação Web):
            </label>
            <textarea
              rows={3}
              value={obsNotes.acs2Notes}
              onChange={(e) => setObsNotes({ ...obsNotes, acs2Notes: e.target.value })}
              placeholder="Tempo, caminhos escolhidos, dúvidas, reação ao X e à intenção..."
              className="w-full rounded-xl border border-indacs-primary/30 bg-indacs-creamLight/40 p-2.5 text-xs sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-indacs-ink mb-1">
            Seção 10 • Fechamento Pedagógico (“O que conseguimos criar juntos que não teríamos concebido da mesma maneira trabalhando sozinhos?”):
          </label>
          <textarea
            rows={2}
            value={obsNotes.pedagogicalClosing}
            onChange={(e) => setObsNotes({ ...obsNotes, pedagogicalClosing: e.target.value })}
            placeholder="Síntese de Kalilka (Design) e Nathan (Computação)..."
            className="w-full rounded-xl border border-indacs-primary/30 bg-indacs-creamLight/40 p-2.5 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Section 9: Interactive Exit Checklist */}
      <div className="rounded-2xl border-2 border-indacs-primary/30 bg-white p-4 sm:p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h2 className="text-base sm:text-lg font-extrabold text-indacs-primary">
            Seção 9 • Checklist de Saída da Oficina
          </h2>
          <button
            type="button"
            onClick={handleExportObservationSheet}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indacs-dark px-3.5 py-2 text-xs font-bold text-white hover:bg-indacs-primary"
          >
            <Download className="h-4 w-4" />
            Exportar Registro e Observações (.txt)
          </button>
        </div>

        <div className="space-y-2">
          {checklist.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleChecklistItem(item.id)}
              className="w-full flex items-center gap-3 rounded-xl bg-indacs-creamLight/60 p-3 text-left text-xs sm:text-sm font-semibold text-indacs-ink hover:bg-indacs-cream transition"
            >
              {item.checked ? (
                <CheckSquare className="h-5 w-5 text-indacs-primary shrink-0" />
              ) : (
                <Square className="h-5 w-5 text-indacs-muted shrink-0" />
              )}
              <span className={item.checked ? '' : 'text-indacs-muted'}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

