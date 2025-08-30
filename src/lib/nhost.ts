import { NhostClient } from "@nhost/nhost-js";

const subdomain = process.env.NHOST_SUBDOMAIN || "pqdqwjvnmwvaoggqrrur";
const region = process.env.NHOST_REGION || "eu-central-1";

export const nhost = new NhostClient({ subdomain, region });
