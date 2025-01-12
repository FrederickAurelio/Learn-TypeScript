import { useEffect, useRef } from "react";
import useGlobal from "./useGlobal";
import { type VipName } from "./lib/types";

type Quantity = 100 | 200 | 500;

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  count: number;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, name: string) => void;
  variant: "primary" | "secondary" | "destructive";
  money: {
    asset: "USD" | "EUR" | "CNY";
    cash: number;
    own: string;
  };
  quantity?: Quantity;
  names: [string, string, string, string];
};

function Button({
  count,
  handleClick,
  variant,
  money,
  quantity = 100,
  names,
  ...rest
}: ButtonProps) {
  const { global, plus } = useGlobal();
  const globalName = global.name as VipName;

  useEffect(() => {
    plus();
  }, []);

  const color =
    variant === "destructive"
      ? "bg-red-300"
      : variant === "primary"
        ? "bg-cyan-400"
        : ("bg-white" as const);

  const ref = useRef<HTMLButtonElement>(null);

  function testArray(array: string[]): number {
    array.forEach((a) => console.log(a));
    return array.length;
  }

  const num: number = 8 * testArray(names) + count;
  console.log(num);
  return (
    <>
      <button
        {...rest}
        ref={ref}
        onClick={(e) => handleClick(e, "TestPassing")}
        className={`${color} border-2 border-red-400 px-4 py-2 font-bold text-blue-700`}
      >
        {count} + {quantity}
      </button>
      <p>
        {money.own}, {money.cash * count + quantity} {money.asset}
      </p>
      <p>
        {globalName} and {global.num}
      </p>
    </>
  );
}

export default Button;
