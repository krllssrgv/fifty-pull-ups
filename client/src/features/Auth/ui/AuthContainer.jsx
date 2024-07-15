import styles from './AuthContainer.module.scss';


function AuthContainer(props) {
    return(
        <div className={styles.container}>
            { props.children }
        </div>
    );
}

export default AuthContainer;