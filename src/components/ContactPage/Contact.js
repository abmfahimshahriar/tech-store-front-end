import React from 'react';
import Title from '../Title';

const Contact = () => {
    return (
        <section className="py-5">
            <div className="row">
             <div className="col-10 mx-auto col-md-6 my-3">
             <Title title="Contact Us"/>
             <form className="mt-5" action="https://formspree.io/fshahriar008@gmail.com" method="POST">
             {/* frist name */}
             <div className="form-group">
             <input 
                type="text"
                name="first name"
                className="form-control"
                placeholder="Fahim Shahriar"/>
             </div>

             {/* email */}
             <div className="form-group">
             <input 
                type="email"
                name="email"
                className="form-control"
                placeholder="example@gmail.com"/>
             </div>

             {/* subject */}
             <div className="form-group">
             <input 
                type="text"
                name="subject"
                className="form-control"
                placeholder="Message Subject"/>
             </div>

             {/* message */}
            <div className="form">
                <textarea 
                    className="form-control"
                    name="message"
                    rows="10"
                    placeholder="Type your message here" />
            </div>

            {/* submit */}
            <div className="form-group mt-3">
                <input
                    type="submit"
                    value="Send"
                    className="form-control bg-primary text-white"
                />
            </div>
             </form>
             </div>
            </div>
        </section>
    )
}

export default Contact;
