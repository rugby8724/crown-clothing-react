import { Routes, Route } from 'react-router-dom'

import Navigation from './routes/navigation/navigation.jsx';
import Home from './routes/home/home.jsx'
import SignIn from './routes/sign-in/sign-in.jsx';



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
      
    </Routes>
  );
}

export default App;
