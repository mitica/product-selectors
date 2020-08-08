import fetch from "node-fetch";
import { getSupportedCountries, getDataNames, getData } from "./index";

const countries = getSupportedCountries();

const checkData = async (data: any) => {
  for (const { list } of data.lists) {
    let result = "✓";
    try {
      const { status } = await fetch(list.url);
      result = status === 200 ? result : status.toString();
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
      const data = await getData({ country, name });
      await checkData(data);
    }
  }
}

check();
