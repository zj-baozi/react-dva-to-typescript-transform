import { Effect } from "dva";
import { Reducer } from "redux";
type CollectionStateType = {};
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
  state: {},
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
