import { Link, Outlet } from 'react-router-dom'
import { Suspense } from 'react';
import classes from './App.module.scss'

export function App() {
    return (
        <div>
            {PLATFORM === 'desktop' ? <h1 className={classes.button}>Hi desktop</h1> : <h1 className={classes.button}>Hi mobile</h1>}
            <div className={classes.navLink}>
                <Link to={'/shop/main'}>Shop Main</Link>
                <Link to={'/shop/price'}>Shop</Link>
                <Link to={'/about'}>About</Link>
            </div>
            <Outlet />
        </div>
    )
}