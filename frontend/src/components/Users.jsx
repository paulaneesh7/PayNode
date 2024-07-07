/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { URL } from "../config/URL";
import { useNavigate } from "react-router-dom";


export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const getUsers = async () => {
    try {
      const res = await axios.get(URL + `/user/bulk?filter=` + filter);
      // console.log(res.data.user);
      setUsers(res.data.user);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, [filter]);


  return (
    <>
      <div className="mt-6 text-lg font-bold">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  const handleSendMoney = (id, name) => {
    navigate(`/send?id=${id}&name=${name}`);
  };

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="flex justify-center w-12 h-12 mt-1 mr-2 rounded-full bg-slate-200">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          label={"Send Money"}
          onClick={() => handleSendMoney(user._id, user.firstName)}
        />
      </div>
    </div>
  );
}
