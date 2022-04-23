/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { connect } from "react-redux";
import MiniCart from "../MiniCart/MiniCart";
import { displayOverlay } from "../../../Redux/PLP/header"
import './cartpage.css';


const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
  descState: state.productDescription,
});

const mapDispatchToProps = () => ({
  displayOverlay,
});

class CartPage extends Component {
  static calculateCartQuantity = (cart) => {
    let total = 0;
    if (cart.length > 0) {
      cart.forEach((product) => {
        total += product.quantity;
      });
    }
    return total;
  };

  componentDidMount() {
    const { displayOverlay } = this.props
    displayOverlay(false)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  render() {
    const { myState: { shoppingCart } } = this.props

    const totalQuantity = CartPage.calculateCartQuantity(shoppingCart);

    return (
      <div className="cart-main-page">
        <MiniCart total={totalQuantity} shoppingCart={shoppingCart} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(CartPage);