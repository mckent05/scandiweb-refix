import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import CartPage from "./Components/Pages/CartPage/CartPage";
import { getProducts, closePopup, getProductAttributes } from './Redux/PLP/listingPage';
import { getCategories, getCurrency, displayOverlay } from './Redux/PLP/header';
import ListingPage from './Components/Pages/PLP/ListingPage';
import ProductDescPage from './Components/Pages/PDP/ProductDescPage';
import './App.css';

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
  descState: state.productDescription,
});

const mapDispatchToProps = () => ({
  getProducts,
  getCategories,
  getCurrency,
  closePopup,
  displayOverlay,
  getProductAttributes,
});

class App extends Component {
  // handleScroll() {
  //   const { closePopup } = this.props
  //   console.log(window.scrollY)
  //   if(window.scrollY > 200) {
  //     closePopup(false)
  //   }
  // }

  componentDidMount() {
    const { getProducts, getCategories, getCurrency, getProductAttributes } = this.props;
    const id = JSON.parse(localStorage.getItem('id'));
    getCategories();
    getCurrency();
    getProducts('all');
    if(id) {
      getProductAttributes(id)
    }
  }

  render() {
    const {
      myState: {
        allProducts: { name, products },
        isLoading,
        productAttr,
        attrPopup,
        totalQuantity,
      },
      headerState: { categories, currencyDetails, cartOverlay },
      descState: { loading, productDetails, imageControl },
    } = this.props;

    return (
      <div>
        {isLoading ? (
          <div className="App d-flex f-col a-center j-center">
            <h1 className="loading d-flex a-center j-center">Please Wait...</h1>
          </div>
        ) : (
          <div className="App">
            <Header
              categories={categories}
              currency={currencyDetails}
              overlay={cartOverlay}
              total={totalQuantity}
              popup={attrPopup}
            />
            <div className="product-cont-home d-flex a-center j-center">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={(
                    <ListingPage
                      products={products}
                      categoryName={name}
                      attr={productAttr}
                      popup={attrPopup}
                      cartOverlay={cartOverlay}
                    />
                  )}
                />
                <Route
                  exact
                  path="/product/:id"
                  element={(
                    <ProductDescPage
                      isLoading={loading}
                      product={productDetails}
                      imgControl={imageControl}
                      cartOverlay={cartOverlay}
                    />
                  )}
                />
                <Route
                  exact
                  path="/myCart"
                  element={(
                    <CartPage
                      total={totalQuantity}
                    
                    />

                  )}
                />
              </Routes>
            </div>
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  myState: PropTypes.objectOf(String).isRequired,
  headerState: PropTypes.objectOf(String).isRequired,
  descState: PropTypes.objectOf(String),
  closePopup: PropTypes.func.isRequired,
  allProducts: PropTypes.objectOf(String),
  getCurrency: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(Object),
  productAttr: PropTypes.objectOf(String),
  name: PropTypes.string,
  loading: PropTypes.bool,
  isLoading: PropTypes.bool,
  cartOverlay: PropTypes.bool,
  getProducts: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(Object),
  currencyDetails: PropTypes.arrayOf(Object),
  totalQuantity: PropTypes.number,
  imageControl: PropTypes.number,
  productDetails: PropTypes.objectOf(String),
  attrPopup: PropTypes.bool,
  getProductAttributes: PropTypes.func.isRequired,
};

App.defaultProps = {
  products: [],
  descState: {},
  categories: [],
  currencyDetails: [],
  allProducts: {},
  isLoading: true,
  loading: true,
  attrPopup: false,
  cartOverlay: false,
  productAttr: {},
  totalQuantity: 0,
  productDetails: {},
  imageControl: 0,
  name: '',
};

export default connect(mapStateToProps, mapDispatchToProps())(App);
