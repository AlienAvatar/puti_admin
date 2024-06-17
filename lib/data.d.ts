declare const test_data: {
    articles: {
        id: number;
        title: string;
        teaser: string;
    }[];
    posts: ({
        id: number;
        title: string;
        teaser: string;
        body: string;
        views: number;
        average_note: number;
        commentable: boolean;
        pictures: ({
            name: string;
            url: string;
            metas: {
                title: string;
                definitions: string[];
                authors: {
                    name: string;
                    email: string;
                }[];
            };
        } | {
            name: string;
            url: string;
            metas?: undefined;
        })[];
        published_at: Date;
        tags: number[];
        category: string;
        subcategory: string;
        backlinks: {
            date: string;
            url: string;
        }[];
        notifications: number[];
    } | {
        id: number;
        title: string;
        teaser: string;
        body: string;
        views: number;
        average_note: number;
        commentable: boolean;
        published_at: Date;
        tags: number[];
        category: string;
        backlinks: any[];
        notifications: any[];
        pictures?: undefined;
        subcategory?: undefined;
    } | {
        id: number;
        title: string;
        teaser: string;
        body: string;
        views: number;
        commentable: boolean;
        published_at: Date;
        tags: number[];
        category: string;
        backlinks: {
            date: string;
            url: string;
        }[];
        notifications: number[];
        average_note?: undefined;
        pictures?: undefined;
        subcategory?: undefined;
    } | {
        id: number;
        title: string;
        teaser: string;
        body: string;
        views: number;
        average_note: number;
        published_at: Date;
        tags: number[];
        category: string;
        notifications: number[];
        commentable?: undefined;
        pictures?: undefined;
        subcategory?: undefined;
        backlinks?: undefined;
    } | {
        id: number;
        title: string;
        teaser: string;
        body: string;
        views: number;
        average_note: number;
        commentable: boolean;
        published_at: Date;
        tags: number[];
        category: string;
        notifications: number[];
        pictures?: undefined;
        subcategory?: undefined;
        backlinks?: undefined;
    })[];
    comments: ({
        id: number;
        author: {
            name?: undefined;
            email?: undefined;
        };
        post_id: number;
        body: string;
        created_at: Date;
    } | {
        id: number;
        author: {
            name: string;
            email: string;
        };
        post_id: number;
        body: string;
        created_at: Date;
    } | {
        id: number;
        author: {
            name: string;
            email?: undefined;
        };
        post_id: number;
        body: string;
        created_at: Date;
    })[];
    tags: ({
        id: number;
        name: {
            en: string;
        };
        published: number;
        parent_id?: undefined;
    } | {
        id: number;
        name: {
            en: string;
        };
        published: boolean;
        parent_id?: undefined;
    } | {
        id: number;
        name: {
            en: string;
        };
        published: number;
        parent_id: number;
    })[];
    users: {
        id: number;
        name: string;
        role: string;
    }[];
};
export default test_data;
