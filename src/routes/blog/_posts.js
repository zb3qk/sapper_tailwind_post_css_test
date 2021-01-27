// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

import fs from "fs";
const fm = require("front-matter");

const blog_dir = "src/routes/blog/content";
const files = fs.readdirSync(blog_dir);

const h1_regex = /^# (.*$)/gim;

// Generate Table of Contents
function extractHeaders(body){
  const headers = [];
  let match = h1_regex.exec(body);
  while (match != null) {
    // matched text: match[0]
    // match start: match.index
    // capturing group n: match[n]
    headers.push(match[1]);
    match = h1_regex.exec(body);
  }
  return headers;
}

// Calculate time to read post
function readingTime(post) {
  const text = post;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  // console.log(words);
  const time = Math.ceil(words / wpm);
  return time;
}

// https://newcurrent.se/blog/create-markdown-sapper-svelte-blog
const posts = {};	
for (let i = 0; i < files.length; i++) {
  let file_tokens = files[i].split(".");
  // Skip files that are not markdown
  if (file_tokens[file_tokens.length-1] != "md")
    continue;

  // Access markdown file
  const content = fs.readFileSync(`${blog_dir}/${files[i]}`, { encoding: "utf-8" });
  // Use the front-matter library to separate the body from the front matter
  const { body, ...frontMatter } = fm(content);

  // Extract headers from body
  let headers = extractHeaders(body);

  // Use the marked library to turn markdown into html
  const metadata = {...frontMatter.attributes};

  // populate metadata of post
  metadata['time'] = readingTime(body);
  metadata['slug'] = file_tokens[0];
  metadata['date'] = fs.statSync(`${blog_dir}/${files[i]}`).mtime.toDateString();
  metadata['headers'] = headers;
  posts[metadata['slug']] = metadata;
}


export default posts;
