import { Reducer } from "redux";
type CollectionStateType = {
  limitIncreaseAmount: null;
  maxLevel: null;
};
type CollectionModelType = {
  namespace: string;
  state: CollectionStateType;
  reducers: {
    setState: Reducer<CollectionStateType>;
  };
};
const Models: CollectionModelType = {
  namespace: "collection",
  state: {
    limitIncreaseAmount: null,
    maxLevel: null
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
export default Models;
