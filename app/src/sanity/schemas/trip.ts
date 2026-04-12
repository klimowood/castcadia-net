import { defineType, defineField } from "sanity";

export const tripSchema = defineType({
  name: "trip",
  title: "Trip",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Trip Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Location",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Trip Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "durationHours",
      title: "Duration (hours)",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "pricingModel",
      title: "Pricing Model",
      type: "string",
      options: {
        list: [
          { title: "Per Boat", value: "per-boat" },
          { title: "Per Seat", value: "per-seat" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceUsd",
      title: "Price ($)",
      type: "number",
      description: "Base price — per-boat = total for base group, per-seat = price per person",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "baseAnglers",
      title: "Base Anglers Included",
      type: "number",
      description: "Number of anglers included in base price (per-boat only)",
      hidden: ({ parent }) => parent?.pricingModel !== "per-boat",
    }),
    defineField({
      name: "extraAnglerPriceUsd",
      title: "Extra Angler Price ($)",
      type: "number",
      hidden: ({ parent }) => parent?.pricingModel !== "per-boat",
    }),
    defineField({
      name: "minAnglers",
      title: "Minimum Anglers",
      type: "number",
      hidden: ({ parent }) => parent?.pricingModel !== "per-seat",
    }),
    defineField({
      name: "maxAnglers",
      title: "Maximum Anglers",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "species",
      title: "Target Species",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "seasonLabel",
      title: "Season Label",
      type: "string",
      description: "e.g. 'April – November'",
    }),
    defineField({
      name: "includes",
      title: "What's Included",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "notIncluded",
      title: "What to Bring",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "catchAndRelease",
      title: "Catch & Release Only",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isFeatured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isActive",
      title: "Active (visible on site)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "bookingPath",
      title: "Booking Path",
      type: "string",
      description: "Trip identifier for the booking URL",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "seasonLabel", media: "image" },
  },
});
