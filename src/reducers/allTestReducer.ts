interface Action {
  type: string;
  payload: any;
}

interface question {
  answer: string;
  choices: string[];
  id: string;
  question: string;
  score: number;
  _id: string;
}

interface TestState {
  _id?: string;
  testNo?: number;
  questions?: question[];
}

export interface AllTestState {
  tests: TestState[];
}

const initialState = {
  tests: [],
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case "GET_ALL_TEST":
      return { tests: payload };
    default:
      return state;
  }
};
