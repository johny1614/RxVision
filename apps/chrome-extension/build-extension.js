const { spawnSync } = require("child_process");

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { stdio: "inherit", shell: false, ...opts });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

function tryRunPython(cmd, args) {
  const res = spawnSync(cmd, args, { stdio: "ignore", shell: false });
  return res.status === 0;
}

function detectPython() {
  const tries = [
    ["python3", ["--version"]],
    ["py", ["-3", "--version"]],
    ["python", ["--version"]],
  ];
  for (const [cmd, args] of tries) {
    if (tryRunPython(cmd, args)) return cmd === "py" ? ["py", "-3"] : [cmd];
  }
  console.error("Python 3 not found. Install it and ensure it is on PATH.");
  process.exit(1);
}

function buildPythonEnv() {
  return { env: { ...process.env, RXV_BUILD_TARGET: process.env.RXV_BUILD_TARGET || "default" } };
}

function runPythonBuild(pyCmd) {
  run(pyCmd[0], [...pyCmd.slice(1), "build-extension.py"], buildPythonEnv());
}

function main() {
  const py = detectPython();
  runPythonBuild(py);
}

main();
