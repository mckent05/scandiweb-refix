import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsCart } from 'react-icons/bs';
import { togglePopUp, closePopup } from '../../../Redux/PLP/listingPage';
import { displayOverlay } from "../../../Redux/PLP/header";

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
});

const mapDispatchToProps = () => ({
  togglePopUp,
  closePopup,
  displayOverlay,
});

class ProductCard extends Component {
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

  popUpToggle(productId) {
    const { togglePopUp } = this.props;
    togglePopUp(productId);
  }

  displayCartButton(stock, id) {
    if (!stock) {
      return (
        <div className="attr-container d-flex a-center">
          <button type="button" disabled className="add">
            <BsCart />
          </button>
        </div>
      );
    }
    return (
      <div className="attr-container d-flex a-center">
        <button
          type="button"
          className="add"
          onClick={() => this.popUpToggle(id)}
        >
          <BsCart className="cart-add-img" />
        </button>
      </div>
    );
  }

  viewProduct(id) {
    const { closePopup, displayOverlay, togglePopUp } = this.props;
    togglePopUp(id)
    displayOverlay(false)
    localStorage.setItem('id', JSON.stringify(id));
    closePopup(false);
  }

  render() {
    const {
      prices,
      productName,
      gallery,
      stock,
      id,
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
    return (
      <div
        className="products d-flex f-col a-center j-center"
        onMouseEnter={(e) => e.currentTarget.classList.add('display-add')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('display-add')}
      >
        <Link to={`/product/${id}`} onClick={() => this.viewProduct(id)}>
          <div className="img-link-cont d-flex a-center j-center">
            <img className="product-img" src={gallery[0]} alt="img" />
            {stock || <h2 className="out-of-stock">Out of Stock</h2>}
          </div>
        </Link>
        <div className="product-details d-flex f-col">
          <h3 className="product-name">{productName}</h3>
          <div className="product-price">
            {ProductCard.priceDisplay(selectedPrice)}
            {this.displayCartButton(stock, id)}
          </div>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  headerState: PropTypes.objectOf(String),
  togglePopUp: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  currencyDetails: PropTypes.arrayOf(String),
  prices: PropTypes.arrayOf(Object).isRequired,
  productName: PropTypes.string.isRequired,
  gallery: PropTypes.arrayOf(String).isRequired,
  stock: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {
  headerState: {},
  currencyDetails: [],
};

export default connect(mapStateToProps, mapDispatchToProps())(ProductCard);
