export declare const messages: {
    resources: {
        posts: {
            name: string;
            fields: {
                commentable_short: string;
                commentable: string;
                notifications: string;
                nb_view: string;
                nb_comments: string;
                password: string;
                pictures: string;
            };
        };
        comments: {
            name: string;
            fields: {
                post_id: string;
            };
        };
        users: {
            name: string;
            fields: {
                name: string;
                role: string;
            };
        };
    };
    post: {
        list: {
            search: string;
        };
        form: {
            summary: string;
            body: string;
            miscellaneous: string;
            comments: string;
        };
        edit: {
            title: string;
        };
        action: {
            save_and_edit: string;
            save_and_add: string;
            save_and_show: string;
            save_with_average_note: string;
        };
    };
    comment: {
        list: {
            about: string;
        };
    };
    user: {
        list: {
            search: string;
        };
        form: {
            summary: string;
            security: string;
        };
        action: {
            save_and_add: string;
            save_and_show: string;
        };
    };
    ra: {
        action: {
            [key: string]: string | import("ra-core").StringMap;
            add_filter: string;
            add: string;
            back: string;
            bulk_actions: string;
            cancel: string;
            clear_array_input: string;
            clear_input_value: string;
            clone: string;
            confirm: string;
            create: string;
            create_item: string;
            delete: string;
            edit: string;
            export: string;
            list: string;
            refresh: string;
            remove_filter: string;
            remove_all_filters: string;
            remove: string;
            save: string;
            search: string;
            select_all: string;
            select_row: string;
            show: string;
            sort: string;
            undo: string;
            unselect: string;
            expand: string;
            close: string;
            open_menu: string;
            close_menu: string;
            update: string;
            move_up: string;
            move_down: string;
            open: string;
            toggle_theme: string;
            select_columns: string;
            update_application: string;
        };
        boolean: {
            [key: string]: string | import("ra-core").StringMap;
            true: string;
            false: string;
            null: string;
        };
        page: {
            [key: string]: string | import("ra-core").StringMap;
            create: string;
            dashboard: string;
            edit: string;
            error: string;
            list: string;
            loading: string;
            not_found: string;
            show: string;
            empty: string;
            invite: string;
        };
        input: {
            [key: string]: string | import("ra-core").StringMap;
            file: {
                [key: string]: string | import("ra-core").StringMap;
                upload_several: string;
                upload_single: string;
            };
            image: {
                [key: string]: string | import("ra-core").StringMap;
                upload_several: string;
                upload_single: string;
            };
            references: {
                [key: string]: string | import("ra-core").StringMap;
                all_missing: string;
                many_missing: string;
                single_missing: string;
            };
            password: {
                [key: string]: string | import("ra-core").StringMap;
                toggle_visible: string;
                toggle_hidden: string;
            };
        };
        message: {
            [key: string]: string | import("ra-core").StringMap;
            about: string;
            are_you_sure: string;
            auth_error: string;
            bulk_delete_content: string;
            bulk_delete_title: string;
            bulk_update_content: string;
            bulk_update_title: string;
            clear_array_input: string;
            delete_content: string;
            delete_title: string;
            details: string;
            error: string;
            invalid_form: string;
            loading: string;
            no: string;
            not_found: string;
            yes: string;
            unsaved_changes: string;
        };
        navigation: {
            [key: string]: string | import("ra-core").StringMap;
            no_results: string;
            no_more_results: string;
            page_out_of_boundaries: string;
            page_out_from_end: string;
            page_out_from_begin: string;
            page_range_info: string;
            partial_page_range_info: string;
            page_rows_per_page: string;
            current_page: string;
            page: string;
            first: string;
            last: string;
            next: string;
            previous: string;
            skip_nav: string;
        };
        sort: {
            sort_by: string;
            ASC: string;
            DESC: string;
        };
        auth: {
            [key: string]: string | import("ra-core").StringMap;
            auth_check_error: string;
            user_menu: string;
            username: string;
            password: string;
            sign_in: string;
            sign_in_error: string;
            logout: string;
        };
        notification: {
            [key: string]: string | import("ra-core").StringMap;
            updated: string;
            created: string;
            deleted: string;
            bad_item: string;
            item_doesnt_exist: string;
            http_error: string;
            data_provider_error: string;
            i18n_error: string;
            canceled: string;
            logged_out: string;
            not_authorized: string;
            application_update_available: string;
        };
        validation: {
            [key: string]: string | import("ra-core").StringMap;
            required: string;
            minLength: string;
            maxLength: string;
            minValue: string;
            maxValue: string;
            number: string;
            email: string;
            oneOf: string;
            regex: string;
        };
        saved_queries: {
            label: string;
            query_name: string;
            new_label: string;
            new_dialog_title: string;
            remove_label: string;
            remove_label_with_name: string;
            remove_dialog_title: string;
            remove_message: string;
            help: string;
        };
        configurable?: {
            customize: string;
            configureMode: string;
            inspector: {
                title: string;
                content: string;
                reset: string;
                hideAll: string;
                showAll: string;
            };
            Datagrid: {
                title: string;
                unlabeled: string;
            };
            SimpleForm: {
                title: string;
                unlabeled: string;
            };
            SimpleList: {
                title: string;
                primaryText: string;
                secondaryText: string;
                tertiaryText: string;
            };
        };
    };
    simple: {
        action: {
            close: string;
            resetViews: string;
        };
        'create-post': string;
    };
};
export default messages;
