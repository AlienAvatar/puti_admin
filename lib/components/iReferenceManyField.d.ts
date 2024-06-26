import React, { FC, ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { FilterPayload, SortPayload, ListControllerResult, RaRecord } from 'ra-core';
import { FieldProps } from 'ra-ui-materialui';
type SortOrder = 'ASC' | 'DESC';
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
export declare const ReferenceManyField: {
    <RecordType extends RaRecord<import("ra-core").Identifier> = RaRecord<import("ra-core").Identifier>, ReferenceRecordType extends RaRecord<import("ra-core").Identifier> = RaRecord<import("ra-core").Identifier>>(props: ReferenceManyFieldProps<RecordType>): React.JSX.Element;
    propTypes: {
        children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        className: PropTypes.Requireable<string>;
        filter: PropTypes.Requireable<object>;
        label: PropTypes.Requireable<NonNullable<string | boolean | PropTypes.ReactElementLike>>;
        perPage: PropTypes.Requireable<number>;
        record: PropTypes.Requireable<any>;
        reference: PropTypes.Validator<string>;
        resource: PropTypes.Requireable<string>;
        sortBy: PropTypes.Requireable<string>;
        sortByOrder: PropTypes.Requireable<SortOrder>;
        source: PropTypes.Requireable<string>;
        sort: PropTypes.Requireable<Required<PropTypes.InferProps<{
            field: PropTypes.Requireable<string>;
            order: PropTypes.Requireable<"DESC" | "ASC">;
        }>>>;
        target: PropTypes.Validator<string>;
    };
};
export interface ReferenceManyFieldProps<RecordType extends Record<string, any> = Record<string, any>> extends FieldProps<RecordType> {
    children: ReactNode;
    debounce?: number;
    filter?: FilterPayload;
    page?: number;
    pagination?: ReactElement;
    perPage?: number;
    reference: string;
    sort?: SortPayload;
    target: string;
}
export declare const ReferenceManyFieldView: FC<ReferenceManyFieldViewProps>;
export interface ReferenceManyFieldViewProps extends Omit<ReferenceManyFieldProps, 'resource' | 'page' | 'perPage' | 'sort'>, ListControllerResult {
    children: ReactElement;
}
export {};
