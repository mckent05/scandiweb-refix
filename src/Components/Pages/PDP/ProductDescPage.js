/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductImage from './ProductImage';
import ProductDescAttributes from './ProductDescAttributes';
import { getProductDetails } from '../../../Redux/PDP/descriptionPage';
import {
  addToCart,
  removeFromCart,
  attrSelector,
} from '../../../Redux/PLP/listingPage';
import { displayOverlay } from '../../../Redux/PLP/header';
import './pdp.css';

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
  descState: state.productDescription,
});

const mapDispatchToProps = () => ({
  getProductDetails,
  removeFromCart,
  addToCart,
  attrSelector,
  displayOverlay,
});

class ProductDescPage extends Component {
  componentDidMount() {
    const id = JSON.parse(localStorage.getItem('id'));
    const { getProductDetails } = this.props;
    getProductDetails(id);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  closecart(cartOverlay) {
    const { displayOverlay } = this.props;
    if (cartOverlay) {
      displayOverlay(false);
    }
  }

  render() {
    const {
      isLoading, imgControl, product, cartOverlay,
    } = this.props;
    return (
      <div
        className="product-desc-cont d-flex a-center j-center"
        onClick={() => this.closecart(cartOverlay)}
      >
        {isLoading ? (
          <h1 className="pdp-load d-flex j-center a-center">Loading...</h1>
        ) : (
          <section className="product-desc-page d-flex j-center">
            <div className="img-preview-cont">
              <ProductImage
                imgGallery={product.gallery}
                imgControl={imgControl}
              />
            </div>
            <div className="product-desc-attr d-flex f-col">
              <ProductDescAttributes
                id={product.id}
                inStock={product.inStock}
                prices={product.prices}
                description={product.description}
                brand={product.brand}
                pName={product.name}
              />
            </div>
          </section>
        )}
      </div>
    );
  }
}

ProductDescPage.propTypes = {
  getProductDetails: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  imgControl: PropTypes.number.isRequired,
  product: PropTypes.objectOf(String),
  displayOverlay: PropTypes.func.isRequired,
  cartOverlay: PropTypes.bool.isRequired,
};

ProductDescPage.defaultProps = {
  product: {},
};
export default connect(mapStateToProps, mapDispatchToProps())(ProductDescPage);

/* eslint-enable jsx-a11y/click-events-have-key-events */
/* eslint-enable jsx-a11y/no-static-element-interactions */
