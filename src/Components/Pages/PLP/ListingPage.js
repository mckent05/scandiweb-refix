/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Attributes from './Attributes';
import ProductCard from './ProductCard';
import { displayOverlay } from '../../../Redux/PLP/header';
import './plp.css';
import { closePopup } from '../../../Redux/PLP/listingPage';

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
  descState: state.productDescription,
});

const mapDispatchToProps = () => ({
  displayOverlay,
  closePopup,
});

class ListingPage extends Component {
  closecart(e, cartOverlay, popup) {
    const { displayOverlay, closePopup } = this.props;
    if (cartOverlay) {
      displayOverlay(false);
    }
    if (popup) {
      if (e.target.classList[0] === 'products-cont') {
        closePopup(false);
      }
    }
  }

  render() {
    const {
      products, categoryName, attr, popup, cartOverlay,
    } = this.props;
    return (
      <section
        className="listing-page d-flex f-col a-center j-center"
        onClick={(e) => this.closecart(e, cartOverlay, popup)}
      >
        {popup && <Attributes attr={attr} popup={popup} />}
        <h1 className="category-name d-flex a-center">{categoryName}</h1>
        <div className="products-cont d-flex a-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              productName={product.name}
              stock={product.inStock}
              prices={product.prices}
              gallery={product.gallery}
            />
          ))}
        </div>
      </section>
    );
  }
}

ListingPage.propTypes = {
  products: PropTypes.arrayOf(Object),
  attr: PropTypes.arrayOf(Object),
  categoryName: PropTypes.string,
  popup: PropTypes.bool.isRequired,
  cartOverlay: PropTypes.bool.isRequired,
  displayOverlay: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};

ListingPage.defaultProps = {
  products: [],
  categoryName: '',
  attr: [],
};

export default connect(mapStateToProps, mapDispatchToProps())(ListingPage);

/* eslint-enable react/prefer-stateless-function */
/* eslint-enable jsx-a11y/click-events-have-key-events */
/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-enable jsx-a11y/no-static-element-interactions */
