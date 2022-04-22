/* eslint-disable react/prefer-stateless-function */

import React, { Component } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa";
import PropTypes from "prop-types";
import {
  cartControlImage,
  addQuantity,
  reduceQuantity,
} from "../../../Redux/PLP/listingPage";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
  descState: state.productDescription,
});

const mapDispatchToProps = () => ({
  addQuantity,
  reduceQuantity,
  cartControlImage,
});

class CartProductImg extends Component {
  increaseProductQuantity(productIndex) {
    const { addQuantity } = this.props;
    addQuantity(productIndex);
  }

  decreaseProductQuantity(productIndex) {
    const { reduceQuantity } = this.props;
    reduceQuantity(productIndex);
  }

  imageControl(action, galleryLength, productIndex) {
    const { cartControlImage } = this.props;
    cartControlImage(action, galleryLength, productIndex);
  }

  render() {
    const { images, imgIndex, quantity, prodIndex } = this.props;
    return (
      <div className="cart-product-img d-flex j-center a-center">
        <div className="cart-quantity-cont d-flex f-col">
          <button
            type="button"
            className="add-quantity"
            onClick={() => this.increaseProductQuantity(prodIndex)}
          >
            <FaPlus />
          </button>
          <p>{quantity}</p>
          <button
            type="button"
            className="add-quantity"
            onClick={() => this.decreaseProductQuantity(prodIndex)}
          >
            <FaMinus />
          </button>
        </div>
        <section className="cart-prod-img">
          <img src={images[imgIndex]} alt="product-img" />
          {images.length > 1 && (
            <div className="cart-view-control d-flex a-center">
              <button
                type="button"
                className="left cart-img-left"
                onClick={(e) =>
                  this.imageControl(
                    e.currentTarget.classList[0],
                    images.length,
                    prodIndex
                  )
                }
              >
                <AiOutlineLeft />
              </button>
              <button
                type="button"
                className="right cart-img-right"
                onClick={(e) =>
                  this.imageControl(
                    e.currentTarget.classList[0],
                    images.length,
                    prodIndex
                  )
                }
              >
                <AiOutlineRight />
              </button>
            </div>
          )}
        </section>
      </div>
    );
  }
}

CartProductImg.propTypes = {};

CartProductImg.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps())(CartProductImg);
