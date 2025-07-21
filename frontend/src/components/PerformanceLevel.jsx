import React from 'react';
import { Award } from 'lucide-react';

const PerformanceLevel = ({ icon, level }) => (
  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-lg" style={{ background: 'var(--background-card)', color: 'var(--text-highlight)' }}>
    <Award className="w-5 h-5" style={{ color: 'var(--icon-main)' }} />
    {icon} {level}
  </div>
);

export default PerformanceLevel; 