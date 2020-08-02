export type SelectorsData = {
  url: string;
  name: string;
  country: string;
  currency?: string;
  lists: ProductListItem[];
};

export type ProductListItem = {
  language: string;
  currency?: string;
  list: ProductList;
};

export type ProductList = {
  name?: string;
  productType: ProductType;
  url: string;
  paginate?: Paginate;
  item: Selector;
  product: ListProductSelector;
};

export type PriceSelector =
  | {
      price?: Selector;
      integerPart?: Selector;
      decimalPart?: Selector;
    }
  | string;

export type ListProductSelector = {
  url: Selector;
  title?: Selector;
  description?: Selector;
  image?: Selector;
  price?: Selector;
  currency?: Selector;
};

export type ProductSelector = {
  url?: Selector;
  title: Selector;
  description?: Selector;
  image?: Selector;
  price: Selector;
  currency?: Selector;
};

export type Paginate = { next: Selector };

export type Selector =
  | {
      type?: "html" | "json";
      selector: string;
      parent?: string;
    }
  | string;

export type ProductType = "smartphone";
