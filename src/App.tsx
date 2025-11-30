import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Characters } from './pages/Characters';
import { CharacterDetails } from './pages/CharacterDetails';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/character/:id" element={<CharacterDetails />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;