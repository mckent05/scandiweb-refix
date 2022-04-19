/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import {
  controlImage,
  controlThumbNail,
} from '../../../Redux/PDP/descriptionPage';

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

  imgThumbnailControl(e, imgIndex) {
    const { controlThumbNail } = this.props;
    const images = document.querySelectorAll('.preview-img');
    images.forEach((image) => {
      image.classList.remove('thumb-color');
    });
    e.currentTarget.classList.add('thumb-color');
    controlThumbNail(imgIndex);
  }

  render() {
    const { imgGallery, imgControl } = this.props;

    return (
      <section className="pdp-thumb-img d-flex">
        <div className="img-thumbnail d-flex f-col a-center">
          {imgGallery.map((image, index) => (
            <img
              key={image}
              src={image}
              alt="product-img"
              className={
                index === imgControl ? 'preview-img thumb-color' : 'preview-img'
              }
              onClick={(e) => this.imgThumbnailControl(e, index)}
            />
          ))}
        </div>
        <div className="pdp-desc-img">
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
                onClick={(e) => this.scrollPicture(
                  e.currentTarget.classList[0],
                  imgGallery.length,
                  imgControl,
                )}
              >
                <AiOutlineLeft />
              </button>
              <button
                type="button"
                className="right arrow-left"
                onClick={(e) => this.scrollPicture(
                  e.currentTarget.classList[0],
                  imgGallery.length,
                  imgControl,
                )}
              >
                <AiOutlineRight />
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }
}

ProductImage.propTypes = {
  controlImage: PropTypes.func.isRequired,
  controlThumbNail: PropTypes.func.isRequired,
  imgGallery: PropTypes.arrayOf(String),
  imgControl: PropTypes.number.isRequired,
};

ProductImage.defaultProps = {
  imgGallery: [],
};

export default connect(mapStateToProps, mapDispatchToProps())(ProductImage);

/* eslint-enable jsx-a11y/click-events-have-key-events */
/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
