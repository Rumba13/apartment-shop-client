import {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";

export const rangeDatePickerDisableDateBeforeToday: RangePickerProps['disabledDate'] = (current) => current < dayjs().subtract(1, "day").endOf("day");
