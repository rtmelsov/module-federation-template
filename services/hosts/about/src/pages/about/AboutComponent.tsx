import classes from './About.module.scss'
import instagram from '@assets/png/instagram.png';

export default function AboutComponent() {
    return (
        <div>
            <h1 className={classes.title}>About</h1>
            <img width={100} src={instagram} alt='' />
            <div className={classes.text}>
                I dont like football
            </div>
        </div>
    )
}