import { combineReducers } from "redux";
import authReducers, { AuthState } from "./authReducers";
import testReducers, { TestState } from "./testReducers";

export interface RootState {
  auth: AuthState;
  test: TestState;
}

export default combineReducers({
  auth: authReducers,
  test: testReducers,
});
