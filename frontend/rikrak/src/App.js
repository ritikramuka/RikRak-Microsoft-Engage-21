import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import VideoCallScreen from './screens/VideoCallScreen';
import HomeScreen from './screens/HomeScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import CreatVideoCallScreen from './screens/CreatVideoCallScreen';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path='/' component={HomeScreen} exact />
        <Route path='/login' component={LoginScreen} />
        <Route path='/signup' component={SignupScreen} />
        <Route path='/reset' component={ResetPasswordScreen} />
        <Route path='/forget' component={ForgetPasswordScreen} />
        <Route path='/create' component={CreatVideoCallScreen} />
        <Route path='/Call' component={VideoCallScreen} />
      </div>
    </Router>
  );
}

export default App;
