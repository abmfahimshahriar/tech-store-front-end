import React from 'react';
import { ProductConsumer } from '../../context';
import styled from 'styled-components';

const Services = () => {
    return (
        <ProductConsumer>
            {value => {
                const { servicesData } = value;
                return (
                    <ServicesWrapper className="py-5">
                        <div className="container">
                            <div className="row">
                                {
                                    servicesData.map(item => {
                                        return (
                                            <div className="col-10 mx-auto col-sm-6 col-md-4 text-center my-3" key={item.id}>
                                                <div className="service-icon">
                                                    {item.icon}
                                                </div>
                                                <div className="mt-3 text-capitalize">
                                                    {item.title}
                                                </div>
                                                <div className="mt-3">
                                                    {item.text}
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </ServicesWrapper>
                );
            }}
        </ProductConsumer>
    );
}

const ServicesWrapper = styled.section`
    background: rgba(95, 183, 234, 0.5);

    .service-icon {
        font-size: 2.5rem;
        color: var(--primaryColor);
    }
    p {
        color: var(--darkGrey);
    }
`;

export default Services;