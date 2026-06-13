import React from 'react';

interface ChapterMarkerProps {
  number: string;  // e.g. "00", "01", "02"
  label: string;   // e.g. "BOOT_SEQUENCE", "ORIGIN"
}

const ChapterMarker: React.FC<ChapterMarkerProps> = ({ 
  number, label 
}) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          color: 'rgba(0, 242, 255, 0.4)',
          letterSpacing: '0.15em',
          fontWeight: '400'
        }}
      >
        {number}.
      </span>
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.25)',
          letterSpacing: '0.15em',
          fontWeight: '400',
          textTransform: 'uppercase'
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: '1px',
          background: 'rgba(0, 242, 255, 0.08)'
        }}
      />
    </div>
  );
};

export default ChapterMarker;
