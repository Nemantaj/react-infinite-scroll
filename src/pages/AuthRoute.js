import { Text } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";
import LoginCard from "../components/auth/LoginCard";

import "./AuthRoute.css";

const MotionText = motion(Text);

const AuthRoute = (props) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const loginHandler = (username, password) => {
    if (username === "generic" && password === "12345678") {
      setIsInvalid(true);
      localStorage.setItem("auth", true);
      props.setAuthTrue();
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <div className="login_div">
      <MotionText
        h4
        css={{ fontFamily: "Neon2" }}
        initial={{ opacity: 0, y: "-25%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" }}
      >
        Log in to your account.
      </MotionText>
      <LoginCard isInvalid={isInvalid} loginHandler={loginHandler} />
    </div>
  );
};

export default AuthRoute;
