import { useRouter } from 'next/router'

const AdminEditUser = () => {
    const router = useRouter()
    const { userid } = router.query

    return (
        <div>
            {userid}
        </div>
    );
}



export default AdminEditUser

