import {http} from '../http/http'

export const addUsers = async (data) => {
    try{
        const { result } = await http({
            url : 'api/users',
            type : 'post',
            data
        })
        return result
    } catch(err) {
        console.log(err);
    }
}