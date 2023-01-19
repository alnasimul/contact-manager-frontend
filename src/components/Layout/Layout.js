import React from 'react';
import Header from './Header/Header';

const Layout = ({children, getSearchResult}) => {
    return (
        <div>
            <Header getSearchResult={getSearchResult}/>
            {children}
        </div>
    );
};

export default Layout;