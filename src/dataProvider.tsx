import fakeRestProvider from 'ra-data-fakerest';
import { DataProvider, withLifecycleCallbacks, HttpError } from 'react-admin';
import get from 'lodash/get';
//import data from './data';
import addUploadFeature from './addUploadFeature';
import simpleRestProvider from 'ra-data-simple-rest';
import axios from 'axios';
import * as config from "./config";
import { useContext,createContext } from 'react';
import { useGetOne, useRefresh, UseGetOneHookValue } from 'ra-core';
import {getParameterFromUrl} from './utils';

export let article_data_context = createContext(null);
export let comment_data_context = createContext(null);
const dataProvider = {
    getList: async (resource, params) => {
        console.log('getList');
        if(resource === 'articles'){
            const token = localStorage.getItem('token');
            const result = await axios.get(config.PATH_ARTICLE_LIST, {
                headers: {
                    'token': token,
                },
            });
            
            if(result != null && result.data.status == "success"){
                article_data_context = result.data.articles;

                // let data_list = [];
                // let res_list = result.data.articles;
                // res_list.forEach(element => {
                //     let item = {};
                //     item['id'] = element.num;
                //     item['title'] = element.title;
                //     item['content'] = element.content;
                //     item['author'] = element.author;
                //     data_list.push(item);
                // });

                return { 
                    data: result.data.articles,
                    pageInfo: { page: 1, perPage: 10 },
                };
            }else{
                window.location.hash = "/login";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }else if(resource === 'comments'){
            {
                resource:'comments'
                let get_url = `${config.PATH_COMMENT_LIST}`;
                const token = localStorage.getItem('token');
                const result = await axios.get(get_url, {
                    headers: {
                        'token': token,
                    },
                })

                if(result != null && result.data.status == "success"){
                    comment_data_context = result.data.comments;
                    return { 
                        data: comment_data_context
                    };
                }else{
                    window.location.hash = "/login";
                    return new Promise((resolve, reject) => setTimeout(reject, 1000));
                }
            }
                
        }else if(resource === 'users'){
            const token = localStorage.getItem('token');
            const result = await axios.get(config.PATH_USER_LIST, {
                headers: {
                    'token': token,
                },
            });
            
            if(result != null && result.data.status == "success"){
                return { 
                    data: result.data.users,
                    pageInfo: { page: 1, perPage: 10 },
                };
            }else{
                window.location.hash = "/login";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }
    },

    getOne: async (resource, params) => {
        console.log('getOne');
        if(resource === 'articles'){
            const num = params.id;

            const token = localStorage.getItem('token');
            let get_url = `${config.PATH_ARTICLE_GET}${num}`;

            const result = await axios.get(get_url, {
                headers: {
                    'token': token,
                },
            })

            if(result != null && result.data.status == "success"){
                article_data_context = result.data.data.article;
                return { 
                    data: result.data.data.article,
                };
            }else{
                window.location.hash = "/login";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }else if(resource === 'comments'){
            const num = params.id;

            const token = localStorage.getItem('token');
            let get_url = `${config.PATH_COMMENT_GET}${num}`;

            const result = await axios.get(get_url, {
                headers: {
                    'token': token,
                },
            })

            if(result != null && result.data.status == "success"){
                comment_data_context = result.data.data.comment;
                return { 
                    data: result.data.data.comment,
                };
            }else{
                window.location.hash = "/login";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }else if(resource === 'users'){
            const id = params.id;
            const token = localStorage.getItem('token');
            let get_url = `${config.PATH_USER_GET_ID}${id}`;

            const result = await axios.get(get_url, {
                headers: {
                    'token': token,
                },
            })

            if(result != null && result.data.status == "success"){
                return { 
                    data: result.data.data.user,
                };
            }else{
                window.location.hash = "/login";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }
    },

    getManyReference: async (resource, params) => {
        console.log('getManyReference');
        if(resource === 'articles'){

        }else if(resource === 'comments'){
            const num = params.id;

            let get_url = `${config.PATH_COMMENT_LIST_BY_NUM}${num}`;
            const token = localStorage.getItem('token');
            const result = await axios.get(get_url, {
                headers: {
                    'token': token,
                },
            })
    
            if(result != null && result.data.status == "success" ){
                comment_data_context = result.data.comments;
                return { 
                    data: comment_data_context,
                    total: result.data.results
                };
            }else{
                window.location.hash = "/articles";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }
    },

    getMany: async (resource, params) => {
        console.log('getMany');
        if(resource === 'articles'){
            const num = params.ids[0];

            let get_url = `${config.PATH_ARTICLE_GET}${num}`;
            const token = localStorage.getItem('token');
            const result = await axios.get(get_url, {
                headers: {
                    'token': token,
                },
            })
    
            if(result != null && result.data.status == "success" ){
                let res_data = [];
                res_data.push(result.data.data.article)
                return { 
                    data: res_data,
                    total: result.data.results
                };
            }else{
                window.location.hash = "/articles";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }else if(resource === 'comments'){
            console.log('To do');
        }
    },

    create: async (resource, params) => {
        if(resource === 'comments'){
            const token = localStorage.getItem('token');

            axios.defaults.headers['token'] = token;
            const result = await axios.post(config.PATH_COMMENT_CREATE, {
                'article_id': params.data.article_id,
                'author': params.data.author,
                'content': params.data.content
            });
            if(result.data.status == "success"){
                console.log(result.data.data.comment);
                
                return {
                    data: {
                        id: result.data.data.comment.id,
                    } 
                };
                
            }else{
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }else if(resource === 'users'){
            const token = localStorage.getItem('token');
            axios.defaults.headers['token'] = token;
            const result = await axios.post(config.PATH_USER_CREATE, {
                'username': params.data.username,
                'password': params.data.password,
                'nickname': params.data.nickname,
                'email': params.data.email,
                'avatar':'avatar.png'
            });
            
            if(result != null && result.data.status == "success"){
                window.location.hash = "/user";
                return { 
                    data: result.data.data.user,
                    pageInfo: { page: 1, perPage: 10 },
                };
            }else{
                window.location.hash = "/login";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }
    },

    update: async (resource, params) => {
        if(resource === 'comments'){
            const token = localStorage.getItem('token');

            let id = params.id;
            let update_url = `${config.PATH_COMMENT_UPDATE}${id}`;
            axios.defaults.headers['token'] = token;
            const result = await axios.post(update_url, {
                'article_id': params.data.article_id,
                'author': params.data.author,
                'content': params.data.content,
                'good_count': params.data.good_count
            });
            if(result.data.status == "success"){
                window.location.hash = "/comments";
                return {
                    data: {
                        id: result.data.data.comment.id,
                    } 
                };
                
            }else{
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }else if(resource === 'users'){
            const token = localStorage.getItem('token');
            let username = params.data.username;
            let update_url = `${config.PATH_USER_UPDATE}${username}`;
            axios.defaults.headers['token'] = token;
            const result = await axios.post(update_url, {
                'username': params.data.username,
                'nickname': params.data.nickname,
                'email': params.data.email,
            });

            if(result.data.status == "success"){
                window.location.hash = "/users";
                return {
                    data: {
                        id: result.data.data.user.id,
                    } 
                };
                
            }else{
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }
    },

    delete: async (resource, params) => {
        if(resource === 'comments'){
            const token = localStorage.getItem('token');

            let id = params.id;
            let update_url = `${config.PATH_COMMENT_DELETE}${id}`;
            axios.defaults.headers['token'] = token;
            const result = await axios.post(update_url, {
            });
            if(result.data.status == "success"){
                window.location.hash = "/comments";
                return {
                    data: {
                        message: result.data.message,
                    } 
                };
                
            }else{
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }else if(resource === 'users'){
            const token = localStorage.getItem('token');

            let id = params.id;
            let update_url = `${config.PATH_USER_DELETE}${id}`;
            axios.defaults.headers['token'] = token;
            const result = await axios.post(update_url, {
            });
            if(result.data.status == "success"){
                window.location.hash = "/comments";
                return {
                    data: {
                        message: result.data.message,
                    } 
                };
                
            }else{
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }
    },

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
const addTagsSearchSupport = (dataProvider: any) => ({
    ...dataProvider,
    getList: (resource, params) => {
        if (resource === 'comments') {
            // partial pagination
            return dataProvider
                .getList(resource, params)
                .then(({ data, total }) => ({
                    data,
                    pageInfo: {
                        hasNextPage:
                            params.pagination.perPage * params.pagination.page <
                            total,
                        hasPreviousPage: params.pagination.page > 1,
                    },
                }));
        }
        if (resource === 'tags') {
            const matchSearchFilter = Object.keys(params.filter).find(key =>
                key.endsWith('_q')
            );
            if (matchSearchFilter) {
                const searchRegExp = new RegExp(
                    params.filter[matchSearchFilter],
                    'i'
                );

                return dataProvider.getList(resource, {
                    ...params,
                    filter: item => {
                        const matchPublished =
                            item.published == params.filter.published; // eslint-disable-line eqeqeq

                        const fieldName = matchSearchFilter.replace(
                            /(_q)$/,
                            ''
                        );
                        return (
                            matchPublished &&
                            get(item, fieldName).match(searchRegExp) !== null
                        );
                    },
                });
            }
        }

        return dataProvider.getList(resource, params);
    },

    // getOne: (resource, params) => {
    //     debugger;
    //     let res_single_data = {};
    //     if (resource === 'articles') {
    //         return ({ data_list }) =>{
    //             data_list.map((item) => {
    //                 console.log(item);
    //                 if (item.num === params.id) {
    //                     return item;
    //                 }
    //             })
    //         };
    //     }

    //     console.log(res_single_data);
    //     return res_single_data;
    // },

});

const uploadCapableDataProvider = addUploadFeature(
    addTagsSearchSupport(dataProvider)
);

const sometimesFailsDataProvider = new Proxy(uploadCapableDataProvider, {
    get: (target, name) => (resource, params) => {
        if (typeof name === 'symbol' || name === 'then') {
            return;
        }
        // set session_ended=true in localStorage to trigger an API auth error
        if (localStorage.getItem('session_ended')) {
            const error = new Error('Session ended') as ResponseError;
            error.status = 403;
            return Promise.reject(error);
        }
        // add rejection by type or resource here for tests, e.g.
        // if (name === 'delete' && resource === 'posts') {
        //     return Promise.reject(new Error('deletion error'));
        // }
        if (
            resource === 'posts' &&
            params.data &&
            params.data.title === 'f00bar'
        ) {
            return Promise.reject(
                new HttpError('The form is invalid', 400, {
                    errors: {
                        title: 'this title cannot be used',
                    },
                })
            );
        }
        return uploadCapableDataProvider[name](resource, params);
    },
});

const delayedDataProvider = new Proxy(sometimesFailsDataProvider, {
    get: (target, name) => (resource, params) => {
        if (typeof name === 'symbol' || name === 'then') {
            return;
        }
        return new Promise(resolve =>
            setTimeout(
                () =>
                    resolve(sometimesFailsDataProvider[name](resource, params)),
                300
            )
        );
    },
});

interface ResponseError extends Error {
    status?: number;
}

export default delayedDataProvider;
