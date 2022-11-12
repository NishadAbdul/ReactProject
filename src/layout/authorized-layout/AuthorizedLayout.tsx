import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { dashboardActionCreator } from './../../dashboard/state/dashboardActions';
import './AuthorizedLayout.scss';

function AuthorizedLayout(props: any) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(dashboardActionCreator.listWorksheets());
    });

    return (
        <div className="body-wrapper">
            {/* <div className="body-structure">
                <div className="body-structure-left-menu">Left menu | Actions</div>
                <div className="body-structure-main">{props.children}</div>
                <div className="body-structure-right-menu">
                    <div className="body-structure-right-menu-item">Comments</div>
                    <div className="body-structure-right-menu-item"> | </div>
                    <div className="body-structure-right-menu-item">Chat</div>
                </div>
            </div> */}
            <div>{props.children}</div>
        </div>
    );
}

export default AuthorizedLayout;