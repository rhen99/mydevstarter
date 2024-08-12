import path from "path";
import { fileURLToPath } from "url";
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
      path.dirname(fileURLToPath(import.meta.url)) + "/starter/src/App.jsx",
      ReactAppContent
    );
    await fs.writeFile(
      path.dirname(fileURLToPath(import.meta.url)) + "/starter/src/index.css",
      CSSContent
    );
    await fs.writeFile(
      path.dirname(fileURLToPath(import.meta.url)) + "/starter/README.md",
      ""
    );
    await fs.unlink(
      path.dirname(fileURLToPath(import.meta.url)) + "/starter/src/App.css",
      (err) => {
        if (err) {
          console.error(`Error removing file ${err}`);
        }
      }
    );
    await fs.unlink(
      path.dirname(fileURLToPath(import.meta.url)) +
        "/starter/src/assets/react.svg",
      (err) => {
        if (err) {
          console.error(`Error removing file ${err}`);
        }
      }
    );
    await fs.mkdir(
      path.dirname(fileURLToPath(import.meta.url)) + "/starter/src/components",
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
