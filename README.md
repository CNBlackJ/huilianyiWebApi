# 汇联易webapi nodejs SDK

huilianyi webapi nodejs sdk.

- 项目地址：[github](https://github.com/CNBlackJ/huilianyiWebApi)

## Usgae

汇联易的开发者文档地址：<https://opendocs.huilianyi.com/>

- `$ npm install hlyapi --save`

- 配置信息

  `appId`和`appSecret`需要超级管理员进入到`管理后台` -> 侧边栏的`设置` -> `安全设置`
  才能看到

  - baseURL: <https://api.huilianyi.com> // 汇联易webapi请求地址
  - appId: 企业ID
  - appSecret: 企业密钥

```js
{
  baseURL: 'https://api.huilianyi.com',
  appId: 'i am app id from huilianyi',
  appSecret: 'i am app secret from huilianyi'
}
```

```js
const HlyApi = require('hlyapi')
const config = require('config').huilianyi // 配置信息参照上面⬆️

const hlyApi = new HylApi(config)

hlyApi.auth().then(token => {
  // cookie 建议本地缓存 避免每次请求都重新获取
  hlyApi.listExpenseReport({
    // 报销单明细增量查询
    startDate: '2018-01-03 17:32:31',
    endDate: '2018-06-24 16:56:32'
  }, token).then(res => {
    console.log(res.data)
  })
})
```

```js
// 支持await
const HlyApi = require('hlyapi')
const config = require('config').huilianyi // 配置信息参照上面⬆️

const hlyApi = new HylApi(config)
const authToken = await hlyApi.auth()
const options = {
  startDate: '2018-01-03 17:32:31',
  endDate: '2018-06-24 16:56:32'
}
const result = await hlyApi.listExpenseReport(options)
console.log(result.data)
```

## Contact

- Email: yes.heng@icloud.com
- github: <https://github.com/CNBlackJ>

## Change Log

- 2019-06-13: 
  - token鉴权
  - list: 报销单明细增量查询/借款单明细增量查询/报销单报表/费用明细报表/差旅申请报表/差旅申请报表/差旅申请报表
