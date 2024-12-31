import styles from './ConfirmButton.module.scss';


function ConfirmButton(props) {
    const { text, func } = props;

    return(
        <button className={styles.button} onClick={() => func()}>
            {text}
        </button>
    );
}

export default ConfirmButton;