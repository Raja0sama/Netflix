import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import Stack from './routes/Stacknav.js'
import SideMenu from './routes/SideMenu';

const MainNavigator = createDrawerNavigator({
  Stack: {screen: Stack},
  


},{
  contentComponent: SideMenu,
  drawerWidth: 300

});

const Index = createAppContainer(MainNavigator);

export default Index;