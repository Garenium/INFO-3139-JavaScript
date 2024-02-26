"use strict";
import * as cfg from "./config.js";
import Fastify from "fastify";
import mercurius from "mercurius";
import { schema } from "./schema.js";
import { resolvers } from "./resolvers.js";
const app = Fastify();
app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true, // web page for to test queries
});
app.listen({ port: cfg.port });
