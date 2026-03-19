const rateLimit = require("express-rate-limit");

const orgRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each organization to 100 requests per windowMs

  keyGenerator: (req) => {
    return req.user?.orgId || req.ip; // Use orgId if available, otherwise fallback to IP address
  },

  message: "Too many requests from this organization",
});

module.exports = orgRateLimiter;