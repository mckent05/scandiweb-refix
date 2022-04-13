import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProducts, toggleCurrency } from "../Redux/PLP/listingPage";
import { FaShopify, FaShoppingCart } from "react-icons/fa";

const mapDispatchToProps = () => ({
  getProducts,
  toggleCurrency,
});

class Header extends Component {
  static cartOverlay() {
    return (
      <div className="shop-cart d-flex f-col a-center j-center">
        <p className="cart-badge d-flex a-center j-center">0</p>
        <button label="cart-control" type="button">
          <FaShoppingCart />
        </button>
      </div>
    );
  }

  filterCategory(e) {
    const { getProducts } = this.props;
    const navBtn = document.querySelectorAll(".nav-btn");
    navBtn.forEach((btn) => {
      btn.classList.remove("nav-color");
    });
    const categoryValue = e.currentTarget.innerHTML;
    e.currentTarget.classList.add("nav-color");
    getProducts(categoryValue);
  }

  currencySwitcher(value) {
    const { toggleCurrency } = this.props;
    toggleCurrency(value);
  }

  render() {
    const { categories, currency } = this.props;

    return (
      <nav className="nav">
        <div className="nav-cont d-flex a-center">
          <div className="category d-flex">
            {categories.map((category) => (
              <button
                className="nav-btn"
                key={category.name}
                type="button"
                onClick={(e) => this.filterCategory(e)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <FaShopify className="nav-img" />
          <div className="cart-filter-currency d-flex a-center j-center">
            <select
              className="curr-filter"
              onChange={(e) => this.currencySwitcher(e.currentTarget.value)}
            >
              {currency.map((curr) => (
                <option className="option" value={curr.symbol} key={curr.label}>
                  {" "}
                  {`${curr.symbol}   ${curr.label}`}
                </option>
              ))}
            </select>
            {Header.cartOverlay()}
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  categories: PropTypes.arrayOf(Object),
  currency: PropTypes.arrayOf(Object),
  getProducts: PropTypes.func.isRequired,
  toggleCurrency: PropTypes.func.isRequired,
};

Header.defaultProps = {
  categories: [],
  currency: [],
};

export default connect(null, mapDispatchToProps())(Header);
