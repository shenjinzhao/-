const scopes = [
  '公共能力建设',
  '其他',
  '主页',
  '证书管理',
  '登录',
  '组织管理',
  '印章管理',
  '印章申请',
  '印章审批',
  '印章制作',
  '印章类型',
  '用户管理'
]
module.exports = {
  // type 类型（定义之后，可通过上下键选择）
  types: [
    { value: 'feat', name: 'feat:   新功能' },
    { value: 'fix', name: 'fix:   修复' },
    { value: 'docs', name: 'docs:   文档变更' },
    { value: 'style', name: 'style:   代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor:重构(既不是增加feature)，也不是修复bug'
    },
    { value: 'perf', name: 'perf:   性能优化' },
    { value: 'test', name: 'test:   增加测试' },
    { value: 'chore', name: 'chore:   构建过程或辅助功能的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:   打包' }
  ],
  // 交互提示信息
  messages: {
    type: '确保本次提交遵循：前端代码规范！\n选择你要提交的类型：',
    subject: '填写简短精炼的变更描述：\n',
    confirmCommit: '确认提交？'
  },

  // 跳过要询问的步骤
  skipQuestions: ['body', 'breaking', 'footer'],

  // subject 限制长度
  subjectLimit: 100,
  scopes: scopes.map((item) => ({ name: item }))
}
