import service from "../utils/axios"

const GetHotArticle = async() => await service.post('/HotArticleRead/foreend')


const getTagRed = async () => await service.post('/TagRead/foreend')


const getArticleRead= async (data:{[key:string]:any}) => await service.post('/ArticleRead/foreend',data)

const getArticleOne = async (data:{[key:string]:any}) => await service.post('/ArticleReadOne/foreend',data)

const GetCommentList = async (data:{[key:string]:any})=> await service.post('/ArticleCommentRead/foreend',data)

const createArticleComment = async (data:{[key:string]:any}) => await service.post('/ArticleCommentCreate/foreend',data)


















export  {
    GetHotArticle,
    getTagRed,
    getArticleRead,
    getArticleOne,
    GetCommentList,
    createArticleComment
}