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
// stream openai
const { Readable } = require('stream');
const { OpenAIStream } = require('./openAIStream');
const getKey = require('./getKey');
// 生成教案
app.post('/lessonPlan', genLessonPlan);
// 调用openai-proxy
app.post('/ai', async(req, res) => {
  const model = {
    id: 'gpt-3.5-turbo',
    name: 'gpt-3.5-turbo'
  }

  const temperatureToUse = 0;
  // 获取请求参数
  const queryParams = req.body;
  const messagesToSend = queryParams.messages;
  const promptToSend = queryParams.systemMessages;
  const openaiKey = getKey();
  // console.log('openaiKey--', openaiKey)
  const stream = await OpenAIStream(model, promptToSend, temperatureToUse, '', messagesToSend);
  // openaiKey.release();
  // 将ReadableStream对象转换为Readable流
  const nodeStream = Readable.from(stream);
  // 将Readable流发送给前端
  nodeStream.pipe(res);
});
app.get('/similarText', async(req, res) => {
  const params = req.query;
  const response = await similarText(params);
  res.send(response)
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器正在运行在端口 ${PORT}`);
});
