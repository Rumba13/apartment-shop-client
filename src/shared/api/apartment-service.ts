import {Apartment} from "./types/apartment";

class ApartmentService {
    constructor() {
    }

    public async loadAllApartments():Promise<Apartment[]> {
        const apartments:Apartment[] = [
            {
                title:"Good apartment",
                roomsQuantity: 20,
                addressId:"c4e98793-254c-4717-b837-8e0529cc0d22",
                bedsQuantity: 5,
                landlordId:"c4e98793-254c-4717-b837-8e0529cc0d99",
                price:{inUSD:333,inBYN:333},
                description:"Vlads basement, very clear, good company",
                guestsQuantity: 10,
                photos:["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jkcement.com%2Fblog%2Fvastu%2Fvastu-shastra-for-flats-and-apartments%2F&psig=AOvVaw3Z9mnyzuqC1uDdXhlR_CZL&ust=1726599016462000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiBjtuQyIgDFQAAAAAdAAAAABAE",
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.confident-group.com%2Fflats-in-trivandrum%2F&psig=AOvVaw3Z9mnyzuqC1uDdXhlR_CZL&ust=1726599016462000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiBjtuQyIgDFQAAAAAdAAAAABAJ"]
            }, {
                title:"Good apartment",
                roomsQuantity: 20,
                addressId:"c4e98793-254c-4717-b837-8e0529cc0d22",
                bedsQuantity: 5,
                landlordId:"c4e98793-254c-4717-b837-8e0529cc0d99",
                price:{inUSD:200,inBYN:200},
                description:"Vlads basement, very clear, good company",
                guestsQuantity: 10,
                photos:["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jkcement.com%2Fblog%2Fvastu%2Fvastu-shastra-for-flats-and-apartments%2F&psig=AOvVaw3Z9mnyzuqC1uDdXhlR_CZL&ust=1726599016462000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiBjtuQyIgDFQAAAAAdAAAAABAE",
                    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.confident-group.com%2Fflats-in-trivandrum%2F&psig=AOvVaw3Z9mnyzuqC1uDdXhlR_CZL&ust=1726599016462000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiBjtuQyIgDFQAAAAAdAAAAABAJ"]
            },
            {
                title:"Good apartment",
                roomsQuantity: 20,
                addressId:"c4e98793-254c-4717-b837-8e0529cc0d22",
                bedsQuantity: 5,
                landlordId:"c4e98793-254c-4717-b837-8e0529cc0d99",
                price:{inUSD:11,inBYN:11},
                description:"Vlads basement, very clear, good company",
                guestsQuantity: 10,
                photos:["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jkcement.com%2Fblog%2Fvastu%2Fvastu-shastra-for-flats-and-apartments%2F&psig=AOvVaw3Z9mnyzuqC1uDdXhlR_CZL&ust=1726599016462000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiBjtuQyIgDFQAAAAAdAAAAABAE",
                    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.confident-group.com%2Fflats-in-trivandrum%2F&psig=AOvVaw3Z9mnyzuqC1uDdXhlR_CZL&ust=1726599016462000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiBjtuQyIgDFQAAAAAdAAAAABAJ"]
            }
        ]


        return await apartments;
    }
}

export const apartmentService= new ApartmentService();