import React from 'react';
import { ArrowLeft } from 'lucide-react';

function CartilhaCheckItem({ text }) {
  return (
    <li className="flex items-start gap-2.5 text-sm sm:text-base text-indacs-ink leading-snug">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-indacs-primary bg-indacs-cream text-indacs-primary font-extrabold text-xs">
        ✓
      </span>
      <span>{text}</span>
    </li>
  );
}

export default function IndicatorDetailModal({
  indicator,
  onClose
}) {
  if (!indicator) return null;

  const s = indicator.cartilhaSections || {};

  return (
    <div className="mx-auto max-w-3xl pb-8">
      {/* Main Cartilha Sheet */}
      <div className="overflow-hidden rounded-[2rem] border-2 border-indacs-primary/20 bg-indacs-cream shadow-lg">
        {/* Top Bar identical to Cartilha Pages 2-9 with enhanced Return button */}
        <div className="flex items-center justify-between rounded-b-[1.75rem] bg-indacs-primary px-4 sm:px-6 py-4 text-white shadow-sm">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Indacs
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Retornar à página inicial da cartilha"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm sm:text-base font-extrabold text-indacs-dark shadow-md hover:bg-indacs-cream hover:scale-105 active:scale-95 transition-all"
          >
            <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
            <span>Retornar</span>
          </button>
        </div>

        <div className="px-4 sm:px-8 pt-6 pb-2">
          {/* Indicator Pill Banner with Circular Icon */}
          <div className="mx-auto flex max-w-xl items-center gap-4 rounded-[2rem] bg-indacs-primary p-3 sm:p-4 text-white shadow-md">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-full border-4 border-indacs-primary bg-indacs-cream p-2.5 shadow-inner">
              <img
                src={indicator.icon}
                alt={indicator.shortTitle}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="pr-2">
              <h1 className="text-lg sm:text-2xl font-extrabold leading-tight">
                {indicator.cartilhaHeaderTitle}
              </h1>
              <p className="text-base sm:text-xl font-bold text-white/95 leading-tight">
                {indicator.cartilhaHeaderSubtitle}
              </p>
            </div>
          </div>

          {/* C7 Intro Note if present */}
          {s.introNote && (
            <p className="mx-auto mt-5 max-w-xl text-center text-sm sm:text-base text-indacs-ink leading-relaxed">
              {s.introNote}
            </p>
          )}

          {/* Section Title: O que compete ao ACS */}
          <div className="mt-6 text-center">
            <h2 className="text-base sm:text-lg font-extrabold text-indacs-primary">
              O que compete ao ACS
            </h2>
            <div className="mx-auto mt-2 h-[1.5px] w-full max-w-xl bg-indacs-primary/40" />
          </div>

          {/* Cartilha Content Body */}
          <div className="mx-auto mt-5 max-w-xl space-y-5">
            {/* Case 1: Single list (C1) */}
            {s.singleList && (
              <ul className="space-y-2.5 pl-2 sm:pl-6">
                {s.singleList.map((item, idx) => (
                  <CartilhaCheckItem key={idx} text={item} />
                ))}
              </ul>
            )}

            {/* Case 2: Highlight Boxes (C3: Gestação / Puerpério) */}
            {s.highlightBoxes && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {s.highlightBoxes.map((box, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-indacs-light/25 border border-indacs-primary/20 p-4"
                  >
                    <h3 className="text-sm sm:text-base font-extrabold text-indacs-primary mb-2">
                      {box.title}
                    </h3>
                    <ul className="space-y-2">
                      {box.items.map((it, i) => (
                        <CartilhaCheckItem key={i} text={it} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Case 3: Top Title + Top Items (C2, C4, C5, C6) */}
            {s.topTitle && (
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-indacs-primary mb-2">
                  {s.topTitle}
                </h3>
                <ul className="space-y-2 pl-1">
                  {s.topItems.map((item, idx) => (
                    <CartilhaCheckItem key={idx} text={item} />
                  ))}
                </ul>
              </div>
            )}

            {/* Case 4: Two-column section (Durante as visitas / Outras ações do ACS) */}
            {s.columnsTitle && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-sm sm:text-base font-extrabold text-indacs-primary shrink-0">
                    {s.columnsTitle}
                  </h3>
                  <div className="h-[1px] flex-1 bg-indacs-primary/35" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ul className="space-y-2.5">
                    {s.leftColumn?.map((item, idx) => (
                      <CartilhaCheckItem key={idx} text={item} />
                    ))}
                  </ul>
                  <ul className="space-y-2.5">
                    {s.rightColumn?.map((item, idx) => (
                      <CartilhaCheckItem key={idx} text={item} />
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Case 5: C7 Age Groups (Pages 8 & 9 combined cleanly) */}
            {s.ageGroupsPage1 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {s.ageGroupsPage1.map((grp, idx) => (
                    <div key={idx}>
                      <h3 className="text-sm sm:text-base font-extrabold text-indacs-primary mb-2">
                        {grp.title}
                      </h3>
                      <ul className="space-y-2">
                        {grp.items.map((it, i) => (
                          <CartilhaCheckItem key={i} text={it} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {s.ageGroupsPage2 && (
                  <div className="space-y-4 pt-2 border-t border-indacs-primary/25">
                    {s.ageGroupsPage2.map((grp, idx) => (
                      <div key={idx}>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm sm:text-base font-extrabold text-indacs-primary">
                            {grp.title}
                          </h3>
                          <div className="h-[1px] flex-1 bg-indacs-primary/30" />
                        </div>
                        <ul className="space-y-2">
                          {grp.items.map((it, i) => (
                            <CartilhaCheckItem key={i} text={it} />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {s.extraQuestion && (
                  <div className="rounded-2xl bg-indacs-creamLight border border-indacs-primary/25 p-3.5 text-xs sm:text-sm">
                    <strong className="text-indacs-primary block">
                      {s.extraQuestion}
                    </strong>
                    <span className="text-indacs-ink">{s.extraAnswer}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Cartilha Speech Bubbles + Original Character Illustration over the Green Hill */}
        <div className="relative mt-6 pt-4 px-3 sm:px-8 overflow-hidden">
          <div className="mx-auto max-w-xl grid grid-cols-2 gap-2.5 sm:gap-5 items-end relative z-10 pb-4">
            {/* Left Question Speech Bubble */}
            <div className="relative mb-3 sm:mb-4 rounded-[1.5rem] border-2 border-indacs-dark bg-indacs-cream px-3 py-2.5 sm:px-5 sm:py-3.5 text-center shadow-sm">
              <p className="text-xs sm:text-base font-semibold text-indacs-ink leading-snug">
                {indicator.summaryQuestion}
              </p>
              {/* Speech bubble tail pointing down-right toward the user character */}
              <svg
                viewBox="0 0 28 20"
                className="pointer-events-none absolute right-5 sm:right-8 -bottom-[18px] h-[18px] w-[26px]"
                aria-hidden="true"
              >
                <path
                  d="M2 0 L24 18 L18 0 Z"
                  fill="#E2EFD7"
                />
                <path
                  d="M2 0 L24 18 L18 0"
                  fill="none"
                  stroke="#0F4D25"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Right ACS Answer Speech Bubble */}
            <div className="relative rounded-[1.5rem] bg-indacs-primary px-3 py-2.5 sm:px-5 sm:py-3.5 text-center text-white shadow-md">
              <p className="text-[11px] sm:text-sm font-medium leading-snug sm:leading-relaxed">
                {indicator.summaryAnswer}
              </p>
              {/* Speech bubble tail pointing down-left toward the ACS character */}
              <svg
                viewBox="0 0 28 20"
                className="pointer-events-none absolute left-5 sm:left-8 -bottom-[16px] h-[18px] w-[26px]"
                aria-hidden="true"
              >
                <path
                  d="M10 0 L4 18 L24 0 Z"
                  fill="#145E2F"
                />
              </svg>
            </div>
          </div>

          {/* Character Illustration */}
          <div className="relative z-10 mt-1 flex justify-center">
            <img
              src={indicator.illustration}
              alt={`Ilustração ${indicator.code}`}
              className="h-52 sm:h-64 w-auto object-contain drop-shadow"
            />
          </div>

          {/* Curved Green Hill Background like the Cartilha */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 left-1/2 h-48 w-[130%] -translate-x-1/2 rounded-[100%] bg-indacs-light/85"
          />
        </div>

        {/* Bottom Footer identical to Cartilha */}
        <div className="relative z-20 flex items-center justify-between bg-indacs-primary px-5 py-3 text-[11px] sm:text-xs font-bold text-white">
          <span>SECRETARIA DA SAÚDE DE CAMPINA GRANDE - PB</span>
          <span>PET SAÚDE DIGITAL | UFCG</span>
        </div>
      </div>

      {/* Floating Action Button (FAB) at Bottom-Right for Easy One-Handed Return on Mobile */}
      <div className="fixed bottom-6 right-5 sm:right-8 z-50">
        <button
          type="button"
          onClick={onClose}
          aria-label="Retornar aos indicadores"
          className="group flex items-center gap-2 rounded-full bg-indacs-dark text-white px-5 py-3.5 shadow-2xl border-2 border-white/60 hover:bg-indacs-primary active:scale-95 transition-all"
        >
          <ArrowLeft className="h-5 w-5 stroke-[2.5] transition-transform group-hover:-translate-x-1" />
          <span className="font-extrabold text-sm sm:text-base tracking-wide">
            Retornar
          </span>
        </button>
      </div>
    </div>
  );
}
