const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Ball Players API",
    description: "Basketball Team Player API",
  },
  host: "basketball-players-api.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endPointFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endPointFile, doc)