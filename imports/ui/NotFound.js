import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Error 404</h1>
        <p>No se pudo encontrar la pagina.</p>
        <Link to="/" className="button button--link">INICIO</Link>
      </div>
    </div>
  );
};
