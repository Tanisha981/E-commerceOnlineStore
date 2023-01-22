import style from '../styles/Footer.module.css'

function Footer() {
    return (
        <div className={style.footer}>
            <ul className={style.lists}>
                <li>
                    Contact Us
                </li>
                <li>
                    About Us
                </li>
                <li>
                    Amazon
                </li>
                <li>
                    Retail
                </li>
            </ul>
            <ul className={style.lists}>
                <li>
                    Payment
                </li>
                <li>
                    Shipping
                </li>
                <li>
                    Returns
                </li>
                <li>
                    Cancellation
                </li>
            </ul>
            <ul className={style.lists}>
                <li>
                    Facebook
                </li>
                <li>
                    Twitter
                </li>
                <li>
                    YouTube
                </li>
            </ul>
        </div>
    )
}
export default Footer;