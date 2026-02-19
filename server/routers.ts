import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  listProjects,
  listVisibleProjects,
  createProject,
  updateProject,
  deleteProject,
} from "./db";
import { storagePut } from "./storage";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Portfolio Projects ──────────────────────────────────────
  projects: router({
    /** Public: list visible projects for gallery */
    listVisible: publicProcedure.query(async () => {
      return listVisibleProjects();
    }),

    /** Admin: list all projects (including hidden) */
    listAll: adminProcedure.query(async () => {
      return listProjects();
    }),

    /** Admin: create a new project */
    create: adminProcedure
      .input(
        z.object({
          titleEn: z.string().min(1),
          titleEs: z.string().min(1),
          titleVal: z.string().min(1),
          imageBase64: z.string().min(1),
          imageName: z.string().min(1),
          imageType: z.string().min(1),
          sortOrder: z.number().int().optional().default(0),
        })
      )
      .mutation(async ({ input }) => {
        // Upload image to S3
        const buffer = Buffer.from(input.imageBase64, "base64");
        const key = `portfolio/${Date.now()}-${input.imageName}`;
        const { url } = await storagePut(key, buffer, input.imageType);

        // Save to database
        const result = await createProject({
          titleEn: input.titleEn,
          titleEs: input.titleEs,
          titleVal: input.titleVal,
          imageKey: key,
          imageUrl: url,
          sortOrder: input.sortOrder,
        });

        return result;
      }),

    /** Admin: update a project */
    update: adminProcedure
      .input(
        z.object({
          id: z.number().int(),
          titleEn: z.string().min(1).optional(),
          titleEs: z.string().min(1).optional(),
          titleVal: z.string().min(1).optional(),
          sortOrder: z.number().int().optional(),
          visible: z.enum(["yes", "no"]).optional(),
          imageBase64: z.string().optional(),
          imageName: z.string().optional(),
          imageType: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, imageBase64, imageName, imageType, ...data } = input;

        // If new image provided, upload to S3
        if (imageBase64 && imageName && imageType) {
          const buffer = Buffer.from(imageBase64, "base64");
          const key = `portfolio/${Date.now()}-${imageName}`;
          const { url } = await storagePut(key, buffer, imageType);
          (data as any).imageKey = key;
          (data as any).imageUrl = url;
        }

        await updateProject(id, data);
        return { success: true };
      }),

    /** Admin: delete a project */
    delete: adminProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(async ({ input }) => {
        await deleteProject(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
