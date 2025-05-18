// components/Layout.js
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
      
   <style jsx global>{`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
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
  
  body {
    background-color: #f5f5f5;
    display: flex;
    min-height: 100vh;
  }

  #__next {
    display: flex;
    width: 100%;
  }
  
  .layout {
    display: flex;
    width: 100%;
  }
  
  /* 1) On large screens we rely on flex so NO margin-left */
  .main-content {
    flex: 1;
    padding: 20px;
    transition: margin-left var(--transition-speed) ease;
    margin-left: 0;
  }

  /* 2) Only on small screens (when sidebar is fixed/out-of-flow) do we push */
  @media (max-width: 768px) {
    .main-content {
      margin-left: var(--sidebar-width-collapsed);
    }
    /* expanded mobile sidebar */
    .sidebar.expanded + .main-content {
      margin-left: var(--sidebar-width);
    }
    /* collapsed mobile sidebar (body class from Sidebar.js) */
    body.sidebar-collapsed .main-content {
      margin-left: var(--sidebar-width-collapsed);
    }
  }
`}</style>

    </div>
  );
};

export default Layout;