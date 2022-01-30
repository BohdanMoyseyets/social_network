import React from 'react';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status
  }
  activeEditMode = () => {
    this.setState({
      editMode: true
    })
  }
  deActiveEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateStatus(this.state.status);
  }
  onChangeStatus = (e) => {
    this.setState({
      status: e.currentTarget.value
    });
    console.log(e.currentTarget.value);
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.status !== this.props.status){
      this.setState({
        status: this.props.status
      });
    }

  }

  render() {
    return (
      <div>
        {!this.state.editMode &&
          <div>
            <span onDoubleClick={ this.activeEditMode}>{this.props.status || "no status"}</span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input onChange={this.onChangeStatus.bind(this)} autoFocus={true} onBlur={this.deActiveEditMode} value={this.state.status} />
          </div>
        }

      </div>
    )
  }
}

export default ProfileStatus;
// export default connect(mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent);