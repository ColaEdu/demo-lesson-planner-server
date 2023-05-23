// @see https://docs.aircode.io/guide/functions/
const createVectorStore = require('./createVectorStore');
const OpenAI = require('langchain/llms/openai').OpenAI;
const { VectorDBQAChain, ConversationalRetrievalQAChain, loadSummarizationChain, AnalyzeDocumentChain, LLMChain,  } = require("langchain/chains")
const { v4: uuidv4 } = require('uuid');

module.exports = async function (params, context) {
  console.log('Received params:', params);
   const { teachingTheme: theme, name } = params;
  const chineseLessonVectorStore = await createVectorStore({
    collectionName: 'lesson',
    classify: 'Chinese',
    name
  })
  let similarLesson
  let similarLessonText
  let summaryLessonText = {text: ''};
  const textModel = new OpenAI({ temperature: 0 });
  if (theme) {
     similarLesson = await chineseLessonVectorStore.similaritySearch(`${theme}`, 3);
    const chain = loadSummarizationChain(textModel, { type: "map_reduce" });
    summaryLessonText = await chain.call({
      input_documents: similarLesson,
    });
  }
  console.log(summaryLessonText)
  return {
    text: summaryLessonText.text,
    recordId: uuidv4(), // 返回的id作为轮询id
  };
};
