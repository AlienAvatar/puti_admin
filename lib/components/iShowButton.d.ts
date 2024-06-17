import * as React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RaRecord } from 'ra-core';
import { ButtonProps } from 'ra-ui-materialui';
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
export declare const ShowButton: {
    <RecordType extends RaRecord<import("ra-core").Identifier> = any>(props: ShowButtonProps<RecordType>): React.JSX.Element;
    propTypes: {
        icon: PropTypes.Requireable<PropTypes.ReactElementLike>;
        label: PropTypes.Requireable<string>;
        record: PropTypes.Requireable<any>;
        scrollToTop: PropTypes.Requireable<boolean>;
    };
};
interface Props<RecordType extends RaRecord = any> {
    icon?: ReactElement;
    label?: string;
    record?: RecordType;
    resource?: string;
    scrollToTop?: boolean;
}
export type ShowButtonProps<RecordType extends RaRecord = any> = Props<RecordType> & Omit<ButtonProps<typeof Link>, 'to'>;
declare const PureShowButton: React.MemoExoticComponent<{
    <RecordType extends RaRecord<import("ra-core").Identifier> = any>(props: ShowButtonProps<RecordType>): React.JSX.Element;
    propTypes: {
        icon: PropTypes.Requireable<PropTypes.ReactElementLike>;
        label: PropTypes.Requireable<string>;
        record: PropTypes.Requireable<any>;
        scrollToTop: PropTypes.Requireable<boolean>;
    };
}>;
export default PureShowButton;
