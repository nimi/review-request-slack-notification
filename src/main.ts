import * as core from '@actions/core'
import {send} from './send'

async function run(): Promise<void> {
  try {
    core.debug(`Sending notification to slack ...`)
    const containsIgnoreReviewer = JSON.parse(
      process.env.IGNORED_REVIEWERS || '[]'
    ).some((reviewer: string) => reviewer === '@nimi')

    core.debug(`Ignored Reviewers ${containsIgnoreReviewer ? 'yes' : 'no'}`)
    await send()

    core.setOutput('Finished sending notification', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
