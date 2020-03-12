/* eslint-disable prefer-template */
'use strict'
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
const pr = process.env.PULL_REQUEST as string
const message = {
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: pr + '*<' + prUrl + '|' + prTitle + '>*'
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

export const send = async (): Promise<AxiosResponse> => axios.post(url, message)
