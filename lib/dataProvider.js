var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HttpError } from 'react-admin';
import get from 'lodash/get';
//import data from './data';
import addUploadFeature from './addUploadFeature';
import axios from 'axios';
import * as config from "./config";
import { createContext } from 'react';
export let article_data_context = createContext(null);
export let comment_data_context = createContext(null);
const dataProvider = {
    getList: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('getList');
        if (resource === 'articles') {
            resource: 'articles';
            const token = localStorage.getItem('token');
            const result = yield axios.get(config.PATH_ARTICLE_LIST, {
                headers: {
                    'token': token,
                },
            });
            console.log(result);
            if (result != null && result.data.status == "success") {
                article_data_context = result.data.articles;
                return {
                    data: article_data_context,
                    pageInfo: { page: 1, perPage: 10 },
                };
            }
            else {
                window.location.href = "/login";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }
        else if (resource === 'comments') {
            {
                resource: 'comments';
                let get_url = `${config.PATH_COMMENT_LIST}`;
                const token = localStorage.getItem('token');
                const result = yield axios.get(get_url, {
                    headers: {
                        'token': token,
                    },
                });
                if (result != null && result.data.status == "success") {
                    comment_data_context = result.data.comments;
                    return {
                        data: comment_data_context
                    };
                }
                else {
                    window.location.href = "/login";
                    return new Promise((resolve, reject) => setTimeout(reject, 1000));
                }
            }
        }
    }),
    getOne: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('getOne');
        const num = params.id;
        const token = localStorage.getItem('token');
        let get_url = `${config.PATH_ARTICLE_GET}${num}`;
        const result = yield axios.get(get_url, {
            headers: {
                'token': token,
            },
        });
        if (result != null && result.data.status == "success") {
            article_data_context = result.data.data.article;
            return {
                data: article_data_context,
            };
        }
        else {
            window.location.href = "/login";
            return new Promise((resolve, reject) => setTimeout(reject, 1000));
        }
    }),
    getManyReference: (resource, params) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('getManyReference');
        {
            resource: 'comments';
            const num = params.id;
            let get_url = `${config.PATH_COMMENT_LIST_BY_NUM}${num}`;
            const token = localStorage.getItem('token');
            const result = yield axios.get(get_url, {
                headers: {
                    'token': token,
                },
            });
            if (result != null && result.data.status == "success") {
                comment_data_context = result.data.comments;
                return {
                    data: comment_data_context,
                    total: result.data.results
                };
            }
            else {
                window.location.href = "/articles";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }
    })
};
// const articleProvider = withLifecycleCallbacks(fakeRestProvider(data, true), [
//     {
//         resource: 'posts',
//         beforeDelete: async ({ id }, dp) => {
//             // delete related comments
//             const { data: comments } = await dp.getList('comments', {
//                 filter: { post_id: id },
//                 pagination: { page: 1, perPage: 100 },
//                 sort: { field: 'id', order: 'DESC' },
//             });
//             await dp.deleteMany('comments', {
//                 ids: comments.map(comment => comment.id),
//             });
//             return { id };
//         },
//         afterGetMany: async (result, dataProvider) => {
//             // 根据实际需求进行异步操作，并返回 Promise<GetManyResult<any>> 类型的结果
//             // 这里仅作示例，直接返回原结果
//             return result;
//         },
//     },
//     // {
//     //     resource: 'comments',
//     //     beforeDelete: async ({ id }, dp) => {
//     //         // delete related comments
//     //         const { data: comments } = await dp.getList('comments', {
//     //             filter: { post_id: id },
//     //             pagination: { page: 1, perPage: 100 },
//     //             sort: { field: 'id', order: 'DESC' },
//     //         });
//     //         await dp.deleteMany('comments', {
//     //             ids: comments.map(comment => comment.id),
//     //         });
//     //         return { id };
//     //     }
//     // },
// ]);
/**
 * 为数据提供者添加标签搜索支持
 *
 * @param dataProvider 数据提供者对象
 * @returns 返回增强后的数据提供者对象
 */
const addTagsSearchSupport = (dataProvider) => (Object.assign(Object.assign({}, dataProvider), { getList: (resource, params) => {
        if (resource === 'comments') {
            // partial pagination
            return dataProvider
                .getList(resource, params)
                .then(({ data, total }) => ({
                data,
                pageInfo: {
                    hasNextPage: params.pagination.perPage * params.pagination.page <
                        total,
                    hasPreviousPage: params.pagination.page > 1,
                },
            }));
        }
        if (resource === 'tags') {
            const matchSearchFilter = Object.keys(params.filter).find(key => key.endsWith('_q'));
            if (matchSearchFilter) {
                const searchRegExp = new RegExp(params.filter[matchSearchFilter], 'i');
                return dataProvider.getList(resource, Object.assign(Object.assign({}, params), { filter: item => {
                        const matchPublished = item.published == params.filter.published; // eslint-disable-line eqeqeq
                        const fieldName = matchSearchFilter.replace(/(_q)$/, '');
                        return (matchPublished &&
                            get(item, fieldName).match(searchRegExp) !== null);
                    } }));
            }
        }
        return dataProvider.getList(resource, params);
    } }));
const uploadCapableDataProvider = addUploadFeature(addTagsSearchSupport(dataProvider));
const sometimesFailsDataProvider = new Proxy(uploadCapableDataProvider, {
    get: (target, name) => (resource, params) => {
        if (typeof name === 'symbol' || name === 'then') {
            return;
        }
        // set session_ended=true in localStorage to trigger an API auth error
        if (localStorage.getItem('session_ended')) {
            const error = new Error('Session ended');
            error.status = 403;
            return Promise.reject(error);
        }
        // add rejection by type or resource here for tests, e.g.
        // if (name === 'delete' && resource === 'posts') {
        //     return Promise.reject(new Error('deletion error'));
        // }
        if (resource === 'posts' &&
            params.data &&
            params.data.title === 'f00bar') {
            return Promise.reject(new HttpError('The form is invalid', 400, {
                errors: {
                    title: 'this title cannot be used',
                },
            }));
        }
        return uploadCapableDataProvider[name](resource, params);
    },
});
const delayedDataProvider = new Proxy(sometimesFailsDataProvider, {
    get: (target, name) => (resource, params) => {
        if (typeof name === 'symbol' || name === 'then') {
            return;
        }
        return new Promise(resolve => setTimeout(() => resolve(sometimesFailsDataProvider[name](resource, params)), 300));
    },
});
export default delayedDataProvider;
