function describeContextGaps(gaps) {
  if (gaps.length === 0) {
    return "all linked context was fetched"
  }
  return `missing context from: ${gaps.join(", ")}`
}

module.exports = { describeContextGaps }

function contextGapCount(gaps) {
  return gaps.length
}

module.exports.contextGapCount = contextGapCount
