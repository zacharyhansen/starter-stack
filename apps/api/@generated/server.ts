import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  app: t.router({ greeting: publicProcedure.input(z.object({ name: z.string() })).output(z.object({ message: z.string() })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any) }),
  view: t.router({
    columnByRoleView: publicProcedure.input(z.object({ name: z.string() })).output(z.any()).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    mutateViewsForRoles: publicProcedure.input(z.object({
      name: z.string(),
      columnEnabledRecords: z
        .object({
          column_name: z.string(),
        })
        .catchall(z.any())
        .array(),
    })).output(z.literal('ok')).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  query: t.router({ execute: publicProcedure.input(z.object({ query: z.string() })).output(z.any()).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any) })
});
export type AppRouter = typeof appRouter;

