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
   * @param {*} options
   * @param {*} authToken
   * 报销单明细增量查询
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
   * @param {*} options
   * @param {*} authToken
   * 借款单明细增量查询
   * options: https://opendocs.huilianyi.com/implement/business-data/loan-application/query-loan-application.html
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

  /**
   * @param {*} options
   * @param {*} authToken
   * 报销单报表
   * https://opendocs.huilianyi.com/implement/report-data/ReimbursementReport.html
   * 1002
   * 1003
   * 1004
   * 1005
   * 1007
   * 1008
   */
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

  /**
   * @param {*} options
   * @param {*} authToken
   * 费用明细报表
   * https://opendocs.huilianyi.com/implement/report-data/ExpenseDetailsReport.html
   * 1002
   * 1003
   * 1004
   * 1005
   * 1007
   * 1008
   */
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

  /**
   * @param {*} options
   * @param {*} authToken
   * 差旅申请报表
   * https://opendocs.huilianyi.com/implement/report-data/TrvappReport.html
   * 1002  审批中
   * 1003  审批通过
   * 1009  已停用
   */
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

  /**
   * @param {*} options
   * @param {*} authToken
   * 差旅申请报表
   * https://opendocs.huilianyi.com/implement/report-data/ExpappReport.html
   * 1002  审批中
   * 1003  审批通过
   * 1009  已停用
   */
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

  /**
   * @param {*} options
   * @param {*} authToken
   * 差旅申请报表
   * https://opendocs.huilianyi.com/implement/report-data/LoanappReport.html
   * 1002  审批中
   * 1003  审批通过
   * 1004
   * 1005
   * 1006
   * 1007
   * 1008
   * 1009  已停用
   */
  async listLoanappReport (options, authToken) {
    const path = '/report/api/open/report/searchLoanappReport'
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
