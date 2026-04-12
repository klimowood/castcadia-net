import { defineType, defineField } from "sanity";

export const guideSchema = defineType({
  name: "guide",
  title: "Guide",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title / Role",
      type: "string",
      description: "e.g. 'Owner / Lead Guide'",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "image",
      title: "Portrait Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "image" },
  },
});
