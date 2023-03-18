export default {
  jwtSecret: process.env.JWT_SECRET || "somesecrettoken",

  DB: {
    URI: process.env.MONGODB_URI || "mongodb+srv://moviles:123456moviles@twitterclonedb.nlkrrg5.mongodb.net/?retryWrites=true&w=majority",
    USER: process.env.MONGODB_USER || "",
    PASSWORD: process.env.MONGODB_PASSWORD || "",
    NAME: process.env.MONGODB_NAME || "",
    LAST_NAME: process.env.MONGODB_NAME || "",
  },
};
