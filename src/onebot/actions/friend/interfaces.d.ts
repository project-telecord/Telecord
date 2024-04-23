import { BotActionParams } from "../interfaces"

//#region "UserInfo"
/**
 * 获取用户信息动作的数据
 */
export interface UserInfoReq {
  user_id: string
}

/**
 * 响应用户信息动作的数据
 */
export interface UserInfoResp {
  user_id: string
  user_name: string
  user_displayname: string
  user_remark: string
  avatar_url: string
}

//#endregion

export interface LikeUserReq extends BotActionParams {
  user_id: `u_${string}`
  count: number
}
