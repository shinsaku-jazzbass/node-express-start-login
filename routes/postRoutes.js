const express = require("express");
const postControllers = require('../controllers/postControllers');

const router = express.Router();

router
    .route("/")
    .get(postControllers.getAllPosts)
    .post(postControllers.creaeNewPost);

router.route("/:id").get(postControllers.getPostById);

module.exports = router;

