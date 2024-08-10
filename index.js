#!usr/bin/env node
import inquirer from "inquirer";
import { generateBasicWebsite, generateReactApp } from "./starterFunctions.js";
async function run() {
  await initialPrompt();
}

async function initialPrompt() {
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
      await generateReactApp();
      break;
    default:
      console.log("Something went wrong.");
  }
}
await run();
