'use client';

import { useMemo, useState } from 'react';

const CLOSET_TYPES = [
  { id: 'reach-in', label: 'Reach-in', min: 500, max: 1500 },
  { id: 'small-walk-in', label: 'Small Walk-in', min: 750, max: 1750 },
  { id: 'large-walk-in', label: 'Large Walk-in', min: 1500, max: 4000 },
  { id: 'master-boutique', label: 'Master Boutique-style', min: 2000, max: 10000, plus: true },
];

function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

export default function ClosetEstimator() {
  const [closetId, setClosetId] = useState(CLOSET_TYPES[0].id);
  const [scale, setScale] = useState(5);
  const closet = CLOSET_TYPES.find((item) => item.id === closetId);
  const estimate = useMemo(() => {
    const span = closet.max - closet.min;
    const progress = (scale - 1) / 9;
    return {
      low: Math.round((closet.min + span * progress * 0.7) / 50) * 50,
      high: Math.round((closet.min + span * Math.min(1, progress + 0.3)) / 50) * 50,
    };
  }, [closet, scale]);

  return <aside className="calculatorCard closetCalculator" aria-labelledby="closet-calculator-title">
    <p className="calculatorEyebrow">Quick Estimate</p>
    <h3 id="closet-calculator-title">Closet Cost Calculator</h3>
    <p className="calculatorLead">Choose a closet type, then adjust the project size and complexity.</p>
    <div className="closetTypes" role="group" aria-label="Closet type">
      {CLOSET_TYPES.map((item) => <button className={item.id === closetId ? 'selected' : ''} type="button" key={item.id} onClick={() => setClosetId(item.id)} aria-pressed={item.id === closetId}><strong>{item.label}</strong><span>{money(item.min)}-{money(item.max)}{item.plus ? '+' : ''}</span></button>)}
    </div>
    <label htmlFor="closet-scale">Project size and complexity: {scale}/10</label>
    <input id="closet-scale" className="cabinetRange" type="range" min="1" max="10" value={scale} onChange={(event) => setScale(Number(event.target.value))}/>
    <div className="estimateResult" aria-live="polite">
      <span>Estimated project range</span>
      <strong>{money(estimate.low)} - {money(estimate.high)}{closet.plus && scale === 10 ? '+' : ''}</strong>
      <small>{closet.label}</small>
    </div>
    <p className="estimateNote">Planning estimate only. Final pricing depends on design, dimensions, materials, accessories, site conditions, and installation requirements.</p>
  </aside>;
}
