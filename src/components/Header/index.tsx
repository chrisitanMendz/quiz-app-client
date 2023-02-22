import { useDispatch, useSelector } from "react-redux";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="fixed top-0 w-screen bg-cyan-800 text-white">
      <div className="container flex items-center px-5 py-2">
        <div className="w-10 h-10 bg-cyan-700 grid place-items-center rounded-lg">
          <ClipboardDocumentCheckIcon className="w-5 h-5 text-white" />
        </div>
        <p className="text-sm font-semibold ml-2">Test App</p>
        <button
          className="text-sm font-semibold ml-auto bg-cyan-900 px-3 py-1 rounded-lg duration-300 hover:brightness-75"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
