#!usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs/promises";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { HTMLContent, CSSContent, JSContent } from "./contents.js";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function run() {
  console.log("running...");
  await askQuestions();
}

async function askQuestions() {
  const whatStarter = await inquirer.prompt([
    {
      type: "list",
      name: "starter",
      choices: ["Basic Website", "React App"],
      message: "What starter setup do you want?",
    },
  ]);
  switch (whatStarter.starter) {
    case "Basic Website":
      await generateBasicWebsite();
      break;
    case "React App":
      console.log("Soon...");
      break;
    default:
      console.log("Something went wrong.");
  }
}
async function generateBasicWebsite() {
  const spinner = createSpinner("Please Wait...").start({
    color: "green",
    text: "Generating scaffolding",
  });
  try {
    await sleep();
    await fs.mkdir(
      path.dirname(fileURLToPath(import.meta.url)) + "/starter",
      { recursive: true },
      (err) => {
        if (err) throw err;
      }
    );
    await fs.writeFile(
      path.dirname(fileURLToPath(import.meta.url)) + "/starter/index.html",
      HTMLContent
    );
    await fs.writeFile(
      path.dirname(fileURLToPath(import.meta.url)) + "/starter/style.css",
      CSSContent
    );
    await fs.writeFile(
      path.dirname(fileURLToPath(import.meta.url)) + "/starter/main.js",
      JSContent
    );
    spinner.success({ text: "Starter done." });
  } catch (err) {
    spinner.error({ text: "Something went wrong..." });
    console.log(err);
  }
}
await run();
