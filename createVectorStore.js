// @see https://docs.aircode.io/guide/functions/
const { HNSWLib } = require("langchain/vectorstores/hnswlib");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

const getDocs = async (params) => {
  const res = await fetch(`https://y42h83s1qy.hk.aircode.run/getDocs?collectionName=${params.collectionName}&classify=${params.classify}&name=${params.name}`)
  const jsonData = await res.json();
  return jsonData
}


module.exports = async  (docInfo) => {
 const getData = (metaData) => metaData.matchedRecords.reduce((prev, cur) => cur.data.concat(prev), [])
  const docs = await getDocs({
    collectionName: docInfo.collectionName,
    classify: docInfo.classify,
    name: docInfo.name
  });
  const docDatas = getData(docs);
  const vectorStore = await HNSWLib.fromDocuments(docDatas, new OpenAIEmbeddings());
  return vectorStore;
  }
