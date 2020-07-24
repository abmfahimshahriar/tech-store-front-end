import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';

const Sidebar = () => {
    return (
        <ProductConsumer>
            {value => {
                const { links, sidebarOpen, handleSidebar, token, handleSignOut,getOrders, role } = value;
                let signInOut = null;
                if (!token) {
                    signInOut =
                        <div>
                            <li>
                                <Link to="/auth/signup" className="sidebar-link" onClick={handleSidebar} >
                                    Sign Up
                        </Link>
                            </li>
                            <li>
                                <Link to="/auth/signin" className="sidebar-link" onClick={handleSidebar} >
                                    Sign In
                        </Link>
                            </li>
                        </div>;
                }
                else {
                    signInOut = <li>
                        <Link to="/" className="sidebar-link" onClick={handleSignOut} >
                            Sign Out
                    </Link>
                    </li>;
                }
                const addProduct = <li>
                                        <Link to="/addproduct" className="sidebar-link" onClick={handleSidebar} >
                                            Add Product
                                        </Link>
                                    </li>;
                const viewOrders = <li>
                                        <Link to="/orders" className="sidebar-link" onClick={getOrders} >
                                            View Orders
                                        </Link>
                                    </li>;

                return (
                    <SideWrapper show={sidebarOpen}>
                        <ul>
                            {links.map(link => {
                                return (
                                    <li key={link.id}>
                                        <Link to={link.path} className="sidebar-link" onClick={handleSidebar} >
                                            {link.text}
                                        </Link>
                                    </li>
                                );
                            })}
                            {role === 'admin' ? addProduct: null}
                            {role === 'admin' ? viewOrders: null}
                            {signInOut}
                            
                            


                        </ul>
                    </SideWrapper>
                );
            }}

        </ProductConsumer>
    );
}

export default Sidebar;

const SideWrapper = styled.nav`
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--mainGrey);
    z-index: 1;
    border-right: 4px solid var(--primaryColor);
    transition: var(--mainTransition);
    transform: ${props => (props.show ? "translateX(0)" : "translateX(-100%)")};

    ul {
        list-style-type: none;
        padding: 0 !important;
    }

    .sidebar-link {
        display: block;
        font-size: 1.5 rem;
        text-transform: capitalize;
        color: var(--mainBlack);
        padding: 0.5rem 1.5rem;
        background: transparent;
        transition: var(--mainTransition);
    }

    .sidebar-link:hover {
        background: var(--primaryColor);
        color: var(--mainWhite);
        padding: 0.5rem 1.5rem 0.5rem 2.5rem;
        text-decoration: none;
    }
    @media (min-width: 576px) {
        width: 20rem;
    }
`;
