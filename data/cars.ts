// SAMPLE DATA for the homepage demo. Replace with the client's real fleet and stock
// (later from an admin panel or an AutoTrader feed).

export type CarShape = "hatch" | "saloon" | "suv" | "mpv";

export type RentalCar = {
  id: string;
  category: string;
  example: string;
  shape: CarShape;
  seats: number;
  gearbox: "Manual" | "Automatic";
  fuel: string;
  pricePerDay: number;
  pricePerWeek: number;
};

export type SaleCar = {
  id: string;
  make: string;
  model: string;
  variant: string;
  shape: CarShape;
  year: number;
  mileage: number;
  fuel: string;
  gearbox: "Manual" | "Automatic";
  price: number;
  badge?: string;
};

export const rentalFleet: RentalCar[] = [
  { id: "r1", category: "Economy", example: "Toyota Yaris Hybrid or similar", shape: "hatch", seats: 5, gearbox: "Automatic", fuel: "Hybrid", pricePerDay: 35, pricePerWeek: 199 },
  { id: "r2", category: "Saloon", example: "Toyota Corolla or similar", shape: "saloon", seats: 5, gearbox: "Automatic", fuel: "Hybrid", pricePerDay: 45, pricePerWeek: 259 },
  { id: "r3", category: "SUV", example: "Kia Sportage or similar", shape: "suv", seats: 5, gearbox: "Automatic", fuel: "Petrol", pricePerDay: 59, pricePerWeek: 329 },
  { id: "r4", category: "7 Seater", example: "Ford Galaxy or similar", shape: "mpv", seats: 7, gearbox: "Automatic", fuel: "Diesel", pricePerDay: 69, pricePerWeek: 389 },
];

export const carsForSale: SaleCar[] = [
  { id: "s1", make: "Toyota", model: "C-HR", variant: "1.8 Hybrid Design CVT", shape: "suv", year: 2021, mileage: 32450, fuel: "Hybrid", gearbox: "Automatic", price: 15995, badge: "Just Arrived" },
  { id: "s2", make: "Volkswagen", model: "Golf", variant: "1.5 TSI Life", shape: "hatch", year: 2020, mileage: 41200, fuel: "Petrol", gearbox: "Manual", price: 12495 },
  { id: "s3", make: "BMW", model: "3 Series", variant: "330e M Sport Auto", shape: "saloon", year: 2021, mileage: 38900, fuel: "Plug-in Hybrid", gearbox: "Automatic", price: 19995, badge: "Reduced" },
  { id: "s4", make: "Nissan", model: "Qashqai", variant: "1.3 DiG-T N-Connecta", shape: "suv", year: 2019, mileage: 46100, fuel: "Petrol", gearbox: "Manual", price: 11750 },
];

export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);
