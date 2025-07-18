// test/helpers/user.factory.js
function buildUser(overrides = {}) {
  const timestamp = Date.now();
  return {
    name: "Test User",
    email: `user${timestamp}@test.com`,
    age: 30,
    city: "Testville",
    state: "TS",
    username: `user${timestamp}`,
    password: "Password@123",
    ...overrides,
  };
}

module.exports = { buildUser };
