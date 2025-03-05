import { useEffect, useRef, useState } from "react";
import OpeningHours from "./OpeningHours";
import { Container, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { openingHoursType } from "../../types";

export interface OpeningHoursWrapperProps {
  /**
   * Optional callback function to be called when saving.
   */
  saveCallback?: (values: openingHoursType) => void;

  /**
   * The values representing the opening hours.
   */
  openingHoursValues: openingHoursType;
}

function OpeningHoursWrapper(props: OpeningHoursWrapperProps) {
  const { saveCallback, openingHoursValues } = props;
  const { t } = useTranslation();

  const [saveButtonState, setSaveButtonState] = useState<number>(0);
  const newOpeningHours = useRef<openingHoursType>(openingHoursValues);

  useEffect(() => {
    newOpeningHours.current = openingHoursValues;
  }, [openingHoursValues]);

  const changeOpeningHours = (
    day: string,
    start: string,
    end: string,
    isOpen: boolean
  ) => {
    newOpeningHours.current = {
      ...newOpeningHours.current,
      [day]: { start, end, isOpen },
    };
  };

  const dayElements = (
    openingHoursValues: openingHoursType,
    setSaveButtonState: (state: number) => void
  ) => {
    const openingHoursToArray = Object.keys(openingHoursValues);
    const elementArray = [];

    if (!newOpeningHours) return null;

    for (let i = 0; i < openingHoursToArray.length; i++) {
      const openHoursDetails = newOpeningHours.current[openingHoursToArray[i]];
      if (openHoursDetails) {
        elementArray.push(
          <OpeningHours
            key={openingHoursToArray[i]}
            label={openingHoursToArray[i]}
            defaultOpenValue={openHoursDetails.start}
            defaultCloseValue={openHoursDetails.end}
            defaultIsOpenValue={openHoursDetails.isOpen}
            onChangeCallback={changeOpeningHours}
            setSaveButtonState={setSaveButtonState}
          />
        );
      }
    }

    return elementArray;
  };

  if (!newOpeningHours) return null;

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
    >
      {dayElements(openingHoursValues, setSaveButtonState)}
      <Button
        variant="contained"
        onClick={() => {
          saveCallback
            ? saveCallback(newOpeningHours.current)
            : console.log(t("noSaveFunction"));

          setSaveButtonState(0);
        }}
        disabled={!saveCallback}
      >
        {saveButtonState === 0 ? t("saved") : t("save")}
      </Button>
    </Container>
  );
}

export default OpeningHoursWrapper;
