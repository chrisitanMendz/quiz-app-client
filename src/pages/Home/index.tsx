import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getTest } from "../../actions/testActions";
import { RootState } from "../../reducers";

const Home = () => {
  const dispatch = useDispatch();
  const test = useSelector((state: RootState) => state.test);
  const auth = useSelector((state: RootState) => state.auth);

  console.log(auth.user);

  const totalScore = auth.user?.tests;

  if (test?.currentTest) {
    return <Navigate to="test" />;
  }

  const id = 1;

  const startTest = () => {
    getTest(id, dispatch);
  };

  return (
    <div className="container">
      <div>
        <h1 className="text-xl font-semibold">{auth.user?.name}</h1>
        <div></div>
      </div>
      <button onClick={startTest}>Test</button>
    </div>
  );
};

export default Home;
