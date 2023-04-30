import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      firstname: this.props.student.firstname, 
      lastname: this.props.student.lastname, 
      campusId: this.props.student.campusId, 
      gpa: this.props.student.gpa,
      email: this.props.student.email,
      redirect: false, 
      id: this.props.student.id,
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.state.campusId,
        gpa: this.state.gpa,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
        id: this.props.student.id
    };
    
    // Update student in back-end database
    await this.props.editStudent(student);

    //Update state, and trigger redirect to show the edited student
    this.setState({
      firstname: "", 
      lastname: "", 
      campusId: null, 
      gpa: null,
      email: "",
      imageUrl: null,
      redirect: true, 
      id: this.props.student.id,
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, id: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
       return (<Redirect to={`/student/${this.state.id}`}/>)
    }
    
    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}   
          student={this.props.student}
        />
      </div>          
    );
  }
}
const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "student"
  };
};
// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);