import React from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';


const initialState = {
  error: false,
  fields: {
    username: "",
    password: ""
  }
}




class Login extends React.Component {

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
    fetch('https://hashketball-backend.herokuapp.com/api/v1/auth', {
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
        this.props.handleUserLogin(data)
        this.props.history.push("/team")
      }
    })
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
          <form onSubmit={this.handleSubmit} className="form">
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
                <label>Login</label>
              </button>
          </form>
        </div><br/>
      <div id="submitButton">
          <Link to="/register">
            <button className="ui basic purple button">Register</button>
          </Link>
        </div>
      </div>
    )
  }
}
export default withRouter(Login);
