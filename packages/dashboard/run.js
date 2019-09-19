require("@babel/register")({
  presets: [
    ["@babel/preset-env"],
    ["@babel/preset-react"],
    "@babel/typescript",
  ],
  extensions: [".js", ".ts", ".tsx"],
});

const argv = process.argv.slice(2);

const version = argv[0];
const versions = ["full", "example", "core"];

if (versions.indexOf(version) === -1) {
  console.warn(
    "Invalid dashboard type %s selected. Must be one of:\n *",
    version,
    versions.join("\n  * ")
  );

  process.exit(0);
}

require("./" + version[0].toUpperCase() + version.slice(1) + ".tsx");
