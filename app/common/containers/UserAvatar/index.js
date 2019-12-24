import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Usermenu from '@common/components/Usermenu';

import authSelectors from '@selectors/auth';

import './styles.scss';

const UserAvatar = ({ me }) => (
  <div className="user-avatar">
    <div className="user-avatar__text">
      {me && (
        <Usermenu
          label={(me.firstName && me.lastName) ? (me.firstName[0] + me.lastName[0]) : null}
          items={[
              // {
              //   href: '/account-settings',
              //   text: 'Account Settings',
              // },
              {
                href: '/logout',
                text: 'Logout',
              }]}
        />
      )}
    </div>
  </div>
);

const mapStateToProps = state => ({
  me: authSelectors.getMe(state),
});

UserAvatar.propTypes = {
  me: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(UserAvatar);
