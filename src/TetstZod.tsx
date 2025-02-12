import { memo } from "react";
import { z } from "zod";

// Define test data
const testData = {
  userId: 10,
  title: "Learning Typescript",
  completed: true,
  awards: {
    bestSelling: 10,
    bestContent: 6,
  },
  regionalPrice: {
    USD: 5.99,
    EUR: 4.99,
  },
} as const;

// Define schema outside component for better reusability
const dataSchema = z.object({
  userId: z.number().int().positive(), // Add more specific validations
  title: z.string().min(1), // Ensure string is not empty
  completed: z.boolean(),
  awards: z.object({
    bestSelling: z.number().int().positive(),
    bestContent: z.number().int().positive(),
  }),
  regionalPrice: z.record(z.string().min(3).max(3), z.number().positive()), // Add validations for currency codes
});

// Define types for better type safety
type DataType = z.infer<typeof dataSchema>;

// Memoize the component
const TestZod = memo(() => {
  // Use try-catch for better error handling
  try {
    const parsedData = dataSchema.parse(testData) as DataType;
    console.log("[Zod] Successfully parsed data:", parsedData);

    // You can return a more meaningful UI
    return (
      <div>
        <h2>Zod Validation Test</h2>
        <p>Status: Data parsed successfully</p>
        <pre>{JSON.stringify(parsedData, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    console.error("[Zod] Validation error:", error);
    return (
      <div>
        <h2>Zod Validation Test</h2>
        <p style={{ color: "red" }}>Status: Validation failed</p>
        <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  }
});

TestZod.displayName = "TestZod"; // Add display name for better debugging

export default TestZod;
