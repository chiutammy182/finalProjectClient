import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
          name: this.props.campus.name, 
          address: this.props.campus.address, 
          description: this.props.campus.description, 
          redirect: false, 
          id: this.props.campus.id,
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

    let campus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        id: this.props.campus.id
    };
    
    // Update campus in back-end database
    await this.props.editCampus(campus);

    //Update state, and trigger redirect to show the edited campus
    this.setState({
        name: "", 
        address: "", 
        description: "", 
        imageUrl: "",
      redirect: true, 
      id: this.props.campus.id,
    });
  }

  // Render campus edit input form
  render() {
    // Redirect to new campus' page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.id}`}/>)
    }
    
    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}   
          campus={this.props.campus}
        />
      </div>          
    );
  }
}
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
  };
};
// The following input argument is passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
    })
}

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);