import Image from 'next/image'
import styles from '@/styles/Utils.module.css'
import Link from 'next/link'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerDiv}>
                <Link href="/">
                    <Image
                        className={styles.logo}
                        src="/icons/logo.png"
                        alt="A logo image of a flower. Icon from Icons8"
                        title="Home page"
                        width={80}
                        height={80}
                        priority
                    />
                </Link>
                
                <Link href="/">
                    <Image
                        // className={styles.logo}
                        src="/icons/account.png"
                        alt="An Account icon. Icon from Icons8"
                        title="Click to login to your account. Florists only"
                        width={80}
                        height={80}
                        priority
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header