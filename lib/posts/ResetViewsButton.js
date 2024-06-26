import * as React from 'react';
import PropTypes from 'prop-types';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useUpdateMany, useNotify, useUnselectAll, Button } from 'react-admin';
const ResetViewsButton = ({ resource, selectedIds }) => {
    const notify = useNotify();
    const unselectAll = useUnselectAll(resource);
    const [updateMany, { isLoading }] = useUpdateMany(resource, { ids: selectedIds, data: { views: 0 } }, {
        onSuccess: () => {
            notify('ra.notification.updated', {
                type: 'info',
                messageArgs: { smart_count: selectedIds.length },
                undoable: true,
            });
            unselectAll();
        },
        onError: (error) => notify(typeof error === 'string'
            ? error
            : error.message || 'ra.notification.http_error', { type: 'error' }),
        mutationMode: 'undoable',
    });
    return (React.createElement(Button, { label: "simple.action.resetViews", disabled: isLoading, onClick: () => updateMany() },
        React.createElement(VisibilityOff, null)));
};
ResetViewsButton.propTypes = {
    label: PropTypes.string,
    resource: PropTypes.string.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default ResetViewsButton;
