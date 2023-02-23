import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "@heroicons/react/24/solid";
import { Navigate } from "react-router-dom";
import { getAllTest, startTest } from "../../actions/testActions";
import { RootState } from "../../reducers";
import { useEffect } from "react";
import { AnyAction, Dispatch } from "redux";
import { getUpdatedTests } from "../../actions/authActions";
import axiosInstance from "../../utils/Axios";

const Home = () => {
  const dispatch = useDispatch();
  const { test, auth, allTest } = useSelector((state: RootState) => state);

  const totalScore = auth.user?.tests?.reduce((p, c) => (p += c.score), 0);

  useEffect(() => {
    getAllTest(dispatch);
    getUpdatedTests(String(auth.user?.email), dispatch);
  }, []);

  if (test?.currentTest) {
    return <Navigate to="test" />;
  }

  const takeTest = (id: number, dispatch: Dispatch<AnyAction>) => {
    startTest(id, dispatch);
  };

  const addNewQuestion = async () => {
    try {
      const res = await axiosInstance.post("test/addquestion");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-6">
      <div className="container">
        <div className="flex items-center py-4 px-4 w-fit bg-white rounded-lg">
          <h1 className="text-xl font-semibold">{auth.user?.name}</h1>
          <div className="ml-3 rounded-lg flex items-center">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <p className="font-semibold ml-1">{totalScore}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h1 className="container text-2xl font-extrabold text-gray-900">My Quizes</h1>
        <div className="container px-0 flex flex-wrap justify-center pt-2">
          {allTest.tests
            .sort((a, b) => Number(a.testNo) - Number(b.testNo))
            .map((item) => {
              const allScore = item?.questions?.reduce((p, c) => (p += c.score), 0);
              const doneQuiz = auth.user?.tests?.some((x) => x.testNo === item.testNo);

              return (
                <div
                  key={item._id}
                  className="flex-1 max-w-[250px] min-w-[325px] bg-white shadow-sm rounded-lg p-3 mx-5 mb-9"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Test No.</p>
                    <p className="font-semibold">{item.testNo}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Number of Questions</p>
                    <p className="font-semibold">{item.questions?.length}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Total Score</p>
                    <p className="font-semibold">{allScore}</p>
                  </div>
                  <div className="flex justify-center pt-5">
                    <button
                      className={`py-1 px-3 text-white rounded-lg text-sm font-semibold duration-300 hover:brightness-95
                    ${doneQuiz ? "bg-green-700" : "bg-cyan-700"}`}
                      onClick={() => takeTest(Number(item?.testNo), dispatch)}
                    >
                      {doneQuiz ? "Retake" : "Take Quiz"}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {auth.user?.tests && auth.user?.tests.length !== 0 && (
        <div className="container">
          <h1 className="text-2xl font-extrabold text-gray-900">Quiz History</h1>
          <div className="bg-white shadow-sm rounded-lg mt-2">
            {auth.user?.tests
              ?.sort((a, b) => a.testNo - b.testNo)
              .map((item) => {
                const activeQuiz = allTest.tests.find((x) => x.testNo === item.testNo);
                const totalQuestion = activeQuiz?.questions?.length;

                return (
                  <div key={item.testNo} className="py-4 px-4 flex items-center border-b-[1px] border-gray-200">
                    <h1 className="font-bold text-lg">Quiz #{item.testNo}</h1>
                    <div className="ml-auto flex items-center">
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                      <p className="font-semibold ml-1">{item.score}</p>
                    </div>
                    <p className="mx-4 sm:mx-1">~</p>
                    <p className="text-sm">
                      Correct {item.correct} out of {totalQuestion}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Check the backend side if you wan't to add new questions */}
      {/* <button onClick={addNewQuestion}>Add Question</button> */}
    </div>
  );
};

export default Home;
