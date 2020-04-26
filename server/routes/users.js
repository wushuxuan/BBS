let express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
//引入工具文件
let util = require('../util/util.js');
let upload = util.upload.single('file');

//引入封装好的数据库操作
let db = require('../db.js');


// express.static(__dirname + '/public');

//登录路由
router.post('/login', (req, res) => {
    let account = req.body.account;
    //对密码进行加密验证
    let password = util.encrypt(req.body.password);
    console.log(password);
    //生成一个token
    let token = util.encodeJwt();
    let sql = db.login(account, password);
    //生成以一个token
    db.Query(sql).then(data => {
        //在数据控能够查找到结果时，将token发送给前台
        if (data.length) {
            console.log('用户登录成功！');
            res.send({ "code": "200", "sucess": "登录成功！", "token": token, "userInfo": data[0] });
        } else {
            res.send({ "code": "401", "error": "账号或者密码错误，登录失败！" });
        }
    }, err => {
        res.send({ "code": "401", "error": "账号或者密码错误，登录失败！" });
    })
});


//注册
router.post('/register', (req, res) => {
    req.body.passage.password = util.encrypt(req.body.passage.password);
    let passage = req.body.passage;
    console.log(passage)
    let sql = db.register(passage);
    db.Query(sql).then(data => {
        res.send({ "code": "200", "data": data });
    }, err => {
        res.send({ "code": "400" });
        console.log(err);
    })
    console.log('id不存在，执行插入操作！')
})


// 获取个人信息
router.get('/getInfo', (req, res) => {
    let param = req.query.id;
    let sql = db.getInfo(param);
    db.Query(sql).then(data => {
        console.log('获取个人信息成功！');
        res.send({ "code": "200", "data": data[0] });
    }, err => {
        console.log(err);
        res.send({ "code": "400", "error": "服务器开小差了" });
    });
});

//用户删除接口
router.post('/delUser', (req, res) => {
    let id = req.body.id;
    let sql = db.delUser(id);
    console.log(sql);
    db.Query(sql).then(data => {
        res.send({ "code": "200", "data": data });
    }, err => {
        res.send({ "code": "400" });
        console.log(err);
    })
})

//获取所有用户的接口
router.get('/getUsers', (req, res) => {
    let sql = db.allUsers();
    console.log('获取所有用户');
    db.Query(sql).then(data => {
        res.send({ "code": "200", "data": data });
    }, err => {
        res.send({ "code": "400", "err": "服务器开小差了" });
    })
});

//上传咨询
// router.post('/upload', upload, (req, res) => {
//     console.log("req.file:")
//     console.log(req.file)
//     //如果有传了图片，才
//     let url;
//         //如果有图片，那么就获取图片
//     if (req.file) {
//             //拼接文件上传后的路径，由于之前用了express.static，所以这里不用写public，直接写/img/
//         url = 'http://localhost:8081/img/uploads/' + req.file.filename;
//     }

//     res.send({ "code": "200" });
// });


router.post('/upload', upload,(req, res)=>{
    let des_file = './public' + '/fileHome/' + req.file.originalname;
    if(!fs.existsSync(resolvePath('./fileHome'))){
        fs.mkdirSync(resolvePath('fileHome'))
    }
    fs.readFile( req.file.path, function(err, data){
        fs.writeFile(des_file, data, function(err){
            let response = {}
            if(err) {
                console.log(err);
                response.msg = 'err'
            }
            else {
                response.msg = 'ok';
                response.filename = req.file.originalname;
            }
            res.send( JSON.stringify(response) );
        })
    })
})

//上传资源
router.get('/getFileList', (req, res) => {
    let list = []
    const files = fs.readdirSync(resolvePath('fileHome'));
    files.forEach(function(item){
        list.push({
            href: '/fileHome/' + item,
            name: item
        })
    })
    res.send({ "code": "200",filelist:list });
});


function resolvePath(dir){
    return path.resolve('./public', dir);
}

//更改个人信息
router.post('/changeInfo', upload, (req, res) => {
    //如果有传了图片，才
    let url;
    let params = req.body;
    console.log("url:")
    console.log(url)
        //如果有图片，那么就获取图片
    if (req.file) {
        console.log("上传成功")
            //拼接文件上传后的路径，由于之前用了express.static，所以这里不用写public，直接写/img/
        url = 'http://localhost:8081/img/user/' + req.file.filename;
    }


    let sql = db.changeInfo(req.body.id, params, url);
    db.Query(sql).then(data => {
        console.log('图片上传成功');
        res.send({ "code": "200" });
    }, err => {
        console.log(err);
        res.send({ "code": "400" });
    });

});

module.exports = router;