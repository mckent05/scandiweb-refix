/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attrSelector } from '../../../Redux/PLP/listingPage';

const mapStateToProps = (state) => ({
  myState: state.productList,
  headerState: state.category,
  descState: state.productDescription,
});

const mapDispatchToProps = () => ({
  attrSelector,
});

class DisplayColorAttributes extends Component {
  selectAttribute(displayValue, id) {
    const { attrSelector } = this.props;
    attrSelector(displayValue, id);
  }

  render() {
    const { item } = this.props;
    return (
      <div className="attr-list d-flex j-center a-center f-col" key={item.id}>
        <h3>{`${item.id}: `}</h3>
        <div className="attr-btn-cont d-flex a-center j-center">
          {item.items.map((size) => (
            <button
              type="button"
              label="attr-btn"
              onClick={() => this.selectAttribute(size.displayValue, item.id)}
              className={size.selected ? 'attr-btn selected-color' : 'attr-btn'}
              key={size.id}
              style={{ backgroundColor: size.displayValue }}
            />
          ))}
        </div>
      </div>
    );
  }
}

DisplayColorAttributes.propTypes = {
  attrSelector: PropTypes.func.isRequired,
  item: PropTypes.objectOf(String).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps())(DisplayColorAttributes);
