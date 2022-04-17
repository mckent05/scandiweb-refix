import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsCart } from 'react-icons/bs';
import { togglePopUp } from '../../../Redux/PLP/listingPage';

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
});

const mapDispatchToProps = () => ({
  togglePopUp,
});

class ProductCard extends Component {
  static priceDisplay(selectedPrice, prices) {
    return (
      <article>
        {selectedPrice.length > 0 ? (
          <p>
            <span>{selectedPrice[0].currency.symbol}</span>
            <span>{selectedPrice[0].amount}</span>
          </p>
        ) : (
          <p>
            <span>{prices[0].currency.symbol}</span>
            <span>{prices[0].amount}</span>
          </p>
        )}
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

  render() {
    const {
      prices, productName, gallery, stock, id,
    } = this.props;

    const selectedPrice = prices.filter((price) => price.selected === true);

    return (
      <div
        className="products d-flex f-col a-center j-center"
        onMouseEnter={(e) => e.currentTarget.classList.add('display-add')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('display-add')}
      >
        <Link to={`/product/${id}`}>
          <div className="img-link-cont d-flex a-center j-center">
            <img className="product-img" src={gallery[0]} alt="img" />
            {stock || <h2 className="out-of-stock">Out of Stock</h2>}
          </div>
        </Link>
        <div className="product-details d-flex f-col">
          <h3 className="product-name">{productName}</h3>
          <div className="product-price">
            {ProductCard.priceDisplay(selectedPrice, prices)}
            {this.displayCartButton(stock, id)}
          </div>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  prices: PropTypes.arrayOf(Object).isRequired,
  productName: PropTypes.string.isRequired,
  gallery: PropTypes.arrayOf(String).isRequired,
  stock: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps())(ProductCard);
