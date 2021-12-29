import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/profile-reducer';
import { Redirect, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

  componentDidMount() {
    // debugger;
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfile(userId);
  }

  render() {
    return (
      <Profile {...this.props} />
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
});

export default compose(connect(mapStateToProps, { getUserProfile }),
  withRouter,
  withAuthRedirect)(ProfileContainer)
// export default connect(mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent);