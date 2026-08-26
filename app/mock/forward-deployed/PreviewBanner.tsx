import { headers } from "next/headers";

function isFdRequest(host: string | null, siteHeader: string | null) {
  if (siteHeader === "fd") return true;
  if (!host) return false;
  const bare = host.split(":")[0]!.toLowerCase();
  return bare === "fd.antidotetransform.com" || bare === "fd.localhost";
}

/** Preview chrome for /mock/... only — never on fd.antidotetransform.com */
export async function PreviewBanner() {
  const h = await headers();
  if (isFdRequest(h.get("host"), h.get("x-antidote-site"))) return null;

  return (
    <div className="fdm-banner">
      <strong>Ephemeral preview</strong>
      <span>
        Full offering landings · deal-cycle shown in content, not as a filter
      </span>
    </div>
  );
}
