const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize')
const questionService = require('../questions/question.service');
const resultsService = require('../results/result.service');
const examsService = require('../exams/exam.service');

// routes
router.post('/getGame', authorize(), getGame);
router.post('/finishGame', authorize(), finishGame);

module.exports = router;
 
async function getGame(req, res, next) {

    let { examId } = req.body

    let exam = await examsService.getById(examId)

    await questionService.getAllByParams({ where: { questionExam: examId } })
        .then(questions => res.json({
            code: 200,
            message: "get game successfully",
            examName: exam.examName,
            totalPoint: exam.totalPoint,
            totalTime: exam.totalTime,
            data: questions
        }))
        .catch(next);
}

async function finishGame(req, res, next) {

    let { listAnswer, totalTime, examId, userId } = req.body
    let scores = 0

    for (let i = 0; i < listAnswer.length; i++) {
        try {
            let questionDB = await questionService.getById(listAnswer[i].id)

            if (questionDB && questionDB.questionAnswer === listAnswer[i].questionAnswer) {
                scores += questionDB.questionPoint
            }
        } catch {
            i++;
        }
    }
    let resultBody = {
        "userId": userId,
        "totalPoint": scores,
        "totalTime": totalTime,
        "examId": examId,
        "answer": JSON.stringify(listAnswer)
    }
    resultsService.create(resultBody)
        .then(() => res.json({
            code: 200,
            message: "finish success",
            totalTime: totalTime,
            examId: examId,
            scores: scores
        }))
        .catch(next)
}

function getById(req, res, next) {
    questionService.getById(req.params.id)
        .then(question => res.json({
            code: 200,
            message: "Successfully",
            data: question
        }))
        .catch(next);
}