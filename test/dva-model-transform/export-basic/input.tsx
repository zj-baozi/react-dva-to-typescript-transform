const TempModel = {
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
