import { Outlet } from 'react-router-dom';
import { SessionContextProvider } from '../store/session-context';
import Header from '../components/Header';

export default function Root() {
  return (
    <SessionContextProvider>
      <Header />
      <Outlet />
    </SessionContextProvider>
  );
}
