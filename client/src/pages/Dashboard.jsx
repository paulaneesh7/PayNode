import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import { URL } from "../config/URL";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [balance, setBalance] = useState("Loading...");
  const navigate = useNavigate();

  const handleBalance = async () => {
    try {
      const res = await axios.get(URL + "/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setBalance(res.data.balance.toFixed(2));
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    handleBalance();
  }, []);

  // To check whether user is logged in or not
  useEffect(() => {
    const isLogggedIn = localStorage.getItem("token") !== null;
    if (!isLogggedIn) {
      navigate("/signin");
    } 
  }, []);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
