/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attrSelector, addToCart } from '../../../Redux/PLP/listingPage';
import { displayOverlay } from "../../../Redux/PLP/header";

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
});

const mapDispatchToProps = () => ({
  attrSelector,
  addToCart,
  displayOverlay,
});

class Attributes extends Component {
  selectAttribute(displayValue, id) {
    const { attrSelector } = this.props;
    attrSelector(displayValue, id);
  }

  addProductTocart(productName, attr) {
    const { addToCart, displayOverlay } = this.props;
    displayOverlay(false)
    const checkAttribute = attr[0].attributes.every(
      (property) => property.items.some((item) => item.selected === true),
    );
    if (checkAttribute) {
      addToCart(productName);
    } else {
      window.alert(
        `Please select a value for all attributes for ${attr[0].name}`,
      );
    }
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
        <h3>{`${item.id}: `}</h3>
        <div className="attr-btn-cont d-flex a-center j-center">
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
    const { attr, popup } = this.props;

    return (
      <div className={popup ? 'attr-popup show-popup' : 'attr-popup'}>
        <article className="add-attr f-col a-center j-center">
          <div className="attr-close d-flex f-col a-center j-center">
            <h2 className="attr-product-name">{attr[0].name}</h2>
            <h3 className="attr-header d-flex j-center a-center">
              Select an Attribute
            </h3>
          </div>
          {attr.map((att) => att.attributes.map((item) => (item.id === 'Color' ? (
            <div key={item.id}>{this.displayColorAttribute(item)}</div>
          ) : (
            <div key={item.id}>{this.displayOtherAttributes(item)}</div>
          ))))}
          <div className="cart-btn-container d-flex a-center j-center">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => this.addProductTocart(attr[0].name, attr)}
            >
              Add To Cart
            </button>
          </div>
        </article>
      </div>
    );
  }
}

Attributes.propTypes = {
  addToCart: PropTypes.func.isRequired,
  attrSelector: PropTypes.func.isRequired,
  attr: PropTypes.arrayOf(Object),
  popup: PropTypes.bool.isRequired,
};

Attributes.defaultProps = {
  attr: [],
};

export default connect(mapStateToProps, mapDispatchToProps())(Attributes);
