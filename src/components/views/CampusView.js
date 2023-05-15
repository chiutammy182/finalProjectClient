/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, editStudent, handleDeleteCampus } = props;

//   handleEnrollment = (event) => {
//     students.map(student => student.firstname + " " +student.lastname === studentName)

//     let enrollStudent = event.target.studentEnroll.value;
//   let foundStudent = students.find(student => student.firstname+ " "+student.lastname === enrollStudent);
//   foundStudent.campusId = campus.id;
//   editStudent(foundStudent);
// }

  // Render a single Campus view with list of its students
  if(campus.students.length<=0)
  return(
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <img src={campus.imageUrl} height="300" alt=""/>
      <br/>
      <br/>
      <Link to={`/editcampus/${campus.id}`}>
          <button>Edit Campus Information</button>
      </Link>
      <h3>No enrolled students.</h3>
      <button onClick={() => handleDeleteCampus(campus.id)}>Delete Campus</button>
      <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
  )
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <img src={campus.imageUrl} height="300" alt=""/>
      <br/>
      <br/>
      <Link to={`/editcampus/${campus.id}`}>
          <button>Edit Campus Information</button>
      </Link>
      
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link> 
            <button onClick={() => {editStudent({...student, campusId: null});window.location.reload()}}>  
             Unenroll Student </button>   
            <br/><br/>
          </div> 
        );
      })}
       <button onClick={() => handleDeleteCampus(campus.id)}>Delete Campus</button>
      <Link to={`/newstudent`}>
        <button>Enroll New Student</button>
      </Link>
      <Link to={`/students`}>
        <button>Enroll Existing Student</button>
      </Link>
     
      
      
      <br/>
      <br/>
    </div>
  );
};

export default CampusView;