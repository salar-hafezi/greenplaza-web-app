import React, { useState } from 'react';
import { NavLink as LinkNav, Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    Badge
} from 'reactstrap';
import withStore from '../../hoc/withStore';
import withHistory from '../../hoc/withHistory';
import actions from '../../store/actions';
import './NavBar.scss';

const NavBar = (props) => {
    const { history, page } = props;
    const { state, dispatch } = props.appStore;
    const { user, cart } = state;
    // nav item
    let navItem = null;
    if (page === "home") {
        const cartLength = cart.length;
        if (cartLength > 0) {
            navItem = (
                <NavLink tag={Link} to="/order">
                    <Button color="info" outline>
                        Shpping Cart <Badge color="warning">{cartLength}</Badge>
                    </Button>
                </NavLink>
            );
        }
    }
    // login/logout menu item
    let loginLogout = null;
    if (user.isAuthenticated) {
        // reset app state
        loginLogout = <NavItem>
            <NavLink
                className="loginLink"
                onClick={() => (dispatch({ type: actions.USER_LOGOUT }), history.push('/'))}>Logout</NavLink>
        </NavItem>
    } else {
        loginLogout = <NavItem>
            <NavLink
                tag={Link}
                to="/login">Login</NavLink>
        </NavItem>
    }

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <>
            <Navbar color="dark" fixed="top" dark className="navbar">
                <NavbarBrand tag="p" className="mr-auto">
                    {navItem}
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink
                                exact={true}
                                tag={LinkNav}
                                activeClassName="is-active"
                                to="/">Home</NavLink>
                        </NavItem>
                        {(user && user.isAuthenticated)
                            ?
                            <NavItem>
                                <NavLink
                                    exact={true}
                                    tag={LinkNav}
                                    activeClassName="is-active"
                                    to="/profile">Profile</NavLink>
                            </NavItem>
                            : null}
                        {loginLogout}
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default withHistory(withStore(NavBar));
