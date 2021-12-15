import React from 'react';
import style_s from './Users.module.css';
import userPhoto from '../../assets/images/profile_img.png'

const Users = (props) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            <div className={style_s.paginationBlock}>
                {
                    pages.map(p => {
                        return <span className={props.currentPage === p && style_s.currentPage}
                            onClick={() => { props.onPageChanged(p) }}>{p}</span>
                    })
                }
            </div>
            {
                props.users.map(u => <div key={u.id} className={style_s.user_block} >
                    <div>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={style_s.user_photo} />
                        </div>
                        <div>
                            {u.isFollowed ? <button onClick={() => { props.ignoreUser(u.id) }}>Ignore</button> : <button onClick={() => { props.followUser(u.id) }}>Follow</button>}
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
export default Users;