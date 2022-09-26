import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {userState} from "../../store/authSlice";

const UserProfile = () => {

    // @ts-ignore
    const user = useSelector((state)=>(state.user))
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        console.log(user)
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
                    'Access-Control-Allow-Headers': "*",
                    "Access-Control-Allow-Origin": "*"
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
