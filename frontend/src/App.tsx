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
import { NewProject } from "./pages/privates";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgotten-password" element={<ForgottenPassword />} />
            <Route
              path="forgotten-password/recovery"
              element={<ChangePassword />}
            />
            <Route path="confirm-account/:token" element={<ConfirmAccount />} />
          </Route>
          {/* private routes */}
          <Route path="/projects" element={<ProtectedLayout/>}>
            <Route index element={<Projects/>} />
            <Route path="new-project" element={<NewProject/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
