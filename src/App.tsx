
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { AuthLayout, ProtectedLayout } from "./layouts";
import {
  ChangePassword,
  ConfirmAccount,
  ForgottenPassword,
  Login,
  Projects,
  Register,
} from "./pages";
import { Dashboard, EditProject, NewProject, Project } from "./pages/privates";
import { ProjectProvider } from "./context/ProjectProvider";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            {/* public routes */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="forgotten-password"
                element={<ForgottenPassword />}
              />
              <Route
                path="forgotten-password/recovery"
                element={<ChangePassword />}
              />
              <Route
                path="confirm-account/:token"
                element={<ConfirmAccount />}
              />
            </Route>
            {/* private routes */}
            <Route path="/dashboard" element={<ProtectedLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/new-project" element={<NewProject />} />
              <Route path="projects/:id" element={<Project/>}/>
              <Route path="projects/edit/:id" element={<EditProject />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

