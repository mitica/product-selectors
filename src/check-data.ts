import { extractList } from "product-extractor";
import { getSupportedCountries, getDataNames, getData } from "./index";

const countries = getSupportedCountries();

export const asyncIteratorToArray = async <T>(iterator: AsyncIterable<T>) => {
  const list: T[] = [];
  for await (const item of iterator) {
    list.push(item);
  }

  return list;
};

const checkDataLists = async (data: any) => {
  for (const { list } of data.lists) {
    let result = "✓";
    try {
      const results = await asyncIteratorToArray(
        extractList(list.url, {
          itemSelector: list.item,
          schemaVersion: data.version,
          productSelector: list.product
        })
      );
      result = `${results.length} products`;
    } catch (error) {
      result = error.message;
    }
    console.log(`\t\t- ${list.url}: ${result}`);
  }
};

async function check() {
  for (const country of countries) {
    console.log(`country ${country}:`);
    const names = getDataNames({ country });
    for (const name of names) {
      console.log(`\t${name}:`);
      const json = await getData({ country, name });
      const data = JSON.parse(json);
      await checkDataLists(data);
    }
  }
}

check();
