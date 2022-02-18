import React, { useState, useEffect, ChangeEvent } from 'react';

type PropsType = {
  status: string
  updateStatus: (status: string) => void

}

const ProfileStatusHooks: React.FC<PropsType> = (props) => {

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

  const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
    console.log(e.currentTarget.value);
  }

  return (
    <div>
      <b>Status: </b>
      {!editMode &&
        <span>
          <span onDoubleClick={activeEditMode}>{props.status || "no status"}</span>
        </span>
      }
      {editMode &&
        <span>
          <input onChange={onChangeStatus} autoFocus={true} onBlur={deActiveEditMode} value={status}  />
        </span>
      }

    </div>
  )
}

export default ProfileStatusHooks;
// export default connect(mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent);