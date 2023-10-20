// 定义一些路由
import Index from "../pages/Index.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserTagPage from "../pages/UserTagPage.vue";


const routes = [
    {path: '/', component: Index},
    {path: '/team', title: '发现队伍', component: TeamPage},
    {path: '/team/add',title: '创建队伍', component: TeamAddPage},
    {path: '/team/update',title: '更新队伍', component: TeamUpdatePage},
    {path: '/user', title: '个人信息', component: UserPage},
    {path: '/search',title: '找伙伴', component: SearchPage},
    {path: '/user/list',title: '用户列表', component: SearchResultPage},
    {path: '/user/edit',title: '编辑信息', component: UserEditPage},
    {path: '/user/login',title: '登录', component: UserLoginPage},
    {path: '/user/register',title: '注册', component: UserRegisterPage},
    {path: '/user/update',title: '更新信息', component: UserUpdatePage},
    {path: '/user/team/create',title: '我创建的队伍', component: UserTeamCreatePage},
    {path: '/user/team/join',title: '我加入的队伍', component: UserTeamJoinPage},
    {path: '/user/tag', title: "标签选择", component: UserTagPage},
]

export default routes;