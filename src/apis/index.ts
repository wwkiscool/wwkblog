import service from "../utils/axios"

const GetHotArticle = async() => await service.post('/api/HotArticleRead/foreend')


const getTagRed = async () => await service.post('/api/TagRead/foreend')


const getArticleRead= async (data:object) => await service.post('/api/ArticleRead/foreend',data)
export  {
    GetHotArticle,
    getTagRed,
    getArticleRead
}