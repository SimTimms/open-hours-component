import { useState, useEffect } from "react";
import { Switch, Container } from "@mui/material/";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  containerStyles,
  switchStyles,
  timePickerWrapperStyles,
} from "./styles";

interface OpeningHoursProps {
  label: string;
  defaultOpenValue: string;
  defaultCloseValue: string;
  defaultIsOpenValue: boolean;
  onChangeCallback: (
    day: string,
    start: string,
    end: string,
    isOpen: boolean
  ) => void;
  setSaveButtonState: (state: number) => void;
}

function OpeningHours(props: OpeningHoursProps) {
  const {
    label,
    defaultOpenValue,
    defaultCloseValue,
    defaultIsOpenValue,
    onChangeCallback,
    setSaveButtonState,
  } = props;
  const { t } = useTranslation();
  const [openTime, setOpenTime] = useState<Dayjs | null>(null);
  const [closeTime, setCloseTime] = useState<Dayjs | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const labelData = { inputProps: { "aria-label": t(label), title: t(label) } };

  useEffect(() => {
    setOpenTime(dayjs(defaultOpenValue, "HH:mm"));
    setCloseTime(dayjs(defaultCloseValue, "HH:mm"));
    setIsActive(defaultIsOpenValue);
  }, [defaultOpenValue, defaultCloseValue, defaultIsOpenValue]);

  const handleOnChangeSwitch = (label: string, checked: boolean) => {
    setIsActive(checked);
    onChangeCallback(
      label,
      openTime?.format("HH:mm") || "",
      closeTime?.format("HH:mm") || "",
      checked
    );
    setSaveButtonState(1);
  };

  const handleOnChangeOpen = (label: string, newTimeValue: Dayjs | null) => {
    setOpenTime(newTimeValue);
    let newCloseTime = closeTime;
    if (!closeTime || (closeTime && closeTime.isBefore(newTimeValue))) {
      newCloseTime = newTimeValue;
      setCloseTime(newTimeValue);
    }

    onChangeCallback(
      label,
      newTimeValue?.format("HH:mm") || "",
      newCloseTime?.format("HH:mm") || "",
      isActive
    );
    setSaveButtonState(1);
  };

  const handleOnChangeClose = (label: string, newTimeValue: Dayjs | null) => {
    const checkIsHigherThanOpenTime = openTime?.isBefore(newTimeValue);
    if (!checkIsHigherThanOpenTime) {
      console.log("handleOnChangeClose", newTimeValue);
      onChangeCallback(
        label,
        openTime?.format("HH:mm") || "",
        openTime?.format("HH:mm") || "",
        isActive
      );
      setCloseTime(openTime);
    }
    onChangeCallback(
      label,
      openTime?.format("HH:mm") || "",
      newTimeValue?.format("HH:mm") || "",
      isActive
    );
    setCloseTime(newTimeValue);
    setSaveButtonState(1);
  };

  return (
    <Container sx={containerStyles}>
      <Container sx={switchStyles}>
        <Switch
          {...labelData}
          checked={isActive}
          onChange={(_, checked) => handleOnChangeSwitch(label, checked)}
          value={label}
        />
        <label> {t(label)}</label>
      </Container>
      <Container
        sx={{
          ...timePickerWrapperStyles,
          opacity: isActive ? 1 : 0.2,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label={t("open")}
            value={openTime}
            onChange={(newValue) => {
              handleOnChangeOpen(label, newValue);
            }}
            ampm={false}
            sx={{
              mx: 1,
              opacity: openTime ? 1 : 0,
              transition: "opacity 0.5s",
            }}
            disabled={!isActive}
            timeSteps={{ minutes: 5 }}
            slotProps={{
              textField: {
                inputProps: {
                  readOnly: true,
                },
              },
            }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label={t("close")}
            value={closeTime}
            onChange={(newValue) => {
              handleOnChangeClose(label, newValue);
            }}
            ampm={false}
            disabled={!isActive}
            sx={{
              opacity: openTime ? 1 : 0,
              transition: "opacity 0.5s",
            }}
            minTime={dayjs()
              .set("hour", openTime?.hour() || 0)
              .set("minute", openTime?.minute() || 0)}
            timeSteps={{ minutes: 5 }}
            slotProps={{
              textField: {
                inputProps: {
                  readOnly: true,
                },
              },
            }}
          />
        </LocalizationProvider>
      </Container>
    </Container>
  );
}

export default OpeningHours;
