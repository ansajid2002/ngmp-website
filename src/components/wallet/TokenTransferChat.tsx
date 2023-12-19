import Image from "next/image";
import React from "react";
import { Input, Button } from "@material-tailwind/react";

const TokenTransferChat = () => {
  const [email, setEmail] = React.useState("");
  const onChange = ({ target }) => setEmail(target.value);

  return (
    <div>
      <div className="w-full h-full border-b-2 flex items-center gap-4 justify-start px-3 py-2">
        <div className="h-9 w-9 overflow-hidden rounded-full">
          <Image
            src={"/avatarplaceholder.png"}
            width={100}
            height={100}
            alt="User Profile image"
          />
        </div>
        <div>
          <h2 className="font-medium">Ansari Afroz Ahmed</h2>
        </div>
      </div>
      {/* ------------------- */}
      <div className="h-[42vh] w-full p-2 overflow-hidden overflow-y-scroll">
        content
      </div>
      {/* -------------------- */}
      <div className="p-1">
        <div className="relative flex w-full ">
          <Input
            type="number"
            label="Enter Token Amount"
            value={email}
            onChange={onChange}
            className="pr-20 focus:ring-0"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color={email ? "gray" : "blue-gray"}
            disabled={!email}
            className="!absolute right-1 top-1 rounded"
          >
            Invite
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenTransferChat;
