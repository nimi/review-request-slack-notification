/* eslint-disable prefer-template */
'use strict'
import * as core from '@actions/core'
import axios, {AxiosResponse} from 'axios'

const url = process.env.SLACK_WEBHOOK_URL as string
const prNum = process.env.PULL_REQUEST_NUMBER as string
const prTitle = process.env.PULL_REQUEST_TITLE as string
const prUrl = process.env.PULL_REQUEST_URL as string
const prBody = process.env.PULL_REQUEST_BODY || 'No decription provided.'
const authorName = process.env.PULL_REQUEST_AUTHOR_NAME as string
const authorIconUrl = process.env.PULL_REQUEST_AUTHOR_ICON_URL as string
const compareBranchName = process.env.PULL_REQUEST_COMPARE_BRANCH_NAME as string
const baseBranchName = process.env.PULL_REQUEST_BASE_BRANCH_NAME as string
const webhookUrlConfig = JSON.parse(process.env.SLACK_WEBHOOK_URLS as string)
const requestedReviewers = JSON.parse(
  process.env.PULL_REQUEST_REQUESTED_REVIEWERS as string
)

const message = {
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*<' + prUrl + '|' + prTitle + '>*'
      },
      accessory: {
        type: 'image',
        image_url: authorIconUrl,
        alt_text: 'github icon'
      },
      fields: [
        {
          type: 'mrkdwn',
          text: '*Author*\n' + authorName
        },
        {
          type: 'mrkdwn',
          text: '*Base branch*\n' + baseBranchName
        },
        {
          type: 'mrkdwn',
          text: '*Pull request number*\n#' + prNum
        },
        {
          type: 'mrkdwn',
          text: '*Compare branch*\n' + compareBranchName
        }
      ]
    },
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: prBody,
        emoji: true
      }
    }
  ]
}

type WebhookResponse = AxiosResponse | undefined

export const send = async (): Promise<WebhookResponse[]> =>
  Promise.all(
    Object.entries(webhookUrlConfig).map(async ([user, webhookUrl]) => {
      if (requestedReviewers.some((reviewer: string) => reviewer === user)) {
        core.debug(`Sending slack notice to ${user}`)
        return axios.post(webhookUrl as string, message)
      }
    })
  )
