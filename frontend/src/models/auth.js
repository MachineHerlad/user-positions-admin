import http from '../http/http'

export const auth = async () => {
    try {
        let { result } = await http({
            url: '/api/users/isAuth'
        })
        return result
    } catch (err) {
        console.log(err);
    }
}