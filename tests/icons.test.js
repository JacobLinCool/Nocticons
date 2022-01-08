const { readdirSync } = require("fs");
const { input_dir, output_dir } = require("../builder");

test("Check All Icons Converted", () => {
    const inputs = readdirSync(input_dir).filter((file) => file.endsWith(".svg"));
    const outputs = new Set(readdirSync(output_dir).filter((file) => file.endsWith(".svg")));

    inputs.forEach((input) => {
        expect(outputs.has(input)).toBe(true);
    });
});
