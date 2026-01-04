import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { OpenAPI } from './client';
import MeetingList from './pages/MeetingList';
import MeetingDetail from './pages/MeetingDetail';
import './index.css';

// Configure API Client
OpenAPI.BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="container">
          <nav style={{ marginBottom: '2rem' }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
              Meeting Decision Tracker
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<MeetingList />} />
            <Route path="/meetings/:id" element={<MeetingDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
