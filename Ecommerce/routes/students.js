var express = require('express');
const { get } = require('.');
var router = express.Router();

var students = [{
    MSSV: "RmGZEUEf51t",
    HoTen: "Thanh Tung",
    Lop: "20DTHA1"
}, {
    MSSV: "nZCBIarGN3P",
    HoTen: "Manh Toan",
    Lop: "20DTHA2"
}]

//MERN 
//MongoCompass




/* GET users listing. */
router.get('/', function (req, res, next) {
    let undeleted = students.filter(s => !s.isDelete);
    res.send(undeleted);
});

router.put('/restore/:MSSV', function (req, res, next) {
    var getstudent = students.find(s => s.MSSV == req.params.MSSV);
    if (getstudent) {
        getstudent.isDelete = undefined;
        //delete getstudent.isDelete;
        res.status(200).send(getstudent);
    } else {
        res.status(404).send("MSSV khong ton tai");
    }
});

function GenMSSV(length) {
    var source = "abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for (let i = 0; i < length; i++) {
        var rand = Math.floor(Math.random() * 61);
        result += source[rand];
    }
    return result;
}

router.get('/:MSSV', function (req, res, next) {

    var getstudent = students.find(s => s.MSSV == req.params.MSSV);
    if (getstudent) {
        res.send(getstudent);
    } else {
        res.status(404).send("MSSV khong ton tai");
    }

    // var getstudent = books.filter(book => book.MSSV == req.params.MSSV);
    // if (getstudent.lenght > 0)) {
    //     res.send(getstudent[0]);
    // }
    //     for (const book of books) {
    //         if(book.MSSV == req.params.MSSV){
    //             getstudent = book;
    //         }
    //     }
    //     if(getstudent){
    //         res.send(getstudent);
    //     }else{
    //         res.status(404).send("MSSV khong ton tai");
    //     }
});

router.post('/', function (req, res, next) {
    // var getstudent = students.find(s => s.MSSV == req.body.MSSV);
    // if (getstudent) {
    //     res.status(404).send("MSSV da ton tai");
    // } else {

    // }
    var newstudent = ({
        MSSV: GenMSSV(11),
        HoTen: req.body.HoTen,
        Lop: req.body.Lop
    })
    students.push(newstudent);
    res.status(200).send(newstudent);

});
router.put('/:MSSV', function (req, res, next) {
    var getstudent = students.find(s => s.id == req.params.MSSV);
    if (getstudent) {
        getstudent.HoTen = req.body.HoTen;
        getstudent.Lop = req.body.Lop;
        res.status(200).send(getstudent)
    } else {
        res.status(404).send("MSSV khong ton tai");
    }
});

router.delete('/:MSSV', function (req, res, next) {
    var getstudent = students.find(s => s.MSSV == req.params.MSSV);
    if (getstudent) {
        // let index = books.indexOf(getstudent);
        // students.slice(index, 1);
        getstudent.isDeleted = true;
        res.status(200).send(getstudent);
    } else {
        res.status(404).send("MSSV khong ton tai");
    }
});

module.exports = router;
