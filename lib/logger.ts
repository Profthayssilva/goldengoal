export class Logger {
  static info(...msg: any[]) {
    console.log("\x1b[36m[INFO]\x1b[0m", ...msg);
  }

  static success(...msg: any[]) {
    console.log("\x1b[32m[SUCCESS]\x1b[0m", ...msg);
  }

  static warn(...msg: any[]) {
    console.log("\x1b[33m[WARN]\x1b[0m", ...msg);
  }

  static error(...msg: any[]) {
    console.log("\x1b[31m[ERROR]\x1b[0m", ...msg);
  }

  static debug(...msg: any[]) {
    if (process.env.NODE_ENV !== "production") {
      console.log("\x1b[35m[DEBUG]\x1b[0m", ...msg);
    }
  }
}
