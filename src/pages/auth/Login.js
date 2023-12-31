import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaTwitter, FaFacebook } from "react-icons/fa"; // Import the icons
import Card from "../../components/card/Card";

import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const previousURL = useSelector(selectPreviousURL);
  const navigate = useNavigate();

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/");
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        toast.success("Login Successful...");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // Login with Google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login Successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Login with Twitter
  const twitterProvider = new TwitterAuthProvider();
  const signInWithTwitter = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        toast.success("Login Successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Login with Facebook
  const facebookProvider = new FacebookAuthProvider();
  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        toast.success("Login Successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
            </form>

            <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>

            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle color="#fff" /> Login With Google
            </button>

            <button
            className="--btn --btn-primary --btn-block"
            onClick={signInWithTwitter}
          >
            <FaTwitter /> Login With Twitter
          </button>

          <button
            className="--btn --btn-danger --btn-block"
            onClick={signInWithFacebook}
          >
            <FaFacebook /> Login With Facebook
          </button>

          </div>

          <span className={styles.register}>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </Card>
      </section>
    </>
  );
};

export default Login;
