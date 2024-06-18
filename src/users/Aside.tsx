import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const PREFIX = 'Aside';

const classes = {
    root: `${PREFIX}-root`,
};

const Root = styled('div')(({ theme }) => ({
    [`&.${classes.root}`]: {
        [theme.breakpoints.up('sm')]: {
            width: 200,
            margin: '1em',
        },
        [theme.breakpoints.down('md')]: {
            width: 0,
            overflowX: 'hidden',
            margin: 0,
        },
    },
}));

const Aside = () => {
    return (
        /*<Box
              sx={{
                  width: {
                      sm: 200,
                      md: 0,
                  },
                  margin: {
                      sm: '1em',
                      md: 0,
                  },
                  overflowX: {
                      md: 'hidden',
                  },
              }}
        >*/
        <Root className={classes.root}>
            <Typography variant="h6">更新公告</Typography>
            <Typography variant="body2">
                1.未完成更新密码功能，密码还需询问管理员
            </Typography>
        </Root>
    );
};

export default Aside;
