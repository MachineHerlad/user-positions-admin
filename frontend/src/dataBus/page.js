// 共享数据
class Page {
    constructor(){
        this.pageUserList = 10 //每页显示数据数量
        this.curPage = 1 //当前页码，默认为1
        this.curRoute = '#/index/users'
    }

    // 每调用一次就初始化一次
    reset() {
        this.pageUserList = 10
        this.curPage = 1
    }

    setcurRoute(route) {
        this.curRoute = route
    }

    setCurPage(curPage) {
        this.curPage = curPage
    }
}

export default new Page()