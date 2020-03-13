import * as core from '@actions/core'
import {send} from './send'

async function run(): Promise<void> {
  try {
    core.debug(`Sending notification to slack ...`)
    const ignoredReviewers = process.env.IGNORED_REVIEWERS?.split(',').join(' ')

    core.debug(
      `Ignored Reviewers: ${Object.keys(ignoredReviewers || 'not defined')}`
    )
    await send()

    core.setOutput('Finished sending notification', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
