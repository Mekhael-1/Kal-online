import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Home from './pages/Home/Home';
import Download from './pages/Download/Download';
import Rankings from './pages/Rankings/Rankings';
import Schedule from './pages/Schedule/Schedule';
import Wiki from './pages/Wiki/Wiki';
import Donate from './pages/Donate/Donate';
import VoteRewards from './pages/Vote/VoteRewards';
import Auth from './pages/Auth/Auth';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="download" element={<Download />} />
          <Route path="rankings" element={<Rankings />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="wiki" element={<Wiki />} />
          <Route path="donate" element={<Donate />} />
          <Route path="vote" element={<VoteRewards />} />
          <Route path="vote-rewards" element={<VoteRewards />} />
          <Route path="login" element={<Auth mode="login" />} />
          <Route path="register" element={<Auth mode="register" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
