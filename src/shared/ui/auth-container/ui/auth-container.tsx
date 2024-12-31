import styles from './auth-container.module.scss';


export const AuthContainer = (props) => {
    return(
        <div className={styles.container}>
            { props.children }
        </div>
    );
}