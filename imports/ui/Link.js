import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';



export default () => {


  return (
    <div>
      <PrivateHeader title="NETFLUX"/>
      <div className="page-content">
        <h1>Tu catalogo Preferido!</h1>
        <LinksList/>
      </div>
    </div>
  );
};
