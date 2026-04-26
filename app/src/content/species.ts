import { Species } from "@/types/content";

export const species: Species[] = [
  {
    id: "bass",
    slug: "bass",
    name: "Bass & Pike",
    tagline: "World-class smallmouth, largemouth, and trophy northern pike on one of the best bass fisheries in the country.",
    description:
      "Lake Coeur d'Alene consistently earns a spot in Bassmaster's top ten best bass fishing lakes in the nation — and for good reason. Explosive smallmouth fights, trophy largemouth lurking in structure, and massive northern pike make every session on Lake CDA an experience worth repeating. We run a tournament-rigged Lund Pro-V Bass boat and fish active, current-informed patterns daily so you're never on a stale spot.",
    details:
      "Smallmouth bass on Lake CDA are notorious for hard runs and aerial acrobatics — a 4–5 lb fish will test your drag and your nerves. Largemouth stack up in the shallower bays and weed lines throughout the season. Northern pike add a wildcard element: aggressive, ambush-style predators that will absolutely crush a swimbait or topwater. All bass and pike are catch-and-release — our commitment to keeping trophy-class fish in the lake is the reason the fishery stays world-class.",
    techniques: [
      "Drop shot & finesse jigging",
      "Flipping & pitching heavy cover",
      "Swimbait & crankbait presentations",
      "Topwater (early morning / late evening)",
      "Pike-specific streamer & lure rigs",
    ],
    locations: ["Lake Coeur d'Alene, Idaho"],
    seasonLabel: "April – November",
    seasonMonths: [4, 5, 6, 7, 8, 9, 10, 11],
    averageWeight: "2–5 lbs (bass) · 8–15 lbs (pike)",
    recordWeight: "Pike over 20 lbs caught regularly",
    imageUrl: "/photos/bass-full-day.jpg",
    relatedTripSlugs: ["bass-half-day", "bass-full-day"],
  },
  {
    id: "steelhead",
    slug: "steelhead",
    name: "Steelhead",
    tagline: "Idaho's legendary B-Run steelhead — big, wild, and worth every cold morning on the water.",
    description:
      "The Clearwater River is one of the most storied steelhead fisheries in the Pacific Northwest, and the B-Run fish it produces are some of the largest wild steelhead anywhere. These are ocean-run rainbow trout that have made the journey from the Pacific to Idaho's interior rivers — arriving bigger, stronger, and harder-fighting than anything you've hooked in fresh water. Trips run October through March when the fish are at their peak.",
    details:
      "B-Run Clearwater steelhead typically weigh 12 to 15 lbs, with regulars landing fish over 20 lbs and measuring beyond 40 inches. We use a rotating set of techniques depending on water conditions: back trolling plugs and divers when the river is pushing, and side drifting with beads or eggs on the slower stretches. The Snake River offers a second option for later-season fish. These are keep-fishery trips — valid Idaho fishing license and steelhead tags required.",
    techniques: [
      "Back trolling with plugs & divers",
      "Side drifting with beads & eggs",
      "Float fishing",
      "Casting spinners & spoons",
    ],
    locations: ["Clearwater River, Idaho", "Snake River, Idaho"],
    seasonLabel: "October – March",
    seasonMonths: [10, 11, 12, 1, 2, 3],
    averageWeight: "12–15 lbs",
    recordWeight: "Over 20 lbs, 40+ inches",
    imageUrl: "/photos/steelhead-trip.jpg",
    relatedTripSlugs: ["steelhead"],
  },
  {
    id: "salmon",
    slug: "salmon",
    name: "Salmon",
    tagline: "Chase Chinook and Sockeye on the Columbia, Clearwater, and Snake — the heart of Pacific Northwest salmon country.",
    description:
      "Few fishing experiences match the chaos and adrenaline of a salmon bite on the Columbia River. Chinook (King) salmon are the marquee fish — hard-charging, deep-pulling, and capable of stripping a hundred yards of line in seconds. Sockeye add a second gear to summer and early fall trips on the Clearwater and Snake. We run both rivers to chase whatever species is in the run, maximizing your shot at fish on every trip.",
    details:
      "Columbia River Chinook runs peak through late spring and summer; Snake and Clearwater Sockeye and fall Chinook fill out the back half of the season through October. These are primarily meat-fishery trips — salmon are table fish, and we'll help you pack them out properly. Valid Washington or Idaho fishing license plus salmon/steelhead report card required depending on the river. Trips are shared-boat, priced per seat, with a minimum of 3 anglers.",
    techniques: [
      "Trolling with spinners & bait rigs",
      "Back-bouncing eggs & sardine wraps",
      "Plug fishing (side-planers)",
      "Anchored drift presentations",
    ],
    locations: [
      "Columbia River, Washington",
      "Clearwater River, Idaho",
      "Snake River, Idaho",
    ],
    seasonLabel: "May – October",
    seasonMonths: [5, 6, 7, 8, 9, 10],
    averageWeight: "15–30 lbs (Chinook) · 4–8 lbs (Sockeye)",
    recordWeight: "Columbia Chinook over 50 lbs on record",
    imageUrl: "/photos/salmon-trip.jpg",
    relatedTripSlugs: ["salmon"],
  },
];

export function getSpeciesBySlug(slug: string): Species | undefined {
  return species.find((s) => s.slug === slug);
}
