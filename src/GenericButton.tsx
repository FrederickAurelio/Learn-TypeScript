type ButtonProps<T> = {
  countValue: T;
  countHistory: T[];
};

function GenericButton<T>({ countValue, countHistory }: ButtonProps<T>) {
  console.log(countHistory);
  return <button>{String(countValue)}</button>; // in here we don't only want a string or nunber, we want it to be anything
}

export default GenericButton;
