import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const UserProfile = () => {

    // @ts-ignore
    const user = useSelector((state)=>(state.user))
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{
        console.log(user)

        setLoading(true);
        if (!user.loggedIn) {
            router.push("/login")
        }else{

           const data = {
                userId : user.userId,
           }

            const JSONdata = JSON.stringify(data);

            const endpoint = "http://localhost:8010/proxy/user/data"

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata
            }

            fetch(endpoint, options)
                .then(resp=>resp.json())
                .then(data => {
                    setData(data)
                    setLoading(false)
                })
        }
    }, [user])

    console.log(data)

    return (
        <div>
            profile
        </div>
    );
}

export default UserProfile
