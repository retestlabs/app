import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [
      { id: "1", text: "Buy milk", done: false },
      { id: "2", text: "Buy eggs", done: false },
    ];
  }),
});
