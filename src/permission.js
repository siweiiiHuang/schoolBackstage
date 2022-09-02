import router from '~/router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { toast } from '~/composables/util'
// 全局前置守卫
router.beforeEach((to, from, next) => {
    const cookie = useCookies()
    const token = cookie.get("satoken")
    if (!token && to.path != '/login') {
        toast('请先登录', 'warning')
        return next({ path: '/login' })
    }
    if (token && to.path === '/login') {
        toast('请勿重复登录', 'warning')
        return next({ path: from.path })
    }
    next()
})