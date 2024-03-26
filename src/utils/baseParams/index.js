export const mainBase = {
  // 我的任务-编辑本试图
  viewDef: {
    resId: 823,
    tblAlias: 'viewDef',
    operationID: 51,
    // condition: 'mainMenuName=Splenwise软件开发管理平台主菜单,viewName=我的任务',
    // rel: '编辑本视图',
    // EDITALAIS: 'viewDef',
    viewName: '程序安装包包括的文件界面',
    isBlur: '1',
    UI_ACCURATEQUERY: '1',
  },
  // 我的任务
  myTasks: {
    rel: '我的任务',
    resId: 294,
    tblAlias: '我的任务',
    operationID: 51,
    isBlur: 1,
    condition: 'where::submitter = @.active.tellerName@ and exeStatus not in (4,5,8)',
  },
  // myTasks: {
  //   rel: '我的未完成任务',
  //   resId: 294,
  //   tblAlias: '我的未完成工作任务管理界面',
  //   operationID: 51,
  //   isNeedConfirm: 0,
  //   showProgressBar: 0,
  //   showStyle: 0,
  //   isOperatorSingleRec: 0,
  //   level: 1,
  //   isBlur: 1,
  //   btnShowStyle: 0,
  //   EDITALAIS: '我的未完成任务',
  // },
  // 二级菜单界面
  secondaryMenuPage: {
    resId: 344,
    tblAlias: '二级菜单组界面管理界面',
    operationID: 51,
    isBlur: 1,
    EDITALAIS: '二级菜单界面',
  },
  // 签到界面
  signInPage: {
    rel: '我的签到',
    resId: 632,
    tblAlias: '我的考勤',
    operationID: 51,
    isNeedConfirm: 0,
    showProgressBar: 0,
    showStyle: 0,
    isOperatorSingleRec: 0,
    level: 1,
    btnShowStyle: 0,
    EDITALAIS: '我的签到',
  },
}
