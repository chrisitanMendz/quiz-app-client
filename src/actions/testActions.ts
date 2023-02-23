import { Dispatch, AnyAction } from "redux";
import axiosInstance from "../utils/Axios";

interface Answer {
  questionNo: number;
  answer: string;
}

interface MyAnswer {
  testNo: number;
  myAnswers: Answer[];
}

export const startTest = async (id: number, dispatch: Dispatch<AnyAction>) => {
  const res: any = await axiosInstance.get(`test/start/${id}`);

  if (res?.error) {
    console.log(res);
    return;
  }
  dispatch({ type: "START_TEST", payload: res });
};

export const submitAnswer = async (data: MyAnswer, email: string | undefined, dispatch: Dispatch<AnyAction>) => {
  const res: any = await axiosInstance.post(`test/verifyAnswer/${data.testNo}`, { data, email });

  if (res.error) {
    console.log(res);
    return;
  }
  dispatch({ type: "EXAM_INFO", payload: res });
};

export const getAllTest = async (dispatch: Dispatch<AnyAction>) => {
  const res: any = await axiosInstance.get("test/all");

  if (res.error) {
    console.log(res);
    return;
  }
  dispatch({ type: "GET_ALL_TEST", payload: res });
};
