// 导入所需的库
const express = require('express');
const cors = require('cors');
// 导入dotenv库
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('public'));

// 设置端口号
const PORT = 3001;
const similarText = require('./similarText');
const genLessonPlan = require('./genLessonPlan');
// 生成教案
app.post('/lessonPlan', genLessonPlan);

app.get('/similarText', async(req, res) => {
  const params = req.query;
  const response = await similarText(params);
  res.send(response)
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器正在运行在端口 ${PORT}`);
});
