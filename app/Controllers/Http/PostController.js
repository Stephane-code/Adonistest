'use strict'
// birng model
const todo = use('App/Models/Todo')



class PostController {
    async index({view}){
        
        const todos=await todo.all()
        return view.render('Posts.index',{
            tittle:'My post',
            todos:todos.toJSON()
        })
    }

    async add({view}){
        
        return view.render('posts.add')
    }

    async details({ params, view }) {
        const post = await todo.find(params.id)
    
        return view.render('posts.details', {
          post: post
        })
      }

      async edit({ params, view }) {
        const post = await todo.find(params.id)
    
        return view.render('posts.edit', {
          post: post
        })
      }

    async store({ request, response, session }) {
      
        const post = new todo()
    
        post.title = request.input('title')
        post.body = request.input('body')
    
        await post.save()
    
        session.flash({ notification: 'Post Added!' })
    
        return response.redirect('/posts')
      }

      async destroy({ params, session, response }) {
        const post = await todo.find(params.id)
    
        await post.delete()
    
        session.flash({ notification: 'Post Deleted!' })
        
        return response.redirect('/posts')
      }
  
}

module.exports = PostController
