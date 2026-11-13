import React, { useState } from 'react';
import { INDICATORS } from './data/indacsData';
import IndicatorDetailModal from './components/IndicatorDetailModal';

function CartilhaIconButton({ ind, onClick }) {
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
    </div>
  );
}

export default function App() {
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  const openIndicator = (ind) => {
    setSelectedIndicator(ind);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-indacs-cream text-indacs-ink">
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 sm:px-6 pt-5 pb-12">
        {/* INDICATOR PAGE (Identical to Pages 2-9 of CARTILHA INDACS.pdf) */}
        {selectedIndicator ? (
          <IndicatorDetailModal
            indicator={selectedIndicator}
            onClose={() => setSelectedIndicator(null)}
          />
        ) : (
          /* HOME SCREEN (Identical to Page 1 of CARTILHA INDACS.pdf) */
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

            {/* Cartilha Instruction Line */}
            <p className="text-center text-base sm:text-lg font-medium text-indacs-primary">
              <strong className="font-extrabold">Toque</strong> em cada ícone para navegar.
            </p>

            {/* Exact 3 - 2 - 2 Pyramid Grid from Page 1 of CARTILHA INDACS.pdf */}
            <div className="space-y-8 py-2">
              {/* Row 1: C1, C2, C3 */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 justify-items-center">
                {INDICATORS.slice(0, 3).map((ind) => (
                  <CartilhaIconButton
                    key={ind.id}
                    ind={ind}
                    onClick={openIndicator}
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
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer matching Page 1 of Cartilha */}
      <footer className="mt-auto bg-indacs-primary text-white py-3.5 px-4 sm:px-8">
        <div className="mx-auto max-w-3xl flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setSelectedIndicator(null)}
            className="text-xl sm:text-2xl font-extrabold tracking-tight hover:opacity-90"
          >
            Indacs
          </button>

          <span className="text-xs sm:text-sm font-bold tracking-wide text-white/95">
            PET SAÚDE DIGITAL | UFCG
          </span>
        </div>
      </footer>
    </div>
  );
}
