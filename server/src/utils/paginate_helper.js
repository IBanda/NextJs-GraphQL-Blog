const paginate_helper=({pageSize,after:cursor,posts})=>{

if(pageSize<1) return []
if(!cursor)return posts.slice(0,pageSize)

const cursorIndex=posts.findIndex(post=>{
    let postCursor=String(post.id)
    return postCursor?postCursor == cursor:false;
})

return cursorIndex>=0
? cursorIndex == posts.length-1
?[]:
posts.slice(cursorIndex+1,Math.min(posts.length,cursorIndex+1+pageSize))
:posts.slice(0,pageSize)
}

module.exports=paginate_helper;