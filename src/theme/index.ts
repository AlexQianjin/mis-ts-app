import { createTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const theme = createTheme({
    palette,
    overrides,
    typography
});

export default theme;
