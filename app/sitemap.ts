import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://cnifind.cm";

  return [
    {
      url: baseUrl,
      priority: 1,
    },
    {
      url: `${baseUrl}/perdu`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/retrouve`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/recherche`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/comment-ca-marche`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/securite`,
      priority: 0.7,
    },
  ];
}
