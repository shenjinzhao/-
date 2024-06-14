export interface LoginInfoRet {
  uname: string; //用户id
  zhName: string; //用户名称
  isSystemAdmin: boolean; //是否是超级管理员
  pinyin: string; //用户邮箱前缀
  businessList: BusinessListItem[]; //业务线列表
  secret: string; //用户密钥
  isGuest: boolean; //是否是游客
  nameList: string[]; //业务线管理员列表
  userCount: number; //总人数
}

export interface BusinessListItem {
  businessId: number; //业务线id 如果该值
  businessName: string; //业务线名称
  businessCode: string; //业务线code
  businessStatus: number; //业务线状态
  businessNeedAduit: number; //业务线是否需要审核
  roleId: RoleId; //角色id  1 超级管理员 2 业务管理员 3 普通用户 4 业务线超管
  roleName: string; //角色名称
  roleStatus: number; //角色状态
  status: BusinessUserStatus; //状态 1 审核中 2 审核完成
  isReal: boolean; // 判断用户是否在该业务线下
  isOffline: boolean; //是否是离线业务线
}
export const enum RoleId {
  SuperAdmin = 1,
  BusAdmin,
  User,
  BusSuperAdmin,
}

export interface LoginInfoParams {
  withBusNameList: boolean; //是否需要业务线列表
}

export const enum BusinessUserStatus {
  InReview = 1,
  Approved,
}
