import React, { useState } from 'react';
import { Sparkles, Edit3, RefreshCw, Trash2, Check, X } from 'lucide-react';

export default function IntentionWelcomeBanner({
  intentionData,
  onUpdateIntention,
  onClearIntention,
  onDismissBanner,
  isSimulatedReturn
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(intentionData?.text || '');
  const [renewedFeedback, setRenewedFeedback] = useState(false);

  if (!intentionData || !intentionData.text) return null;

  const handleSaveEdit = () => {
    if (!draftText.trim()) {
      onClearIntention();
      return;
    }
    onUpdateIntention(draftText.trim());
    setIsEditing(false);
  };

  const handleRenew = () => {
    onUpdateIntention(intentionData.text, true);
    setRenewedFeedback(true);
    setTimeout(() => setRenewedFeedback(false), 2500);
  };

  return (
    <section
      aria-label="A ponte para a próxima jornada"
      className="mb-5 rounded-2xl border-2 border-indacs-primary/30 bg-indacs-creamCard p-4 sm:p-5 shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indacs-primary text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indacs-primary">
                Tela 4 • A ponte para a próxima jornada
              </span>
              {isSimulatedReturn && (
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900 border border-amber-300">
                  Simulando retorno em novo dia
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-indacs-ink">
              Que bom receber você de volta.
            </h2>
          </div>
        </div>
        <button
          type="button"
          onClick={onDismissBanner}
          className="rounded-xl px-2.5 py-1.5 text-xs font-semibold text-indacs-muted hover:bg-indacs-cream"
          title="Ocultar por agora"
        >
          Ocultar
        </button>
      </div>

      <p className="mt-2 text-xs sm:text-sm text-indacs-muted">
        Em uma jornada anterior{intentionData.dateLabel ? ` (${intentionData.dateLabel})` : ''}, você deixou esta intenção para si mesmo(a) — sem metas nem cobranças:
      </p>

      {!isEditing ? (
        <div className="mt-3 rounded-xl bg-indacs-creamLight border border-indacs-primary/20 p-3.5">
          <p className="text-base sm:text-lg font-semibold italic text-indacs-dark">
            “{intentionData.text}”
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          <label htmlFor="edit-intention-input" className="block text-xs font-semibold text-indacs-ink">
            Editar sua intenção para a jornada (nunca insira dados de pacientes):
          </label>
          <textarea
            id="edit-intention-input"
            rows={2}
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            className="w-full rounded-xl border-2 border-indacs-primary/40 bg-white p-3 text-sm text-indacs-ink focus:border-indacs-primary focus:outline-none"
            placeholder="O que você gostaria de levar para esta jornada?"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSaveEdit}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indacs-primary px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-indacs-dark"
            >
              <Check className="h-4 w-4" />
              Salvar alteração
            </button>
            <button
              type="button"
              onClick={() => {
                setDraftText(intentionData.text);
                setIsEditing(false);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-indacs-primary/30 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-indacs-ink hover:bg-indacs-cream"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
          </div>
        </div>
      )}

      {!isEditing && (
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleRenew}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indacs-primary px-3.5 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indacs-dark active:scale-[0.99]"
            >
              <RefreshCw className="h-4 w-4" />
              {renewedFeedback ? 'Intenção renovada para hoje!' : 'Renovar para hoje'}
            </button>
            <button
              type="button"
              onClick={() => {
                setDraftText(intentionData.text);
                setIsEditing(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-indacs-primary/30 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-indacs-ink hover:bg-indacs-cream"
            >
              <Edit3 className="h-4 w-4" />
              Editar
            </button>
            <button
              type="button"
              onClick={onClearIntention}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50/70 px-3.5 py-2 text-xs sm:text-sm font-semibold text-red-800 hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
              Deixar ir / Abandonar
            </button>
          </div>
          <span className="text-[11px] italic text-indacs-muted">
            “Cada novo dia merece a liberdade de recomeçar.”
          </span>
        </div>
      )}
    </section>
  );
}

