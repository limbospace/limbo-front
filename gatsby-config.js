module.exports = {
  siteMetadata: {
    title: `Galerie Limbo`,
    description: ``,
    keywords:``,
    author: `@antbarras`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-htaccess',
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        start_url: `/`,
        icon: `src/assets/images/favicon.png`
      }
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
        additionalData: `@use "${__dirname}/src/styles/variables" as *`,
      }
    },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.API_URL || "http://localhost:1337",
        queryLimit: 1000,
        contentTypes: [`exposition`, `info`]
      }
    },
    {
      resolve: "gatsby-plugin-react-svg"
    }
  ],
  

}
