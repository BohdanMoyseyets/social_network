import React, { useState } from 'react';
import style_s from './Paginator.module.css';


const Paginator = React.memo(({portionSize=10, ...props}) => {

    let pageCount = Math.ceil(props.totalItemsCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return (
        <div className={style_s.paginationBlock}>
            {/* {portionNumber > 1 &&<button onClick={() => { setPortionNumber(portionNumber - 1) }} >prev</button>} */}
            <button className={style_s.btn} onClick={() => { setPortionNumber(portionNumber - 1) }} disabled={portionNumber<2} >prev</button>
            <div>
                {
                    pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p => {
                        return <span className={(props.currentPage === p && style_s.currentPage) + " " + style_s.span_page}
                            key={p} onClick={() => { props.onPageChanged(p) }}>{p}</span>
                    })
                    
                }
            </div>
            {/* {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }} >next</button>} */}
            <button className={style_s.btn} onClick={() => { setPortionNumber(portionNumber + 1) }} disabled={portionCount <= portionNumber} >next</button>
        </div>
    );
})
export default Paginator;