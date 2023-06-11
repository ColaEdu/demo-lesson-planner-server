const { Readable } = require('stream');
const { OpenAIStream } = require('./openAIStream');
const getKey = require('./getKey');

const saveToDb = async (data) => {
  await fetch('https://y42h83s1qy.hk.aircode.run/saveLessonPlanner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

const genLessonPlan = async (req, res) => {
  const model = {
    id: 'gpt-4',
    name: 'gpt-4'
  }
  const promptToSend = `1.我要你作为一个中国教案生成器。我将为您提供即将生成的详细信息，例如课文标题{{lesson}}, 
    2. 如果课文标题为小蝌蚪找妈妈，则教案宗旨为“通过刚出生的小蝌蚪，生动形象地介绍各种动物的习性及状态”，想要达成的目标为“生动形象地教小学二年级学生”
    3. 你的职责是根据标准教案格式为我生出可用的教案，其中考虑到跨学科等理念, 并在教案输出完毕后 换行输出 [END]。
    4. 一份标准的教案格式如下:# 《{{lesson}}》教案
    ## 一、教材分析
    ## 二、核心素养
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
  const openaiKey = getKey();
  // console.log('openaiKey--', openaiKey)
  const stream = await OpenAIStream(model, promptToSend, temperatureToUse, '', messagesToSend);
  // openaiKey.release();
  // 将ReadableStream对象转换为Readable流
  const nodeStream = Readable.from(stream);
  // Create an array to hold the data
  let recordData = [];
  // Listen for data events to collect the data chunks
  nodeStream.on('data', chunk => {
    recordData.push(chunk);
  });

  // Listen for end event to know when the stream has ended
  nodeStream.on('end', async () => {
    // Concatenate all chunks to form the complete data
    const completeData = Buffer.concat(recordData).toString();
    // Save the completeData to the database
    await saveToDb({
      lessonPlan: completeData,
      teachingTheme: queryParams.teachingTheme,
      textBookName: queryParams.textBookName
    })
    try {
      // assuming you have a save function in your db module
      console.log('Data saved to the database successfully');
    } catch (error) {
      console.error('Error saving data to the database', error);
      await saveToDb({
        teachingTheme: queryParams.teachingTheme,
        textBookName: queryParams.textBookName,
        error: error
      })
    }
  });

  // 将Readable流发送给前端
  nodeStream.pipe(res);

}

module.exports = genLessonPlan;