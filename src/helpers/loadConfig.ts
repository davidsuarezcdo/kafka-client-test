import fs from "fs";
import * as dotenv from "dotenv";

export default function loadConfig(path: string) {
  if (!fs.existsSync(path)) {
    throw new Error("No se ha encontrado el archivo de configuracion");
  }

  dotenv.config({ path: path });
}
