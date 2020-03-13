import * as core from '@actions/core'
import {send} from './send'

async function run(): Promise<void> {
  try {
    core.debug(`Sending notification to slack ...`)
    const urls = JSON.parse(process.env.SLACK_WEBHOOK_URLS as string)
    // const reviewers = Object.keys(process.env.SLACK_WEBHOOK_URLS)

    core.debug(
      `Ignored Reviewers ${Object.values(urls).join(' vvv ')} ${typeof urls}`
    )
    await send()

    core.setOutput('Finished sending notification', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
