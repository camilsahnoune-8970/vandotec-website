import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: null,
  token: null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pagina's",
        path: "src/content/pages",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Paginatitel",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Meta description",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Inhoud",
          },
        ],
      },
    ],
  },
});
