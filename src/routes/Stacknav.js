import {
  createStackNavigator
} from 'react-navigation';
import Home from '../pages/Home'
import Main from '../pages/Main'
import Login from '../pages/Login'
import Reg from '../pages/Reg'
import Haimus from '../pages/haimus'
import Haiflix from '../pages/haiflix'
import Search from '../pages/search'
import Video from '../pages/video'
import Lvideio from '../pages/Lvid'

const Stack = createStackNavigator({
   Login: {
    screen: Login,
  },
  Reg: {
    screen: Reg,
  },
  Search: {
    screen: Search,
  },
  Lvideio: {
    screen: Lvideio,
  },
  Haiflix: {
    screen: Haiflix,
  },
  Haimus: {
    screen: Haimus,
  },
  Home: {
    screen: Home,
  },
  Search: {
    screen: Search,
  },
  Main: {
    screen: Main,
  },
  Login: {
    screen: Login,
  },
  Reg: {
    screen: Reg,
  },
  Video: {
    screen: Video,
  }
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
// const prevGetStateForAction = Stack.router.getStateForAction;
// Stack.router = {
//   ...Stack.router,
//   getStateForAction(action,state){
//     if(state && action.type === 'ReplaceCurrentScreen'){
//       const routes = state.routes.slice(0,state.routes.length-1);
//       routes.push(action);
//       return{
//         ...state,
//         routes,
//         index:routes.length - 1,

//       };
//       return prevGetStateForAction(action,state);
//     }
//   }
// }
export default Stack;
