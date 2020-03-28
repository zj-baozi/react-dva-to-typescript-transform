import { Effect } from "dva";
import { Reducer } from "redux";
type CollectionStateType = {
  limitIncreaseAmount: null;
  maxLevel: null;
  name: string;
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
const TempModel: CollectionModelType = {
  namespace: "collection",
  state: {
    limitIncreaseAmount: null,
    maxLevel: null,
    name: ""
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
export default TempModel;
