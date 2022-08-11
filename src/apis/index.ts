import service from "../utils/axios"

const GetHotArticle = async() => await service.post('/HotArticleRead/foreend')


const getTagRed = async () => await service.post('/TagRead/foreend')


const getArticleRead= async (data:object) => await service.post('/ArticleRead/foreend',data)

const getArticleOne = async (data:{[key:string]:any}) => await service.post('/ArticleReadOne/foreend',data)
export  {
    GetHotArticle,
    getTagRed,
    getArticleRead,
    getArticleOne
}