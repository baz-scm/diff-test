function summarizeContextSources(sources) {
  if (sources.length === 0) {
    return "no external context"
  }
  return sources.map((source) => source.name).join(", ")
}

module.exports = { summarizeContextSources }
