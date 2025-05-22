import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import type { InsertLocation } from "../schema/location";

import db from "..";
import { location } from "../schema/location";

const nanoid = customAlphabet("1234567890abcdefghiklmnopqrstuvwxyz", 5);

export async function findLocationByName(existing: InsertLocation, userId: number) {
  return await db.query.location.findFirst({
    where: and(eq(location.name, existing.name), eq(location.userId, userId)),
  });
}

export async function findLocationBySlug(slug: string) {
  return await db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function findUniqueSlug(slug: string) {
  let existing = !!(await findLocationBySlug(slug));

  while (existing) {
    const id = nanoid();
    const idSlug = `${slug}-${id}`;

    existing = !!(await db.query.location.findFirst({
      where: eq(location.slug, idSlug),
    }));

    if (!existing) {
      return idSlug;
    }
  }

  return slug;
}

export async function insertLocation(insertable: InsertLocation, slug: string, userId: number) {
  const [created] = await db.insert(location).values({
    ...insertable,
    slug,
    userId,
  }).returning();

  return created;
}
