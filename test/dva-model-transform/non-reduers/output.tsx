import { Effect } from "dva";
type CollectionStateType = {
  limitIncreaseAmount: null;
  maxLevel: null;
};
type CollectionModelType = {
  namespace: string;
  state: CollectionStateType;
  effects: {
    init: Effect;
  };
};
const Models: CollectionModelType = {
  namespace: "collection",
  state: {
    limitIncreaseAmount: null,
    maxLevel: null
  },
  effects: {
    *init(_, { call, put }) {
      return true;
    }
  }
};
export default Models;
