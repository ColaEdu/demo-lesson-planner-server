// @see https://docs.aircode.io/guide/functions/
const { v4: uuidv4 } = require('uuid');
// 根据教学资源、教学主题锁定课文
const getLessonText = async (params) => {
  const res = await fetch(`https://y42h83s1qy.hk.aircode.run/getLessonContent?textBookName=${params.textBookName}&teachingTheme=${params.teachingTheme}`)
  const text = await res.text();
  return text;
}

module.exports = async function (params, context) {
  console.log('Received params:', params);
  // name: 教学资源 teachingTheme: 教学主题
  const { textBookName, teachingTheme } = params;
  const lessonText = await getLessonText({
    "textBookName": textBookName,
    "teachingTheme": teachingTheme
  })
  
  return {
    text: lessonText,
    recordId: uuidv4(), // 返回的id作为轮询id
  };
};
