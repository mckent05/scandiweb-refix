/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductImage from './ProductImage';
import ProductDescAttributes from './ProductDescAttributes';
import { getProductDetails } from '../../../Redux/PDP/descriptionPage';
import './pdp.css';

const mapDispatchToProps = () => ({
  getProductDetails,
});

class ProductDescPage extends Component {
  componentDidMount() {
    const id = JSON.parse(localStorage.getItem('id'));
    const { getProductDetails } = this.props;
    getProductDetails(id);
  }

  render() {
    const { isLoading, imgControl, product } = this.props;
    return (
      <div className="product-desc-cont">
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
                inStock={product.inStock}
                prices={product.prices}
                description={product.description}
                attr={product.attributes}
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
};

ProductDescPage.defaultProps = {
  product: {},
};
export default connect(null, mapDispatchToProps())(ProductDescPage);
