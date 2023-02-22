interface Action {
  type: string;
  payload: any;
}

interface Test {
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
    tests?: Test[];
  };
}

const initialState = {
  accessToken: "",
  user: null,
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return payload;
    case "LOGOUT":
      localStorage.clear();
      return initialState;
    default:
      return state;
  }
};
