import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../config/URL";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  const handleFirstName = async () => {
    const res = await axios.get(URL + `/user/info`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setFirstName(res.data.firstName);
  };

  useEffect(() => {
    handleFirstName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="flex justify-between shadow h-14">
      <div className="flex flex-col justify-center h-full ml-4">PayNode</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4 font-bold">
          Hello {firstName}
        </div>
        <div className="flex justify-center w-12 h-12 mt-1 mr-2 rounded-full bg-slate-200">
          <div className="flex flex-col justify-center h-full text-xl">
            {firstName.charAt(0)}
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <Button label={"Logout"} onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};
