import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { GiShoppingBag } from "react-icons/gi";
import { BsCart } from "react-icons/bs";
import { getProducts, closePopup, removeFromCart } from "../Redux/PLP/listingPage";
import { toggleCurrency, displayOverlay } from "../Redux/PLP/header";
import MiniCart from "./Pages/MiniCart/MiniCart";

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
  descState: state.productDescription,
});

const mapDispatchToProps = () => ({
  getProducts,
  toggleCurrency,
  displayOverlay,
  closePopup,
  removeFromCart
});

class Header extends Component {
  closecart(popup) {
    const { closePopup } = this.props
    if(popup) {
      closePopup(false)
    }
  }



  static calculateCartQuantity = (cart) => {
    let total = 0;
    if (cart.length > 0) {
      cart.forEach((product) => {
        total += product.quantity;
      });
    }
    return total;
  };

  cartDisplay() {
    const { displayOverlay } = this.props;
    displayOverlay(true);
  }

  cartOverlay(quantity) {
    return (
      <div className="shop-cart d-flex f-col a-center j-center">
        <p className="cart-badge d-flex a-center j-center">{quantity}</p>
        <button
          label="cart-control"
          type="button"
          onClick={() => this.cartDisplay()}
        >
          <BsCart />
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
    const { toggleCurrency, displayOverlay } = this.props;
    toggleCurrency(value);
    displayOverlay(false)
  }

  render() {
    const {
      categories,
      currency,
      popup,
      overlay,
      myState: { shoppingCart },
    } = this.props;

    let totalQuantity = Header.calculateCartQuantity(shoppingCart);

    return (
      <>
        <nav className="nav" onClick={() => this.closecart(popup)}>
          <div className="nav-cont d-flex a-center">
            <div className="category d-flex">
              {categories.map((category, index) => (
                <button
                  className={index === 0 ? "nav-btn nav-color" : "nav-btn"}
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
                  <option
                    className="option"
                    value={curr.symbol}
                    key={curr.label}
                  >
                    {" "}
                    {`${curr.symbol} ${curr.label}`}
                  </option>
                ))}
              </select>
              {this.cartOverlay(totalQuantity)}
            </div>
          </div>
        </nav>
        {overlay && <MiniCart total={totalQuantity} />}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps())(Header);
