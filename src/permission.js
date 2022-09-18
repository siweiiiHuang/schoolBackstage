import router from '~/router'
import { toast } from '~/composables/util'
import { checkLogin } from './api/manager'
// 全局前置守卫
async function check() {
    let res = await checkLogin()
    return res
}
router.beforeEach((to, from, next) => {
    let code = check()
    code.then(value=>{
        if (value.data.code == 24 && to.path != '/login') {
            toast('请先登录', 'warning')
            return next({ path: '/login' })
        }
        if (value.data.code == 10 && to.path === '/login') {
            toast('请勿重复登录', 'warning')
            return next({ path: from.path })
        }
        next()
    })

})