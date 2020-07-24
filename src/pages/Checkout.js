import React from 'react';
import {ProductConsumer} from '../context';

const Checkout = () => {
    return (
        <ProductConsumer>
        {value => {
            const {cusName,address,contact, orderHandler,handleChangeOrder} = value;
            return(
            <div className="col-5 py-5">
            <form>
                {/* Customer Name */}
              <div className="form-group">
                <label htmlFor="cusName">Your Name:</label>
                <input
                  type="text"
                  name="cusName"
                  id="cusName"
                  onChange={handleChangeOrder}
                  value={cusName}
                  className="form-control"
                />
              </div>
              {/* Customer Address */}
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={handleChangeOrder}
                  value={address}
                  className="form-control"
                />
              </div>
              {/* Customer Contact Number */}
              <div className="form-group">
                <label htmlFor="contact">Contact:</label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  onChange={handleChangeOrder}
                  value={contact}
                  className="form-control"
                />
              </div>
              <button onClick={orderHandler} className="btn btn-primary">Place Order</button>
            </form>
          </div>
            );
        }}
        </ProductConsumer>
    )
}

export default Checkout;
