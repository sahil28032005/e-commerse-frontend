import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoading = ({ type }) => {

    if (type === 'sidebar') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
                <div style={{ marginBottom: '10px',width:'200px' }}><Skeleton /></div>
                <div style={{ marginBottom: '10px',width:'200px' }}><Skeleton /></div>
                <div style={{ marginBottom: '10px',width:'200px' }}><Skeleton /></div>
                <div style={{ marginBottom: '10px',width:'200px' }}><Skeleton /></div>
                <div style={{ marginBottom: '10px',width:'200px' }}><Skeleton /></div>
            </div>
        )
    }
    return (
        <div className="hCard card" style={{ height: '22rem', width: '18rem', padding: '20px', margin: '10px' }}>
            <div className=" hCard-img hCard-img-top card-img-top">
                <Skeleton height={"8rem"} />
            </div>
            <div className="hCard-body card-body" style={{ padding: '10px' }}>
                <div className=" hCard-title  h card-title" width={"10rem"} ><Skeleton /></div>
                <div className="hCard-text   card-text" width={"9rem"} ><Skeleton /></div>
                <div className=" hCard-title  card-title" width={"7rem"} ><Skeleton /></div>
                <div className='btnHCont'>
                    <Skeleton />
                    <Skeleton />
                </div>

            </div>
        </div>
    );
}

export default SkeletonLoading;
