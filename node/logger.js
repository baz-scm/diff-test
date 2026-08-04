const LEVELS = ["debug", "info", "warn", "error"];

export function createLogger(minLevel = "info") {
  const threshold = LEVELS.indexOf(minLevel);
  if (threshold === -1) {
    throw new RangeError(`unknown level: ${minLevel}`);
  }
  return LEVELS.reduce((logger, level, index) => {
    logger[level] = (message) => {
      if (index >= threshold) {
        console.log(`[${level.toUpperCase()}] ${message}`);
      }
    };
    return logger;
  }, {});
}
