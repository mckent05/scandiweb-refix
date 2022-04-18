import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import { getProducts, closePopup } from "./Redux/PLP/listingPage";
import { getCategories, getCurrency } from "./Redux/PLP/header";
import ListingPage from "./Components/Pages/PLP/ListingPage";
import ProductDescPage from "./Components/Pages/PDP/ProductDescPage";
import "./App.css";

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
    const { getProducts, getCategories, getCurrency } = this.props;
    getCategories();
    getCurrency();
    getProducts("all");
  }

  render() {
    const {
      myState: {
        allProducts: { name, products },
        isLoading,
        productAttr,
        attrPopup,
        shoppingCart,
      },
      headerState: { categories, currencyDetails, cartOverlay },
      descState: { loading, productDetails, imageControl },
    } = this.props;

    return (
      <>
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
            />
            <div className="product-cont-home d-flex a-center j-center">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <ListingPage
                      products={products}
                      categoryName={name}
                      attr={productAttr}
                      popup={attrPopup}
                    />
                  }
                />
                <Route
                  exact
                  path="/product/:id"
                  element={
                    <ProductDescPage
                      isLoading={loading}
                      product={productDetails}
                      imgControl={imageControl}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        )}
      </>
    );
  }
}

App.propTypes = {
  myState: PropTypes.objectOf(String).isRequired,
  headerState: PropTypes.objectOf(String).isRequired,
  allProducts: PropTypes.objectOf(String),
  getCurrency: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(Object),
  isLoading: PropTypes.bool,
  cartOverlay: PropTypes.bool,
  getProducts: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(Object),
  currencyDetails: PropTypes.arrayOf(Object),
};

App.defaultProps = {
  products: [],
  categories: [],
  currencyDetails: [],
  allProducts: {},
  isLoading: true,
  cartOverlay: false,
};

export default connect(mapStateToProps, mapDispatchToProps())(App);
