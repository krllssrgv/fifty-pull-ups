import { useState, useEffect } from "react";
import { Header } from "widgets/index";

function ProfilePage() {
    const [progress, setProgress] = useState(),
          [name, setName] = useState();

    useEffect(() => {
        document.title = 'Профиль';
        setProgress('0');
        setName('Kirill');
    }, []);


    return(
        <>
            <Header progress={progress} name={name} />
        </>
    );
}

export default ProfilePage;