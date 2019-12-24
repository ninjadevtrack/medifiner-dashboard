import React from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const Button = ({
  as,
  children,
  className,
  href,
  isLink,
  secondary,
  wide,
  ...props
}) => {
  if (isLink) {
    return (
      <NextLink
        href={href}
        as={as}
      >
        <a
          className={classNames(className, {
            button: true,
            'button--secondary': secondary,
            'button--wide': wide,
          })}
          {...props}
        >
          {children}
        </a>
      </NextLink>
    );
  }

  return (
    <button
      type="button"
      className={classNames(className, {
        button: true,
        'button--secondary': secondary,
        'button--wide': wide,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: (props, propName, componentName) => {
    if (props['isLink'] === true && props[propName] === null) {
      return new Error(`The prop \`${propName}\` is marked as required in \`${componentName}\`.`);
    }
    if (props['isLink'] === true && (props[propName] == undefined || typeof props[propName] !== 'string')) {
      return new Error(`Invalid prop \`${propName}\` of type \`${typeof props[propName]}\` supplied to \`${componentName}\`, expected \`string\`.`);
    }
  },
  isLink: PropTypes.bool,
  secondary: PropTypes.bool,
  wide: PropTypes.bool,
};

Button.defaultProps = {
  as: null,
  className: '',
  href: null,
  isLink: false,
  secondary: false,
  wide: false,
};

export default Button;
