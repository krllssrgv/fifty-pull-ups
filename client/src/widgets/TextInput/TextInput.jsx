import classNames from 'classnames';
import styles from './TextInput.module.scss';

function TextInput(props) {
    const { type, value, setValue, placeholder, error } = props;

    return(
        <input className={classNames(styles.input, (error ? styles.error : null))} type={type} value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
    );
}

export default TextInput;