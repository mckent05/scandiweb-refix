/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromCart, addToCart, attrSelector } from "../../../Redux/PLP/listingPage";
import { displayOverlay } from "../../../Redux/PLP/header";

const mapStateToProps = (state) => ({
  myState: state.productList,
  pdpSate: state.productDescription,
  headerState: state.category,
});

const mapDispatchToProps = () => ({
  attrSelector,
  addToCart,
  displayOverlay,
  removeFromCart
});

class ProductDescAtrributes extends Component {
  static htmlParser(description) {
    const doc = document.createElement('div');
    doc.innerHTML = description;
    return doc.innerHTML;
  }

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
    displayOverlay(false)
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

  selectAttribute(displayValue, id) {
    const { attrSelector } = this.props;
    attrSelector(displayValue, id);
  }

  displayColorAttribute(item) {
    return (
      <div className="attr-list d-flex j-center a-center f-col" key={item.id}>
        <h3>{`${item.id}: `}</h3>
        <div className="attr-btn-cont d-flex a-center j-center">
          {item.items.map((size) => (
            <button
              type="button"
              onClick={() => this.selectAttribute(size.displayValue, item.id)}
              className={size.selected ? 'attr-btn selected-color' : 'attr-btn'}
              key={size.id}
              style={{ backgroundColor: size.displayValue }}
            />
          ))}
        </div>
      </div>
    );
  }

  displayOtherAttributes(item) {
    return (
      <div className="attr-list d-flex j-center a-center f-col" key={item.id}>
        <h3 className="other-attr-id">{`${item.id}: `}</h3>
        <div className="attr-btn-cont other-attr-btn d-flex">
          {item.items.map((size) => (
            <button
              type="button"
              onClick={() => this.selectAttribute(size.displayValue, item.id)}
              className={size.selected ? 'attr-btn selected-size' : 'attr-btn'}
              key={size.id}
            >
              {' '}
              {size.value}
            </button>
          ))}
        </div>
      </div>
    );
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

    // const getProduct = allProducts.products.filter((product) => product.name === pName);

    const attr = productAttr[0].attributes

    return (
      <div>
        <article className="attr attr-desc d-flex f-col">
          <h2>{brand}</h2>
          <h3 className="pdp-product-name">{pName}</h3>
          {attr.map((item) => (item.id === 'Color' ? (
            <div className="pdp-color-attr d-flex " key={item.id}>
              {this.displayColorAttribute(item)}
            </div>
          ) : (
            <div className="pdp-other-attr" key={item.id}>
              {this.displayOtherAttributes(item)}
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
      </div>
    );
  }
}

ProductDescAtrributes.propTypes = {
  headerState: PropTypes.objectOf(String),
  attrSelector: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  attr: PropTypes.arrayOf(String).isRequired,
  prices: PropTypes.arrayOf(String).isRequired,
  pName: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
};

ProductDescAtrributes.defaultProps = {
  headerState: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(ProductDescAtrributes);
