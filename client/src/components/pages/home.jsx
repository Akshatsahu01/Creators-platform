import { Link } from 'react-router-dom';
import ConnectionTest from '../components/common/ConnectionTest';

const Home = () => {
  return (
    <div style={containerStyle}>
      {/* Your existing hero section */}
      <div style={heroStyle}>
        {/* ... your existing home page content ... */}
      </div>

      {/* Add the connection test */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <ConnectionTest />
      </div>

      {/* Your existing features section */}
      {/* ... */}
    </div>
  );
};

// ... rest of your Home component