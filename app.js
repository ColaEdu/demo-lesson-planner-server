// 导入所需的库
const express = require('express');
const cors = require('cors');
const { Readable } = require('stream');
// 导入dotenv库
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

// 设置端口号
const PORT = 3001;
const { OpenAIStream } = require('./openAIStream');
const similarText = require('./similarText');
console.log('OPENAI_API_KEY==', process.env.OPENAI_API_KEY)
// 设置路由
app.post('/lessonPlan', async (req, res) => {
  const model = {
    id: 'gpt-3.5-turbo',
    name: 'gpt-3.5-turbo'
  }
  const promptToSend = `你是一个教案生成器，无需为我回复其他，只需根据用户要求按标准教案格式回复，在每个二级标题下面插入生成的内容，一份标准的教案格式如下：
    # 教案示例
    ## 一、教材分析
    ## 二、教学目标
    ## 三、教学重点
    ## 四、教学难点
    ## 五、课时安排
    ## 六、教学资源准备
    ## 七、教学过程
  `
  const temperatureToUse = 0;
  // 获取请求参数
  const queryParams = req.body;
  const messagesToSend = queryParams.messages;
  const stream = await OpenAIStream(model, promptToSend, temperatureToUse, '', messagesToSend);
  // 将ReadableStream对象转换为Readable流
  const nodeStream = Readable.from(stream);
  // 将Readable流发送给前端
  nodeStream.pipe(res);
});

app.get('/similarText', async(req, res) => {
  const params = req.query;
  const response = await similarText(params);
  res.send(response)
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器正在运行在端口 ${PORT}`);
});
