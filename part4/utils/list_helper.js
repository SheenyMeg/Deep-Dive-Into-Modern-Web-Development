const _ = require ('lodash')

const dummy = (blogs) => {
    if (blogs) {
        return 1
    }
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((acc, cur) => acc + cur)
}

const favoriteBlog = (blogs) => {
    const blogsLike = blogs.find(blog =>
        blog.likes === Math.max( ...blogs.map(blog => blog.likes) )
    )
    return blogsLike
}
const mostBlogs = (blogs) => {
    const authorList = _.map(blogs, 'author')
    const countAuthor = _.reduce(authorList, (authors, name) => {
        if (name in authors) {
            authors[name]++
        }else {
            authors[name] = 1
        }
        return authors
    }, {})
    const maxRepeat = _.max(_.map(countAuthor))
    const maxIndex = _.indexOf(_.map(countAuthor), maxRepeat)
    const authorArr = _.toPairs(countAuthor)
    const maxArr = authorArr[maxIndex]
    const mostBlogsResult = _.zipObject(['author','blogs'], maxArr)
    return mostBlogsResult
}
const mostLikes = (blogs) => {
    const authorName = _.map(blogs, 'author')
    const likesNum = _.map(blogs, 'likes')
    const likesArr = []

    for (let i=0; i<authorName.length; i++) {
        const findIdx = _.findIndex(likesArr, { 'author': authorName[i] })
        const findResult = _.find(likesArr, { 'author': authorName[i] })
        if (findResult !== undefined) {
            const obj = {
                'author': findResult.author,
                'likes': findResult.likes + likesNum[i]
            }
            likesArr.splice(findIdx, 1, obj)
        }else {
            const obj = {
                'author': authorName[i],
                'likes': likesNum[i]
            }
            likesArr.push(obj)
        }
    }

    const maxLikes = _.maxBy(likesArr, 'likes')

    return maxLikes
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}