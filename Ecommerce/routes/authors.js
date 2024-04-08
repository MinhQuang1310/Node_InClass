var express = require('express');
var router = express.Router();
var authorModel = require('../schemas/author') // Sử dụng model Author
var responseHandle = require('../helpers/responseHandle');

router.get('/', async function (req, res, next) {
    try {
        let excludes = ["sort", "limit", "page"];
        let stringArray = ["name"]; // Chỉ có thuộc tính name là string
        let queries = JSON.parse(JSON.stringify(req.query));
        for (const [key, value] of Object.entries(queries)) {
            if (excludes.includes(key)) {
                delete queries[key]
            } else {
                if (stringArray.includes(key)) {
                    queries[key] = new RegExp(value.replace(',', '|'), 'i')
                }
            }
        }
        console.log(queries);
        let limit = req.query.limit ? req.query.limit : 5;
        let page = req.query.page ? req.query.page : 1;
        let objSort = {};
        if (req.query.sort) {
            if (req.query.sort.startsWith('-')) {
                let field = req.query.sort.substring(1, req.query.sort.length);
                objSort[field] = -1;
            } else {
                let field = req.query.sort;
                objSort[field] = 1;
            }
        }
        var authors = await authorModel.find(queries)
            .skip((page - 1) * limit).limit(limit).sort(objSort).exec();
        res.send(authors);
    } catch (error) {
        responseHandle.renderResponse(res, false, error);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        var author = await authorModel.find({ _id: req.params.id });
        responseHandle.renderResponse(res, true, author);
    } catch (error) {
        responseHandle.renderResponse(res, false, error);
    }
});

router.post('/', async function (req, res, next) {
    try {
        let newAuthor = new authorModel({
            name: req.body.name,
        })
        await newAuthor.save();
        responseHandle.renderResponse(res, true, newAuthor);
        console.log(newAuthor);
    } catch (error) {
        responseHandle.renderResponse(res, false, error);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        var author = await authorModel.findByIdAndUpdate
            (req.params.id, req.body, {
                new: true
            })
        responseHandle.renderResponse(res, true, author);
    } catch (error) {
        responseHandle.renderResponse(res, false, error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        var author = await authorModel.findByIdAndRemove(req.params.id)
        responseHandle.renderResponse(res, true, author);
    } catch (error) {
        responseHandle.renderResponse(res, false, error);
    }
});

module.exports = router;
