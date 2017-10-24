import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import PropTypes from 'prop-types';
import styled from 'styled-components';


import Layout from '../components/Layout';
import { initStore } from '../store';

const HeroImage = styled.img`
  border: 4px solid gold;
  box-shadow: 0 0 4px goldenrod;

  width: 50vw;
`;


class ProductLander extends Component {
  static propTypes = {
    productSlug: PropTypes.string.isRequired
  }


  static async getInitialProps({ store, isServer, query }) {
    // query-object has the stuff that is defined as URL-params in
    // routes.js - NOTE that these are not `?query=params`
    const { productSlug } = query;

    // example call how in here action that does API-interaction could be triggered:
    // await store.dispatch(fetchProduct(productSlug));

    return { isServer, productSlug };
  }

  render() {
    const { productSlug } = this.props;

    return (<Layout>
      <div className="hero-image">
        <HeroImage src="/static/logo.jpg" alt="Höelbettin OG" />
        <h4>This will be the product lander for {productSlug}</h4>
      </div>
    </Layout>);
  }
}


const mapStateToProps = (state, { productSlug }) => ({
  // access Redux state in here
  productSlug
});

const mapDispatch = {};


export default withRedux(initStore, mapStateToProps, mapDispatch)(ProductLander);

