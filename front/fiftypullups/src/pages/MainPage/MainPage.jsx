import { useState, useEffect } from "react";
import { Header, Footer } from "widgets";


function MainPage() {
    const [progress, setProgress] = useState(),
          [name, setName] = useState();

    useEffect(() => {
        document.title = 'Главная';
        setProgress('0');
        setName('Kirill');
    }, []);

    return(
        <>
            <Header progress={progress} name={name} />
            <Footer />
        </>
    );
}

export default MainPage;