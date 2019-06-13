const axios = require('axios')
const moment = require('moment')
const FormData = require('form-data')
const querystring = require('querystring')

class Huilianyi {
  constructor (config) {
    this.config = config
    this.request = axios.create({
      baseURL: config.baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async auth () {
    const { appId, appSecret } = this.config
    const url = '/oauth/token'
    const authorization = Buffer.from(`${appId}:${appSecret}`).toString('base64')

    const form = new FormData()
    form.append('grant_type', 'client_credentials')
    form.append('scope', 'write')

    const result = (await this.request.post(url, form, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
        Authorization: `Basic ${authorization}`
      }
    })).data
    const authToken = result.access_token
    return authToken || ''
  }

  /**
   * options: https://opendocs.huilianyi.com/implement/business-data/expense-report/query-expense-report.html
   * status:
   *  1001//初始
   *  1002//提交审批
   *  1003//审批通过
   *  1004//审核通过
   *  1005//已付款
   *  1006//已报盘
   *  1007//已开票
   *  1008//已确认（付款中）
   */
  async listExpenseReport (options, authToken) {
    const path = '/api/open/expenseReport'
    const params = {
      status: '1002',
      startDate: moment().add(3, 'M').format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      page: 1,
      size: 10,
      withApprovalHistory: true,
      withPaymentSchedule: false,
      ...options
    }
    return this.request.get(`${path}?${querystring.stringify(params)}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
  }

  /**
   * options: https://opendocs.huilianyi.com/implement/business-data/expense-report/query-expense-report.html
   * status:
   * 1001//初始
   * 1002//提交审批
   * 1003//审批通过
   * 1004//审核通过
   * 1008//付款中
   * 1005//借款已付款
   * 1006//还款中
   * 1007//已还款
   */
  async listLoanApplication (options, authToken) {
    const path = '/api/open/loanApplication'
    const params = {
      status: '1002',
      startDate: moment().add(3, 'M').format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      page: '1',
      size: '10',
      withApprovalHistory: 'true',
      withWriteoffArtificial: 'false',
      ...options
    }
    return this.request.get(`${path}?${querystring.stringify(params)}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
  }

  async listReimbursement (options, authToken) {
    const path = '/report/api/open/report/searchReimbursement'
    const payload = {
      status: '1002',
      language: 'zh_cn',
      startDate: moment().add(3, 'M').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      page: '1',
      size: '10',
      ...options
    }
    return this.request.post(path, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
  }

  async listExpenseDetails (options, authToken) {
    const path = '/report/api/open/report/searchExpenseDetails'
    const payload = {
      status: '1002',
      language: 'zh_cn',
      startDate: moment().add(3, 'M').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      page: '1',
      size: '10',
      ...options
    }
    return this.request.post(path, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
  }

  async listTrvappReport (options, authToken) {
    const path = '/report/api/open/report/searchTrvappReport'
    const payload = {
      status: '1002',
      language: 'zh_cn',
      startDate: moment().add(3, 'M').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      page: '1',
      size: '10',
      ...options
    }
    return this.request.post(path, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
  }

  async listExpappReport (options, authToken) {
    const path = '/report/api/open/report/searchExpappReport'
    const payload = {
      status: '1002',
      language: 'zh_cn',
      startDate: moment().add(3, 'M').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      page: '1',
      size: '10',
      ...options
    }
    return this.request.post(path, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
  }
}

module.exports = Huilianyi
