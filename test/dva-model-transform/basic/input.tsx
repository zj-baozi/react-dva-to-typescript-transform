export default {
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
