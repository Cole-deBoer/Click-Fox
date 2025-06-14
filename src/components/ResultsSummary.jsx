import React from 'react';
import { Timer } from 'lucide-react';

const ResultsSummary = ({ icon, primary, primaryLabel, secondary, secondaryLabel, tertiary, tertiaryLabel }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
    <div className="bg-[var(--background-card)] rounded-xl p-6 text-center border" style={{ borderColor: 'var(--border-default)', animationDelay: '0.1s' }}>
      {icon}
      <div className="text-3xl font-light mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>{primary}</div>
      <div className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{primaryLabel}</div>
    </div>
    <div className="bg-[var(--background-card)] rounded-xl p-6 text-center border" style={{ borderColor: 'var(--border-default)', animationDelay: '0.2s' }}>
      <div className="w-8 h-8 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--button-primary-bg)' }}>
        <span className="font-bold text-sm" style={{ color: 'var(--button-primary-text)' }}>#</span>
      </div>
      <div className="text-3xl font-light mb-2" style={{ color: 'var(--text-primary)' }}>{secondary}</div>
      <div className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{secondaryLabel}</div>
    </div>
    <div className="bg-[var(--background-card)] rounded-xl p-6 text-center border" style={{ borderColor: 'var(--border-default)', animationDelay: '0.3s' }}>
      <Timer className="w-8 h-8 mx-auto mb-4" style={{ color: 'var(--icon-main)' }} />
      <div className="text-3xl font-light mb-2" style={{ color: 'var(--text-primary)' }}>{tertiary}</div>
      <div className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{tertiaryLabel}</div>
    </div>
  </div>
);

export default ResultsSummary; 