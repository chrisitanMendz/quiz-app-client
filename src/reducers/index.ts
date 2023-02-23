import { combineReducers } from "redux";
import allTestReducer, { AllTestState } from "./allTestReducer";
import authReducers, { AuthState } from "./authReducers";
import testReducers, { TestState } from "./testReducers";

export interface RootState {
  auth: AuthState;
  test: TestState;
  allTest: AllTestState;
}

export default combineReducers({
  auth: authReducers,
  test: testReducers,
  allTest: allTestReducer,
});
