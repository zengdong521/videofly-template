import { buildSitemapEntries, renderSitemapXml, SITEMAP_REVALIDATE_SECONDS } from "@/lib/sitemap";

export const revalidate = 3600;
export const runtime = "nodejs";

export async function GET() {
  const entries = await buildSitemapEntries();
  const xml = renderSitemapXml(entries);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=${SITEMAP_REVALIDATE_SECONDS}, stale-while-revalidate=${SITEMAP_REVALIDATE_SECONDS}`,
    },
  });
}
