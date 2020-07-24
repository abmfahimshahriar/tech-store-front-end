import React, { Component } from 'react'

export default class SignUp extends Component {
    state = {
        email: '',
        password: '',
        authLoading: false,
        error: null
    }
    
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        });
    }

    signupHandler = (event, authData) => {
        event.preventDefault();
        this.setState({ authLoading: true });
        fetch('http://localhost:8080/auth/signup', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: authData.email,
            password: authData.password
          })
        })
          .then(res => {
            if (res.status === 422) {
              console.log("validation error");
              return res.json();
            }
            if (res.status !== 200 && res.status !== 201) {
              console.log('Error!');
              return res.json();
            }
            return res.json();
          })
          .then(resData => {
            console.log(resData);
            this.setState({ authLoading: false });
            this.props.history.replace('/auth/signin');
          })
          .catch(err => {
            console.log(err);
            this.setState({
              authLoading: false,
              error: err
            });
          });
      };
    
    render() {
        return (
            <div className="col-5 py-5">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            className="form-control"
                        />
                    </div>
                    <button onClick={e => this.signupHandler(e,this.state)} className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        )
    }
}
