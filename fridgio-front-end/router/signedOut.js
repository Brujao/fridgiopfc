import { StackNavigator } from "react-navigation";

import Login from "../pages/login.js";
import Register from "../pages/register.js";

export const SignedOut = StackNavigator({
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);
