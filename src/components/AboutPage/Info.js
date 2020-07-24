import React from 'react';
import Title from '../Title';
import aboutBcg from '../../images/aboutBcg.jpeg';
const Info = () => {
    return (
        <section className="py-5">
           <div className="container">
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    <img src={aboutBcg} 
                    className="img-fluid img-thumbnail" 
                    alt="about company"
                    style={{background: "var(--darkGrey)"}}
                    />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3">
                <Title title="about us" center="true"/> 
                <p className="text-lead text-muted my-3">
                this is a tech shop. and many more things that u want to pout here.
                </p>
                <button className="main-link" type="button" style={{marginTop: "2rem"}}>More Info</button>
                </div>
            </div>
           </div>
        </section>
    )
}

export default Info;