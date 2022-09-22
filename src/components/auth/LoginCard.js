import { Card, Input, Button, Text } from "@nextui-org/react";
import { motion } from "framer-motion";
import { TbUser, TbLock } from "react-icons/tb";
import useInput from "../../hooks/useInput";

const MotionCard = motion(Card);
const MotionInput = motion(Input);
const MotionButton = motion(Button);
const MotionText = motion(Text);

const LoginCard = (props) => {
  const {
    inputValue: userValue,
    error: userError,
    isValid: userValid,
    inputHandler: userHandler,
    blurHandler: userBlur,
  } = useInput((value) => value !== "");
  const {
    inputValue: passValue,
    error: passError,
    isValid: passValid,
    inputHandler: passHandler,
    blurHandler: passBlur,
  } = useInput((value) => value.length >= 8);

  const loginHandler = () => {
    if (userError && passError) {
      return;
    }
    props.loginHandler(userValue, passValue);
  };

  const staggerInput = {
    hidden: { opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
        duration: 1,
      },
    },
  };

  const itemA = {
    hidden: { scale: 0.7, opacity: 0 },
    show: { scale: 1, opacity: 1 },
  };

  return (
    <MotionCard
      variant="flat"
      css={{ w: "100%", mw: "550px", p: "20px", gap: "10px" }}
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={staggerInput}
      className="login_card"
    >
      <MotionInput
        type="text"
        label={userError ? "Username is required to login." : "Username"}
        contentLeft={<TbUser />}
        aria-label="Enter your username."
        placeholder="Enter your username..."
        onChange={userHandler}
        onBlur={userBlur}
        bordered
        css={{ fontFamily: "Neon3" }}
        color={userError ? "error" : "default"}
        variants={itemA}
      />
      <MotionInput
        type="password"
        label={
          passError ? "Password must be atleast 8 characters." : "Password"
        }
        contentLeft={<TbLock />}
        aria-label="Enter your password."
        placeholder="Enter your password..."
        onChange={passHandler}
        onBlur={passBlur}
        bordered
        css={{ fontFamily: "Neon3" }}
        color={passError ? "error" : "default"}
        variants={itemA}
      />
      <MotionButton
        auto
        flat
        rounded
        color="primary"
        css={{ fontFamily: "Neon", w: "fit-content", alignSelf: "center" }}
        disabled={userValid && passValid ? false : true}
        onClick={loginHandler}
        whileHover={{
          scale: 1.04,
          transition: { type: "spring", duration: 0.1 },
        }}
        whileTap={{
          scale: 0.9,
          transition: { type: "spring", duration: 0.1 },
        }}
        variants={itemA}
      >
        LogIn
      </MotionButton>
      {props.isInvalid && (
        <MotionText
          css={{ fontFamily: "Neon3", textAlign: "center" }}
          color="error"
          variants={itemA}
        >
          Invalid username or password!
        </MotionText>
      )}
    </MotionCard>
  );
};

export default LoginCard;
