'use client';

import { useRef, useState } from 'react';
import { Archive, DoorOpen, Minus, Plus } from 'lucide-react';

const tabs = [{ id: 'cabinet', label: 'Cabinet', Icon: Archive }, { id: 'closet', label: 'Closet', Icon: DoorOpen }];
const closets = [
  { label: 'Reach-in', min: 500, max: 1500 },
  { label: 'Small walk-in', min: 750, max: 1750 },
  { label: 'Large walk-in', min: 1500, max: 4000 },
  { label: 'Boutique-style', min: 2000, max: 10000, plus: true },
];
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const minRate = 180, maxRate = 250, maxCabinets = 60;

function Estimate({ low, high, plus, context }) {
  return <div className="estimateResult" aria-live="polite" aria-atomic="true">
    <span>Estimated installation range</span>
    <strong>{money.format(low)} &ndash; {money.format(high)}{plus ? '+' : ''}</strong>
    <small>{context}</small>
  </div>;
}

export default function CostCalculator({ tab, setTab }) {
  const [count, setCount] = useState('12');
  const [closetIndex, setClosetIndex] = useState(0);
  const [scale, setScale] = useState(5);
  const buttons = useRef([]);
  const cabinets = Math.min(maxCabinets, Math.max(1, Number(count) || 1));
  const closet = closets[closetIndex];
  const span = closet.max - closet.min;
  const progress = (scale - 1) / 9;

  function moveTab(event, index) {
    const last = tabs.length - 1;
    const next = ({ ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + last) % tabs.length, Home: 0, End: last })[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setTab(tabs[next].id);
    buttons.current[next]?.focus();
  }

  return <section className="calculatorCard" aria-labelledby="calculator-title" data-nosnippet>
    <h3 id="calculator-title">Installation calculator</h3>
    <div className="calculatorTabs" role="tablist" aria-label="Project type">
      {tabs.map(({ id, label, Icon }, index) => <button key={id} id={`estimate-tab-${id}`} type="button"
        role="tab" aria-selected={tab === id} aria-controls={`estimate-panel-${id}`} tabIndex={tab === id ? 0 : -1}
        ref={element => { buttons.current[index] = element; }} onClick={() => setTab(id)} onKeyDown={event => moveTab(event, index)}>
        <Icon size={17} aria-hidden="true" />{label}
      </button>)}
    </div>
    <div className="calculatorPanel" id="estimate-panel-cabinet" role="tabpanel" aria-labelledby="estimate-tab-cabinet" hidden={tab !== 'cabinet'}>
      <div className="calculatorFields">
        <label htmlFor="cabinet-count">Number of cabinets</label>
        <div className="countControl">
          <button type="button" aria-label="Remove one cabinet" onClick={() => setCount(String(cabinets - 1))} disabled={cabinets <= 1}><Minus size={17} /></button>
          <input id="cabinet-count" type="number" inputMode="numeric" min="1" max={maxCabinets} step="1" value={count}
            onChange={event => { const value = event.target.value; if (value === '' || /^\d+$/.test(value)) setCount(value); }}
            onBlur={() => setCount(String(cabinets))} />
          <button type="button" aria-label="Add one cabinet" onClick={() => setCount(String(cabinets + 1))} disabled={cabinets >= maxCabinets}><Plus size={17} /></button>
        </div>
        <input className="calculatorRange" aria-label="Cabinet count slider" type="range" min="1" max={maxCabinets} value={cabinets}
          onChange={event => setCount(event.target.value)} />
        <div className="calculatorScale" aria-hidden="true"><span>1 cabinet</span><span>{maxCabinets} cabinets</span></div>
      </div>
      {tab === 'cabinet' && <Estimate low={cabinets * minRate} high={cabinets * maxRate}
        context={<>{money.format(minRate)}&ndash;{money.format(maxRate)} per cabinet &middot; labor only</>} />}
      <p className="estimateNote">Planning estimate only. Countertops are excluded. Final pricing depends on your plan, site conditions, trim, panels, modifications, demolition, plumbing, electrical work, and travel.</p>
    </div>
    <div className="calculatorPanel" id="estimate-panel-closet" role="tabpanel" aria-labelledby="estimate-tab-closet" hidden={tab !== 'closet'}>
      <div className="calculatorFields">
        <label htmlFor="closet-type">Closet type</label>
        <select id="closet-type" value={closetIndex} onChange={event => setClosetIndex(Number(event.target.value))}>
          {closets.map((item, index) => <option key={item.label} value={index}>{item.label}</option>)}
        </select>
        <label className="calculatorSize" htmlFor="closet-scale">Size and complexity <span>{scale} / 10</span></label>
        <input id="closet-scale" className="calculatorRange" type="range" min="1" max="10" value={scale}
          onChange={event => setScale(Number(event.target.value))} />
        <div className="calculatorScale" aria-hidden="true"><span>Simple</span><span>Complex</span></div>
      </div>
      {tab === 'closet' && <Estimate low={Math.round((closet.min + span * progress * 0.7) / 50) * 50}
        high={Math.round((closet.min + span * Math.min(1, progress + 0.3)) / 50) * 50}
        plus={closet.plus && scale === 10} context={closet.label} />}
      <p className="estimateNote">Planning estimate only. Final pricing depends on design, dimensions, materials, accessories, site conditions, and installation requirements.</p>
    </div>
  </section>;
}
