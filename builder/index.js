const { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } = require("fs");
const { resolve, basename } = require("path");

const input_dir = resolve(__dirname, "..", "node_modules", "@primer/octicons/build/svg");
const output_dir = resolve(__dirname, "..", "lib");

if (existsSync(output_dir)) {
    rmSync(output_dir, { recursive: true });
}
mkdirSync(output_dir);

const filenames = readdirSync(input_dir).filter((file) => file.endsWith(".svg"));
const css = readFileSync(resolve(__dirname, "style.css"), "utf8");

for (let i = 0; i < filenames.length; i++) {
    const filename = filenames[i];
    const svg = readFileSync(resolve(input_dir, filename), "utf8");
    const output = add_style(svg, css);
    writeFileSync(resolve(output_dir, filename), output);
    const dark_output = add_style(svg, `svg { fill: #fff; }`);
    writeFileSync(resolve(output_dir, `${basename(filename, ".svg")}.dark.svg`), dark_output);
}

console.log("\u001B[92mDone!\u001B[0m");
console.log("Made " + "\u001B[96m" + readdirSync(output_dir).filter((file) => file.endsWith(".svg")).length + "\u001B[0m" + " icons.");

/**
 * @param {string} svg
 * @param {string} css
 */
function add_style(svg, css) {
    return svg.replace(/<svg[^>]*?>/, `$&<style>${css}</style>`);
}

module.exports = { input_dir, output_dir };
