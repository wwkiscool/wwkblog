import service from "../utils/axios"

const getArticleList = async(data:object) => await service.post('/api/ArticleRead/foreend',data)

export  {
    getArticleList
}