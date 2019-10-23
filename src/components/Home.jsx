import React from 'react';
import { CREATE, JOIN } from '../constants/routes';
import LinkButton from './Form/LinkButton';

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
