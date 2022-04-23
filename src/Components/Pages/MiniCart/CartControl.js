/* eslint-disable react/prefer-stateless-function */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
  descState: state.productDescription,
});

class CartControl extends Component {
  static calculateTotalAmount(cart, selectedCurrency) {
    let totalAmount = 0;
    if (cart.length > 0) {
      cart.forEach((product) => {
        const findCurrency = product.prices.find(
          (price) => price.currency.symbol === selectedCurrency[0].symbol
        );
        if (findCurrency) {
          totalAmount += product.quantity * findCurrency.amount;
        }
      });
    }
    return totalAmount.toFixed(2);
  }

  render() {
    const {
      total,
      headerState: { currencyDetails },
      myState: { shoppingCart },
    } = this.props;

    let selectedPrice;

    const selectedCurrency = currencyDetails.filter(
      (currency) => currency.selected === true
    );

    if (selectedCurrency.length > 0) {
      selectedPrice = selectedCurrency;
    } else {
      selectedPrice = currencyDetails;
    }

    const totalAmount = CartControl.calculateTotalAmount(
      shoppingCart,
      selectedPrice
    );
    const taxPaid = (0.075 * totalAmount).toFixed(2);

    const totalCartAmount = (totalAmount * 1.075).toFixed(2);

    return (
      <div className="cart-control d-flex f-col a-center j-center">
        <div className="total-cont d-flex a-center">
          <h2>Total</h2>
          <h3>{`${selectedPrice[0].symbol}${totalCartAmount}`}</h3>
        </div>
        <div className="checkout-bag-cont d-flex a-center">
          <Link to="/myCart" className="view-bag d-flex a-center j-center">
            View Bag
          </Link>
          <button type="button" className="checkout">
            Checkout
          </button>
        </div>
        <div className="cart-page-checkout f-col">
          <span>
            <p>Tax: </p>
            <h3>{`${selectedPrice[0].symbol}${taxPaid}`}</h3>
          </span>
          <span>
            <p>Quantity: </p>
            <h3>{total}</h3>
          </span>
          <span>
            <p>Total: </p>
            <h2>{`${selectedPrice[0].symbol}${totalCartAmount}`}</h2>
          </span>
          <button type="button" className="checkout checkout2">
            ORDER
          </button>
        </div>
      </div>
    );
  }
}

CartControl.propTypes = {
  headerState: PropTypes.objectOf(String),
  myState: PropTypes.objectOf(String),
  currencyDetails: PropTypes.arrayOf(Object),
  shoppingCart: PropTypes.arrayOf(Object),
  total: PropTypes.number
};

CartControl.defaultProps = {
  headerState: {},
  myState: {},
  shoppingCart: [],
  currencyDetails: [],
  total: 0
};

export default connect(mapStateToProps, null)(CartControl);
