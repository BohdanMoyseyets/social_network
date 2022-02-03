import React, { useState, useEffect } from 'react';

const ProfileStatusHooks = (props) => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(()=>{
    setStatus(props.status)
  },[props.status]);

  const activeEditMode = () => {
    setEditMode(true);
  }

  const deActiveEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }

  const onChangeStatus = (e) => {
    setStatus(e.currentTarget.value);
    console.log(e.currentTarget.value);
  }

  return (
    <div>
      {!editMode &&
        <div>
          <span onDoubleClick={activeEditMode}>{props.status || "no status"}</span>
        </div>
      }
      {editMode &&
        <div>
          <input onChange={onChangeStatus} autoFocus={true} onBlur={deActiveEditMode} value={status}  />
        </div>
      }

    </div>
  )
}

export default ProfileStatusHooks;
// export default connect(mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent);