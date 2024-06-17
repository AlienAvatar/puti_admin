import * as React from 'react';
import PropTypes from 'prop-types';
import { Identifier } from 'react-admin';
declare const UserEditEmbedded: {
    ({ id }: {
        id?: Identifier;
    }): React.JSX.Element;
    propTypes: {
        record: PropTypes.Requireable<object>;
        resource: PropTypes.Requireable<string>;
        id: PropTypes.Requireable<string>;
    };
};
export default UserEditEmbedded;
