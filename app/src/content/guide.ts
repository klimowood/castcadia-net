import { Guide } from "@/types/content";

export const guides: Guide[] = [
  {
    id: "jesse-kroetch",
    name: "Capt. Jesse Kroetch",
    title: "Owner / Lead Guide",
    bio: "An experienced fishing guide with an unwavering love for angling and the great outdoors. Having spent a lifetime navigating the fishing grounds across the Pacific Northwest, Jesse skillfully pursues a diverse array of species throughout the year — ranging from salmon and steelhead to pike and bass. His true passion lies in the intricacies of technical bass fishing on Lake Coeur d'Alene. With a friendly demeanor and an earnest desire to share knowledge, Jesse is the go-to guide for anyone seeking an unforgettable fishing experience in the Pacific Northwest.",
    credentials: [
      "Licensed & insured guide",
      "North Idaho native",
      "Conservation-driven angling practices",
      "Technical bass fishing specialist",
      "Multi-species expert across PNW waters",
    ],
    imageUrl: "/photos/guide-jesse.jpg",
  },
];

export const primaryGuide = guides[0];
