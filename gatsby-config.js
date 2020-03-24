const metadata = require('./src/services/data/metadata')

module.exports = {
  siteMetadata: metadata,
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        start_url: '/',
        icon: 'src/images/challenges-logo.png'
      }
    },
    'gatsby-plugin-sass'
  ]
}
