// 为了符合统一出口原则，我们用index.js这个文件来统一导出我们的各个api接口
import { login, userinfo, userProfilePatch, userPhotoPatch } from './user.js'
import { myChannel, allChannel, myChannelsPut } from './channel'
import { articleList, articleDetail, cmtList, sendCmt } from './actcile.js'
import { suggest, search } from './seacrh.js'
// 统一的暴露
export const loginAPI = login
export const userinfoAPI = userinfo
export const userProfilePatchAPI = userProfilePatch
export const userPhotoPatchAPI = userPhotoPatch
export const myChannelAPI = myChannel
export const articleListAPI = articleList
export const articleDetailAPI = articleDetail
export const cmtListAPI = cmtList
export const sendCmtAPI = sendCmt
export const allChannelAPI = allChannel
export const myChannelsPutAPI = myChannelsPut
export const suggestAPI = suggest
export const seacrhAPI = search
