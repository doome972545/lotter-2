const router  = require('express').Router();
const {saveTwo, saveThree, listNumtwo, listNumthree, deleteAll} = require('../controller/saveNum.controller')

router.post('/savetwo',saveTwo)
router.post('/savethree',saveThree)
router.get('/list_two',listNumtwo)
router.get('/list_three',listNumthree)
router.delete('/delete',deleteAll)

module.exports = router;