const isDev = process.env.NODE_ENV === "development";

const baseUrl = isDev ? "http://localhost:3000" : "https://blog.fine54.com";
const primaryColor = "#5cb78c";

export { isDev, baseUrl, primaryColor };
