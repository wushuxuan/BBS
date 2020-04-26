const mysql = require('mysql')
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456q',
    port: '3306'
})

// 创建数据库 
let createDb = `create database if not exists BBS character set utf8 collate utf8_general_ci`;

//使用数据库
let useDb = `use BBS`;

//创建文章表
let createArticle = `create table if not exists article(
    id int unsigned primary key auto_increment comment '文章id',
    title varchar(50) not null default '' comment '文章标题',
    time date not null comment '文章时间',
    category varchar(20) not null default '技术文章' comment '文章分类',
    tags varchar(100) not null default '' comment '文章标签',
    top tinyint(1) not null default '1' comment '置顶',
    hot tinyint(1) not null default '1' comment '热帖',
    zan int not null comment '点赞数',
    createid int not null comment '创建人id',
    state varchar(10) not null default '草稿' comment '文章状态',
    summary text not null comment '文章简介',
    content text not null comment '文章内容'
)charset=utf8 engine=myisam comment '文章简要信息表';`;

//插入文章
let insertArticle = `
    insert into article (title,time,category,tags,top,hot,zan,createid,state,summary,content) values('这是测试文章1','2020-8-3','技术文章','html','1','1',0,1,'发表','这是一个简介','这是一个内容');
    `;

// 创建评论表
let createComments = `create table if not exists comments(
    id int unsigned primary key auto_increment comment '评论id',
    articleId int not null comment '文章id',
    time timestamp not null default current_timestamp  comment '评论时间',
    name varchar(30) not null default '' comment '评论者姓名',
    content text not null comment '评论内容'
)charset=utf8 engine=myisam  comment '评论表';`;


let insertComments = `insert into comments (articleId,name,content) values (20,'带带大师兄','求求你摇了我吧');`;


//创建留言表
let createMessage = `create table if not exists messages(
    id int unsigned primary key auto_increment comment '留言id',
    time timestamp not null default current_timestamp  comment '留言时间',
    createid int not null comment '创建人id',
    name varchar(30) not null default '' comment '评论者姓名',
    content text not null comment '内容'
)charset=utf8 engine=myisam  comment '留言表';`;

let insertMessage = `insert into messages (id,createid,content) values (1,1,'留言 挺好的');`;

//创建用户表
let createUser = `create table if not exists user(
	id int unsigned primary key auto_increment comment '用户id',
	account varchar(64) not null default '' comment '用户账号',
    password varchar(64) not null default '' comment '用户密码',
    name varchar(64) not null default '' comment '用户名字',
    imgsrc varchar(256) not null default '' comment '用户头像地址',
    signature varchar(256) not null default '' comment '用户个性签名',
    breif text not null comment '用户个人简介'
)charset=utf8 engine=myisam;`;

let insertUser = `insert into user (account,password,name,signature,breif) values ('admin','812bf295db843ad39280f48332f3a416','','Against the current','');`;



let Query = function(db, sql, feedback = '') {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(feedback + '成功');
            }
        })
    })
}

async function init() {
    let query1 = await Query(db, createDb, '创建数据库');
    let query2 = await Query(db, useDb, '使用数据库');
    let query3 = await Query(db, createArticle, '创建文章表');
    let query4 = await Query(db, insertArticle, '插入文章数据');
    let query5 = await Query(db, createComments, '创建评论表');
    let query6 = await Query(db, insertComments, '插入评论');
    let query9 = await Query(db, createMessage, '创建留言表');
    let query10 = await Query(db, insertMessage, '插入留言');
    let query7 = await Query(db, createUser, '创建用户表');
    let query8 = await Query(db, insertUser, '插入用户信息');
    await db.end(err => { err ? console.log(err) : console.log('数据库已断开连接') })
    console.log(query1, query2, query3, query4, query5, query6, query7, query8,query9,query10)
}

init();