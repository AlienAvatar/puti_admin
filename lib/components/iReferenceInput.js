import React from 'react';
import PropTypes from 'prop-types';
import { ChoicesContextProvider, useReferenceInputController, ResourceContextProvider, } from 'ra-core';
import { AutocompleteInput } from './AutocompleteInput';
/**
 * An Input component for choosing a reference record. Useful for foreign keys.
 *
 * This component fetches the possible values in the reference resource
 * (using `dataProvider.getList()`), then renders an `<AutocompleteInput>`,
 * to which it passes the possible choices via a `ChoicesContext`.
 *
 * You can pass a child select component to customize the way the reference
 * selector is displayed (e.g. using `<SelectInput>` or `<RadioButtonGroupInput>`
 * instead of `<AutocompleteInput>`).
 *
 * @example // default selector: AutocompleteInput
 * export const CommentEdit = () => (
 *     <Edit>
 *         <SimpleForm>
 *             <ReferenceInput label="Post" source="post_id" reference="posts" />
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * @example // using a SelectInput as selector
 * export const CommentEdit = () => (
 *     <Edit>
 *         <SimpleForm>
 *             <ReferenceInput label="Post" source="post_id" reference="posts">
 *                 <SelectInput optionText="title" />
 *             </ReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceInput source="post_id" reference="posts" perPage={100}/>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      sort={{ field: 'title', order: 'ASC' }}
 * />
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filter={{ is_published: true }}
 * />
 *
 * The enclosed component may filter results. ReferenceInput create a ChoicesContext which provides
 * a `setFilters` function. You can call this function to filter the results.
 */
export const ReferenceInput = (props) => {
    const { children = defaultChildren, reference, sort = { field: 'id', order: 'DESC' }, filter = {}, } = props;
    const controllerProps = useReferenceInputController(Object.assign(Object.assign({}, props), { sort,
        filter }));
    if (props.validate && process.env.NODE_ENV !== 'production') {
        throw new Error('<ReferenceInput> does not accept a validate prop. Set the validate prop on the child instead.');
    }
    return (React.createElement(ResourceContextProvider, { value: reference },
        React.createElement(ChoicesContextProvider, { value: controllerProps }, children)));
};
ReferenceInput.propTypes = {
    children: PropTypes.element,
    filter: PropTypes.object,
    label: PropTypes.string,
    page: PropTypes.number,
    perPage: PropTypes.number,
    record: PropTypes.object,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.oneOf(['ASC', 'DESC']),
    }),
    source: PropTypes.string,
};
const defaultChildren = React.createElement(AutocompleteInput, null);
