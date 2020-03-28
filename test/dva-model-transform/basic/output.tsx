import { Effect } from "dva";
import { Reducer } from "redux";
type CollectionStateType = {
  limitIncreaseAmount: null;
  maxLevel: boolean;
  amount: string;
};
type CollectionModelType = {
  namespace: string;
  state: CollectionStateType;
  effects: {
    init: Effect;
  };
  reducers: {
    setState: Reducer<CollectionStateType>;
  };
};
const Models: CollectionModelType = {
  namespace: "collection",
  state: {
    limitIncreaseAmount: null,
    maxLevel: false,
    amount: ""
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *init(_, { call, put }) {
      return true;
    }
  }
};
export default Models;
