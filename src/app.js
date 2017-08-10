import { Navigation } from 'react-native-navigation';
import LoginScreen from './views/login/login-screen.js';
import ForgotPasswordScreen from './views/user/forgot-password/forgot-password-screen.js';
import HomeScreen from './views/home/home-screen.js';
import ChannelListScreen from './views/channels/channel-list/channel-list-screen.js';
import ChannelShowScreen from './views/channels/channel-show/channel-show-screen.js';
import TaskListScreen from './views/task-list/task-list-screen.js';
import CreateTaskScreen from './views/create-task/create-task-screen.js';
import TaskShowScreen from './views/task-show/task-show-screen.js';
import TaskEditScreen from './views/task-edit/task-edit-screen.js';
import EventListScreen from './views/calendar/event-list/event-list-screen';
import EventShowScreen from './views/calendar/event-show/event-show-screen';
import PointsScreen from './views/points/points-screen.js';
import PointsCreateScreen from './views/points-create/points-create-screen.js';
import ContactListScreen from './views/directory/contact-list/contact-list-screen.js';
import ContactShowScreen from './views/directory/contact-show/contact-show-screen.js';
import MyInfoShowScreen from './views/user/my-info-show/my-info-show-screen.js';
import MyInfoEditScreen from './views/user/my-info-edit/my-info-edit-screen.js';
import MinutesListScreen from './views/minutes/minutes-list/minutes-list-screen';
import DuesWebScreen from './views/dues/dues-web/dues-web-screen';
import MinutesShowScreen from './views/minutes/minutes-show/minutes-show-screen';
import MinutesCreateScreen from './views/minutes/minutes-create/minutes-create-screen';
import BudgetsListScreen from './views/budgets/budgets-list/budgets-list-screen';
import ExpenseListScreen from './views/budgets/expense-list/expense-list-screen';
import ExpenseCreateScreen from './views/budgets/expense-create/expense-create-screen';
import ExpenseShowScreen from './views/budgets/expense-show/expense-show-screen';
import GradeListScreen from './views/scholarship/grade-list/grade-list-screen';
import GradeShowScreen from './views/scholarship/grade-show/grade-show-screen';
import GradeCreateScreen from './views/scholarship/grade-create/grade-create-screen';
import ErrorView from './views/common/error-view.js';
import LoadingScreen from './views/common/loading-screen.js';
require('./globals/state');
require('./globals/event-bus');

function registerScreens() {
  Navigation.registerComponent('LoginScreen', () => LoginScreen);
  Navigation.registerComponent('ForgotPasswordScreen', () => ForgotPasswordScreen);
  Navigation.registerComponent('HomeScreen', () => HomeScreen);
  Navigation.registerComponent('ChannelListScreen', () => ChannelListScreen);
  Navigation.registerComponent('ChannelShowScreen', () => ChannelShowScreen);
  Navigation.registerComponent('TaskListScreen', () => TaskListScreen);
  Navigation.registerComponent('CreateTaskScreen', () => CreateTaskScreen);
  Navigation.registerComponent('TaskShowScreen', () => TaskShowScreen);
  Navigation.registerComponent('TaskEditScreen', () => TaskEditScreen);
  Navigation.registerComponent('EventListScreen', () => EventListScreen);
  Navigation.registerComponent('EventShowScreen', () => EventShowScreen);
  Navigation.registerComponent('PointsScreen', () => PointsScreen);
  Navigation.registerComponent('PointsCreateScreen', () => PointsCreateScreen);
  Navigation.registerComponent('ContactListScreen', () => ContactListScreen);
  Navigation.registerComponent('ContactShowScreen', () => ContactShowScreen);
  Navigation.registerComponent('MyInfoShowScreen', () => MyInfoShowScreen);
  Navigation.registerComponent('MyInfoEditScreen', () => MyInfoEditScreen);
  Navigation.registerComponent('DuesWebScreen', () => DuesWebScreen);
  Navigation.registerComponent('MinutesListScreen', () => MinutesListScreen);
  Navigation.registerComponent('MinutesShowScreen', () => MinutesShowScreen);
  Navigation.registerComponent('MinutesCreateScreen', () => MinutesCreateScreen);
  Navigation.registerComponent('BudgetsListScreen', () => BudgetsListScreen);
  Navigation.registerComponent('ExpenseListScreen', () => ExpenseListScreen);
  Navigation.registerComponent('ExpenseCreateScreen', () => ExpenseCreateScreen);
  Navigation.registerComponent('ExpenseShowScreen', () => ExpenseShowScreen);
  Navigation.registerComponent('GradeListScreen', () => GradeListScreen);
  Navigation.registerComponent('GradeShowScreen', () => GradeShowScreen);
  Navigation.registerComponent('GradeCreateScreen', () => GradeCreateScreen);
  Navigation.registerComponent('ErrorView', () => ErrorView);
  Navigation.registerComponent('LoadingScreen', () => LoadingScreen);
}

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'LoadingScreen',
    title: 'Login'
  },
  animationType: 'none'
});

AppState.load(() => {
  if (AppState.currentUser)
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'HomeScreen',
        title: 'Login'
      },
      animationType: 'none'
    });
  else {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'LoginScreen',
        title: 'Login'
      },
      animationType: 'none'
    });
  }
})
