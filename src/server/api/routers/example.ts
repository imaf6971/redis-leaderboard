import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input, ctx }) => {
      const value = await ctx.redis.get(input.text);
      if (value == null) {
        console.log('setting value to redis');
        ctx.redis.set(input.text, `Hello ${input.text}`)
        return {
          greeting: `Hello ${input.text}`,
        };
      }
      console.log('Returning value from redis');
      return {
        greeting: value
      }
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
