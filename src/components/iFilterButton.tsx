import * as React from 'react';
import {
    useState,
    useCallback,
    useRef,
    ReactNode,
    HtmlHTMLAttributes,
    useContext,
} from 'react';
import PropTypes from 'prop-types';
import {
    Menu,
    MenuItem,
    styled,
    ButtonProps as MuiButtonProps,
} from '@mui/material';
import ContentFilter from '@mui/icons-material/FilterList';
import lodashGet from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { useListContext, useResourceContext, useTranslate } from 'ra-core';
import { stringify } from 'query-string';
import { useNavigate } from 'react-router';
import { FilterButtonMenuItem } from 'react-admin';
import { Button } from 'react-admin';
import { FilterContext } from 'react-admin';
import { extractValidSavedQueries, useSavedQueries } from 'react-admin';
import { AddSavedQueryDialog } from 'react-admin';
import { RemoveSavedQueryDialog } from 'react-admin';

export const FilterButton = (props: FilterButtonProps): JSX.Element => {
    const {
        filters: filtersProp,
        className,
        disableSaveQuery,
        size,
        variant,
        ...rest
    } = props;
    const filters = useContext(FilterContext) || filtersProp;
    const resource = useResourceContext(props);
    const translate = useTranslate();
    const [savedQueries] = useSavedQueries(resource);
    const navigate = useNavigate();
    const {
        displayedFilters = {},
        filterValues,
        perPage,
        setFilters,
        showFilter,
        sort,
    } = useListContext(props);
    const hasFilterValues = !isEqual(filterValues, {});
    const validSavedQueries = extractValidSavedQueries(savedQueries);
    const hasSavedCurrentQuery = validSavedQueries.some(savedQuery =>
        isEqual(savedQuery.value, {
            filter: filterValues,
            sort,
            perPage,
            displayedFilters,
        })
    );
    const [open, setOpen] = useState(false);
    const anchorEl = useRef();

    if (filters === undefined) {
        throw new Error(
            'The <FilterButton> component requires the <List filters> prop to be set'
        );
    }

    const hiddenFilters = filters.filter(
        (filterElement: JSX.Element) =>
            !filterElement.props.alwaysOn &&
            !displayedFilters[filterElement.props.source] &&
            typeof lodashGet(filterValues, filterElement.props.source) ===
                'undefined'
    );

    const handleClickButton = useCallback(
        event => {
            // This prevents ghost click.
            event.preventDefault();
            setOpen(true);
            anchorEl.current = event.currentTarget;
        },
        [anchorEl, setOpen]
    );

    const handleRequestClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const handleShow = useCallback(
        ({ source, defaultValue }) => {
            showFilter(source, defaultValue === '' ? undefined : defaultValue);
            // We have to fallback to imperative code because the new FilterFormInput
            // has no way of knowing it has just been displayed (and thus that it should focus its input)
            setTimeout(() => {
                const inputElement = document.querySelector(
                    `input[name='${source}']`
                ) as HTMLInputElement;
                if (inputElement) {
                    inputElement.focus();
                }
            }, 50);
            setOpen(false);
        },
        [showFilter, setOpen]
    );

    // add query dialog state
    const [addSavedQueryDialogOpen, setAddSavedQueryDialogOpen] = useState(
        false
    );
    const hideAddSavedQueryDialog = (): void => {
        setAddSavedQueryDialogOpen(false);
    };
    const showAddSavedQueryDialog = (): void => {
        setOpen(false);
        setAddSavedQueryDialogOpen(true);
    };

    // remove query dialog state
    const [
        removeSavedQueryDialogOpen,
        setRemoveSavedQueryDialogOpen,
    ] = useState(false);
    const hideRemoveSavedQueryDialog = (): void => {
        setRemoveSavedQueryDialogOpen(false);
    };
    const showRemoveSavedQueryDialog = (): void => {
        setOpen(false);
        setRemoveSavedQueryDialogOpen(true);
    };

    if (
        hiddenFilters.length === 0 &&
        validSavedQueries.length === 0 &&
        !hasFilterValues
    ) {
        return null;
    }
    return (
        <Root className={className} {...sanitizeRestProps(rest)}>
            <Button
                className="add-filter"
                label="添加过滤条件"
                aria-haspopup="true"
                onClick={handleClickButton}
                variant={variant}
                size={size}
            >
                <ContentFilter />
            </Button>
            <Menu
                open={open}
                anchorEl={anchorEl.current}
                onClose={handleRequestClose}
            >
                {hiddenFilters.map((filterElement: JSX.Element, index) => (
                    <FilterButtonMenuItem
                        key={filterElement.props.source}
                        filter={filterElement}
                        resource={resource}
                        onShow={handleShow}
                        autoFocus={index === 0}
                    />
                ))}
                {/* {validSavedQueries.map((savedQuery, index) =>
                    isEqual(savedQuery.value, {
                        filter: filterValues,
                        sort,
                        perPage,
                        displayedFilters,
                    }) ? (
                        <MenuItem
                            onClick={showRemoveSavedQueryDialog}
                            key={index}
                        >
                            删除过滤条件 "%{savedQuery.label}"
                        </MenuItem>
                    ) : (
                        <MenuItem
                            onClick={(): void => {
                                navigate({
                                    search: stringify({
                                        filter: JSON.stringify(
                                            savedQuery.value.filter
                                        ),
                                        sort: savedQuery.value.sort.field,
                                        order: savedQuery.value.sort.order,
                                        page: 1,
                                        perPage: savedQuery.value.perPage,
                                        displayedFilters: JSON.stringify(
                                            savedQuery.value.displayedFilters
                                        ),
                                    }),
                                });
                                setOpen(false);
                            }}
                            key={index}
                        >
                            {savedQuery.label}
                        </MenuItem>
                    )
                )}
                {hasFilterValues && !hasSavedCurrentQuery && !disableSaveQuery && (
                    <MenuItem onClick={showAddSavedQueryDialog}>
                        保存当前的过滤条件
                    </MenuItem>
                )}
                {hasFilterValues && (
                    <MenuItem
                        onClick={() => {
                            setFilters({}, {}, false);
                            setOpen(false);
                        }}
                    >
                        删除所有过滤条件
                    </MenuItem>
                )} */}
            </Menu>
            {/* {!disableSaveQuery && (
                <>
                    <AddSavedQueryDialog
                        open={addSavedQueryDialogOpen}
                        onClose={hideAddSavedQueryDialog}
                    />
                    <RemoveSavedQueryDialog
                        open={removeSavedQueryDialogOpen}
                        onClose={hideRemoveSavedQueryDialog}
                    />
                </>
            )} */}
        </Root>
    );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const sanitizeRestProps = ({
    displayedFilters = null,
    filterValues = null,
    showFilter = null,
    ...rest
}) => rest;
/* eslint-enable @typescript-eslint/no-unused-vars */

FilterButton.propTypes = {
    resource: PropTypes.string,
    filters: PropTypes.arrayOf(PropTypes.node),
    displayedFilters: PropTypes.object,
    filterValues: PropTypes.object,
    showFilter: PropTypes.func,
    className: PropTypes.string,
};

export interface FilterButtonProps
    extends HtmlHTMLAttributes<HTMLDivElement>,
        Pick<MuiButtonProps, 'variant' | 'size'> {
    className?: string;
    resource?: string;
    filterValues?: any;
    showFilter?: (filterName: string, defaultValue: any) => void;
    displayedFilters?: any;
    filters?: ReactNode[];
    disableSaveQuery?: boolean;
}

const PREFIX = 'RaFilterButton';

const Root = styled('div', {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})({
    display: 'inline-block',
});
