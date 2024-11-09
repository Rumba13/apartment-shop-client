import {serverConnection} from "./server-connection";
import {UUID} from "./types/uuid";
import {CalendarDate} from "./types/calendar-date";
import {Currency} from "./types/currency";
import {UpdateCalendarDateDto} from "./types/update-calendar-date.dto";

class CalendarService {
    public async loadCalendarDates(apartmentId: UUID, resultCurrency: Currency): Promise<CalendarDate[]> {
        return (await serverConnection.get(`apartments/${apartmentId}/calendar`, {params: {resultCurrency}})).data;
    }

    public async updateCalendarDatePrice(apartmentId: UUID, calendarDateId: UUID, resultCurrency: Currency, updateCalendarDateDto: UpdateCalendarDateDto): Promise<CalendarDate> {
        return (await serverConnection.patch(`apartments/${apartmentId}/calendar-dates/${calendarDateId}`, updateCalendarDateDto,
            {params: {resultCurrency: resultCurrency}})).data;
    }
}

export const calendarService = new CalendarService();