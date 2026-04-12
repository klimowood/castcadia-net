import { defineType, defineField } from "sanity";

export const reviewSchema = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: "text",
      title: "Review Text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Review Date",
      type: "date",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Google", value: "google" },
          { title: "FishingBooker", value: "fishingbooker" },
          { title: "Facebook", value: "facebook" },
          { title: "Direct", value: "direct" },
        ],
      },
      initialValue: "google",
    }),
    defineField({
      name: "tripType",
      title: "Trip Type",
      type: "string",
      description: "e.g. 'Bass & Pike', 'Steelhead', 'Salmon'",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "author", subtitle: "source" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Unknown",
        subtitle: subtitle ? `via ${subtitle}` : "",
      };
    },
  },
});
