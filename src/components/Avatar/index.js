import React from 'react';

import './index.scss';

const Avatar = ({data}) => {
    return(
        <div className="avatar">
            <img src={data.avatar} alt={data.first_name}/>
            <h5 className="avatar__heading">{data.first_name}</h5>
        </div>
    )
}

export default Avatar;