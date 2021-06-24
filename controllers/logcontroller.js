const Express = require("express");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { LogModel } = require("../models");
const Log = require("../models/log");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});


/*
===========================
Journal Create
===========================
*/
router.post("/log/", validateJWT, async (req, res) => {
    const { description, definition, result, owner_id } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    LogModel.create(logEntry)

});

// router.get("/about", (req, res) => {
//     res.send("This is the about route!")
// });

/*
===========================
Get All Journals
===========================
*/
router.get("/log/", async (req, res) => {
    try {
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
===========================
Get Journals by User
===========================
*/
router.get("/log/:id", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const logJournals = await LogModel.findAll({
            where: {
                owner: id 
            }
        });
        res.status(200).json(userJournals);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

/*
// ===========================
// Get Journals by title
// ===========================
// */
// router.get("/log/:id", async (req, res) => {
//     const { title } = req.params;
//     try {
//         const result = await JournalModel.findAll({
//             where: { title: title }
//         });
//         res.status(200).json(results);
//     } catch (err) {
//         res.status(500).json({ error: err })
//     }
// });

/*
===========================
Get Journals by title
===========================
*/
router.put("/log/:id", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const logId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            od: journalId,
            owner: userId
        }
    };

    const updatedLog = {
        title: title,
        date: date,
        entry: entry
    };

    try {
        const update = await LogModel.update(updateLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router;

/*
===========================
Get Journals by title
===========================
*/
router.delete("/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: logId,
                owner: ownerId
            }
        };
        await LogModel.destroy(query);
    res.status(200).json({message: "Log Entry Removed" });
} catch (err) {
    res.status(500).json({ error: err })
    }
});

    