import util from "node:util";
import { exec } from "node:child_process";
import fs from "node:fs/promises";
import { createSpinner } from "nanospinner";
import {
  HTMLContent,
  CSSContent,
  JSContent,
  ReactAppContent,
} from "./contents.js";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
export async function generateBasicWebsite() {
  const spinner = createSpinner("Please Wait...").start({
    color: "green",
    text: "Generating scaffolding",
  });
  try {
    await sleep();
    await fs.mkdir(
      import.meta.dirname + "/starter",
      { recursive: true },
      (err) => {
        if (err) throw err;
      }
    );
    await fs.writeFile(
      import.meta.dirname + "/starter/index.html",
      HTMLContent
    );
    await fs.writeFile(import.meta.dirname + "/starter/style.css", CSSContent);
    await fs.writeFile(import.meta.dirname + "/starter/main.js", JSContent);
    spinner.success({ text: "Starter done." });
  } catch (err) {
    spinner.error({ text: "Something went wrong..." });
    console.log(err);
  }
}
export async function generateReactApp() {
  const execPromise = util.promisify(exec);
  const spinner = createSpinner("Please Wait...").start({
    color: "green",
    text: "Generating scaffolding",
  });
  try {
    sleep();
    const { stdout } = await execPromise(
      "npm create vite@latest starter -- --template react -y"
    );

    await fs.writeFile(
      import.meta.dirname + "/starter/src/App.jsx",
      ReactAppContent
    );
    await fs.writeFile(
      import.meta.dirname + "/starter/src/index.css",
      CSSContent
    );
    await fs.writeFile(import.meta.dirname + "/starter/README.md", "");
    await fs.unlink(import.meta.dirname + "/starter/src/App.css", (err) => {
      if (err) {
        console.error(`Error removing file ${err}`);
      }
    });
    await fs.unlink(
      import.meta.dirname + "/starter/src/assets/react.svg",
      (err) => {
        if (err) {
          console.error(`Error removing file ${err}`);
        }
      }
    );
    await fs.mkdir(
      import.meta.dirname + "/starter/src/components",
      { recursive: true },
      (err) => {
        if (err) throw err;
      }
    );

    spinner.success({ text: stdout });
  } catch (err) {
    spinner.error({ text: "Something went wrong..." });
  }
}
