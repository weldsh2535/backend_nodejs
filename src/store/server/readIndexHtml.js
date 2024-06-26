import fse from "fs-extra"
import path from "path"
import winston from "winston"

const FILE_PATH = path.resolve("theme/assets/index.html")
export let indexHtml = null

try {
  indexHtml = fse.readFileSync(FILE_PATH, "utf8")
} catch (err) {
  winston.error("Fail to read file", FILE_PATH, err)
}
