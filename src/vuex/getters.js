/**
 * Created by caiyu on 2017/1/10.
 */
// 通用
export const baseServerPath = ({ base }) => base.server
export const getLoading = ({ base }) => base.isLoading
export const getDirection = ({ base }) => base.direction
export const baseUrlMy = ({ base }) => base.isMy
export const baseImgSrc = ({ base }) => base.imgsrc
export const getLanguage = ({ base }) => base.lang
export const getTitle = ({ base }) => base.title
export const getBalance = ({ base }) => base.balance
export const getHeaders = ({ base }) => base.headers
export const baseImPath = ({ base }) => base.im
export const getGroup = ({ base }) => base.group

// ERROR
export const getError = ({ error }) => error.error

// 登录与注册
export const getUserInfo = ({ sign }) => sign.userinfo

// 首页
export const getUserList = ({ home }) => home.userList
export const getMyPals = ({ home }) => home.mypals
export const getFirstLoading = ({ home }) => home.firstloading
