const black = '#000000';
const primaryColor = '#4D5EE0';

const overrides = {
    MuiCssBaseline: {
        '@global': {
            body: {
                color: black
            }
        }
    },
    MuiPaper: {
        root: {
            color: black
        }
    },
    MuiTableCell: {
        root: {
            color: black
        },
        head: {
            color: black
        },
        body: {
            color: black
        }
    },
    PrivateTabIndicator: {
        root: {
            height: '4px'
        },
        colorSecondary: {
            backgroundColor: primaryColor
        }
    }
};

export default overrides;
