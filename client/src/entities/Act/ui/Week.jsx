import { useState } from 'react';
import classNames from 'classnames';
import { url } from 'shared/index';
import styles from './Week.module.scss';


function Week(props) {
    const { isSuccess, setIsSuccess, doneDays, week, setDisplayedAct, setPage } = props;

    const confirmSuccess = (result) => {
        async function sendResult() {
            setIsSuccess('');
            const response = await fetch(`${url}api/send_result`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({success: result})
            });

            if (response.ok) {
                const json = await response.json();
                setIsSuccess(json.success);
            } else {
                console.log(response.status);
            }
        }

        sendResult();
    }


    const renderSuccess = () => {
        if (isSuccess === '0') {
            return(
                <div className={styles.success}>
                    <div className={styles.question}>Получилось ли выполнить указанное количество подтягиваний за эту неделю?</div>
                    <div className={styles.buttons}>
                        <div className={classNames(styles.btn, styles.false)} onClick={() => confirmSuccess(false)}>Нет</div>
                        <div className={classNames(styles.btn, styles.true)} onClick={() => confirmSuccess(true)}>Да</div>
                    </div>
                </div>
            );
        } else if (isSuccess === '1') {
            return(
                <div className={styles.success}>
                    Вы подтвердили, что смогли выполнить указанное количество подтягиваний за эту неделю. Тренировки следующей недели будут доступны в понедельник.
                </div>
            );
        } else if (isSuccess === '-1') {
            return(
                <div className={styles.success}>
                    Вы не смогли выполнить указанное количество подтягиваний за эту неделю. На следующей неделе необходимо повторить программу текущей недели. В понедельник тренировки будут обновлены.
                </div>
            );
        }
    }


    return(
        <div className={styles.container}>
            <div className={styles.headline}>Ваша текущая неделя</div>

            <div className={styles.subheadline}>Номер по программе - {week}</div>

            <div className={styles.subheadline}>Тренировки:</div>

            <div className={styles.acts}>
                <div className={classNames(styles.act, (doneDays[0] ? null : styles.active))} onClick={() => {
                    setDisplayedAct(1);
                    setPage(0);
                }}>
                    День 1
                </div>

                <div className={classNames(styles.act, (doneDays[1] ? null : styles.active))} onClick={() => {
                    setDisplayedAct(2);
                    setPage(0);
                }}>
                    День 2
                </div>

                <div className={classNames(styles.act, (doneDays[2] ? null : styles.active))} onClick={() => {
                    setDisplayedAct(3);
                    setPage(0);
                }}>
                    День 3
                </div>
            </div>

            { renderSuccess() }
        </div>
    );
}

export default Week;