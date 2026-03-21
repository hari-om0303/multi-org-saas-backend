const rateLimit = require("express-rate-limit");
const Organization = require("../modules/organization/organization.model");

const planLimits = {
  FREE: 50,
  PRO: 200,
  ENTERPRISE: 1000 // or unlimited logic later
};

const dynamicRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,

  keyGenerator: (req) => req.user?.orgId || req.ip,

  max: async (req) => {
    try {
      if (!req.user?.orgId) return 20; // fallback for public users

      const org = await Organization.findById(req.user.orgId);

      return planLimits[org.subscriptionPlan] || 50;

    } catch (err) {
      return 50;
    }
  },

  message: "Rate limit exceeded for your subscription plan"
});

module.exports = dynamicRateLimiter;