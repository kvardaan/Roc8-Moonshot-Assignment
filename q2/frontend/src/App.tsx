import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"

import { Landing } from "@/pages/landing"
import { AuthLayout } from "@/layout/auth"
import { Login } from "@/pages/auth/login"
import { Signup } from "@/pages/auth/signup"
import { Dashboard } from "@/pages/dashboard"
import { DashboardLayout } from "@/layout/dashboard"
import { ProtectedLayout } from "@/layout/protected"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Landing />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
)

function App() {
  return (
    <>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </>
  )
}

export default App
