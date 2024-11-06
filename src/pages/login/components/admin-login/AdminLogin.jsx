import { LoginForm } from '@/components';

const AdminLogin = ({ handleSubmit }) => {
  return (
    <>
      <LoginForm handleSubmit={handleSubmit} />
    </>
  );
};
export default AdminLogin;
