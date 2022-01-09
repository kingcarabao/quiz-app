import './App.css';
// routes
import blueGrey from '@mui/material/colors/blueGrey';
import Router from './routes';

function App() {
  return (
    <div style={{ backgroundColor: blueGrey[50], minHeight: '100vh' }}>
      <Router />
    </div>
  );
}

export default App;
