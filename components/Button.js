import styles from '@/styles/Components.module.css'

// const Button = () => {
//     return (
//         <button>button</button>>
//     )
// }

const Button = ({ text , size }) => {   
    return (
        <button className={`${styles.button} ${size="Large" ? styles.buttonLarge : ""}`}>
            {text}
        </button>
    )
}

export default Button