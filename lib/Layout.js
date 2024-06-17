import * as React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppBar, Layout, InspectorButton, TitlePortal } from 'react-admin';
const MyAppBar = () => (React.createElement(AppBar, null,
    React.createElement(TitlePortal, null),
    React.createElement(InspectorButton, null)));
export default props => (React.createElement(React.Fragment, null,
    React.createElement(Layout, Object.assign({}, props, { appBar: MyAppBar })),
    React.createElement(ReactQueryDevtools, { initialIsOpen: false, toggleButtonProps: { style: { width: 20, height: 30 } } })));
