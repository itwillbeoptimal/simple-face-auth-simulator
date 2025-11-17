import { Routes, Route } from 'react-router-dom';
import FaceLogin from '@/pages/FaceLogin';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/face-login" element={<FaceLogin />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
