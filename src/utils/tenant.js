const withTenant = (query, orgId) => {
  return {
    ...query,
    orgId
  };
};

module.exports = withTenant;