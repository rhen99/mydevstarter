#!usr/bin/env node
import inquirer from "inquirer";
async function run() {
  console.log("running...");
  await askQuestions();
}

async function askQuestions() {
  const whatStarter = await inquirer.prompt([
    {
      type: "list",
      name: "starter",
      choices: ["HTML & CSS", "React App"],
      message: "What starter setup do you want?",
    },
  ]);
  console.info("Answer:", whatStarter.starter);
}

function createFiles() {}
await run();
