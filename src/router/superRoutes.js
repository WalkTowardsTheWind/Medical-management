import adminRoutes from './adminRoutes';
import Layout from '@/layout'
export const superRoutes=[

    ...adminRoutes,
    
    {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        name: 'user',
        meta: { title: '人员管理', icon: 'el-icon-s-help' },
        children: [
          {
            path: 'list',
            name: 'List',
            component: () => import('@/views/user/list'),
            meta: { title: '人员列表', icon: 'table' }
          },
          {
            path: 'add',
            name: 'Add',
            component: () => import('@/views/user/add'),
            meta: { title: '添加人员', icon: 'el-icon-folder-add' }
          },
          {
            path: 'edit',
            name: 'edit',
            hidden: true,
            component: () => import('@/views/user/edit'),
            meta: { title: '编辑人员', icon: 'el-icon-folder-add' }
          },
    
        ]
      },

    
    // { path: '*', redirect: '/404', hidden: true }
]