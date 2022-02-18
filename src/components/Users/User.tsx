import React from 'react';
import style_s from './Users.module.css';
import userPhoto from '../../assets/images/profile_img.png';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
    user: UserType,
    isFollowingInProgress: Array<number>,
    ignore: (userId: number)=> void
    follow: (userId: number)=> void
}


const User: React.FC<PropsType> = ({user, isFollowingInProgress, ignore, follow}) => {
    return (
        <div>
            <div key={user.id} className={style_s.user_block} >
                    <div>
                        <div>
                            <NavLink to={"/profile/" + user.id}>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto} className={style_s.user_photo} />
                            </NavLink>

                        </div>
                        <div>
                            {user.followed ?
                                <button disabled={isFollowingInProgress.some(id => id === user.id)} onClick={() => {
                                    ignore(user.id);
                                }}>Ignore</button> :
                                <button disabled={isFollowingInProgress.some(id => id === user.id)} onClick={() => {
                                    follow(user.id);
                                }}>Follow</button>}
                        </div>
                    </div>
                    <div className={style_s.user_info}>
                        <div>
                            <div>
                                {user.name}
                            </div>
                            <div className={style_s.status_block}>
                                {user.status}
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
                </div>

        </div>
    );
}
export default User;