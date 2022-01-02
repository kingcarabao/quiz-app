import './App.css';
// routes
import Router from './routes';
import blueGrey from '@mui/material/colors/blueGrey';

function App() {
  return (
    <div style={{ backgroundColor: blueGrey[50], minHeight: '100vh' }}>
      <Router />
    </div>
  );
}

export default App;
