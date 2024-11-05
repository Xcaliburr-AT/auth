import React, { useState } from 'react';
import LoginForm from './components/login_components/LoginForm';
import SignupForm from './components/login_components/Signupform';

const App = () => {
  const [showSignup, setShowSignup] = useState(false);

  const toggleForm = () => {
      setShowSignup(prev => !prev);
  };

  return (
      <div className="App">
          {showSignup ? (
              <SignupForm onShowSignup={toggleForm}/>
          ) : (
              <LoginForm onShowSignup={toggleForm} />
          )}
      </div>
  );
};

export default App;





