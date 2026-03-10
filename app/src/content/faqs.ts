import { FAQ } from "@/types/content";

export const faqs: FAQ[] = [
  {
    id: "f1",
    question: "Is this good for beginners?",
    answer:
      "Absolutely. We coach all skill levels and provide practical instruction from launch to final cast.",
    category: "preparation",
    order: 1,
  },
  {
    id: "f2",
    question: "What should I bring?",
    answer:
      "We provide core gear. After booking, you get a concise checklist with weather-ready clothing and day-of details.",
    category: "preparation",
    order: 2,
  },
  {
    id: "f3",
    question: "How do bookings work?",
    answer:
      "All reservations are completed through vally. Click any Book on vally button to choose your date and confirm securely.",
    category: "booking",
    order: 3,
  },
  {
    id: "f4",
    question: "What if weather changes?",
    answer:
      "Safety comes first. We communicate proactively and reschedule when conditions compromise safety or trip quality.",
    category: "safety",
    order: 4,
  },
  {
    id: "f5",
    question: "Is licensing included?",
    answer:
      "Licensing requirements are reviewed at booking confirmation so your group arrives prepared and compliant.",
    category: "policy",
    order: 5,
  },
];
