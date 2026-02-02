import 'dotenv/config'
import { defineConfig, env, PrismaConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts'
  },
  datasource: {
    url: process.env["DIRECT_URL"],
    //url: env("DIRECT_URL"),
  },
}satisfies PrismaConfig)