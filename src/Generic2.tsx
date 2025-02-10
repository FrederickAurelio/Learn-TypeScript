import { ForwardedRef, forwardRef, ReactNode, useRef } from "react";

type ListProps<O extends { id: string }> = {
  options: O[];
  renderOption: (option: O) => ReactNode;
};

function ListInner<O extends { id: string }>(
  { options, renderOption }: ListProps<O>,
  ref: ForwardedRef<HTMLUListElement>,
) {
  return (
    <ul ref={ref} className="h-80 overflow-y-auto">
      {options.map((option) => (
        <li
          className="mb-2 border-2 border-black bg-stone-200 p-2"
          key={option.id}
        >
          {renderOption(option)}
        </li>
      ))}
    </ul>
  );
}

const List = forwardRef(ListInner) as <O extends { id: string }>(
  props: ListProps<O> & { ref: ForwardedRef<HTMLUListElement> },
) => ReactNode;

export function Example() {
  const listRef = useRef<HTMLUListElement>(null);
  return (
    <>
      <button
        className="my-4 rounded-md bg-stone-800 p-2 text-stone-100"
        onClick={() =>
          listRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        Scroll To Top
      </button>
      <List
        ref={listRef}
        options={[
          { id: "1", label: "Pen", price: 2 },
          { id: "2", label: "Notebook", price: 8 },
          { id: "3", label: "Pencil", price: 1 },
          { id: "4", label: "Eraser", price: 0.5 },
          { id: "5", label: "Marker", price: 3 },
          { id: "6", label: "Highlighter", price: 4 },
          { id: "7", label: "Stapler", price: 6 },
          { id: "8", label: "Paper Clips", price: 1.5 },
          { id: "9", label: "Scissors", price: 5 },
          { id: "10", label: "Glue Stick", price: 2.5 },
          { id: "11", label: "Liquid Glue", price: 3.5 },
          { id: "12", label: "Fan", price: 5 },
          { id: "13", label: "Color Pen", price: 2.5 },
        ]}
        renderOption={(option) => (
          <>
            <p>
              {option.label}, {option.price}
            </p>
          </>
        )}
      />
    </>
  );
}

export default List;
