import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GiShoppingBag } from 'react-icons/gi';
import { BsCart } from 'react-icons/bs';
import { getProducts, closePopup } from '../Redux/PLP/listingPage';
import { toggleCurrency } from '../Redux/PLP/header';

const mapDispatchToProps = () => ({
  getProducts,
  toggleCurrency,
  closePopup,
});

class Header extends Component {
  static cartOverlay(quantity) {
    return (
      <div className="shop-cart d-flex f-col a-center j-center">
        <p className="cart-badge d-flex a-center j-center">{quantity}</p>
        <button label="cart-control" type="button">
          <BsCart />
        </button>
      </div>
    );
  }

  static calculateQuantity(cart) {
    let total = 0;
    cart.forEach((cart) => {
      total += cart.quantity;
    });
    return total;
  }

  filterCategory(e) {
    const { getProducts } = this.props;
    const navBtn = document.querySelectorAll('.nav-btn');
    navBtn.forEach((btn) => {
      btn.classList.remove('nav-color');
    });
    const categoryValue = e.currentTarget.innerHTML;
    e.currentTarget.classList.add('nav-color');
    getProducts(categoryValue);
  }

  currencySwitcher(value) {
    const { toggleCurrency, closePopup } = this.props;
    toggleCurrency(value);
    closePopup(false);
  }

  render() {
    const { categories, currency, cart } = this.props;

    const totalIncart = this.calculateQuantity(cart);

    return (
      <nav className="nav">
        <div className="nav-cont d-flex a-center">
          <div className="category d-flex">
            {categories.map((category, index) => (
              <button
                className={index === 0 ? 'nav-btn nav-color' : 'nav-btn'}
                key={category.name}
                type="button"
                onClick={(e) => this.filterCategory(e)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <GiShoppingBag className="nav-img" />
          <div className="cart-filter-currency d-flex a-center j-center">
            <select
              className="curr-filter"
              onChange={(e) => this.currencySwitcher(e.currentTarget.value)}
            >
              {currency.map((curr) => (
                <option className="option" value={curr.symbol} key={curr.label}>
                  {' '}
                  {`${curr.symbol} ${curr.label}`}
                </option>
              ))}
            </select>
            {Header.cartOverlay(totalIncart)}
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  categories: PropTypes.arrayOf(Object),
  cart: PropTypes.arrayOf(Object),
  currency: PropTypes.arrayOf(Object),
  getProducts: PropTypes.func.isRequired,
  toggleCurrency: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};

Header.defaultProps = {
  categories: [],
  currency: [],
  cart: {},
};

export default connect(null, mapDispatchToProps())(Header);
