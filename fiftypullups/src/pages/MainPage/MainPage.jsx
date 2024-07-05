import { useState, useEffect } from "react";
import { Header, Footer } from "widgets";
import { url } from "shared";


function MainPage() {
    const [progress, setProgress] = useState(),
          [name, setName] = useState();

    useEffect(() => {
        document.title = 'Главная';
        setProgress('0');
        setName('Kirill');
        async function getData() {
            const response = await fetch(`${url}api/get_user_data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response)
        }

        getData();
    }, []);

    return(
        <>
            <Header progress={progress} name={name} />
            <Footer />
        </>
    );
}

export default MainPage;