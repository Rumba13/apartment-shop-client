import {action, makeObservable, observable, override} from "mobx";
import {LoadingStore} from "../../../shared/model/loading-store";
import {UUID} from "../../../shared/api/types/uuid";
import {calendarService} from "../../../shared/api/calendar-service";
import {CalendarDate} from "../../../shared/api/types/calendar-date";
import {Currency} from "../../../shared/api/types/currency";

class ApartmentCalendarStore extends LoadingStore {
    constructor() {
        super()
        makeObservable(this, {
            isError: override,
            setIsError: override,
            isLoading: override,
            setIsLoading: override,
            dates:observable,
            setDates:action
        })
    }

    public dates:CalendarDate[] = []
    public setDates = (value:CalendarDate[]) => this.dates = value
    public async loadCalendar(apartmentId: UUID, resultCurrency:Currency) {
        this.setIsError(false);
        this.setIsLoading(true);

        try {
            const calendarDates = await calendarService.loadCalendarDates(apartmentId, resultCurrency);
            this.setDates(calendarDates);
        } catch (err) {
            this.setIsError(true);
            console.log(err);
        } finally {
            this.setIsLoading(false);
        }
    }
}

export const apartmentCalendarStore = new ApartmentCalendarStore()