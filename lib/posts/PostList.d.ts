import * as React from 'react';
export declare const PostIcon: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
/**
 * PostList 组件
 *
 * @returns 根据屏幕大小渲染不同组件，当屏幕小于等于中等尺寸时渲染 PostListMobile，否则渲染 PostListDesktop
 */
declare const PostList: () => React.JSX.Element;
export default PostList;
