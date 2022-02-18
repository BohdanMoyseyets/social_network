import React from 'react';
import preloader from "../../assets/images/loader.gif"

type PropsType = {}

const Preloader: React.FC<PropsType> = (props) =>{
    return(
    <div style={{ backgroundColor: '#aaa' }}>
        <img src={preloader}/>
    </div>
    );
}
export default Preloader;