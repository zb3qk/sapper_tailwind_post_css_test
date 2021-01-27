import sirv from "sirv";
import Express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import { createApi } from 'unsplash-js';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

Express()
	.use(
		compression({ threshold: 0 }),
		sirv("static", { dev }),
		sapper.middleware(),
	)
	.listen(PORT, (err) => {
		if (err) console.log("error", err);
	});
