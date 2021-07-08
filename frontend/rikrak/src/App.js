import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import VideoCallScreen from "./screens/VideoCallScreen";
import HomeScreen from "./screens/HomeScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import { AuthProvider } from "./Contexts/AuthContext";
import PrivateRoutes from "./Routes/PrivateRoutes";
import MainScreen from "./screens/MainScreen";
import ChatScreen from "./screens/ChatScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Switch>
            <PrivateRoutes path="/" component={HomeScreen} exact />
            <Route path="/login" component={LoginScreen} />
            <Route path="/signup" component={SignupScreen} />
            <Route path="/forgot-password" component={ForgetPasswordScreen} />
            <PrivateRoutes path="/room/:roomId" component={VideoCallScreen} exact />
            <Route path="/main" component={MainScreen} />
            <PrivateRoutes path="/connect" component={ChatScreen}></PrivateRoutes>
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
