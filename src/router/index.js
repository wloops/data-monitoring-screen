import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { setupRouterGuard } from './guard'
import { basicRoutes, EMPTY_ROUTE, NOT_FOUND_ROUTE } from './routes'
import { sStorage, getToken, isNullOrWhitespace } from '@/utils'
import { useUserStore, usePermissionStore } from '@/store'

const isHash = import.meta.env.VITE_USE_HASH === 'true'
export const router = createRouter({
  history: isHash ? createWebHashHistory('/') : createWebHistory('/'),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app) {
  await addDynamicRoutes()
  setupRouterGuard(router)
  app.use(router)
}

export async function resetRouter() {
  const basicRouteNames = getRouteNames(basicRoutes)
  router.getRoutes().forEach((route) => {
    const name = route.name
    if (!basicRouteNames.includes(name)) {
      router.removeRoute(name)
    }
  })
}

export async function addDynamicRoutes() {
  // return Promise.reject('123')
  const token = getToken()
  console.log('token', token)
  // 没有token情况
  if (isNullOrWhitespace(token)) {
    router.addRoute(EMPTY_ROUTE)
    return
  }

  // 有token的情况
  const userStore = useUserStore()
  try {
    // const permissionStore = usePermissionStore()
    // !userStore.userId && (await userStore.getUserInfo())
    // const accessRoutes = permissionStore.generateRoutes(userStore.role)
    // accessRoutes.forEach((route) => {
    //   !router.hasRoute(route.name) && router.addRoute(route)
    // })
    // router.hasRoute(EMPTY_ROUTE.name) && router.removeRoute(EMPTY_ROUTE.name)
    // router.addRoute(NOT_FOUND_ROUTE)
    // console.log('userStore', sStorage.get('userInfo'))
    // window.$notification?.success({
    //   title: '登录成功！',
    //   content: () => h('span', {}, `欢迎回来，${sStorage.get('userInfo').name}`),
    //   duration: 2500,
    //   keepAliveOnHover: true,
    // })
  } catch (error) {
    console.error(error)
    $message.error('初始化用户信息失败: ' + error)
    userStore.logout()
  }
}

export function getRouteNames(routes) {
  return routes.map((route) => getRouteName(route)).flat(1)
}

function getRouteName(route) {
  const names = [route.name]
  if (route.children && route.children.length) {
    names.push(...route.children.map((item) => getRouteName(item)).flat(1))
  }
  return names
}
