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
import { memo } from 'react';
import PropTypes from 'prop-types';
import ImageEye from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';
import { useResourceContext, useRecordContext, useCreatePath, } from 'ra-core';
import { Button } from 'ra-ui-materialui';
/**
 * Opens the Show view of a given record
 *
 * @example // basic usage
 * import { ShowButton, useRecordContext } from 'react-admin';
 *
 * const CommentShowButton = () => {
 *     const record = useRecordContext();
 *     return (
 *         <ShowButton label="Show comment" record={record} />
 *     );
 * };
 */
export const ShowButton = (props) => {
    const { icon = defaultIcon, label = '展示', record: recordProp, resource: resourceProp, scrollToTop = true } = props, rest = __rest(props, ["icon", "label", "record", "resource", "scrollToTop"]);
    const resource = useResourceContext(props);
    const record = useRecordContext(props);
    const createPath = useCreatePath();
    if (!record) {
        return null;
    }
    return (React.createElement(Button, Object.assign({ component: Link, to: createPath({ type: 'show', resource, id: record.num }), state: scrollStates[String(scrollToTop)], label: label, onClick: stopPropagation }, rest), icon));
};
// avoids using useMemo to get a constant value for the link state
const scrollStates = {
    true: { _scrollToTop: true },
    false: {},
};
const defaultIcon = React.createElement(ImageEye, null);
// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = e => e.stopPropagation();
ShowButton.propTypes = {
    icon: PropTypes.element,
    label: PropTypes.string,
    record: PropTypes.any,
    scrollToTop: PropTypes.bool,
};
const PureShowButton = memo(ShowButton, (prevProps, nextProps) => prevProps.resource === nextProps.resource &&
    (prevProps.record && nextProps.record
        ? prevProps.record.num === nextProps.record.num
        : prevProps.record == nextProps.record) && // eslint-disable-line eqeqeq
    prevProps.label === nextProps.label &&
    prevProps.disabled === nextProps.disabled);
export default PureShowButton;
