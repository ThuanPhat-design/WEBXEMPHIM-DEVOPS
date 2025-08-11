// src/components/Home/MoviePopover.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default function MoviePopover({ movie, rect, onClose }) {
  if (!movie || !rect) return null;

  // calculate center top of the slide 
  const width  = 300;  // popover width
  const height = (width * 9) / 16 + 80; // keep 16:9 + footer
  const left   = rect.left + rect.width / 2 - width / 2;
  const top    = rect.top - height - 8; // 8px margin

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'absolute',
        top:  top < 0 ? rect.bottom + 8 : top,  // if no space above, show below
        left: left < 0 ? 8 : left,
        width: width,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.75)',
        borderRadius: 8,
        overflow: 'hidden',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      {/* Image */}
      <div style={{ width: '100%', paddingTop: `${(9 / 16) * 100}%`, position: 'relative' }}>
        <img
          src={movie.titleImage}
          alt={movie.name}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      {/* Footer */}
      <div style={{ background: '#141414', padding: '12px', textAlign: 'center' }}>
        <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '8px' }}>{movie.name}</h3>
        <Link
          to={`/movie/${movie._id}`}
          style={{
            display: 'inline-block',
            background: 'white',
            color: 'black',
            padding: '8px 16px',
            borderRadius: '9999px',
            fontWeight: '500',
            textDecoration: 'none',
          }}
        >
          Xem chi tiết
        </Link>
      </div>
    </div>,
    document.getElementById('popover-root')
  );
}
