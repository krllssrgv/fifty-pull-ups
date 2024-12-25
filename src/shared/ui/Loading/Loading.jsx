import classNames from 'classnames';
import loadingImg from 'assets/img/loading.png';
import styles from './Loading.module.scss';


function Loading(props) {
    let targetClass;

    if (props.size === 'max') {
        targetClass = styles.max;
    } else if (props.size === 'med') {
        targetClass = styles.med;
    } else if (props.size === 'min') {
        targetClass = styles.min;
    }


    return(
        <div className={classNames(styles.loading, targetClass)}>
            <img src={loadingImg} alt="Loading" />
        </div>
    );
}

export default Loading;