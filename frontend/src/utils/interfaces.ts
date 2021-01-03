export interface ReviewProps {
    id: string;
    name: string;
    review_count: number;
    rating: string;
    status: string;
    price: number;
    display_phone: string;
    address: string;
    summary: string;
    score: string;
    lat: string;
    lon: string;
};

export interface RentalProps {
    id: string;
    night_price: number;
    num_of_baths: number;
    num_of_rooms: number;
    name: string;
    airbnb_neighborhood: string;
    capacity_of_people: number;
    property_type: string;
    reviews_count: number;
    start_rating: number;
    created_at: string;
    num_of_beds: number;
    lat: string;
    lon: string;
}
