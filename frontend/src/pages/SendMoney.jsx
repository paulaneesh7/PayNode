import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../config/URL";
import { useState } from "react";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [amount, setAmount] = useState(0);

  const handleTransferAmount = async () => {
    const res = await axios.post(
      URL + `/account/transfer`,
      { to: id, amount },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="flex flex-col justify-center h-full">
        <div className="max-w-md p-4 space-y-8 bg-white border rounded-lg shadow-lg h-min text-card-foreground w-96">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                <span className="text-2xl text-white">
                  {name ? name.charAt(0) : "A"}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">
                {name || "Friend's Name"}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background"
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button
                className="justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white transition-colors bg-green-500 rounded-md ring-offset-background"
                onClick={handleTransferAmount}
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
