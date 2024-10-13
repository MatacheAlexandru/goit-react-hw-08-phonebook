import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";

const UserMenu = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.user?.email);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <p>{email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
