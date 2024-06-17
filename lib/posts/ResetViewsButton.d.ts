import * as React from 'react';
import PropTypes from 'prop-types';
declare const ResetViewsButton: {
    ({ resource, selectedIds }: {
        resource: any;
        selectedIds: any;
    }): React.JSX.Element;
    propTypes: {
        label: PropTypes.Requireable<string>;
        resource: PropTypes.Validator<string>;
        selectedIds: PropTypes.Validator<any[]>;
    };
};
export default ResetViewsButton;
