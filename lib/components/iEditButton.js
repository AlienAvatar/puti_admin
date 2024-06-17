var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import ContentCreate from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';
import { useResourceContext, useRecordContext, useCreatePath, } from 'ra-core';
import { Button } from 'ra-ui-materialui';
/**
 * Opens the Edit view for the current record.
 *
 * Reads the record and resource from the context.
 *
 * @example // basic usage
 * import { EditButton } from 'react-admin';
 *
 * const CommentEditButton = () => (
 *     <EditButton label="Edit comment" />
 * );
 */
export const EditButton = (props) => {
    const { icon = defaultIcon, label = '编辑', scrollToTop = true, className } = props, rest = __rest(props, ["icon", "label", "scrollToTop", "className"]);
    const resource = useResourceContext(props);
    const record = useRecordContext(props);
    const createPath = useCreatePath();
    if (!record)
        return null;
    return (React.createElement(StyledButton, Object.assign({ component: Link, to: createPath({ type: 'edit', resource, id: record.num }), state: scrollStates[String(scrollToTop)], label: label, onClick: stopPropagation, className: clsx(EditButtonClasses.root, className) }, rest), icon));
};
// avoids using useMemo to get a constant value for the link state
const scrollStates = {
    true: { _scrollToTop: true },
    false: {},
};
const defaultIcon = React.createElement(ContentCreate, null);
// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = e => e.stopPropagation();
EditButton.propTypes = {
    icon: PropTypes.element,
    label: PropTypes.string,
    record: PropTypes.any,
    scrollToTop: PropTypes.bool,
};
const PREFIX = 'RaEditButton';
export const EditButtonClasses = {
    root: `${PREFIX}-root`,
};
const StyledButton = styled(Button, {
    name: PREFIX,
    overridesResolver: (_props, styles) => styles.root,
})({});
