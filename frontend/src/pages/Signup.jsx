import axios from "axios";
import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import { URL } from "../config/URL";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await axios.post(URL + `/user/signup`, {
      username,
      firstName,
      lastName,
      password,
    });
    console.log(res.data);
    localStorage.setItem("token", res.data.token);
    navigate("");
  };

  return (
    <div className="flex justify-center h-screen bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="p-2 px-4 text-center bg-white rounded-lg w-80 h-max">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            label={"First Name"}
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            label={"Last Name"}
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputBox
            label={"Email"}
            placeholder="johndoe@gmail.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder="123456"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button label={"Sign up"} onClick={handleSignup} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
