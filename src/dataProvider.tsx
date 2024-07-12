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

export let user_page_context = createContext(null);
export let article_page_context = createContext(null);
export let comment_page_context = createContext(null);
export let upload_img_url = "unknown";
// axios.defaults.headers.post['Content-Type'] = 'application/json';
const dataProvider = {

    getList: async (resource, params) => {
        console.log('getList');

        let limit = params.pagination.perPage;
        let page = params.pagination.page;
        if(resource === 'articles'){
            let list_url = `${config.PATH_ARTICLE_LIST}`;
            let param_arr = [];
            if (params.filter.title) {
                param_arr.push(`title=${params.filter.title}`);
            }

            if (params.filter.author) {
                param_arr.push(`author=${params.filter.author}`);
            }

            if (params.filter.is_delete) {
                param_arr.push(`is_delete=${params.filter.is_delete}`);
            }
            param_arr.push(`page=${page}`);
            param_arr.push(`limit=${limit}`);

            if (param_arr.length > 0) {
                list_url += `?${param_arr.join('&')}`;
            }
        
            const token = localStorage.getItem('token');
            const result = await axios.get(list_url, {
                headers: {
                    'token': token,
                },
            });
            
            if(result != null && result.data.status == "success"){
                return { 
                    data: result.data.articles,
                    pageInfo: { page: 1, perPage: 10 },
                };
            }else{
                window.location.hash = "/login";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }else if(resource === 'comments'){
            let list_url = `${config.PATH_COMMENT_LIST}`;
            let param_arr = [];
            if (params.filter.article_id) {
                param_arr.push(`article_id=${params.filter.article_id}`);
            }

            if (params.filter.author) {
                param_arr.push(`author=${params.filter.author}`);
            }

            if (params.filter.is_delete) {
                param_arr.push(`is_delete=${params.filter.is_delete}`);
            }
            param_arr.push(`page=${page}`);
            param_arr.push(`limit=${limit}`);

            if (param_arr.length > 0) {
                list_url += `?${param_arr.join('&')}`;
            }
            console.log(list_url);
            const token = localStorage.getItem('token');
            const result = await axios.get(list_url, {
                headers: {
                    'token': token,
                },
            })

            if(result != null && result.data.status == "success"){
                return { 
                    data: result.data.comments
                };
            }else{
                window.location.hash = "/login";
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
                
        }else if(resource === 'users'){
            let list_url = `${config.PATH_USER_LIST}`;
            let param_arr = [];

            if (params.filter.username) {
                param_arr.push(`username=${params.filter.username}`);
            }

            if (params.filter.nickname) {
                param_arr.push(`nickname=${params.filter.nickname}`);
            }

            if (params.filter.is_delete) {
                param_arr.push(`is_delete=${params.filter.is_delete}`);
            }

            if (params.pagination.page) {
                param_arr.push(`page=${params.pagination.page}`);
            }

            if (params.pagination.perPage) {
                param_arr.push(`limit=${params.pagination.perPage}`);
            }

            if (param_arr.length > 0) {
                list_url += `?${param_arr.join('&')}`;
            }
            
            console.log('list_url', list_url);
            const token = localStorage.getItem('token');
            const result = await axios.get(list_url, {
                headers: {
                    'token': token,
                },
            })
            
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
                return { 
                    data: result.data.data.article.data.article,
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
                return { 
                    data: result.data.comments,
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
        }else if(resource === 'articles'){
            const token = localStorage.getItem('token');
            const upload_img_url = localStorage.getItem('upload_img_url');
            axios.defaults.headers['token'] = token;
            axios.defaults.headers['Content-Type'] = 'application/json';
            const result = await axios.post(config.PATH_ARTICLE_CREATE, {
                'title': params.data.title,
                'author': params.data.author,
                'content': params.data.content,
                'category': params.data.category,
                'cover_img': upload_img_url
            });

            if(result != null && result.data.status == "success"){
                window.location.hash = "/articles";
                return { 
                    data: result.data.data.article,
                    pageInfo: { page: 1, perPage: 10 },
                };
            }else{
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }else if(resource === 'upload'){
            const formData = new FormData();
            params.data.cover_img_file?.rawFile && formData.append("file", params.data.cover_img_file.rawFile);
            params.data.title && formData.append("title", params.data.title);
            params.data.content && formData.append("content", params.data.content);

            const token = localStorage.getItem('token');
            axios.defaults.headers['token'] = token;
            axios.defaults.headers['Content-Type'] = 'multipart/form-data';
            const result = await axios.post(config.PATH_ARTICLE_UPLOAD_IMG, formData);
            if(result != null && result.data.status == "success"){
                localStorage.setItem('upload_img_url', result.data.message);
                return { 
                    data: {
                        id: 1,
                        msg: result.data.message,   
                    }
                };
            }else{
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
                'support_count': params.data.support_count
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
        }else if(resource === 'articles'){
            const token = localStorage.getItem('token');
            let id = params.id;
            let update_url = `${config.PATH_ARTICLE_UPDATE}${id}`;
            axios.defaults.headers['token'] = token;
            const result = await axios.post(update_url, {
                'title': params.data.title,
                'author': params.data.author,
                'content': params.data.content,
                'category': params.data.category,
                'support_count' : params.data.support_count,
                'views_count': params.data.views_count,
            });

            if(result != null && result.data.status == "success"){
                window.location.hash = "/articles";
                return { 
                    data: {
                        id: result.data.data.article.id,
                    } 
                };
            }else{
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }else if(resource === 'password'){
            const token = localStorage.getItem('token');
            let old_password = params.data.old_password;
            let new_password = params.data.new_password;
            let username = params.data.username;

            let update_url = `${config.PATH_USER_UPDATE_PWD}${username}`;
            axios.defaults.headers['token'] = token;
            const result = await axios.post(update_url, {
                'old_password': old_password,
                'new_password': new_password,
            });

            if(result.data.status == "success"){
                if(result.data.code === 200){
                    window.location.hash = "/users";
                    return {
                        data: {
                            id: result.data.data.user.id,
                        } 
                    };
                }else{

                    return {
                        data: {
                            id: result.data.data.user.id,
                        } 
                    };
                }
            }else{
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }
    },

    delete: async (resource, params) => {
        console.log('delete');
        if(resource === 'comments'){
            const token = localStorage.getItem('token');

            let id = params.id;
            let delete_url = `${config.PATH_COMMENT_DELETE}${id}`;
            axios.defaults.headers['token'] = token;
            const result = await axios.post(delete_url, {
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
            let delete_url = `${config.PATH_USER_DELETE}${id}`;
            axios.defaults.headers['token'] = token;
            const result = await axios.post(delete_url, {
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
        }else if(resource === 'articles'){
            const token = localStorage.getItem('token');
            let id = params.id;
            let delete_url = `${config.PATH_ARTICLE_DELETE}${id}`;
            axios.defaults.headers['token'] = token;
            const result = await axios.post(delete_url, {});
            if(result != null && result.data.status == "success"){
                window.location.hash = "/articles";
                return { 
                    data: {
                        message: result.data.message,
                    } 
                }
            }
        }
    },
    deleteMany: async (resource, params) => {
        console.log('deleteMany');
        const token = localStorage.getItem('token');
        if(resource === 'comments'){

        }else if(resource === 'users'){
            let ids = params.ids;
            const queryParams = ids.map((id, index) => `id${index}=${id}`);
            const queryString = queryParams.join('&');
            let delete_many_url = `${config.PATH_USER_DELETE_MANY}?${queryString}`;
            axios.defaults.headers['token'] = token;

            const result = await axios.post(delete_many_url, {
            });
            if(result.data.status == "success"){
                window.location.hash = "/users";
                return {
                    //data的需要个数组
                    data: []
                };
                
            }else{
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        }else if(resource === 'articles'){
            let ids = params.ids;
            const queryParams = ids.map((id, index) => `id${index}=${id}`);
            const queryString = queryParams.join('&');
            let delete_many_url = `${config.PATH_ARTICLE_DELETE_MANY}?${queryString}`;
            axios.defaults.headers['token'] = token;
            console.log('delete_many_url',delete_many_url);

            const result = await axios.post(delete_many_url, {
            });
            if(result.data.status == "success"){
                window.location.hash = "/articles";
                return {
                    data: []
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
