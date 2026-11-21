export interface Amenity {
  id: string;
  name: string;
  description: string;
  /** Name used in schema.org amenityFeature. */
  schemaName: string;
}

/** Property amenities as listed for Emma-Ike Guesthouse. */
export const amenities: Amenity[] = [
  {
    id: "parking",
    name: "Free parking",
    description: "Private parking inside the compound, at no charge.",
    schemaName: "Free private parking",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    description: "Meals served on site, so you don’t have to go out after a long drive.",
    schemaName: "Restaurant",
  },
  {
    id: "breakfast",
    name: "Continental breakfast",
    description: "Start the day with tea or coffee, bread, eggs and fruit.",
    schemaName: "Continental breakfast",
  },
  {
    id: "bar",
    name: "Bar & lounge",
    description: "A quiet place for a cold drink in the evening.",
    schemaName: "Bar / lounge",
  },
  {
    id: "family",
    name: "Family friendly",
    description: "Children are welcome, with activities to keep them busy.",
    schemaName: "Children activities (kid / family friendly)",
  },
  {
    id: "non-smoking",
    name: "Non-smoking",
    description: "Smoking isn’t allowed anywhere on the property.",
    schemaName: "Non-smoking hotel",
  },
  {
    id: "front-desk",
    name: "24-hour front desk",
    description: "Someone is at reception day and night, including for late arrivals.",
    schemaName: "24-hour front desk",
  },
  {
    id: "laundry",
    name: "Laundry service",
    description: "Hand your clothes in at the front desk and get them back clean.",
    schemaName: "Laundry service",
  },
  {
    id: "housekeeping",
    name: "Daily housekeeping",
    description: "Your room is cleaned and tidied every day.",
    schemaName: "Daily housekeeping",
  },
];

/** Features found in every room. */
export const roomFeatures: string[] = [
  "Private en-suite bathroom",
  "Free toiletries",
  "Fridge",
  "Flat-screen satellite TV",
  "Seating area",
  "Daily housekeeping",
];
