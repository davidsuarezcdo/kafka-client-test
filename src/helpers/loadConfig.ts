import fs from "fs";
import * as dotenv from "dotenv";

export default function loadConfig(path: string) {
  if (!fs.existsSync(path)) {
    return;
  }

  dotenv.config({ path: path });
}
