/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { Component } from "react";
import { connect } from "react-redux";
import CartProductImg from "./CartProductImg";
import CartProductDetails from "./CartProductDetails";
import { AiOutlineClose } from 'react-icons/ai';
import { removeFromCart } from "../../../Redux/PLP/listingPage";
import { removeFromCart2 } from "../../../Redux/PDP/descriptionPage";
import PropTypes from "prop-types";

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
  descState: state.productDescription,
});

const mapDispatchToProps = () => ({
  removeFromCart,
});

class ProductCart extends Component {
  removeCart(productIndex) {
    const { removeFromCart, removeFromCart2 } = this.props;
    removeFromCart(productIndex);
  }
  render() {
    const { name, images, prices, quantity, attr, imgIndex, productIndex } =
      this.props;

    return (
      <div className="cart-product-cont d-flex a-center j-center f-col">
        <div className="cart-remove-btn d-flex">
          <button onClick={() => this.removeCart(productIndex)}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="cart-product d-flex">
          <CartProductDetails pName={name} prices={prices} attr={attr} />
          <CartProductImg
            images={images}
            imgIndex={imgIndex}
            quantity={quantity}
            prodIndex={productIndex}
          />
        </div>
      </div>
    );
  }
}

ProductCart.propTypes = {};

ProductCart.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps())(ProductCart);
