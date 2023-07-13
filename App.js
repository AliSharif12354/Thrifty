import React from 'react';
import BootUpScreen from './screens/BootUp';
import SearchBarScreen from './screens/SearchBar';

const App = () => {
  const [showBootUpScreen, setShowBootUpScreen] = React.useState(true);

  const handleSearch = (searchText) => {
    // Handle search logic here
    console.log('Search text:', searchText);
  };

  return (
    <>
      {showBootUpScreen ? (
        <BootUpScreen onBootUpComplete={() => setShowBootUpScreen(false)} />
      ) : (
        <SearchBarScreen onSearch={handleSearch} />
      )}
    </>
  );
};

export default App;