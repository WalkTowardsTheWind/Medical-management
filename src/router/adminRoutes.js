import Layout from '@/layout'
export default[
    
   
    {
        path: '/project',
        component: Layout,
        redirect: '/project/list',
        name: 'project',
        meta: { title: '项目管理', icon: 'el-icon-s-help' },
        children: [
          {
            path: 'list',
            name: 'project-List',
            component: () => import('@/views/project/projectList'),
            meta: { title: '项目列表', icon: 'table' }
          },
          {
            path: 'add',
            name: 'project-Add',
            component: () => import('@/views/project/projectAdd'),
            meta: { title: '添加项目', icon: 'el-icon-folder-add' }
          },
          {
            path: 'edit',
            name: 'project-Edit',
            hidden: true,
            component: () => import('@/views/project/projectEdit'),
            meta: { title: '项目编辑', icon: 'el-icon-folder-add' }
          },
    
        ]
      },
    {
        path: '/patient',
        component: Layout,
        redirect: '/patient/list',
        name: 'patient',
        meta: { title: '患者管理', icon: 'el-icon-s-help' },
        children: [
          {
            path: 'list',
            name: 'patient-List',
            component: () => import('@/views/patient/patientList'),
            meta: { title: '患者列表', icon: 'table' }
          },
          {
            path: 'add',
            name: 'patient-Add',
            component: () => import('@/views/patient/patientAdd'),
            meta: { title: '添加患者', icon: 'el-icon-folder-add' }
          },
          {
            path: 'edit',
            name: 'patient-Edit',
            hidden: true,
            component: () => import('@/views/patient/patientEdit'),
            meta: { title: '患者编辑', icon: 'el-icon-folder-add' }
          },
    
        ]
      },
    {
        path: '/BookingManagement',
        component: Layout,
        redirect: '/BookingManagement/list',
        name: 'BookingManagement',
        meta: { title: '预约管理', icon: 'el-icon-s-help' },
        children: [
          {
            path: 'list',
            name: 'BookingManagement-List',
            component: () => import('@/views/BookingManagement/BookingManagementList'),
            meta: { title: '预约列表', icon: 'table' }
          },
          {
            path: 'add',
            name: 'BookingManagement-Add',
            component: () => import('@/views/BookingManagement/BookingManagementAdd'),
            meta: { title: '添加预约', icon: 'el-icon-folder-add' }
          },
          {
            path: 'edit',
            name: 'BookingManagement-Edit',
            hidden: true,
            component: () => import('@/views/BookingManagement/BookingManagementEdit'),
            meta: { title: '预约编辑', icon: 'el-icon-folder-add' }
          },
    
        ]
      },
    // { path: '*', redirect: '/404', hidden: true }
    //添加其他管理员路由
]