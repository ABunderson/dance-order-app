import styles from '@/styles/Components.module.css'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerDiv}>
                <p>&copy;2023 Bunderson </p>
                <p>icons by <a href="https://icons8.com/" target="_blank">Icons8</a></p>
                <div className={styles.socialIcons}>
                    <a href="#">
                        <Image
                            className={styles.socialIcon}
                            src="/icons/facebook.svg"
                            alt="The Facebook icon. Icon from Icons8"
                            title="Florists Facebook page"
                            width={50}
                            height={50}
                            priority
                        />
                    </a>
                    <a href="#">
                        <Image
                            className={styles.socialIcon}
                            src="/icons/pinterest.svg"
                            alt="A Pinterest icon. Icon from Icons8"
                            title="Florists Facebook page"
                            width={50}
                            height={50}
                            priority
                        />
                    </a>
                    <a href="#">
                        <Image
                            className={styles.socialIcon}
                            src="/icons/instagram.svg"
                            alt="An Instagram icon. Icon from Icons8"
                            title="Florists Instagram page"
                            width={50}
                            height={50}
                            priority
                        />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer