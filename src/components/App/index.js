import React, { useState, useEffect } from "react";

import Login from "../Login";
import Dashboard from "../Dashboard";
// import Register from "../Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // const [isResgistered, setIsResgistered] = useState(null);

  useEffect(() => {
    setIsAuthenticated(true);
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
