import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<div className="ml-auto">
				{/* Link lo tulizamos como <a> y el href es el to='' */}
				<Link to="/nuevo">
					{/* cualquier hijo del Link al hacerse click en el te lleva a la ruta especificada en el atributo to={} del Link */}
					<button className="btn btn-primary">add contact</button>
				</Link>
			</div>
		</nav>
	);
};
