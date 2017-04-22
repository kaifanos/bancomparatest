import React from 'react';

import CommentsList from './CommentsList';
import PrivateHeader from './PrivateHeader';
import AddComment from './AddComment';



export default () => {
  return (
    <div>
      <PrivateHeader title="Tu Opinion"/>
      <div className="page-content">
        <AddComment/>
        <CommentsList/>
      </div>
    </div>
  );
};
