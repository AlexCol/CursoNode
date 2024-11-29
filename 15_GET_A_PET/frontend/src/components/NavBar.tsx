import React from 'react'

function NavBar() {
    return (
        <section className="navbar">
            <nav className="navbar__menu">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/auth/login">Pagina1</a></li>
                    <li><a href="/auth/register">Pagina2</a></li>
                </ul>
            </nav>
        </section>
    )
}

export default NavBar