import styles from '@/styles/Utils.module.css'

// const Button = () => {
//     return (
//         <button>button</button>>
//     )
// }

const Button = ({ text , size }) => {
    console.log(size)    
    return (
        <button className={`${styles.button} ${size="Large" ? styles.buttonLarge : ""}`}>
            {text}
        </button>
    )
}

export default Button