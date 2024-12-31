import classNames from 'classnames';
import styles from './text-input.module.scss';

export const TextInput = (props) => {
    const { type, value, setValue, placeholder, error } = props;

    return(
        <input className={classNames(styles.input, (error ? styles.error : null))} type={type} value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
    );
}
