/* eslint-disable react/prefer-stateless-function */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProductImage from "./ProductImage";
import ProductDescAttributes from "./ProductDescAttributes";
import { getProductDetails } from "../../../Redux/PDP/descriptionPage";

const mapDispatchToProps = () => ({
  getProductDetails,
});

class ProductDescPage extends Component {
  componentDidMount() {
    const id = JSON.parse(localStorage.getItem("id"));
    const { getProductDetails } = this.props;
    getProductDetails(id);
  }

  render() {
    const { isLoading, imgControl, product } = this.props;
    return (
      <div className="product-desc-cont">
        {isLoading ? (
          <h1 className="pdp-load">Loading...</h1>
        ) : (
          <section className="poduct-desc-page d-flex j-center">
            <div className="img-preview-cont">
              <ProductImage
                imgGallery={product.gallery}
                imgControl={imgControl}
              />
            </div>
            <div className="product-desc-attr d-flex f-col">
              <ProductDescAttributes
                inStock={product.inStock}
                prices={product.prices}
                description={product.description}
                attr={product.attributes}
                brand={product.brand}
                pName={product.name}
              />
            </div>
          </section>
        )}
      </div>
    );
  }
}

ProductDescPage.propTypes = {
  
};

export default connect(null, mapDispatchToProps())(ProductDescPage);
