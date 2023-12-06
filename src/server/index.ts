import { publicProcedure, router } from "./trpc";

import { z } from "zod";
import { getXataClient } from "@/lib/xata";

let xata = getXataClient();

export type AppRouter = typeof appRouter;

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [
      { id: "1", text: "Buy milk", done: false },
      { id: "2", text: "Buy eggs", done: false },
    ];
  }),
  createExperiment: publicProcedure
    .input(
      z
        .object({
          name: z.string(),
          description: z.string().optional(),
          startedAt: z.date(),
          endedAt: z.date(),
          sampleSizeAbsolute: z.number().optional(),
          sampleSizeRelative: z.number().max(1).min(0).optional(),
        })
        .refine((data) => {
          const { sampleSizeAbsolute, sampleSizeRelative } = data;
          if (!sampleSizeAbsolute && !sampleSizeRelative) {
            throw new Error(
              "Either sampleSizeAbsolute or sampleSizeRelative must be provided"
            );
          }
          return true;
        })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      let experiment = await xata.db.experiments.create(input);
      return experiment;
    }),
});
