/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { URL } from "../config/URL";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await axios.get(URL + `/user/bulk`);
    // console.log(res.data.user);
    setUsers(res.data.user);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="mt-6 text-lg font-bold">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
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
        <Button label={"Send Money"} />
      </div>
    </div>
  );
}
