export type Schema01SelectorsData = {
  version: "01";
  url: string;
  name: string;
  country: string;
  currency?: string;
  lists: Schema01ProductListItem[];
};

export type Schema01ProductListItem = {
  language: string;
  currency?: string;
  list: Schema01ProductList;
};

export type Schema01ProductList = {
  name?: string;
  productType: Schema01ProductType;
  url: string;
  paginate?: Schema01Paginate;
  item: Schema01Selector;
  product: Schema01ListProductSelector;
};

export type Schema01ListProductSelector = {
  url: Schema01Selector;
  title?: Schema01Selector;
  description?: Schema01Selector;
  image?: Schema01Selector;
  price?: Schema01Selector;
  currency?: Schema01Selector;
};

export type Schema01PriceSelector =
  | {
      price?: Schema01Selector;
      integerPart?: Schema01Selector;
      decimalPart?: Schema01Selector;
    }
  | string;

export type Schema01ProductSelector = {
  url?: Schema01Selector;
  title: Schema01Selector;
  description?: Schema01Selector;
  image?: Schema01Selector;
  price?: Schema01Selector;
  currency?: Schema01Selector;
};

export type Schema01Paginate = { next: Schema01Selector; limit?: number };

export type Schema01Selector = string;

export type Schema01ProductType = "smartphone";
