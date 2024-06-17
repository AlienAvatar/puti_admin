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
import { useParams } from 'react-router-dom';
import { useGetOne, useRefresh } from 'ra-core';
//import { useTranslate } from '../i18n';
import { useRedirect } from 'ra-core';
import { useNotify } from 'ra-core';
import { useResourceContext, useGetResourceLabel, useGetRecordRepresentation, } from 'ra-core';
/**
 * Prepare data for the Show view.
 *
 * useShowController does a few things:
 * - it grabs the id from the URL and the resource name from the ResourceContext,
 * - it fetches the record via useGetOne,
 * - it prepares the page title.
 *
 * @param {Object} props The props passed to the Show component.
 *
 * @return {Object} controllerProps Fetched data and callbacks for the Show view
 *
 * @example
 *
 * import { useShowController } from 'react-admin';
 * import ShowView from './ShowView';
 *
 * const MyShow = () => {
 *     const controllerProps = useShowController();
 *     return <ShowView {...controllerProps} />;
 * };
 *
 * @example // useShowController can also take its parameters from props
 *
 * import { useShowController } from 'react-admin';
 * import ShowView from './ShowView';
 *
 * const MyShow = () => {
 *     const controllerProps = useShowController({ resource: 'posts', id: 1234 });
 *     return <ShowView {...controllerProps} />;
 * };
 */
export const useShowController = (props = {}) => {
    const { num: propsNum, queryOptions = {} } = props;
    //useAuthenticated({ enabled: !disableAuthentication });
    const resource = useResourceContext(props);
    const getRecordRepresentation = useGetRecordRepresentation(resource);
    //const translate = useTranslate();
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    const { num: routeId } = useParams();
    const num = propsNum != null ? propsNum : decodeURIComponent(routeId);
    const { meta } = queryOptions, otherQueryOptions = __rest(queryOptions, ["meta"]);
    const { data: record, error, isLoading, isFetching, refetch } = useGetOne(resource, { id: num, meta }, Object.assign({ onError: () => {
            notify('ra.notification.item_doesnt_exist', {
                type: 'error',
            });
            redirect('list', resource);
            refresh();
        }, retry: false }, otherQueryOptions));
    // eslint-disable-next-line eqeqeq
    if (record && record.num && record.num != num) {
        throw new Error(`useShowController: Fetched record's id attribute (${record.id}) must match the requested 'id' (${id})`);
    }
    const getResourceLabel = useGetResourceLabel();
    const recordRepresentation = getRecordRepresentation(record);
    // const defaultTitle = translate('ra.page.show', {
    //     name: getResourceLabel(resource, 1),
    //     id,
    //     record,
    //     recordRepresentation:
    //         typeof recordRepresentation === 'string'
    //             ? recordRepresentation
    //             : '',
    // });
    return {
        "defaultTitle": "Show",
        error,
        isLoading,
        isFetching,
        record,
        refetch,
        resource,
    };
};
