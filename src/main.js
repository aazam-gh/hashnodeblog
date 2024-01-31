const core = require('@actions/core')
const { request } = require('graphql-request')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const blogname = core.getInput('hashnode-blog', { required: true })
    const apikey = core.getInput('hashnode-apikey', { required: true })

    const query = `
    query Publication {
    publication(host: "${blogname}") {
        isTeam
        title
        posts(first: 10) {
          edges {
            node {
              title
              brief
              url
            }
          }
        }
    }
    }
    `
    const data = await request('https://gql.hashnode.com', query)
    console.log(data)
    core.setOutput('api-response', data)
    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
