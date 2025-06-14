import React from 'react';

const ThemeColorInput = ({ label, value, onChange }) => (
  <label className="flex items-center gap-2">
    <span className="w-32 capitalize">{label}</span>
    <input
      type="color"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-8 h-8 border-none bg-transparent cursor-pointer"
    />
    <span className="text-xs">{value}</span>
  </label>
);

export default ThemeColorInput; 