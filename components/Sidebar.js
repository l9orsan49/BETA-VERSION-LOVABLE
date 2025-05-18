// components/Sidebar.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Sidebar = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Determine active menu item based on current route
  const getActiveNav = () => {
    const path = router.pathname;
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('projets') || path.includes('projects')) return 'projects';
    if (path.includes('factures') || path.includes('invoices')) return 'invoices';
    if (path.includes('finance') || path.includes('charges')) return 'finance';
    if (path.includes('clients')) return 'clients';
    if (path.includes('parametres') || path.includes('settings')) return 'settings';
    return 'dashboard'; // Default
  };

  const activeNav = getActiveNav();

  // Handle navigation
  const handleNavClick = (item, path) => {
    router.push(path);
  };

   // Toggle sidebar collapse (and body class so pages can shift)
  const toggleSidebar = () => {
    setCollapsed(prev => {
      const next = !prev;
      document.body.classList.toggle('sidebar-collapsed', next);
      return next;
    });
  };

  // keep body in sync on first render & on collapsed change
  useEffect(() => {
    document.body.classList.toggle('sidebar-collapsed', collapsed);
  }, [collapsed]);


  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };
    
    // Set initial state
    checkMobile();
    
    // Add event listenerA
    window.addEventListener('resize', () => {
  checkMobile();
  // when coming back above mobile breakpoint, always restore full sidebar
  if (window.innerWidth > 768) {
    setCollapsed(false);
  }
});

    

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobile && !collapsed ? 'expanded' : ''}`}>
        <div className="logo-container">
          <Link href="/operatorside_dashboard" className="logo">
            <svg className="logo-icon" width="24" height="24" viewBox="0 0 576 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="white" d="M272 96c-78.6 0-145.1 51.5-167.7 122.5c33.6-17 71.5-26.5 111.7-26.5h88c8.8 0 16 7.2 16 16s-7.2 16-16 16H288 216s0 0 0 0c-16.6 0-32.7 1.9-48.2 5.4c-25.9 5.9-50 16.4-71.4 30.7c0 0 0 0 0 0C38.3 298.8 0 364.9 0 440v16c0 13.3 10.7 24 24 24s24-10.7 24-24V440c0-48.7 20.7-92.5 53.8-123.2C121.6 392.3 190.3 448 272 448l1 0c132.1-.7 239-130.9 239-291.4c0-42.6-7.5-83.1-21.1-119.6c-2.6-6.9-12.7-6.6-16.2-.1C455.9 72.1 418.7 96 376 96L272 96z"/>
            </svg>
            <span className="logo-text">LeafBooks</span>
          </Link>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="white"/>
            </svg>
          </button>
        </div>
        
        <ul className="menu">
          <li>
            <a 
              href="#" 
              className={`menu-item ${activeNav === 'dashboard' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('dashboard', '/operatorside_dashboard');
              }}
            >
              <div className="menu-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69ZM12 3L2 12H5V20H11V14H13V20H19V12H22L12 3Z" fill="white"/>
                </svg>
              </div>
              <span>Tableau de bord</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`menu-item ${activeNav === 'projects' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('projects', '/operatorside_projcets');
              }}
            >
              <div className="menu-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="white"/>
                </svg>
              </div>
              <span>Projets</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`menu-item ${activeNav === 'invoices' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('invoices', '/operatorside_factures');
              }}
            >
              <div className="menu-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="white"/>
                </svg>
              </div>
              <span>Factures</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`menu-item ${activeNav === 'finance' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('finance', '/operatorside_charges');
              }}
            >
              <div className="menu-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="white"/>
                </svg>
              </div>
              <span>Finance et Trésorerie</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`menu-item ${activeNav === 'clients' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('clients', '/operatorside_clients');
              }}
            >
              <div className="menu-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
                </svg>
              </div>
              <span>Clients</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`menu-item ${activeNav === 'settings' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('settings', '/operatorside_parametres');
              }}
            >
              <div className="menu-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="white"/>
                </svg>
              </div>
              <span>Paramètres</span>
            </a>
          </li>
        </ul>
      </div>

    <style jsx global>{`
  :root {
    --primary: rgb(93, 185, 93);
    --primary-light: rgb(118, 206, 118);
    --primary-dark: rgb(75, 150, 75);
    --text-dark: #333;
    --text-light: #fff;
    --hover-bg: rgba(255, 255, 255, 0.15);
    --active-bg: rgba(255, 255, 255, 0.2);
    --sidebar-width: 260px;
    --sidebar-width-collapsed: 70px;
    --transition-speed: 0.25s;
  }

  /* Sidebar base */
  .sidebar {
    width: var(--sidebar-width) !important;
    min-height: 100vh !important;
    background-color: var(--primary) !important;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1) !important;
    transition: width var(--transition-speed) ease !important;
    overflow-x: hidden !important;
    color: var(--text-light) !important;
    position: relative !important;
  }

  /* Logo text styling */
  .logo-text {
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
    font-size: 1.2rem !important;
    font-weight: 600 !important;
    letter-spacing: 0.5px !important;
  }

  /* Collapsed state */
  .sidebar.collapsed {
    width: var(--sidebar-width-collapsed) !important;
  }
  .sidebar.collapsed .logo-text {
    display: none !important;
  }

  /* Logo container */
  .logo-container {
    padding: 18px 16px !important;
    display: flex !important;
    align-items: center !important;
    background-color: var(--primary-dark) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    height: 64px !important;
  }

  /* Logo link */
  .logo {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    color: var(--text-light) !important;
    text-decoration: none !important;
    font-weight: 600 !important;
    font-size: 20px !important;
    letter-spacing: 0.5px !important;
  }
  .logo-icon {
    min-width: 24px !important;
    height: 24px !important;
  }

  /* Toggle button */
  .toggle-btn {
    margin-left: auto !important;
    background: none !important;
    border: none !important;
    color: var(--text-light) !important;
    cursor: pointer !important;
    font-size: 20px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    opacity: 0.9 !important;
    transition: opacity 0.2s !important;
    min-width: 20px !important;
    min-height: 20px !important;
    z-index: 10 !important;
  }
  .toggle-btn:hover {
    opacity: 1 !important;
  }

  /* Menu list */
  .menu {
    list-style: none !important;
    padding: 8px 0 !important;
    margin: 0 !important;
  }

  /* Menu items */
  .menu-item {
    display: flex !important;
    align-items: center !important;
    padding: 14px 20px !important;
    color: var(--text-light) !important;
    text-decoration: none !important;
    transition: all 0.2s ease !important;
    border-left: 4px solid transparent !important;
    margin-bottom: 2px !important;
    font-weight: 400 !important;
    letter-spacing: 0.3px !important;
    position: relative !important;
  }
  .menu-item:hover {
    background-color: var(--hover-bg) !important;
    cursor: pointer !important;
  }
  .menu-item.active {
    background-color: var(--active-bg) !important;
    border-left: 4px solid var(--text-light) !important;
    font-weight: 500 !important;
  }

  /* Menu icons */
  .menu-icon {
    min-width: 20px !important;
    width: 20px !important;
    height: 20px !important;
    margin-right: 14px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    opacity: 0.9 !important;
  }
  .menu-icon svg {
    min-width: 20px !important;
    min-height: 20px !important;
    width: 20px !important;
    height: 20px !important;
  }

  /* Collapsed menu */
  .sidebar.collapsed .menu-icon {
    margin-right: 0 !important;
  }
  .sidebar.collapsed .menu-item span {
    display: none !important;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .sidebar {
      width: var(--sidebar-width-collapsed) !important;
      position: fixed !important;
      z-index: 100 !important;
    }
    .sidebar.expanded {
      width: var(--sidebar-width) !important;
    }
    .sidebar:not(.expanded) .menu-item span,
    .sidebar:not(.expanded) .logo-text {
      display: none !important;
    }
    .sidebar:not(.expanded) .menu-icon {
      margin: 0 auto !important;
    }
    .sidebar.expanded .menu-icon {
      margin-right: 14px !important;
      margin-left: 0 !important;
    }
  }
`}</style>

    </>
  );
};

export default Sidebar;