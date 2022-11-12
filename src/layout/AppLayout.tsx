import React from 'react';
import AuthorizedLayout from './authorized-layout/AuthorizedLayout';

type AppLayoutProps = {
    children: any
};

function AppLayout(props: AppLayoutProps) {
    return(
    <AuthorizedLayout >{props.children}</AuthorizedLayout>
    );
}

export default AppLayout;