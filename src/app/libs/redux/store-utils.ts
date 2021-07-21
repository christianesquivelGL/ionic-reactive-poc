export interface StoreEntity<T> {
  entity: T;
  loading: boolean;
  error: boolean;
}

export const storeEntityInitialState: StoreEntity<any> = {
  entity: undefined,
  loading: false,
  error: false,
};

export interface StoreList<T> {
  entities: T[];
  loading: boolean;
  loadingMore: boolean;
  error: boolean;
  allLoaded: boolean;
}

export const storeListInitialState: StoreList<any> = {
  entities: [],
  loading: false,
  loadingMore: false,
  error: false,
  allLoaded: false,
};
