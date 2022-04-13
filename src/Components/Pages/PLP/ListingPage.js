import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import './plp.css'

class ListingPage extends Component {
  render() {
    const { products, categoryName } = this.props;
    return (
      <section className="listing-page d-flex f-col a-center j-center">
        <h1 className="category-name">{categoryName}</h1>
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
  name: PropTypes.string
};

ListingPage.defaultProps = {
  products: [],
  name: '',
}

export default ListingPage;
