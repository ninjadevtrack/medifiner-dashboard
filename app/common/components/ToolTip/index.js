import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { isMobile } from '@app/utils/helpers';

import './styles.scss';

class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupPosition: null,
      showPopup: false,
    };

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);

    this.containerRef = React.createRef();
    this.popupRef = React.createRef();
  }

  componentDidMount() {
    if (typeof document !== 'undefined') {
      this.isMobile = ('ontouchstart' in document.documentElement);
      document.addEventListener('mousedown', this.onDocumentClick, false);
    }
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.onDocumentClick, false);
    }
  }

  onDocumentClick(e) {
    if (!this.containerRef.current.contains(e.target)) {
      this.setState({
        popupPosition: null,
        showPopup: false,
      });
    }
  }

  onMouseEnter() {
    if (!this.isMobile) {
      clearTimeout(this.leaveTimeout);

      this.setState({
        popupPosition: null,
        showPopup: true,
      }, () => {
        this.setPopupPosition();
      });
    }
  }

  onMouseLeave() {
    if (!this.isMobile) {
      this.leaveTimeout = setTimeout(() => {
        this.closePopup();
      }, 100);
    }
  }

  onClick() {
    if (this.isMobile) {
      this.setState(prevState => ({
        popupPosition: null,
        showPopup: !prevState.showPopup,
      }), () => {
        this.setPopupPosition();
      });
    }
  }

  setPopupPosition() {
    const popup = this.popupRef.current;
    if(!popup) return;
    const popupBoundings = popup.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    let leftPosition = null;

    if (popupBoundings.right > windowWidth) {
      leftPosition = windowWidth - popupBoundings.right;
    }

    this.setState({
      popupPosition: leftPosition,
    });
  }

  closePopup() {
    this.setState({
      popupPosition: null,
      showPopup: false,
    });
  }

  render() {
    const {
      children,
      title,
    } = this.props;
    const {
      popupPosition,
      showPopup,
    } = this.state;

    return (
      <div
        ref={this.containerRef}
        className="tooltip"
      >
        <button
          type="button"
          className={classNames('tooltip__toggle', { 'tooltip__toggle--active': showPopup })}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onClick={this.onClick}
        >
          <i className="fas fa-info tooltip__icon" />
        </button>
        {showPopup && (
          <div
            ref={this.popupRef}
            className="tooltip__popup"
            style={{ left: popupPosition }}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <div className="tooltip__title">
              {title}
            </div>
            <div className="tooltip__content">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Tooltip;
