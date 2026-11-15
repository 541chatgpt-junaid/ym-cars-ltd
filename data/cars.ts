// SAMPLE rental fleet for the homepage. Replace with the client's real rental cars and prices.
// Cars for sale live in data/stock.ts.

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

export const rentalFleet: RentalCar[] = [
  { id: "r1", category: "Economy", example: "Toyota Yaris Hybrid or similar", shape: "hatch", seats: 5, gearbox: "Automatic", fuel: "Hybrid", pricePerDay: 35, pricePerWeek: 199 },
  { id: "r2", category: "Saloon", example: "Toyota Corolla or similar", shape: "saloon", seats: 5, gearbox: "Automatic", fuel: "Hybrid", pricePerDay: 45, pricePerWeek: 259 },
  { id: "r3", category: "SUV", example: "Kia Sportage or similar", shape: "suv", seats: 5, gearbox: "Automatic", fuel: "Petrol", pricePerDay: 59, pricePerWeek: 329 },
  { id: "r4", category: "7 Seater", example: "Ford Galaxy or similar", shape: "mpv", seats: 7, gearbox: "Automatic", fuel: "Diesel", pricePerDay: 69, pricePerWeek: 389 },
];

export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);
