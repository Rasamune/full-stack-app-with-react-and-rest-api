import '../global.css';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import Header from './Header';
import Courses from './Courses';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import CourseDetail from './CourseDetail';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';
import UserSignOut from './UserSignOut';

// Context
import withContext from './../Context';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/create" component={CreateCourse} />
          <Route path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOut} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;