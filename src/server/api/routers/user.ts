import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      username: z.string().min(1),
    }))
    .mutation(({ ctx, input: { username } }) => {
      return ctx.prisma.user.create({
        data: {
          username: username,
        }
      })
    }),
  readAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.user.findMany();
    }),
  leaderboard: publicProcedure
    .query(async ({ ctx }) => {
      const result = await ctx.redis.zRange("leaderboard", 0, -1, {
        REV: true,
      })
      console.log(result);
      return result
    })
})
