export type PartnerCategory = "campground" | "resort" | "hotel";

export type Partner = {
  id: string;
  name: string;
  category: PartnerCategory;
  description: string;
  website: string;
  address: string;
};

export const partners: Partner[] = [
  {
    id: "cda-resort",
    name: "The Coeur d'Alene Resort",
    category: "resort",
    description:
      "A luxury lakeside resort offering world-class golf, spa services, fine dining, and stunning accommodations right on the shores of Lake Coeur d'Alene. The perfect home base for an elevated fishing getaway.",
    website: "https://www.cdaresort.com",
    address: "115 S. 2nd Street, Coeur d'Alene, ID",
  },
  {
    id: "one-lakeside",
    name: "One Lakeside",
    category: "hotel",
    description:
      "Suite-style boutique hotel with full kitchens and panoramic floor-to-ceiling windows overlooking Lake Coeur d'Alene, one block from the water in the heart of downtown. Modern, elegant, and steps from the dock.",
    website: "https://www.onelakeside.com",
    address: "201 N. First Street, Coeur d'Alene, ID",
  },
  {
    id: "camp-cda",
    name: "Camp Coeur d'Alene",
    category: "campground",
    description:
      "A destination campground on scenic Wolf Lodge Bay with cabin, RV, and tent sites plus kayak, paddleboard, and jet ski rentals. Just 15 minutes from downtown — ideal for anglers who want to stay close to the water.",
    website: "https://campcda.net",
    address: "10588 E Wolf Lodge Bay Rd, Coeur d'Alene, ID",
  },
  {
    id: "holiday-inn-cda",
    name: "Holiday Inn Express & Suites Coeur d'Alene",
    category: "hotel",
    description:
      "Comfortable, well-priced accommodations just off I-90 with complimentary hot breakfast and an indoor pool. Easy access to the lake and a great option for groups or families looking for value without sacrificing comfort.",
    website: "https://www.ihg.com/holidayinnexpress/hotels/us/en/coeur-d-alene/psfid/hoteldetail",
    address: "2300 W Seltice Way, Coeur d'Alene, ID",
  },
];

export const categoryLabels: Record<PartnerCategory, string> = {
  campground: "Campground",
  resort: "Resort",
  hotel: "Hotel",
};
