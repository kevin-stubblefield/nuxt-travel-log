import type { User } from "better-auth";

declare module "h3" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: Omit<User, "id"> & { id: number };
  }
}

export type LatLongItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: number;
  name: string;
  description: string | null;
} & LatLongItem;
