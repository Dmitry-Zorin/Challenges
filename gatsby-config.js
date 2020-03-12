const notifications = require("./src/scripts/notifications")

require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: "Challenges",
    apiServer: `${process.env.API_SERVER}/graphql`,
    timeout: 15000,
    notifications: notifications,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        start_url: "/",
        icon: "src/images/challenges-logo.png",
      },
    },
    "gatsby-plugin-sass",
  ],
}
