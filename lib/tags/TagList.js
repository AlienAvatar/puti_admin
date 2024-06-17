import * as React from 'react';
import { Fragment, useState } from 'react';
import { ListBase, ListActions, useListContext, EditButton, Title, } from 'react-admin';
import { Box, List, ListItem, ListItemText, ListItemSecondaryAction, Collapse, Card, Stack, } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
const TagList = () => (React.createElement(ListBase, { perPage: 1000 },
    React.createElement(Stack, null,
        React.createElement(ListActions, null),
        React.createElement(Box, { maxWidth: "20em", marginTop: "1em" },
            React.createElement(Card, null,
                React.createElement(Tree, null))))));
const Tree = () => {
    const { data, defaultTitle } = useListContext();
    const [openChildren, setOpenChildren] = useState([]);
    const toggleNode = node => setOpenChildren(state => {
        if (state.includes(node.id)) {
            return [
                ...state.splice(0, state.indexOf(node.id)),
                ...state.splice(state.indexOf(node.id) + 1, state.length),
            ];
        }
        else {
            return [...state, node.id];
        }
    });
    const roots = data
        ? data.filter(node => typeof node.parent_id === 'undefined')
        : [];
    const getChildNodes = root => data.filter(node => node.parent_id === root.id);
    return (React.createElement(List, null,
        React.createElement(Title, { defaultTitle: defaultTitle }),
        roots.map(root => (React.createElement(SubTree, { key: root.id, root: root, getChildNodes: getChildNodes, openChildren: openChildren, toggleNode: toggleNode, level: 1 })))));
};
const SubTree = ({ level, root, getChildNodes, openChildren, toggleNode }) => {
    const childNodes = getChildNodes(root);
    const hasChildren = childNodes.length > 0;
    const open = openChildren.includes(root.id);
    return (React.createElement(Fragment, null,
        React.createElement(ListItem, { onClick: () => hasChildren && toggleNode(root), style: { paddingLeft: level * 16 } },
            hasChildren && open && React.createElement(ExpandLess, null),
            hasChildren && !open && React.createElement(ExpandMore, null),
            !hasChildren && React.createElement("div", { style: { width: 24 } }, "\u00A0"),
            React.createElement(ListItemText, { primary: root.name.en }),
            React.createElement(ListItemSecondaryAction, null,
                React.createElement(EditButton, { record: root }))),
        React.createElement(Collapse, { in: open, timeout: "auto", unmountOnExit: true },
            React.createElement(List, { component: "div", disablePadding: true }, childNodes.map(node => (React.createElement(SubTree, { key: node.id, root: node, getChildNodes: getChildNodes, openChildren: openChildren, toggleNode: toggleNode, level: level + 1 })))))));
};
export default TagList;
