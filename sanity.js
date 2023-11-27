import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import { SANITY_PROJECT_ID } from "@env";

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = ImageUrlBuilder(client);
//helper function for getting image source from sanity
export const urlFor = (source) => builder.image(source);

export default client;
