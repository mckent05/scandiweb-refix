/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DOMpurify from 'dompurify';
import {
  removeFromCart,
  addToCart,
} from '../../../Redux/PLP/listingPage';
import { displayOverlay } from '../../../Redux/PLP/header';
import DisplayColorAttributes from '../PLP/DisplayColorAttributes';
import DisplayOtherAttriutes from '../PLP/DisplayOtherAttriutes';

const mapStateToProps = (state) => ({
  myState: state.productList,
  pdpSate: state.productDescription,
  headerState: state.category,
});

const mapDispatchToProps = () => ({
  addToCart,
  displayOverlay,
  removeFromCart,
});

class ProductDescAtrributes extends Component {
  static priceDisplay(selectedPrice) {
    return (
      <article>
        <p>
          <span>{selectedPrice[0].currency.symbol}</span>
          <span>{selectedPrice[0].amount}</span>
        </p>
      </article>
    );
  }

  addProductToCart(productName, attr) {
    const { addToCart, displayOverlay } = this.props;
    displayOverlay(false);
    const checkAttribute = attr.every(
      (property) => property.items.some((item) => item.selected === true),
    );
    if (checkAttribute) {
      addToCart(productName);
    } else {
      window.alert(
        `Please select a value for all attributes for ${productName}`,
      );
    }
  }

  render() {
    const {
      prices,
      pName,
      inStock,
      description,
      brand,
      myState: { productAttr },
      headerState: { currencyDetails },
    } = this.props;
    let selectedPrice;

    const selectedCurrency = currencyDetails.filter(
      (currency) => currency.selected === true,
    );

    if (selectedCurrency.length > 0) {
      selectedPrice = prices.filter(
        (price) => price.currency.symbol === selectedCurrency[0].symbol,
      );
    } else {
      selectedPrice = prices;
    }

    const attr = productAttr[0].attributes;

    return (
      <div>
        <article className="attr attr-desc d-flex f-col">
          <h2>{brand}</h2>
          <h3 className="pdp-product-name">{pName}</h3>
          {attr.map((item) => (item.id === 'Color' ? (
            <div className="pdp-color-attr d-flex " key={item.id}>
              <DisplayColorAttributes item={item} />
            </div>
          ) : (
            <div className="pdp-other-attr" key={item.id}>
              <DisplayOtherAttriutes item={item} />
            </div>
          )))}
        </article>
        <article className="price-details">
          <h4>PRICE: </h4>
          {ProductDescAtrributes.priceDisplay(selectedPrice)}
          {inStock || <h3 className="desc-out-stock">OUT OF STOCK</h3>}
          {inStock ? (
            <div className="cart-btn-container d-flex a-center j-center">
              <button
                type="button"
                className="add-to-cart"
                onClick={() => this.addProductToCart(pName, attr)}
              >
                Add To Cart
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled
              className="add-to-cart out-stock-btn"
            >
              Add to Cart
            </button>
          )}
        </article>
        <div
          dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(description) }}
        />
      </div>
    );
  }
}

ProductDescAtrributes.propTypes = {
  headerState: PropTypes.objectOf(String),
  myState: PropTypes.objectOf(String),
  productAttr: PropTypes.arrayOf(Object),
  addToCart: PropTypes.func.isRequired,
  prices: PropTypes.arrayOf(String).isRequired,
  pName: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  displayOverlay: PropTypes.func.isRequired,
};

ProductDescAtrributes.defaultProps = {
  headerState: {},
  myState: {},
  productAttr: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(ProductDescAtrributes);
