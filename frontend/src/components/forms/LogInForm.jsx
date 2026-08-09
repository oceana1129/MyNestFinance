import React from "react";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UserAuth } from "../../context/AuthContext";

import InputText from "../data-input/InputText.jsx";
import CardStandard from "../data-display/CardStandard.jsx";
import HeaderStandard from "../data-display/HeaderStandard.jsx";
import Checkbox from "../actions/Checkbox.jsx";
import Button from "../actions/Button.jsx";
import { Mail, Lock } from "lucide-react";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPersist, setLoginPersist] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const isValid = email.length > 5 && password.length > 0;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      setError("Please complete all required fields.");
      return;
    }

    setError("");
    try {
      await signIn(email, password);
      navigate("/plan");
    } catch (error) {
      setError("There was an error logging you in");
      console.error({ message: "Log In handle submit error", error });
    }
  };

  return (
    <CardStandard
      content={
        <>
          <HeaderStandard
            header="Welcome back!"
            text="Good to see you! Your nest is waiting."
            textAlign="center"
          />

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {error && <p className="text-rose-700">{error}</p>}
            <fieldset className="flex gap-4 flex-col">
              <InputText
                labelText="Email"
                labelIcon={Mail}
                inputType="email"
                placeholderText="your@email.com"
                inputValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputText
                labelText="Password"
                labelIcon={Lock}
                inputType="password"
                placeholderText="password"
                inputValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <div className="flex gap-4">
              <Checkbox checked={loginPersist} onChange={setLoginPersist} />
              <p onClick={() => setLoginPersist(!loginPersist)}>
                Keep me logged in.
              </p>
            </div>
            <Button
              text="Log in"
              size="large"
              onClick={handleSubmit}
              disabled={!isValid}
            />
          </form>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up for free.
            </Link>
          </p>
        </>
      }
    />
  );
};

export default LogInForm;
