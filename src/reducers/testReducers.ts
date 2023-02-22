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

export interface TestState {
  currentTest: {
    _id?: string;
    testNo?: number;
    questions?: question[];
  };
  examInfo?: {
    score: number;
    correct: number;
  };
}

const initialState = {
  currentTest: null,
  examInfo: null,
};

export default (state: any = initialState, { type, payload }: Action) => {
  switch (type) {
    case "START_TEST":
      return { ...state, currentTest: payload };
    case "RESET_TEST":
      return initialState;
    case "EXAM_INFO":
      return { ...state, examInfo: payload };
    default:
      return state;
  }
};
