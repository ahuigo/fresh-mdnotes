/** @jsx h */
import { createContext, h } from "preact";
import * as React from "preact/hooks";

const countCtx = createContext<[number, (action: string) => void]>([
  0,
  () => {},
]);

function ChildButton() {
  const [count, countLen] = React.useContext(countCtx);
  console.log({ child1: count });
  return <div onClick={() => countLen("abc")}>click countByte: {count}</div>;
}
function ShowCount() {
  const [count] = React.useContext(countCtx);
  console.log({ child2: count });
  return <div>child2: {count}</div>;
}

export default function Home() {
  const [count, countLen] = React.useReducer(
    (_: number, a: string) => a.length,
    1,
  );
  return (
    <div>
      <ShowCount />
      <countCtx.Provider value={[count, countLen]}>
        <ChildButton />
        <ShowCount />
      </countCtx.Provider>
    </div>
  );
}
