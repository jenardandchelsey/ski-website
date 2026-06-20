'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const MIN_RATE = 180;
const MAX_RATE = 250;
const MAX_CABINETS = 60;

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CostCalculator() {
  const [cabinetCount, setCabinetCount] = useState(12);
  const estimate = useMemo(() => ({
    low: cabinetCount * MIN_RATE,
    high: cabinetCount * MAX_RATE,
  }), [cabinetCount]);

  function updateCount(value) {
    const count = Number.parseInt(value, 10);
    setCabinetCount(Number.isNaN(count) ? 1 : Math.min(MAX_CABINETS, Math.max(1, count)));
  }

  return <section className="calculatorSection" aria-labelledby="calculator-title">
    <div className="calculatorIntro">
      <p className="eyebrow">Plan Your Project</p>
      <h2 id="calculator-title">Kitchen Installation Cost Calculator</h2>
      <p>Choose the number of cabinets in your IKEA plan to see an estimated installation range.</p>
      <ul>
        <li>Estimated at {formatCurrency(MIN_RATE)} to {formatCurrency(MAX_RATE)} per cabinet</li>
        <li>Cabinet installation labor only</li>
        <li>Countertops are not included</li>
      </ul>
    </div>
    <div className="calculatorCard">
      <label htmlFor="cabinet-count">Number of cabinets</label>
      <div className="countControl">
        <button type="button" aria-label="Remove one cabinet" onClick={() => updateCount(cabinetCount - 1)} disabled={cabinetCount <= 1}>-</button>
        <input id="cabinet-count" type="number" min="1" max={MAX_CABINETS} value={cabinetCount} onChange={(event) => updateCount(event.target.value)} />
        <button type="button" aria-label="Add one cabinet" onClick={() => updateCount(cabinetCount + 1)} disabled={cabinetCount >= MAX_CABINETS}>+</button>
      </div>
      <input className="cabinetRange" aria-label="Cabinet count slider" type="range" min="1" max={MAX_CABINETS} value={cabinetCount} onChange={(event) => updateCount(event.target.value)} />
      <div className="estimateResult" aria-live="polite">
        <span>Estimated installation range</span>
        <strong>{formatCurrency(estimate.low)} - {formatCurrency(estimate.high)}</strong>
        <small>Based on {cabinetCount} {cabinetCount === 1 ? 'cabinet' : 'cabinets'}</small>
      </div>
      <p className="estimateNote">This planning estimate is not a quote. Final pricing depends on the approved plan, site conditions, trim, panels, modifications, demolition, plumbing, electrical work, travel, and other project requirements.</p>
      <Link className="smallCta calculatorCta" href="/quote">REQUEST A DETAILED QUOTE</Link>
    </div>
  </section>;
}
