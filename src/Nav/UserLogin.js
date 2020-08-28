import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { auth, provider } from "./../firebase";

import "./UserLogin.scss";

const UserLogin = (props) => {
  const [user, setUser] = useState(null);

  const loginHandler = () => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      setUser(user);
    });
  };

  const logoutHandler = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  //Check if User is logged in
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      //Set User if Logged in
      user ? setUser(user) : setUser(null);
    });
  });

  const UserLoginContainer = () => {
    if (user) {
      return (
        <div className={`logout-container ${props.type}`}>
          <Button
            color="inherit"
            onClick={logoutHandler}
            variant={props.type === "drawer" ? "contained" : ""}
          >
            Logout
          </Button>
          <Avatar src={user.photoURL} />
        </div>
      );
    } else {
      return (
        <Button
          color="inherit"
          onClick={loginHandler}
          variant={props.type === "drawer" ? "contained" : ""}
        >
          Login
        </Button>
      );
    }
  };

  return <UserLoginContainer />;
};

export default UserLogin;
