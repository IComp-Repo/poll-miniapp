import { AuthProvider } from '../shared/context/AuthContext';
import Login from './login';

export default function Index() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}
