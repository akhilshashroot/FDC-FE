import React, { Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Home } from "react-feather";
import { NavLink } from "react-router-dom";

class NavBreadCrumbs extends React.PureComponent {
    render() {
        let pagename= {
            color: "#636363", fontWeight: "500", marginRight: "1rem",marginTop: "0.4rem"
        }
        let breadcrumb = {
            borderLeft: "1px solid #d6dce1"
        }
        let breadcrumbicon = {
            paddingTop : "7px"
        }
        let breadcrumbitem = {
            marginTop: "6px",
            paddingTop : "7px"
        }
        let navlink = {
            color: "#7367f0", textDecoration: "none"
        }
        if (this.props.data && this.props.data.length > 0) {
            return (
                <Fragment>
                    <h2 className="content-header-title mb-0" style={pagename}>
                        {this.props.data && this.props.data[0]}
                    </h2>
                    <Breadcrumb style={breadcrumb}>
                        <BreadcrumbItem style={breadcrumbicon}>
                            <NavLink to="/" style={navlink}>
                                <Home size={15} />
                            </NavLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem style={breadcrumbitem} className="text-primary">{this.props.data && this.props.data[1]}</BreadcrumbItem>
                        <BreadcrumbItem style={breadcrumbitem} active >{this.props.data && this.props.data[2]}</BreadcrumbItem>
                    </Breadcrumb>
                </Fragment>
            )
        } else {
            return null
        }
    }
}

export default NavBreadCrumbs