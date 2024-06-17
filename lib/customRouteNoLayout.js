import * as React from 'react';
import { useGetList } from 'react-admin';
const CustomRouteNoLayout = ({ title = 'Posts' }) => {
    const { isLoading, total } = useGetList('posts', {
        pagination: { page: 0, perPage: 10 },
        sort: { field: 'id', order: 'ASC' },
    });
    return (React.createElement("div", null,
        React.createElement("h1", null, title),
        isLoading ? (React.createElement("p", { className: "app-loader" }, "Loading...")) : (React.createElement("p", null,
            "Found ",
            React.createElement("span", { className: "total" }, total),
            " posts !"))));
};
export default CustomRouteNoLayout;
