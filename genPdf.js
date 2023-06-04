// const fs = require('fs');
// const markdownpdf = require("markdown-pdf");
// const path = require('path')


// async function convertMarkdownToPdf(markdownString) {
//   return new Promise((resolve, reject) => {
//       markdownpdf().from.string(markdownString).to.buffer({}, function (err, buffer) {
//           if (err) {
//               reject(err);
//           } else {
//               fs.writeFile("./pdfs/output.pdf", buffer, function(err) {
//                   if(err) {
//                       reject(err);
//                   } else {
//                       resolve("PDF created successfully");
//                   }
//               });
//           }
//       });
//   });
// }

// const genPdf = async (req, res) => {
//   // Replace this with he actual markdown string or fetch it from a database
//     const markdownString = req.body.markdownString;
//     console.log('markdownString--', markdownString)
//     // const markdownString = "# 《小蝌蚪找妈妈》教案\n\n## 一、教材分析\n\n本课是小学语文二年级上册部编版的一篇课文，主要讲述小蝌蚪在池塘里寻找妈妈的故事。通过这个故事，让学生了解小蝌蚪的生长变化，培养学生的探究精神和好奇心，同时也能够启发学生对于亲情的感悟。\n\n## 二、核心素养\n\n1. 探究精神：通过小蝌蚪寻找妈妈的过程，培养学生的探究精神，让学生在探究中学习，从中获取知识。\n2. 情感态度：通过小蝌蚪与妈妈的相互寻找，培养学生对于亲情的感悟，让学生学会关爱家人，珍惜亲情。\n\n## 三、教学重点\n\n1. 学生能够理解小蝌蚪寻找妈妈的过程。\n2. 学生能够感受小蝌蚪与妈妈之间的亲情。\n\n## 四、教学难点\n\n1. 学生能够理解小蝌蚪的生长变化。\n2. 学生能够感受小蝌蚪与妈妈之间的亲情。\n\n## 五、课时安排\n\n本课时为一课时，建议安排如下：\n\n1. 导入（5分钟）：通过图片或者视频引入小蝌蚪的生长变化。\n2. 学习课文（15分钟）：学生阅读课文，理解小蝌蚪寻找妈妈的过程。\n3. 分组讨论（10分钟）：分组讨论小蝌蚪与妈妈之间的亲情。\n4. 课堂展示（10分钟）：每个小组派代表进行课堂展示。\n5. 总结（5分钟）：对本节课进行总结。\n\n## 六、教学资源准备\n\n1. 课本：小学语文二年级上册部编版。\n2. 图片或视频：小蝌蚪的生长变化。\n3. PPT或黑板：课堂展示所需。\n\n## 七、教学过程\n\n1. 导入（5分钟）\n通过图片或者视频引入小蝌蚪的生长变化，让学生了解小蝌蚪的生长变化。\n\n2. 学习课文（15分钟）\n学生阅读课文，理解小蝌蚪寻找妈妈的过程。\n\n3. 分组讨论（10分钟）\n将学生分为小组，让他们讨论小蝌蚪与妈妈之间的亲情，引导学生感受亲情的重要性。\n\n4. 课堂展示（10分钟）\n每个小组派代表进行课堂展示，让学生分享自己的感受和思考。\n\n5. 总结（5分钟）\n对本节课进行总结，让学生回顾本节课所学内容，加深对于小蝌蚪寻找妈妈的理解，同时也加深对于亲情的感悟。"
//     try {
//         await convertMarkdownToPdf(markdownString);
//         res.download(path.join(__dirname, '/pdfs/output.pdf'), 'output.pdf', (err) => {
//             if (err) {
//                 res.status(500).send({
//                     message: "Could not download the file. " + err,
//                 });
//             }
//         });
//     } catch (err) {
//         res.status(500).send({
//             message: "Could not convert markdown to PDF. " + err,
//         });
//     }
// }

// module.exports = genPdf ;