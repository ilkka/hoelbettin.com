import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';


const Layout = ({ children }) => (<div>
  <Head>
    <style type="text/css">{`
      body {
        margin: 0;
        background-color: black;
        color: gold;
        font-family: sans-serif;
        display: grid;
        align-content: center;
        justify-content: center;
        min-height: 100vh;
      }
      @media screen and (max-device-width: 480px) {
        body {
          font-size: 200%;
        }
      }
    `}</style>
  </Head>

  <div>{children}</div>
</div>);

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
