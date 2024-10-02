import {Apartment} from "./types/apartment";
import {UUID} from "./types/uuid";

class ApartmentService {
    constructor() {
    }

    private apartments: Apartment[] = [
        {
            apartmentId: "3c2082a1-6884-4a9f-bf08-c90f30221137",
            title: "Good apartment",
            roomsQuantity: 4,
            addressUUID: "c4e98793-254c-4717-b837-8e0529cc0d22",
            bedsQuantity: 5,
            landlordId: "c4e98793-254c-4717-b837-8e0529cc0d99",
            price: {amount: 333, currency: "BYN"},
            description: "АПАРТАМЕНТЫ МИНСК-АРЕНА ДО 10ЧЕЛОВЕК",
            guestsQuantity: 10,
            areaInSquareMeters: 110,
            tags: [
                "Холодильник",
                "Газовая плита",
                "Электроплита",
                "Электрочайник",
                "Блендер",
                "Кофеварка",
                "Микроволновая печь",
                "Столовые приборы",
                "Тостер",
                "Посудомоечная машина",
            ],
            photos: ["https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg",
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.confident-group.com%2Fflats-in-trivandrum%2F&psig=AOvVaw3Z9mnyzuqC1uDdXhlR_CZL&ust=1726599016462000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiBjtuQyIgDFQAAAAAdAAAAABAJ"]
        }, {
            apartmentId: "7b1594fd-0ded-42cb-b5c3-ccce90f6584c",
            title: "Good apartment",
            roomsQuantity: 1,
            areaInSquareMeters: 80,
            addressUUID: "c4e98793-254c-4717-b837-8e0529cc0d22",
            bedsQuantity: 5,
            landlordId: "c4e98793-254c-4717-b837-8e0529cc0d99",
            price: {amount: 200, currency: "BYN"},
            description: "ДЖАКУЗИ! ЖД! ТРЦ Galileo! SMART TV! ЧАСЫ от 20 рублей!",
            guestsQuantity: 10,
            tags: [
                "Холодильник",
                "Блендер",
                "Тостер",
                "Посудомоечная машина",
            ],
            photos: ["https://cdn-dgamb.nitrocdn.com/anVijACnddtsyQxqSCgDHdSsWvlDEifx/assets/images/optimized/rev-28413df/model55.com/wp-content/uploads/2018/11/model-apartment-living-dining-1.jpg",
                "https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg"]
        },
        {
            apartmentId: "f64d23c6-f4f9-4bfa-8060-2370c61d26b7",
            title: "Good apartment",
            roomsQuantity: 6,
            addressUUID: "c4e98793-254c-4717-b837-8e0529cc0d22",
            bedsQuantity: 5,
            landlordId: "c4e98793-254c-4717-b837-8e0529cc0d99",
            price: {amount: 166, currency: "BYN"},
            description: "Центр. Кондиционер. Огромная джакузи на двоих. Часы, сутки",
            guestsQuantity: 2,
            areaInSquareMeters: 80,
            tags: [
                "Газовая плита",
            ],
            photos: ["https://images.squarespace-cdn.com/content/v1/6270dcb52a53a65bc96c6dae/ee43aff3-f27d-409f-b5be-a53dd7f494e0/image-asset.jpeg?format=750w",
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.confident-group.com%2Fflats-in-trivandrum%2F&psig=AOvVaw3Z9mnyzuqC1uDdXhlR_CZL&ust=1726599016462000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiBjtuQyIgDFQAAAAAdAAAAABAJ"]
        },
        {
            apartmentId: "bd226134-7044-4df9-b56e-957c5bb71b09",
            title: "Good apartment",
            roomsQuantity: 1,
            addressUUID: "c4e98793-254c-4717-b837-8e0529cc0d22",
            bedsQuantity: 5,
            landlordId: "c4e98793-254c-4717-b837-8e0529cc0d99",
            price: {amount: 500, currency: "BYN"},
            description: "АПАРТАМЕНТЫ МИНСК-АРЕНА ДО 10ЧЕЛОВЕК",
            guestsQuantity: 1,
            areaInSquareMeters: 70,
            tags: [
                "Холодильник",
                "Газовая плита",
                "Электрочайник",
                "Блендер",
                "Столовые приборы",
                "Тостер",
                "Посудомоечная машина",
            ],
            photos: ["https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg",
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.confident-group.com%2Fflats-in-trivandrum%2F&psig=AOvVaw3Z9mnyzuqC1uDdXhlR_CZL&ust=1726599016462000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiBjtuQyIgDFQAAAAAdAAAAABAJ"]
        }, {
            apartmentId: "0a45e4e7-abae-4613-95a4-546fe32f6ff6",
            title: "Good apartment",
            roomsQuantity: 1,
            areaInSquareMeters: 20,
            addressUUID: "c4e98793-254c-4717-b837-8e0529cc0d22",
            bedsQuantity: 5,
            landlordId: "c4e98793-254c-4717-b837-8e0529cc0d99",
            price: {amount: 788, currency: "BYN"},
            description: "ДЖАКУЗИ! ЖД! ТРЦ Galileo! SMART TV! ЧАСЫ от 20 рублей!",
            guestsQuantity: 10,
            tags: [
                "Холодильник",
                "Блендер",
                "Тостер",
                "Посудомоечная машина",
                "Электроплита",
            ],
            photos: ["https://cdn-dgamb.nitrocdn.com/anVijACnddtsyQxqSCgDHdSsWvlDEifx/assets/images/optimized/rev-28413df/model55.com/wp-content/uploads/2018/11/model-apartment-living-dining-1.jpg",
                "https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg"]
        },
        {
            apartmentId: "c7d0c5ca-b1c1-4422-ab1c-0d2c006e8bbf",
            title: "Good apartment",
            roomsQuantity: 3,
            addressUUID: "c4e98793-254c-4717-b837-8e0529cc0d22",
            bedsQuantity: 5,
            landlordId: "c4e98793-254c-4717-b837-8e0529cc0d99",
            price: {amount: 115, currency: "BYN"},
            description: "Центр. Кондиционер. Огромная джакузи на двоих. Часы, сутки",
            guestsQuantity: 10,
            areaInSquareMeters: 40,
            tags: [
                "Газовая плита",

            ],
            photos: ["https://images.squarespace-cdn.com/content/v1/6270dcb52a53a65bc96c6dae/ee43aff3-f27d-409f-b5be-a53dd7f494e0/image-asset.jpeg?format=750w",
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.confident-group.com%2Fflats-in-trivandrum%2F&psig=AOvVaw3Z9mnyzuqC1uDdXhlR_CZL&ust=1726599016462000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiBjtuQyIgDFQAAAAAdAAAAABAJ"]
        }, {
            apartmentId: "646654ff-3235-4173-996d-cb2f130ab91b",
            title: "Good apartment",
            roomsQuantity: 4,
            addressUUID: "c4e98793-254c-4717-b837-8e0529cc0d22",
            bedsQuantity: 5,
            landlordId: "c4e98793-254c-4717-b837-8e0529cc0d99",
            price: {amount: 130, currency: "BYN"},
            description: "АПАРТАМЕНТЫ МИНСК-АРЕНА ДО 10ЧЕЛОВЕК",
            guestsQuantity: 10,
            areaInSquareMeters: 55,
            tags: [
                "Холодильник",
                "Газовая плита",
                "Электроплита",
                "Электрочайник",
                "Блендер",
                "Кофеварка",
                "Микроволновая печь",
                "Столовые приборы",
                "Тостер",
                "Посудомоечная машина",
            ],
            photos: ["https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg",
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.confident-group.com%2Fflats-in-trivandrum%2F&psig=AOvVaw3Z9mnyzuqC1uDdXhlR_CZL&ust=1726599016462000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiBjtuQyIgDFQAAAAAdAAAAABAJ"]
        }, {
            apartmentId: "d1808487-15b0-442d-9ca1-1729847ce2a7",
            title: "Good apartment",
            roomsQuantity: 1,
            areaInSquareMeters: 80,
            addressUUID: "c4e98793-254c-4717-b837-8e0529cc0d22",
            bedsQuantity: 5,
            landlordId: "c4e98793-254c-4717-b837-8e0529cc0d99",
            price: {amount: 200, currency: "BYN"},
            description: "ДЖАКУЗИ! ЖД! ТРЦ Galileo! SMART TV! ЧАСЫ от 20 рублей!",
            guestsQuantity: 10,
            tags: [
                "Холодильник",
                "Блендер",
                "Тостер",
                "Посудомоечная машина",
            ],
            photos: ["https://images.squarespace-cdn.com/content/v1/6270dcb52a53a65bc96c6dae/ee43aff3-f27d-409f-b5be-a53dd7f494e0/image-asset.jpeg?format=750w",
                "https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg"]
        },
        {
            apartmentId: "00ccbcaf-4ad9-4a7c-a7c2-62b838aeb58c",
            title: "Good apartment",
            roomsQuantity: 3,
            addressUUID: "c4e98793-254c-4717-b837-8e0529cc0d22",
            bedsQuantity: 5,
            landlordId: "c4e98793-254c-4717-b837-8e0529cc0d99",
            price: {amount: 670, currency: "BYN"},
            description: "Центр. Кондиционер. Огромная джакузи на двоих. Часы, сутки",
            guestsQuantity: 10,
            areaInSquareMeters: 40,
            tags: [
                "Газовая плита",

            ],
            photos: ["https://images.squarespace-cdn.com/content/v1/6270dcb52a53a65bc96c6dae/ee43aff3-f27d-409f-b5be-a53dd7f494e0/image-asset.jpeg?format=750w",
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.confident-group.com%2Fflats-in-trivandrum%2F&psig=AOvVaw3Z9mnyzuqC1uDdXhlR_CZL&ust=1726599016462000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiBjtuQyIgDFQAAAAAdAAAAABAJ"]
        }
    ];

    public async getApartmentById(apartmentId: UUID): Promise<Apartment | null> {
        return this.apartments.find(apartment => apartment.apartmentId === apartmentId) || null;
    }

    public async getAllApartments(): Promise<Apartment[]> {
        return this.apartments;
    }
}

export const apartmentService = new ApartmentService();