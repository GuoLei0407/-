// 为了符合统一出口原则，我们用index.js这个文件来统一导出我们的各个api接口
import { login } from './user.js'

// 统一的暴露
export const loginAPI = login
