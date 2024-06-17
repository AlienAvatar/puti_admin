import React from 'react';
import PropTypes from 'prop-types';
import { useReferenceManyFieldController, ListContextProvider, ResourceContextProvider, useRecordContext, } from 'ra-core';
/**
 * Render related records to the current one.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 *
 * @example Display all the books by the current author, only the title
 * <ReferenceManyField reference="books" target="author_id">
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>
 *
 * By default, restricts the displayed values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceManyField perPage={10} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceManyField sort={{ field: 'created_at', order: 'DESC' }} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceManyField filter={{ is_published: true }} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 */
export const ReferenceManyField = (props) => {
    const { children, debounce, filter = defaultFilter, page = 1, pagination = null, perPage = 25, reference, resource, sort = defaultSort, source = 'num', target, } = props;
    const record = useRecordContext(props);
    const controllerProps = useReferenceManyFieldController({
        debounce,
        filter,
        page,
        perPage,
        record,
        reference,
        resource,
        sort,
        source,
        target,
    });
    return (React.createElement(ResourceContextProvider, { value: reference },
        React.createElement(ListContextProvider, { value: controllerProps },
            children,
            pagination)));
};
const fieldPropTypes = {
    sortBy: PropTypes.string,
    sortByOrder: PropTypes.oneOf(['ASC', 'DESC']),
    source: PropTypes.string,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.bool,
    ]),
    sortable: PropTypes.bool,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    textAlign: PropTypes.oneOf([
        'inherit',
        'left',
        'center',
        'right',
        'justify',
    ]),
    emptyText: PropTypes.string,
};
ReferenceManyField.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    filter: PropTypes.object,
    label: fieldPropTypes.label,
    perPage: PropTypes.number,
    record: PropTypes.any,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string,
    sortBy: PropTypes.string,
    sortByOrder: fieldPropTypes.sortByOrder,
    source: PropTypes.string,
    sort: PropTypes.exact({
        field: PropTypes.string,
        order: PropTypes.oneOf(['ASC', 'DESC']),
    }),
    target: PropTypes.string.isRequired,
};
// FIXME kept for backwards compatibility, unused, to be removed in v5
export const ReferenceManyFieldView = props => {
    const { children, pagination } = props;
    if (process.env.NODE_ENV !== 'production') {
        console.error('<ReferenceManyFieldView> is deprecated, use <ReferenceManyField> directly');
    }
    return (React.createElement(React.Fragment, null,
        children,
        pagination && props.total !== undefined ? pagination : null));
};
ReferenceManyFieldView.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string,
    sort: PropTypes.exact({
        field: PropTypes.string,
        order: PropTypes.oneOf(['ASC', 'DESC']),
    }),
    data: PropTypes.any,
    isLoading: PropTypes.bool,
    pagination: PropTypes.element,
    reference: PropTypes.string,
    setSort: PropTypes.func,
};
const defaultFilter = {};
const defaultSort = { field: 'num', order: 'DESC' };
