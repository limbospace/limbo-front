const path = require(`path`)

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    //Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })

// Implement the Gatsby API “createPages”. This is called once the
//data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getExpositions = makeRequest(
    graphql,
    `{
     allStrapiExposition {
       edges {
         node {
           URL
         }
       }
     }
   }
 `
  ).then(result => {
    // Create pages for each article.
    result.data.allStrapiExposition.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.URL}`,
        component: path.resolve(`src/templates/exposition_page.js`),
        context: {
          URL: node.URL
        }
      })
    })
  })

    return getExpositions
}
