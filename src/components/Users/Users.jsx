import React from 'react';
import style_s from './Users.module.css';
import * as axios from "axios";
import userPhoto from '../../assets/images/profile_img.png'

class Users extends React.Component{
    constructor(props) {
        super(props);
        alert("new");
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            props.setUsers(response.data.items)
        });
    }


    render(){
        return(
            <div>
                {
                    this.props.users.map(u => <div key={u.id} className={style_s.user_block} >
                        <div>
                            <div>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} className={style_s.user_photo}/>
                            </div>
                            <div>
                                {u.isFollowed ? <button onClick={() => { this.props.ignoreUser(u.id)}}>Ignore</button> : <button onClick={() => { this.props.followUser(u.id)}}>Follow</button>}
                            </div>
                        </div>
                        <div className={style_s.user_info}>
                            <div>
                                <div>
                                    {u.name}
                                </div>
                                <div>
                                    {u.status}
                                </div>
                            </div>
                            <div>
                                <div>
                                    {'u.location.country'},
                                </div>
                                <div>
                                    {'u.location.city'}
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            
            </div>
            );
    }
}
export default Users;