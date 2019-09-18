require("@babel/register")({
  presets: [["@babel/preset-env"], ["@babel/preset-react"]],
});

const argv = process.argv.slice(2);

const version = argv[0];
const versions = ["full", "examples", "core"];

if (versions.indexOf(version) === -1) {
  console.warn(
    "Invalid dashboard type %s selected. Must be one of:\n *",
    version,
    versions.join("\n  * ")
  );

  process.exit(0);
}

require("./" + version);
