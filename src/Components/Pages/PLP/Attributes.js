/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaShoppingCart, FaTimes } from "react-icons/fa";

class Attributes extends Component {
  render() {
    const { attr, popup } = this.props;

    return (
      <div className="attr-container">
        <article className="add-attr f-col a-center j-center">
          <div className="attr-close d-flex a-center j-center">
            <h3 className="attr-header d-flex j-center a-center">
              Select an Attribute
            </h3>
          </div>

          {attr.attributes.map((item) =>
            item.id === "Color" ? (
              <div
                className="attr-list d-flex j-center a-center f-col"
                key={item.id}
              >
                <h3>{`${item.id}: `}</h3>
                <div className="attr-btn-cont d-flex a-center j-center">
                  {item.items.map((size) => (
                    <button
                      type="button"
                      className={
                        size.selected ? "attr-btn selected-color" : "attr-btn"
                      }
                      key={size.id}
                      style={{ backgroundColor: size.displayValue }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="attr-list d-flex j-center a-center f-col"
                key={item.id}
              >
                <h3>{`${item.id}: `}</h3>
                <div className="attr-btn-cont d-flex a-center j-center">
                  {item.items.map((size) => (
                    <button
                      type="button"
                      className={
                        size.selected ? "attr-btn selected-size" : "attr-btn"
                      }
                      key={size.id}
                    >
                      {" "}
                      {size.value}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
          <div className="cart-btn-container d-flex a-center j-center">
            <button type="button" className="add-to-cart">
              Add To Cart
            </button>
          </div>
        </article>
      </div>
    );
  }
}

Attributes.propTypes = {
  attrSelector: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  attr: PropTypes.arrayOf(Object).isRequired,
  inStock: PropTypes.bool.isRequired,
  pName: PropTypes.string.isRequired,
  myState: PropTypes.objectOf(String).isRequired,
  shoppingCart: PropTypes.arrayOf(Object),
};

Attributes.defaultProps = {
  shoppingCart: [],
};

export default connect(mapStateToProps, mapDispatchToProps())(Attributes);
