var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
/* eslint react/jsx-key: off */
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Create, SaveButton, AutocompleteInput, TabbedForm, TextInput, Toolbar, required, useNotify, usePermissions, useUnique, } from 'react-admin';
import Aside from './Aside';
const UserEditToolbar = (_a) => {
    var { permissions } = _a, props = __rest(_a, ["permissions"]);
    const notify = useNotify();
    const { reset } = useFormContext();
    return (React.createElement(Toolbar, Object.assign({}, props),
        React.createElement(SaveButton, { label: "user.action.save_and_show" }),
        permissions === 'admin' && (React.createElement(SaveButton, { label: "user.action.save_and_add", mutationOptions: {
                onSuccess: () => {
                    notify('ra.notification.created', {
                        type: 'info',
                        messageArgs: {
                            smart_count: 1,
                        },
                    });
                    reset();
                },
            }, type: "button", variant: "text" }))));
};
const isValidName = (value) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => setTimeout(() => resolve(value === 'Admin' ? "Can't be Admin" : undefined)));
});
const UserCreate = () => {
    const { permissions } = usePermissions();
    const unique = useUnique();
    return (React.createElement(Create, { aside: React.createElement(Aside, null), redirect: "show" },
        React.createElement(TabbedForm, { mode: "onBlur", warnWhenUnsavedChanges: true, toolbar: React.createElement(UserEditToolbar, { permissions: permissions }) },
            React.createElement(TabbedForm.Tab, { label: "user.form.summary", path: "" },
                React.createElement(TextInput, { source: "name", defaultValue: "Slim Shady", autoFocus: true, validate: [required(), isValidName, unique()] })),
            permissions === 'admin' && (React.createElement(TabbedForm.Tab, { label: "user.form.security", path: "security" },
                React.createElement(AutocompleteInput, { source: "role", choices: [
                        { id: '', name: 'None' },
                        { id: 'admin', name: 'Admin' },
                        { id: 'user', name: 'User' },
                        { id: 'user_simple', name: 'UserSimple' },
                    ], validate: [required()] }))))));
};
export default UserCreate;
