# chall-collector

### 放题规范

```
题目
{
  "competition": string,  //比赛名称
  "challName": string,    //题目名称
  "description": string,  //题目描述
  "type": string,         //方向
  "fileName": string      //附件名（带后缀）
}
竞赛
{
  "startTime": "2024-11-10 9:00",   //开始时间
  "endTime": "2024-11-10 17:00",    //结束时间
  "des": string                     //竞赛描述
}
```

**文件结构**

```
├─challenges        //附件文件夹
│  ├─test           //以比赛名称命名
│  │  └─AI          //方向名字
│  └─testCom
│      ├─Crypto
│      ├─Misc
│      ├─Pwn
│      ├─Reverse
│      └─Web
└─json              //json文件夹
    ├─challenge     //题目描述json
    └─competition   //比赛描述json
```

json文件放于`/public/json/`下

附件放于`/public/challenges/<competition>/<type>/<fileName>`路径

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
