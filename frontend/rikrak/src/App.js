import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import VideoCallScreen from "./screens/VideoCallScreen";
import HomeScreen from "./screens/HomeScreen";
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/signup' component={SignupScreen} />
          <Route path='/forget' component={ForgetPasswordScreen} />
          <Route path="/room/:roomId" component={VideoCallScreen} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
