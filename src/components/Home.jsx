import React from 'react';

import LinkButton from './Form/LinkButton';
import { CREATE, JOIN } from '../constants/routes';

const Home = () => {
  return (
    <div className="home">
      <LinkButton id="create-room" to={CREATE} className="btn--large">
        Create New Room
      </LinkButton>
      <LinkButton id="join-room" to={JOIN} className="btn--large">
        Join Existing Room
      </LinkButton>
    </div>
  );
};

export default Home;
