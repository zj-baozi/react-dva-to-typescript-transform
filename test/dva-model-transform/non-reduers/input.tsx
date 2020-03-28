export default {
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
