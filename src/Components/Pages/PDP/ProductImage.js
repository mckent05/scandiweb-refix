import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import {
  controlImage,
  controlThumbNail,
} from "../../../Redux/PDP/descriptionPage";

const mapStateToProps = (state) => ({
  pdpSate: state.productDescription,
});

const mapDispatchToProps = () => ({
  controlImage,
  controlThumbNail,
});

class ProductImage extends Component {
  scrollPicture(action, length) {
    const { controlImage } = this.props;
    controlImage(action, length);
  }

  imgThumbnailControl(imgIndex) {
    const { controlThumbNail } = this.props;
    controlThumbNail(imgIndex);
  }

  render() {
    const { imgGallery, imgControl } = this.props
    return (
      <section className="cart-image d-flex f-col a-center j-center">
        <div className="img-thumbnail">
          {imgGallery.map((image, index) => (
            <img
              key={image}
              src={image}
              alt="product-img"
              className="preview-img"
              onClick={() => this.imgThumbnailControl(index)}
            />
          ))}
        </div>
        <div className="img">
          <img
            src={imgGallery[imgControl]}
            alt="product-img"
            className="desc-img"
          />
          {imgGallery.length > 1 && (
            <div className="img-view-control d-flex a-center">
              <button
                type="button"
                className="left arrow-left"
                onClick={(e) =>
                  this.scrollPicture(
                    e.currentTarget.classList[0],
                    imgGallery.length
                  )
                }
              >
                <FaArrowCircleLeft />
              </button>
              <button
                type="button"
                className="right arrow-left"
                onClick={(e) =>
                  this.scrollPicture(
                    e.currentTarget.classList[0],
                    imgGallery.length
                  )
                }
              >
                <FaArrowCircleRight />
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }
}

ProductImage.propTypes = {};

ProductImage.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps())(ProductImage);
