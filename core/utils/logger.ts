import winston, { Logger, transports as WinstonTransports, format as WinstonFormat } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export interface ILoggerService {
  info(message: string): void;
  debug(message: string): void;
  error(message: string): void;
  http(message: string): void;
}

export class LoggerService implements ILoggerService {
  private static instance: LoggerService;
  private logger: Logger;

  private constructor() {
    this.logger = this.createLogger();
    this.setupUnhandledRejection();
    this.setupUncaughtException();
    this.setupWarning();
  }

  private getDailyRotateFileTransport(type: string, level: string): DailyRotateFile {
    return new DailyRotateFile({
      filename: `./logs/%DATE%/${type}.log`,
      datePattern: "YYYY-MM-DD",
      level,
    });
  }

  private levels(): Record<string, number> {
    return {
      error: 0,
      info: 2,
      debug: 4,
      http: 6,
    };
  }

  private colors(): Record<string, string> {
    return {
      error: "red",
      info: "green",
      debug: "white",
      http: "yellow",
    };
  }

  private getTransports(): DailyRotateFile[] {
    return [
      this.getDailyRotateFileTransport("error", "error"),
      this.getDailyRotateFileTransport("debug", "debug"),
      this.getDailyRotateFileTransport("info", "info"),
      this.getDailyRotateFileTransport("http", "http"),
    ];
  }

  private getLogLevel(): string {
    const currentEnv = process.env.NODE_ENV || "development";
    return currentEnv === "development" ? "debug" : "info";
  }

  private createLogger(): Logger {
    winston.addColors(this.colors());

    const customPrint = WinstonFormat.printf(
      ({ timestamp, level, message }) => `${level}: ${timestamp}: ${message.trim()}`
    );

    const format = WinstonFormat.combine(
      WinstonFormat.align(),
      WinstonFormat.simple(),
      WinstonFormat.colorize({ all: true }),
      WinstonFormat.errors({ stack: true }),
      WinstonFormat.timestamp({ format: "DD-MMM-YYYY HH:mm:ss:ms" }),
      customPrint
    );

    const logger = winston.createLogger({
      level: this.getLogLevel(),
      exitOnError: false,
      levels: this.levels(),
      format,
      transports: this.getTransports(),
      exceptionHandlers: [this.getDailyRotateFileTransport("exception", "")],
      rejectionHandlers: [this.getDailyRotateFileTransport("rejection", "")],
    });

    logger.add(new WinstonTransports.Console({ format }));

    return logger;
  }

  private setupUnhandledRejection(): void {
    process.on("unhandledRejection", (reason) => this.logger.debug(reason));
  }

  private setupUncaughtException(): void {
    process.on("uncaughtException", (error) => this.logger.debug(error));
  }

  private setupWarning(): void {
    process.on("warning", (error) => this.logger.warn(error.stack));
  }

  getStream(): { write: (message: string) => void } {
    return {
      write: (message: string) => this.logger.http(message),
    };
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public http(message: string): void {
    this.logger.http(message);
  }

  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }
}

export default LoggerService.getInstance();