import { useState, useEffect, useRef } from "react";
import { Text, Button, Loading } from "@nextui-org/react";
import { motion } from "framer-motion";
import Contact from "../components/UI/Contact";

import "./HomeRoute.css";

const MotionText = motion(Text);
const MotionButton = motion(Button);

const HomeRoute = (props) => {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [intSec, setIntSec] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("You have an error");

  const scrollRef = useRef();

  // Fetch users list
  useEffect(() => {
    setLoading(true);
    console.log("effect running");
    fetch(
      `https://randomuser.me/api/?page=${page}&results=20&seed=abc&inc=name,picture`
    )
      .then((res) => {
        if (!res.ok) {
          console.log("Not okay");
        }
        return res.json();
      })
      .then((data) => {
        let newData = [...fetchedUsers, ...data.results];
        setFetchedUsers(newData);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, [page]);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIntSec(true);
      }
    });

    observer.observe(scrollRef.current);
  }, []);

  useEffect(() => {
    if (intSec && !loading && fetchedUsers.length > 0) {
      console.log("intersecting");
      const pageInc = page + 1;
      console.log(pageInc);
      setPage(pageInc);
      setIntSec(false);
    }
  }, [intSec, fetchedUsers]);

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

  return (
    <div className="homepage_div">
      <MotionText
        h4
        css={{ fontFamily: "Neon", mt: "20px", mb: "10px" }}
        initial={{ opacity: 0, y: "-25%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" }}
      >
        Welcome, generic
      </MotionText>
      <MotionButton
        flat
        auto
        rounded
        color="error"
        css={{ fontFamilt: "Neon" }}
        size="sm"
        onClick={props.setAuthFalse}
        initial={{ opacity: 0, y: "-25%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" }}
        whileHover={{
          scale: 1.1,
          transition: { type: "spring", duration: 0.1 },
        }}
        whileTap={{
          scale: 0.9,
          transition: { type: "spring", duration: 0.1 },
        }}
      >
        LOGOUT
      </MotionButton>
      <motion.div
        className="contact_list"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerInput}
      >
        {fetchedUsers.length > 0 &&
          fetchedUsers.map((doc) => {
            return (
              <Contact
                name={`${doc.name.title} ${doc.name.first} ${doc.name.last}`}
                image={doc.picture.thumbnail}
              />
            );
          })}
      </motion.div>
      {error && (
        <MotionText
          css={{
            fontFamily: "Neon3",
            py: "5px",
            px: "10px",
            br: "20px",
            bgColor: "$red100",
          }}
          color="error"
          initial={{ opacity: 0, y: "-25%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" }}
        >
          {errorMsg}
        </MotionText>
      )}
      {loading && (
        <div>
          <Loading type="spinner" css={{ m: "20px" }} />
        </div>
      )}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default HomeRoute;
