/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductCart from './ProductCart';
import CartControl from './CartControl';
import './cart.css';

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
  descState: state.productDescription,
});

class MiniCart extends Component {
  render() {
    const {
      total,
      myState: { shoppingCart },
    } = this.props;

    return (
      <div className="mini-cart d-flex f-col a-center j-center">
        <h1 className="cart-page-header">My Cart</h1>
        <div className="cart-content">
          <h2 className="cart-header-total d-flex">{`My Bag: ${total} items`}</h2>
          {shoppingCart.length > 0 ? (
            shoppingCart.map((product, index) => (
              <ProductCart
                key={index}
                name={product.name}
                images={product.gallery}
                prices={product.prices}
                quantity={product.quantity}
                attr={product.attributes}
                imgIndex={product.imgIndex}
                productIndex={index}
              />
            ))
          ) : (
            <h3 className="cart-empty-header d-flex a-center j-center">
              Your Cart is empty! Please add products to the cart
            </h3>
          )}
        </div>
        <div className="cart-btn-price-cont">
          {shoppingCart.length > 0 && <CartControl total={total} />}
        </div>
      </div>
    );
  }
}

MiniCart.propTypes = {
  myState: PropTypes.objectOf(String).isRequired,
  shoppingCart: PropTypes.arrayOf(String),
  total: PropTypes.number,
};

MiniCart.defaultProps = {
  shoppingCart: [],
  total: 0,
};

export default connect(mapStateToProps, null)(MiniCart);

/* eslint-enable react/prefer-stateless-function */
/* eslint-enable react/no-array-index-key */
