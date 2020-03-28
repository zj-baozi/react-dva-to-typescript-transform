export default {
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
