import * as React from 'react';
import PropTypes from 'prop-types';
declare const PostQuickCreateCancelButton: {
    ({ onClick, label, }: {
        onClick: any;
        label?: string;
    }): React.JSX.Element;
    propTypes: {
        label: PropTypes.Requireable<string>;
        onClick: PropTypes.Validator<(...args: any[]) => any>;
    };
};
export default PostQuickCreateCancelButton;
