import { Avatar, Text } from "@nextui-org/react";
import { motion } from "framer-motion";

const MotionAvatar = motion(Avatar);
const MotionText = motion(Text);

const Contact = (props) => {
  const itemA = {
    hidden: { scale: 0.7, opacity: 0 },
    show: { scale: 1, opacity: 1 },
  };

  return (
    <motion.div
      className="card_config"
      variants={itemA}
      whileInView="show"
      viewport={{ once: true }}
    >
      <MotionAvatar css={{ w: "fit-content" }} src={props.image} />
      <MotionText
        color="$pink800"
        css={{ w: "fit-content", fontFamily: "Neon3" }}
      >
        {props.name}
      </MotionText>
    </motion.div>
  );
};

export default Contact;
