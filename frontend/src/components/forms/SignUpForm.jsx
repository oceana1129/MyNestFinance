import React from "react";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UserAuth } from "../../context/AuthContext.jsx";

import InputText from "../data-input/InputText.jsx";
import CardStandard from "../data-display/CardStandard.jsx";
import HeaderStandard from "../data-display/HeaderStandard.jsx";
import CheckmarkTOS from "../actions/CheckmarkTOS.jsx";
import Button from "../actions/Button.jsx";
import { Mail, Lock } from "lucide-react";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tos, setTos] = useState(false);
  const [error, setError] = useState("");

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const isValid = email.length > 5 && password.length > 0 && tos === true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      setError("Please complete all required fields.");
      return;
    }

    setError("");
    try {
      await createUser(email, password);
      navigate("/onboarding");
    } catch (error) {
      setError("There was an error signing you up");
      console.error({ message: "Sign up handle submit error", error });
    }
  };

  return (
    <CardStandard
      content={
        <>
          <HeaderStandard
            header="Create your nest"
            text="Start budgeting for free! No card required."
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
              <CheckmarkTOS checked={tos} onChange={setTos} />
            </fieldset>

            <Button
              text="Sign up"
              size="large"
              onClick={handleSubmit}
              disabled={!isValid}
            />
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log In.
            </Link>
          </p>
        </>
      }
    />
  );
};

export default SignUpForm;
