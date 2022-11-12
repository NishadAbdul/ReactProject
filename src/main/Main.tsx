import React from 'react';
import { useSelector } from 'react-redux';

import Dashboard from './../dashboard/Dashboard';
import Editor from './../editor/Editor';

function Main(){
    const activeWorksheet: any = useSelector<any, any>((state) => state.editor.activeWorksheet);

    if (activeWorksheet === null){
        return(
            <Dashboard />
        );
    }
    else {
        return(
            <Editor />
        );
    }
};

export default Main;