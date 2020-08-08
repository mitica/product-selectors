import test from "ava";
import { getDataNames, getSupportedCountries, getData } from "./index";

const countries = getSupportedCountries();

countries.forEach((country) =>
  test(`getDataNames ${country}`, (t) => {
    const names = getDataNames({ country });
    t.true(names.length > 0);
  })
);

countries.forEach((country) => {
  const names = getDataNames({ country });
  names.forEach((name) =>
    test(`getData ${country}/${name}`, async (t) => {
      const json = await getData({ country, name });
      const data = JSON.parse(json);
      t.truthy(data);
      t.true("version" in data);
      t.true("name" in data);
      t.true("url" in data);
      t.true("country" in data);
      t.true(data.country === country);
    })
  );
});
