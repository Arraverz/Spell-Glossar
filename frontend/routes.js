const routes = [
  {
    url: '/',
    name: 'Home',
    slug: 'home',
    icon: 'HomeIcon',
    iconPack: 'feather-icons',
    meta: {
      permissions: ['home'],
      modules: ['*'],
      pageTitle: 'Home'
    },
    submenu: []
  }
]

export default routes
