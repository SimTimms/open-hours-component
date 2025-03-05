import { createTheme } from "@mui/material/styles";
import { blue, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: purple[500],
    },
  },
});

export default theme;
