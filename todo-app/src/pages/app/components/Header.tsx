import { UserButton } from "@clerk/clerk-react";

const header = () => {
  return (
    <div>
      <div>
        <h1>Notify</h1>
        <UserButton />
      </div>
    </div>
  );
};

export default header;
