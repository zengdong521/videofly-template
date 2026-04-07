import { buildSitemapEntries, renderSitemapXml } from "@/lib/sitemap";

export const dynamic = "force-static";
export const runtime = "nodejs";

export async function GET() {
  const entries = buildSitemapEntries();
  const xml = renderSitemapXml(entries);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
