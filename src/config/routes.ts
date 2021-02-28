type MenuRoutes = {
  home: () => MenuRoute
  about: () => MenuRoute
  contact: () => MenuRoute
  history: () => MenuRoute
}

type MenuRoute = {
  path: string
  label: string
}

export const menuRoutes: MenuRoutes = {
  home: () => ({ path: '/', label: 'CConverter' }),
  about: () => ({ path: '/about', label: 'About' }),
  contact: () => ({ path: '/contact', label: 'Contact' }),
  history: () => ({ path: '/history', label: 'History' }),
}
