import React from 'react';
import {ProductConsumer} from '../context';

const SignIn = () => {
  
  return (
    <ProductConsumer>
    {
      value => {
        const {email,password,handleChangeSignIn,signinHandler} = value;
        return (
          <div className="col-5 py-5">
            <form>
              <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChangeSignIn}
                  value={email}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChangeSignIn}
                  value={password}
                  className="form-control"
                />
              </div>
              <button onClick={signinHandler} className="btn btn-primary">Sign In</button>
            </form>
          </div>
        );
      }
    }
    </ProductConsumer>
  );

  
  

  
    
  
}

export default SignIn;
