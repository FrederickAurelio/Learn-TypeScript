import { useEffect, useState } from "react";
import Button from "./Button";
import { GlobalProvider } from "./useGlobal";
import GenericButton from "./GenericButton";
import Fetch from "./Fetch";
import { Example } from "./Generic2";

// Generics better than any because we can set the function will receive and return with the same type? if we use any it will lose the return type?
// other reason is we can catch the error if we use generics, but if we use any, it will not catch error at compiler, but error in runtime
function convertToArray<T>(value: T): T[] {
  return [value];
}
convertToArray(5);
convertToArray("Hello");
// You can also create a generics componets, take the same data type, example in Generics Buttons

type User = {
  username?: string;
  age: number;
  gender: "male" | "female";
};

// type User = {
//   username?: string;
//   age: number;
//   gender: "male" | "female";
// } | null;

type Anonymous = Omit<User, "username">;

const constArray = [
  "This makes",
  "The Array to",
  "Read Only",
  "and will be only this text",
] as const;

function App() {
  const [count, setCount] = useState<number>(0);
  const [user, setUser] = useState<User | Anonymous | null>(null);

  useEffect(() => {
    setUser({ age: 20, gender: "male" });
    console.log(user);
  }, []);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>, name: string) {
    console.log(e); // Logs the MouseEvent
    console.log(name);
    setCount((c) => c + 1); // Increment count
  }

  return (
    <GlobalProvider>
      <div className="px-10 py-10">
        <Button
          disabled={false}
          type="button"
          money={{
            own: "Dikky",
            asset: "USD",
            cash: 10,
          }}
          variant="primary"
          handleClick={handleClick}
          count={count}
          names={["Mike", "Bob", "Alice", "Jay"]}
        />
        <span>{user && "username" in user ? user.username : "Anonymous"}</span>
        {constArray.map((s) => (
          <p>{s}</p>
        ))}
        <GenericButton countValue={5} countHistory={[10, 10]}></GenericButton>
        <GenericButton
          countValue={"5"}
          countHistory={["5", "8"]}
        ></GenericButton>
        <Fetch />
        <Example />
      </div>
    </GlobalProvider>
  );
}

export default App;
