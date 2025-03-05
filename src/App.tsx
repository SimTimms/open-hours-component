import { useEffect, useState } from "react";
import { OpeningHoursWrapper } from "./components/";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import { openingHours } from "./data/openingHours";
import { openingHoursType } from "./types";

export default function App() {
  const [openingHoursData, setOpeningHoursData] =
    useState<openingHoursType | null>(null);

  useEffect(() => {
    //Load the opening hours from localStorage
    const openingHoursFromLocalStorage = localStorage.getItem(
      "react-temp-opening-hours"
    );
    if (openingHoursFromLocalStorage) {
      try {
        setOpeningHoursData(JSON.parse(openingHoursFromLocalStorage));
      } catch (e) {
        setOpeningHoursData(openingHours);
      }
    } else {
      setOpeningHoursData(openingHours);
    }
  }, [openingHours]);

  if (!openingHoursData) return null;

  function saveFunction(values: openingHoursType) {
    //Use localStorage to save the opening hours in place of a real API call
    localStorage.setItem("react-temp-opening-hours", JSON.stringify(values));
  }

  return (
    <ThemeProvider theme={theme}>
      <OpeningHoursWrapper
        openingHoursValues={openingHoursData}
        saveCallback={saveFunction}
      />
    </ThemeProvider>
  );
}
