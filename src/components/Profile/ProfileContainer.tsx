import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamType = {
  userId: string
}
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamType>


class ProfileContainer extends React.Component<PropsType> {
  refreshProfile(){
    let userId: number | null  = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if(!userId){
        this.props.history.push("/login");
      }
    }

    if(!userId){
      console.error("ID should exist");
    } else {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }
  }

  componentDidMount() {
    
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType){
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }

    
  }

  render() {
    return (
      <Profile {...this.props} isOwner={!this.props.match.params.userId} saveProfile={this.props.saveProfile} savePhoto={this.props.savePhoto} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
    )
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isLogged: state.auth.isLogged
});

export default compose<React.ComponentType>(connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter)(ProfileContainer)
// export default connect(mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent);