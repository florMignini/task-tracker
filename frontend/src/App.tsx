import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layouts";
import { ChangePassword, ConfirmAccount, ForgottenPassword, Login, Register } from "./pages";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< AuthLayout/>} >
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotten-password" element={<ForgottenPassword />} />
          <Route path="forgotten-password/:token" element={<ChangePassword />} />
          <Route path="confirm-account/:token" element={<ConfirmAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
