import React, { useEffect, useState } from "react";
import { XMarkIcon, StarIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../reducers";
import { submitAnswer } from "../../actions/testActions";

const StartTest = () => {
  const dispatch = useDispatch();
  const { currentTest, examInfo } = useSelector((state: RootState) => state.test);
  const { user } = useSelector((state: RootState) => state.auth);
  const [curQuestion, setCurQuestion] = useState(1);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [myAnswer, setMyAnswer] = useState<any>({
    testNo: currentTest?.testNo,
    myAnswers: [],
  });

  const totalScore = currentTest?.questions?.reduce((p, c) => (p += c.score), 0);
  const totalQuestion = currentTest?.questions?.length;
  const current = currentTest?.questions?.find((item) => item.qId === Number(curQuestion));

  useEffect(() => {
    if (totalQuestion === myAnswer.myAnswers.length) {
      submitAnswer(myAnswer, user?.email, dispatch);
    }
  }, [myAnswer]);

  if (!currentTest) {
    return <Navigate to="/dashboard" />;
  }

  const resetTest = () => {
    dispatch({ type: "RESET_TEST" });
  };

  const submit = () => {
    if (curQuestion > Number(totalQuestion)) {
      dispatch({ type: "RESET_TEST" });
    }
    setCurQuestion((prev) => (prev !== Number(totalQuestion) + 1 ? prev + 1 : prev));
    setMyAnswer((prev: any) => ({
      ...prev,
      myAnswers: [
        ...prev.myAnswers,
        {
          questionNo: curQuestion,
          answer: currentAnswer,
        },
      ],
    }));
    setCurrentAnswer("");
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)]">
      <div className="container flex items-center justify-between mt-10">
        <div className="py-[4px] px-4 flex items-center bg-white rounded-lg">
          <StarIcon className="w-5 h-5 text-yellow-400" />
          <p className="text-sm font-semibold ml-1">{totalScore}</p>
        </div>
        <h1 className="text-lg font-semibold">Quiz #{currentTest.testNo}</h1>
        <button
          className="w-9 h-9 grid place-items-center rounded-full bg-white shadow-md duration-300 hover:brightness-90"
          onClick={resetTest}
        >
          <XMarkIcon className="w-5 h-5 text-gray-800" />
        </button>
      </div>
      <div
        className="hidden items-center w-full px-5 max-w-lg mx-auto
        sm:flex sm:my-8"
      >
        <div className="w-full h-3 bg-white rounded-full mr-2 flex">
          <div
            className="h-3 bg-[#31CD63] rounded-full duration-300"
            style={{
              flex: totalQuestion ? curQuestion / (totalQuestion + 1) : 0,
            }}
          ></div>
        </div>
        <p className="text-[#757575] text-sm font-semibold">
          {curQuestion}/{totalQuestion && totalQuestion + 1}
        </p>
      </div>
      {totalQuestion !== curQuestion - 1 ? (
        <div className="flex-1 pt-9 sm:pt-0">
          <div className="mx-auto px-5 w-fit">
            <h1 className="text-[22px] font-semibold text-center max-w-xl self-center mb-8">{current?.question}</h1>
            <div className="max-w-lg mx-auto">
              {current?.choices.map((item, index) => (
                <div
                  key={item}
                  className={`
                    flex items-center px-4 py-3 rounded-lg mb-3 cursor-pointer duration-300
                    ${currentAnswer === item ? "bg-[#45c486]" : "bg-white"}
                  `}
                  onClick={() => setCurrentAnswer(item)}
                >
                  <div
                    className={`
                      w-9 h-9 rounded-full font-semibold grid place-items-center mr-4 duration-300
                      ${currentAnswer === item ? "bg-white" : "bg-prim-color"}
                    `}
                  >
                    {currentAnswer === item ? (
                      <CheckIcon className="w-7 h-7 text-[#31CD63]" />
                    ) : (
                      String.fromCharCode(96 + index + 1).toUpperCase()
                    )}
                  </div>
                  <p
                    className={`
                      font-semibold duration-300
                      ${currentAnswer === item && "text-white"}
                    `}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 px-5 flex items-center">
          <div className="flex-1 max-w-lg bg-white mx-auto left-0 right-0 rounded-lg">
            <div className="py-4 px-4 flex items-center border-b-[1px] border-gray-200">
              <div className="w-9 h-9 rounded-full bg-prim-color font-semibold grid place-items-center mr-4">
                <StarIcon className="w-6 h-6 text-[#31CD63]" />
              </div>
              <p className="text-lg text-[#060710]">GAIN SCORE</p>
              <p className="ml-auto text-lg font-bold text-[#060710]">{examInfo?.score}</p>
            </div>
            <div className="py-4 px-4 flex items-center">
              <div className="w-9 h-9 rounded-full bg-prim-color font-semibold grid place-items-center mr-4">
                <CheckIcon className="w-6 h-6 text-[#31CD63]" />
              </div>
              <p className="text-lg text-[#060710]">TOTAL SCORE</p>
              <p className="ml-auto text-lg font-bold text-[#060710]">{examInfo?.correct}</p>
            </div>
          </div>
        </div>
      )}
      <div
        className="bg-white py-4 
        sm:bg-transparent"
      >
        <div
          className="container max-w-[700px] flex justify-between 
          sm:justify-center"
        >
          <div
            className="flex items-center 
            sm:hidden"
          >
            <div className="w-[200px] h-3 bg-prim-color rounded-full mr-2 flex">
              <div
                className="h-3 bg-[#31CD63] rounded-full duration-300"
                style={{
                  flex: totalQuestion ? curQuestion / (totalQuestion + 1) : 0,
                }}
              ></div>
            </div>
            <p className="text-[#757575] text-sm font-semibold">
              {curQuestion}/{totalQuestion && totalQuestion + 1}
            </p>
          </div>
          <button
            className="
              font-semibold text-white px-16 py-2 bg-[#31CD63] rounded-lg duration-300
              disabled:bg-gray-400
              hover:brightness-90
              sm:w-full sm:max-w-lg
            "
            disabled={!(curQuestion > Number(totalQuestion)) && !currentAnswer}
            onClick={submit}
          >
            {totalQuestion &&
              (totalQuestion === curQuestion ? "FINISH" : curQuestion > totalQuestion ? "OKAY" : "CONTINUE")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartTest;
