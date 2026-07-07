import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './Component/ScrollToTop.jsx'
import CustomerApp from './CustomerApp.jsx'
import AdminRoutes from './admin/routes/AdminRoutes.jsx'

// Top-level router: the customer storefront (CustomerApp — unchanged,
// unmodified) is mounted at "/*", and the new admin panel is mounted
// separately at "/admin/*" with its own layout (no customer Header/Footer).
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<CustomerApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
