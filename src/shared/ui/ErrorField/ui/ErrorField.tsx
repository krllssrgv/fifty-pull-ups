import styles from './ErrorField.module.scss';

function ErrorField(props) {
    const { text } = props;

    return(
        <div className={styles.error}>{text}</div>
    );
}

export default ErrorField;