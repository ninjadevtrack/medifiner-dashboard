import React, { Component } from 'react';
import { withRouter } from 'next/router';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

import AnimateHeight from 'react-animate-height';
import classNames from 'classnames';

import './styles.scss';

class Usermenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

    this.containerRef = React.createRef();
  }

  componentWillMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', this.onDocumentClick, false);
    }
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.onDocumentClick, false);
    }
  }

  onDocumentClick(e) {
    if (this.containerRef.current && !this.containerRef.current.contains(e.target)) {
      this.setState({
        showMenu: false,
      });
    }
  }

  onItemClick(value) {
    this.setState({
      showMenu: false,
    }, () => {
      this.props.onItemClick(value);
    });
  }

  toggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  renderItems(items, router) {
    return (
      <div
        className="menu__items"
        >
        <ul className="menu__items-list">
          {items.map((item, index) => {
           return ( <li className="menu__item" key={index}>
              <NextLink href={item.href}>
                <a
                  type="button"
                  className={classNames('menu__item-button', {
                    'menu__item-button--active': router.pathname === item.href,
                  })}
                >
                {item.text}
              </a>
              </NextLink>
            </li>);
            })}
        </ul>
      </div>
    );
  }



  render() {
    const { showMenu } = this.state;
    const {
      label,
      items,
      router,
    } = this.props;

    return (
      <div
        className='menu'
        ref={this.containerRef}
      >
        <div className={classNames('menu__open-container', { 'menu__open-container--is-open': showMenu })}>
          <button
            type="button"
            className='menu__toggle'
            onClick={this.toggleMenu}
          >
          { label ? label : <i class="fas fa-sign-out-alt"></i> }
          </button>
        </div>
         <div className={classNames('menu__list-container', { 'menu__list-container--is-open': showMenu })}>
          <AnimateHeight
            duration={250}
            height={showMenu ? 'auto' : 0}
          >
              <div className="clearfix">
                {this.renderItems(items, router)}
              </div>
          </AnimateHeight>
        </div>
      </div>
    );
  }
}

Usermenu.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

Usermenu.defaultProps = {
  label: null,
  items: null,
};

export default withRouter(Usermenu);
