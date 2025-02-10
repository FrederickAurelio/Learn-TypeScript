import { ReactNode } from "react";

type ListProps<O extends { id: string }> = {
  options: O[];
  renderOption: (option: O) => ReactNode;
};

function List<O extends { id: string }>({
  options,
  renderOption,
}: ListProps<O>) {
  return (
    <ul>
      {options.map((option) => (
        <li key={option.id}>{renderOption(option)}</li>
      ))}
    </ul>
  );
}

function Example() {
  return (
    <>
      <List
        options={[{ id: "1", label: "label", price: 100 }]}
        renderOption={(option) => (
          <>
            <p>{option.label}</p>
            <p>{option.price}</p>
          </>
        )}
      />
    </>
  );
}

export default List;