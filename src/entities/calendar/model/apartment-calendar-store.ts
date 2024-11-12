import {action, makeObservable, observable, override} from "mobx";
import {LoadingStore} from "../../../shared/model/loading-store";
import {UUID} from "../../../shared/api/types/uuid";
import {calendarService} from "../../../shared/api/calendar-service";
import {CalendarDate} from "../../../shared/api/types/calendar-date";
import {Currency} from "../../../shared/api/types/currency";
import {apartmentService} from "../../../shared/api/apartment-service";
import {Apartment} from "../../../shared/api/types/apartment";
import {Tariff} from "../../../shared/api/types/tariff";
import {tariffService} from "../../../shared/api/tariff-service";

class ApartmentCalendarStore extends LoadingStore {
    constructor() {
        super()
        makeObservable(this, {
            isError: override,
            setIsError: override,
            isLoading: override,
            setIsLoading: override,
            dates: observable,
            setDates: action,
            apartment: observable,
            setApartment: action,
            setTariff: action,
            tariff: observable
        })
    }

    public apartment: Apartment | null = null
    public setApartment = (value: Apartment | null) => this.apartment = value
    public tariff: Tariff | null = null
    public setTariff = (value: Tariff) => this.tariff = value
    public dates: CalendarDate[] = []
    public setDates = (value: CalendarDate[]) => this.dates = value

    public async loadCalendar(apartmentId: UUID, resultCurrency: Currency) {
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

    public async loadTariff(tariffId: UUID) {
        this.setIsLoading(true);

        try {
            const tariff = await tariffService.loadTariff(tariffId);
            this.setTariff(tariff);
        } catch (err) {
            this.setIsError(true);
            console.log(err);
        } finally {
            this.setIsLoading(false);
        }
    }

    public async loadCurrentApartment(apartmentId: UUID, resultCurrency: Currency) {
        this.setIsLoading(true);

        try {
            const apartment = await apartmentService.getApartmentById(apartmentId, resultCurrency);
            if (!apartment) throw new Error("Apartment not found");
            this.setApartment(apartment);
            return apartment
        } catch (err) {
            this.setIsError(true);
            console.log(err);
        } finally {
            this.setIsLoading(false);
        }
    }
}

export const apartmentCalendarStore = new ApartmentCalendarStore()