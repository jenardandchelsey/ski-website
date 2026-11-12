'use client';

import { useState } from 'react';
import CostCalculator from './CostCalculator';
import QuoteForm from './QuoteForm';

export default function QuoteTools({ contact }) {
  const [tab, setTab] = useState('cabinet');

  return <div className="quoteSectionGrid">
    <div className="quotePlanning">
      <CostCalculator tab={tab} setTab={setTab} />
    </div>
    <div id="quote-request" className="quoteRequest">
      <QuoteForm isCloset={tab === 'closet'} setIsCloset={value => setTab(value ? 'closet' : 'cabinet')} />
      {contact}
    </div>
  </div>;
}
