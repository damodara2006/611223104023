import dotenv from "dotenv";

dotenv.config();

const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";

const STACKS = ["backend", "frontend"];
const LEVELS = ["debug", "info", "warn", "error", "fatal"];

const BACKEND_PACKAGES = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",
];

const FRONTEND_PACKAGES = ["api", "component", "hook", "page", "state"];

const SHARED_PACKAGES = ["auth", "config", "middleware", "utils"];

function isValidPackage(stack, pkg) {
  if (SHARED_PACKAGES.includes(pkg)) return true;
  if (stack === "backend") return BACKEND_PACKAGES.includes(pkg);
  if (stack === "frontend") return FRONTEND_PACKAGES.includes(pkg);
  return false;
}

async function Log(stack, level, pkg, message) {
  stack = stack.toLowerCase();
  level = level.toLowerCase();
  pkg = pkg.toLowerCase();

  if (!STACKS.includes(stack)) {
    throw new Error(`invalid stack: ${stack}`);
  }
  if (!LEVELS.includes(level)) {
    throw new Error(`invalid level: ${level}`);
  }
  if (!isValidPackage(stack, pkg)) {
    throw new Error(`invalid package "${pkg}" for stack "${stack}"`);
  }

  console.log(process.env.AUTH_TOKEN);
  
  const res = await fetch(LOG_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer `,
    },
    body: JSON.stringify({ stack, level, package: pkg, message }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("log call failed:", data);
    return null;
  }

  // console.log(res)

  return data;
}

export { Log };
