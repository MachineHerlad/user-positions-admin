import { http } from "../http/http"

export const userList = async () => {
    try{
        let { result } = await http({
            url:'api/users'
        })
        return result
    }catch (err) {
        console.log(err);
    }
}