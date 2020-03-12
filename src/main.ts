import * as core from '@actions/core'
import {send} from './send'

async function run(): Promise<void> {
  try {
    core.debug(`Sending notification to slack ...`)

    await send()

    core.setOutput('Finished sending notification', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
