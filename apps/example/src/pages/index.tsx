import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'

type MenuType = {
  key: string
  name: string
  path: string
  children?: MenuType[]
}

const menus: MenuType[] = [
  {
    key: '/await-timer',
    name: 'Await Timer',
    path: '/await-timer',
  },
  {
    key: '/file-slicer',
    name: 'File Slicer',
    path: '/file-slicer',
  },
  {
    key: '/enhanced-abort-controller',
    name: 'Enhanced Abort Controller',
    path: '/enhanced-abort-controller',
  },
  {
    key: '/zlight',
    name: 'Zlight',
    path: '/zlight',
  },
  {
    key: '/hooks',
    name: 'Hooks',
    path: '/hooks',
    children: [
      {
        key: '/hooks/useDeferedComponent',
        name: 'useDeferedComponent',
        path: '/hooks/useDeferedComponent',
      },
      {
        key: '/hooks/useInterval',
        name: 'useInterval',
        path: '/hooks/useInterval',
      },
      {
        key: '/hooks/useDebounceAndUseThrottle',
        name: 'useDebounceAndUseThrottle',
        path: '/hooks/useDebounceAndUseThrottle',
      },
      {
        key: '/hooks/useIsOnline',
        name: 'useIsOnline',
        path: '/hooks/useIsOnline',
      },
      {
        key: '/hooks/useIsWindowVisible',
        name: 'useIsWindowVisible',
        path: '/hooks/useIsWindowVisible',
      },
      {
        key: '/hooks/useStorage',
        name: 'useStorage',
        path: '/hooks/useStorage',
      },
    ],
  },
  {
    key: '/components',
    name: 'Components',
    path: '/components',
    children: [
      {
        key: '/components/virtualList',
        name: 'Virtual List',
        path: '/components/virtualList',
      },
    ],
  },
]

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate(menus[0].path)
    }
  }, [location])

  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='w-64 h-full px-2 py-4 border-r border-base-300 overflow-y-auto'>
        <ul className='menu rounded-box w-full'>
          <li>
            <h2 className='menu-title'>Packages</h2>
            <ul>
              {menus.map(menu => (
                <li key={menu.key}>
                  {menu.children && menu.children.length > 0 ? (
                    <details open>
                      <summary>{menu.name}</summary>
                      <ul>
                        {menu.children.map(child => (
                          <li key={child.key}>
                            <a className={`${child.key === location.pathname ? 'menu-active' : ''}`} onClick={() => navigate(child.path)}>
                              {child.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <a className={`${menu.key === location.pathname ? 'menu-active' : ''}`} onClick={() => navigate(menu.path)}>
                      {menu.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className='flex-1 h-full overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  )
}
