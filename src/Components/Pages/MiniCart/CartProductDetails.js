/* eslint-disable react/prefer-stateless-function */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
  descState: state.productDescription,
});

class CartProductDetails extends Component {
  static priceDisplay(selectedPrice) {
    return (
      <article>
        <p className="cart-price">
          <span>{selectedPrice[0].currency.symbol}</span>
          <span>{selectedPrice[0].amount}</span>
        </p>
      </article>
    );
  }

  static displayColorAttribute(item) {
    return (
      <div className="attr-list d-flex j-center a-center f-col" key={item.id}>
        <h3>{`${item.id}: `}</h3>
        <div className="attr-btn-cont d-flex a-center j-center">
          {item.items.map((size) => (
            <button
              type="button"
              className={size.selected ? "attr-btn-cart selected-color" : "attr-btn-cart"}
              key={size.id}
              style={{ backgroundColor: size.displayValue }}
            />
          ))}
        </div>
      </div>
    );
  }

  static displayOtherAttributes(item) {
    return (
      <div className="attr-list d-flex j-center a-center f-col" key={item.id}>
        <h3>{`${item.id}: `}</h3>
        <div className="attr-btn-cont d-flex a-center j-center">
          {item.items.map((size) => (
            <button
              type="button"
              className={size.selected ? "attr-btn selected-size" : "attr-btn"}
              key={size.id}
            >
              {" "}
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
      attr,
      headerState: { currencyDetails },
    } = this.props;

    let selectedPrice;

    const selectedCurrency = currencyDetails.filter(
      (currency) => currency.selected === true
    );

    if (selectedCurrency.length > 0) {
      selectedPrice = prices.filter(
        (price) => price.currency.symbol === selectedCurrency[0].symbol
      );
    } else {
      selectedPrice = prices;
    }
    return (
      <div className="cart-product-details d-flex f-col">
        <h2 className="cart-product-name">{pName}</h2>
        {CartProductDetails.priceDisplay(selectedPrice)}
        {attr.map((item) =>
          item.id === "Color" ? (
            <div className="cart-color-attr d-flex " key={item.id}>
              {CartProductDetails.displayColorAttribute(item)}
            </div>
          ) : (
            <div className="pdp-other-attr" key={item.id}>
              {CartProductDetails.displayOtherAttributes(item)}
            </div>
          )
        )}
      </div>
    );
  }
}

CartProductDetails.propTypes = {};

CartProductDetails.defaultProps = {
  cart: [],
};

export default connect(mapStateToProps, null)(CartProductDetails);
