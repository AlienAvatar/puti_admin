const SERVER_ADDR = 'http://localhost:10001/api/';

//article
const ARTICLE = 'article/'
export const PATH_ARTICLE_LIST = SERVER_ADDR + ARTICLE + 'list/';
export const PATH_ARTICLE_CREATE = SERVER_ADDR + ARTICLE + 'create/';
export const PATH_ARTICLE_UPDATE = SERVER_ADDR + ARTICLE + 'update/';
export const PATH_ARTICLE_GET = SERVER_ADDR + ARTICLE + 'get/';
export const PATH_ARTICLE_DELETE = SERVER_ADDR + ARTICLE + 'delete/';
export const PATH_ARTICLE_DELETE_MANY = SERVER_ADDR + ARTICLE + 'delete_many/';

//comment
const COMMENT = 'comment/'
export const PATH_COMMENT_LIST = SERVER_ADDR + COMMENT + 'list/';
export const PATH_COMMENT_LIST_BY_NUM = SERVER_ADDR + COMMENT + 'list/';
export const PATH_COMMENT_CREATE = SERVER_ADDR + COMMENT + 'create/';
export const PATH_COMMENT_GET = SERVER_ADDR + COMMENT + 'get/';
export const PATH_COMMENT_UPDATE = SERVER_ADDR + COMMENT + 'update/';
export const PATH_COMMENT_DELETE = SERVER_ADDR + COMMENT + 'delete/';

//user
const USER = 'user/'
export const PATH_VALID_USER = SERVER_ADDR + USER + 'login/';
export const PATH_USER_LIST = SERVER_ADDR + USER + 'list/';
export const PATH_USER_CREATE = SERVER_ADDR + USER + 'create/';
export const PATH_USER_GET_USERNAME = SERVER_ADDR + USER + 'get_username/';
export const PATH_USER_GET_ID = SERVER_ADDR + USER + 'get_id/';
export const PATH_USER_UPDATE = SERVER_ADDR + USER + 'update/';
export const PATH_USER_DELETE = SERVER_ADDR + USER + 'delete/';
export const PATH_USER_DELETE_MANY = SERVER_ADDR + USER + 'delete_many/';
