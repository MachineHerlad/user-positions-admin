export const signin = () => {
    return $.ajax({
        url: 'api/users/signin',
        type: post,
        dataType: 'json',
        data,
        success(res, textStatus, jqXHR) {
            return {
                res,
                jqXHR
            }
        }

    })
}