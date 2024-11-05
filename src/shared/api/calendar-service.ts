import {serverConnection} from "./server-connection";
import {UUID} from "./types/uuid";
import {CalendarDate} from "./types/calendar-date";
import {Currency} from "./types/currency";

class CalendarService {
    public async loadCalendarDates(apartmentId:UUID, resultCurrency:Currency):Promise<CalendarDate[]> {
        return (await serverConnection.get(`apartments/${apartmentId}/calendar`, {params:{resultCurrency}})).data;
    }
}

export const calendarService = new CalendarService();