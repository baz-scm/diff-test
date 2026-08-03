function formatChannelHint(channels) {
  if (channels.length === 0) {
    return null
  }
  return channels.map((channel) => `#${channel}`).join(", ")
}

module.exports = { formatChannelHint }
