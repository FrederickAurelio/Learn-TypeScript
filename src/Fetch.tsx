import { useEffect, useState } from "react";
import { z } from "zod";

const dataSchema = z.array(
  z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string().transform((t) => t.toUpperCase()),
    completed: z.boolean(),
    rates: z.record(z.string(), z.number()).optional(),
    // Example structure: { "USD": 1.0, "EUR": 0.85 }
  }),
);

type DataType = z.infer<typeof dataSchema>;

function Fetch() {
  const [data, setData] = useState<DataType | null>(null);
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = (await res.json()) as DataType;
        const parsedData = dataSchema.parse(data);
        setData(parsedData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Validation Error:", error.errors);
        } else {
          console.error("Fetch or Other Error:", error);
        }
      }
    }
    getData();
  }, []);
  if (!data) return null;
  return <div>{data.map((d) => d.id)}</div>;
}

export default Fetch;
