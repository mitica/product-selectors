import fs from "fs";
import { join } from "path";
import { promisify } from "util";
import { SelectorsData } from "./types";

const readFile = promisify(fs.readFile);

export function getSupportedCountries() {
  return ["ro"];
}

const namesCache: Map<string, string[]> = new Map();

const checkCountry = (country: string) => {
  if (typeof country !== "string" || !/^[a-z]{2}$/.test(country))
    throw new Error(`Invalid 'country' argument`);
};

const getCountryFileNames = (country: string) => {
  checkCountry(country);

  if (!namesCache.has(country)) {
    const files = fs.readdirSync(join(__dirname, "../data", country), "utf8");
    const ids = files
      .filter((item) => item.endsWith(".json"))
      .map((item) => item.replace(/\.json$/, ""));
    namesCache.set(country, ids);
  }

  return Array.from(namesCache.get(country) || []);
};

export type GetDataNamesOptions = {
  /**
   * Country code
   */
  country: string;
};

export function getDataNames({ country }: GetDataNamesOptions) {
  return getCountryFileNames(country);
}

const checkFileName = (name: string) => {
  if (typeof name !== "string" || !/^[a-zA-Z0-9_-]+$/.test(name))
    throw new Error(`Invalid 'name' argument`);
};

export type GetDataOptions = {
  /**
   * Country code
   */
  country: string;
  /**
   * File name
   */
  name: string;
};

export async function getData({
  country,
  name
}: GetDataOptions): Promise<SelectorsData> {
  checkFileName(name);

  const filePath = join(__dirname, "..", "data", country, `${name}.json`);

  const content = await readFile(filePath, "utf8");

  return JSON.parse(content) as SelectorsData;
}
