import { LoginForm } from '@/components';

const CustomerLogin = ({ handleSubmit }) => {
  return (
    <>
      <LoginForm handleSubmit={handleSubmit} />
    </>
  );
};
export default CustomerLogin;
