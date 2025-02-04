import {z} from 'zod';

export const photoSchema = z.object({
    id: z.string(),
    url: z.string(),
    publicId: z.string().min(0),
})

export type PhotoSchema = z.infer<typeof photoSchema>;