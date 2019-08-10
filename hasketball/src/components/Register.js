import React from 'react';
import { withRouter } from 'react-router-dom';


const initialState = {
    error: false,
    fields: {
        username: "",
        password: "",
        team_name: ""
    }
}



class Register extends React.Component {

    constructor() {
        super();
        this.state = initialState
     }

    handleChange = e => {
     const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
     this.setState({ fields: newFields });
   };

   handleSubmit = e => {
     e.preventDefault()
     console.log("what you entered",this.state.fields);
     fetch('https://hashketball-backend.herokuapp.com/api/v1/register', {
       method: "POST",
       headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json'
       },
       body: JSON.stringify(this.state.fields)
     })
     .then(r => r.json())
     .then(data => {
       if (data.error) {
         this.setState({error: true})
       } else {
           console.log("giving you:",data)
       }
     })
     .then(this.props.history.push("/")
     )
     }

     render() {
         const { fields } = this.state
        return(
         <div className="formContainer">
         <div className="ui form error">
           {
             this.state.error &&
             <div className="ui error message">
               Try Again
             </div>
           }
           <form onSubmit={this.handleSubmit}>
             <div className="ui field">
               <label>Username</label>
               <input
                 name="username"
                 placeholder="username"
                 value={fields.username}
                 onChange={this.handleChange}
               />
             </div>
             <div className="ui field">
               <label>Team Name</label>
               <input
                 name="team_name"
                 placeholder="Team Name"
                 value={fields.team_name}
                 onChange={this.handleChange}
               />
             </div>
             <div className="ui field">
               <label>Password</label>
               <input
                 name="password"
                 type="password"
                 placeholder="password"
                 value={fields.password}
                 onChange={this.handleChange}
               />
             </div>
             <button type="submit" className="ui basic green button">
               Create Account
             </button>
           </form>
         </div>
        </div>
        )}

}
export default withRouter(Register);
