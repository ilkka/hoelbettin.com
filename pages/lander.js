import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';

const HeroImage = styled.img`
  border: 4px solid gold;
  box-shadow: 0 0 4px goldenrod;

  width: 50vw;
`;

export default () => (
  <Layout>
    <div className="hero-image">
      <HeroImage src="/static/logo.jpg" alt="Höelbettin OG" />
    </div>
  </Layout>
);

