function describeReviewContext(sources) {
  return sources.length > 0 ? sources.join(", ") : "none"
}

module.exports = { describeReviewContext }
