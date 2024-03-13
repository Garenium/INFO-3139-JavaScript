"use strict";
import * as cfg from "./config.js";
import Fastify from "fastify";
import mercurius from "mercurius";
import { schema } from "./schema.js";
import { resolvers } from "./resolvers.js";
import cors from "@fastify/cors";

const app = Fastify();
app.register(cors,{})

console.log(`PORT: ${cfg.port}\nCollection: ${cfg.alertscollection}`)

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true, // web page for to test queries
});
app.listen({ port: cfg.port });
