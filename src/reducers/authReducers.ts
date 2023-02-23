interface Action {
  type: string;
  payload: any;
}

interface Exam {
  testNo: number;
  correct: number;
  score: number;
}

export interface AuthState {
  accessToken?: string;
  user?: {
    _id?: string;
    name?: string;
    email?: string;
    tests?: Exam[];
  };
}

const initialState = {
  accessToken: "",
  user: {
    _id: "",
    name: "",
    email: "",
    tests: [],
  },
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return payload;
    case "UPDATE_USER_TESTS":
      return {
        ...state,
        user: {
          ...state.user,
          tests: payload,
        },
      };
    case "LOGOUT":
      localStorage.clear();
      return initialState;
    default:
      return state;
  }
};
