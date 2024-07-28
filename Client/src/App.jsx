import { Route, Routes } from "react-router-dom";
import {
  Home,
  Container,
  Registration,
  Login,
  EmployeeList,
  RegisterEmployee,
  Dashboard,
  EditEmployee,
} from "./pages";
import ProtectedRoute from "./routes/ProtectedRoute";
import OpenRoute from "./routes/OpenRoute";
import { AuthProvider } from "./contexts/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Container />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="/registration"
            element={
              <OpenRoute>
                <Registration />
              </OpenRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/emplyee-registration"
            element={
              <ProtectedRoute>
                <RegisterEmployee />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee-list"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-employee/:id"
            element={
              <ProtectedRoute>
                <EditEmployee />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
