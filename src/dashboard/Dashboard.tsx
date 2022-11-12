import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editorActionCreator } from '../editor/state/editorActions';
import Card from './../common/card/Card';
import { dashboardActionCreator } from './state/dashboardActions';

function Dashboard() {
    const dispatch = useDispatch();
    const worksheets: [] = useSelector<any, any>((state) => state.dashboard.worksheets);

    const openWorksheetHandler = (id: number) => {
        // console.log('at Dashboard - openWorksheetHandler with id is ', id);
        dispatch(editorActionCreator.loadCurrentWorksheet({
            worksheets: worksheets,
            activeWorksheetId: id
        }));
    };

    // useEffect(() => {
    //     dispatch(dashboardActionCreator.listWorksheets());
    // });

    return (
        <div>
            {worksheets != null ? (
                <div>
                    <ul>
                        {
                            worksheets.map((item: any) => {
                                return (
                                    <Card
                                        key={item._id}
                                        id={item._id}
                                        caption={item.name}
                                        description={item.description}
                                        opOpenWorksheet={openWorksheetHandler}
                                    />
                                );
                            })
                        }
                    </ul>
                </div>
            ) : ''}
            <div>
                <button id="btnLoad" onClick={(eve) => dispatch(dashboardActionCreator.listWorksheets())}>Load</button>
                {/* <button id="btnAdd" onClick={(eve) => console.log('Add clicked')}>Add</button> */}
            </div>
        </div>
    );
};

export default Dashboard;