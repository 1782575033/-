const { User } = require('../../model/user')

const bcrypt = require('bcrypt')

module.exports = async (req,res,next)=>{
    // 接受客户端传递过来的请求参数
    const {username,password,email,role,state} = req.body
    // 即将要修改的用户id
    const id = req.query.id

    // res.send(body.password)
    let user = await User.findOne({_id:id})

    // 密码比对
    let isValid = await bcrypt.compare(password,user.password)

    if(isValid){
        // 密码比对成功
        // 将用户信息更新到数据库中
        await User.update({_id:id},{
            username:username,
            email:email,
            role:role,
            state:state
        })
        
        // 将页面重定向到列表页面
        res.redirect('/admin/user')
        
    }else{
        // 密码比对失败
        let obj = {path:'/admin/user-edit',message:'密码对比失败，不能进行',id:id}
        next(JSON.stringify(obj))
    }


    // res.send(user)
}