import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event); // { sub, email, name }
  if (!body?.sub || !body?.email) {
    throw createError({ statusCode: 400, statusMessage: "sub and email required" });
  }

  const runtime = useRuntimeConfig();
  const DIRECTUS_URL = runtime.DIRECTUS_URL || process.env.DIRECTUS_URL;
  const DIRECTUS_TOKEN = runtime.DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN;
  if (!DIRECTUS_TOKEN) {
    throw createError({ statusCode: 500, statusMessage: "DIRECTUS_TOKEN not set" });
  }

  const existing = await $fetch(
    `${DIRECTUS_URL}/items/profiles?filter[auth0_sub][_eq]=${encodeURIComponent(body.sub)}`,
    {
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
    }
  );

  if (existing?.data?.length) {
    const id = existing.data[0].id;
    const updated = await $fetch(`${DIRECTUS_URL}/items/profiles/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
      body: { email: body.email, name: body.name ?? null },
    });
    return { ok: true, action: "update", profile: updated };
  } else {
    const created = await $fetch(`${DIRECTUS_URL}/items/profiles`, {
      method: "POST",
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
      body: {
        auth0_sub: body.sub,
        email: body.email,
        name: body.name ?? null,
        role: "Student",
      },
    });
    return { ok: true, action: "create", profile: created };
  }
});

