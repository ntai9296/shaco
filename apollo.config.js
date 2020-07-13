module.exports = {
  client: {
    includes: [__dirname + "/graphql/**/*"],
    addTypename: false,
    service: {
      name: "platform",
      url: "http://localhost:3000/graphql",
    },
  },
};
