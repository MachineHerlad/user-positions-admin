export const http = ({
    url,
    type ='get',
    data = {}
}) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            dataType:'json',
            data,
            type,
            headers: {
                'X-Access-Token': localStorage.getItem('mai-token') || ''
            },
            success(result, textStatus, jqXHR) {
                resolve({
                    result, 
                    textStatus, 
                    jqXHR
                })
            },
            error(err) {
                reject(err.message)
            }
        })
    })
}

