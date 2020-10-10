import React from 'react';

import './index.scss'

const Tooltip = ({heading, children}) => {
    return (
        <div className="tooltip">
            <h5 className="tooltip__heading">{heading}</h5>
            <div className="tooltip__content">
                {children}
            </div>
        </div>
    )
}

export default Tooltip