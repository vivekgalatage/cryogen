import Ajv from "ajv"
import * as _ from "lodash"
import schema from "./config/schema"
import defaultConfig from "./config/defaults"
import * as glob from "glob"
import * as fs from "fs"
import * as path from "path"
import { ArgumentParser } from "argparse"

function initializeCommandLine() {
  const commandLine = new ArgumentParser("Cryocon");
  commandLine.add_argument("-c", "--cryocon", { help: "Path to cryocon.json" });
  return commandLine.parse_args();
}

function main() {
  const commandLine = initializeCommandLine();
  const userConfigFile = commandLine.cryocon;
  commandLine.cryocon = path.join(process.cwd(), userConfigFile);
  const workingDir = path.dirname(commandLine.cryocon);
  process.chdir(workingDir);
  const userConfig = JSON.parse(fs.readFileSync(commandLine.cryocon).toString());
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  if (!validate(userConfig)) {
    console.log(validate.errors);
    process.exit(-1);
  }

  if (!validate(defaultConfig)) {
    console.log(validate.errors);
    process.exit(-1);
  }
  console.log(JSON.stringify(userConfig, null, 2));
  const config = _.merge(defaultConfig, userConfig);
  console.log(glob.sync(config.include[0], {ignore: config.exclude }).map(item => path.join(workingDir, item)))
  console.log(JSON.stringify(config, null, 2));
  return 0;
}

process.exit(main());
