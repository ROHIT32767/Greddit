const Report = require("../models/Report.model")
const { request } = require('express')
const ReportRouter = require('express').Router()
const SubGreddit = require("../models/SubGreddit.model")
ReportRouter.post('/', async (request, response) => {
    console.log(request.body)
    const { 
        Concern,
        Post,
        By,
        On,
        SubGredditID } = request.body
    const date = Date.parse(request.body.date)
    const report = new Report({
        Concern,
        Post,
        By,
        On,
        date,
        Ignored:false
    })
    const savedreport = await report.save()
    const currentsubgreddit = await SubGreddit.findById(SubGredditID)
    currentsubgreddit.Reports = currentsubgreddit.Reports.concat(savedreport._id)
    const savedsubgreddit = await currentsubgreddit.save()
    console.log(savedreport)
    response.status(201).json(savedreport)
})

ReportRouter.get('/', async (request, response) => {
    const AllReports = await Report
        .find({}).populate('Post').populate('By').populate('On')
    response.json(AllReports)
})

ReportRouter.get('/:id', async (request, response) => {
    const ID = request.params.id
    const report = await Report
        .findById(ID).populate('Post').populate('By').populate('On')
    console.log(report)
    response.json(report)
})

ReportRouter.put('/ignore/:id', async (request, response) => {
    console.log(request.body)
    const report = await Report.findById(request.params.id)
    report.Ignored = true
    const updatedreport = await report.save()
    console.log(updatedreport)
    response.status(201).json(updatedreport)
})

ReportRouter.delete('/:id', async (request, response) => {
    const ID = request.params.id
    const DeleteReport = await Report.findByIdAndDelete(ID)
    response.json(DeleteReport)
})

module.exports = ReportRouter