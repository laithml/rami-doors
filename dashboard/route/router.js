const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/HomeController");

const ClientsController = require("../controllers/ClientsController");

const requireAuth = require("../Middleware/mid");

router.get("/", HomeController.Main);

router.get("/login", HomeController.login);

router.get("/live-tickets", HomeController.live );

router.get("/not-found", HomeController.notFound);

// Clients
router.get("/clients", ClientsController.getClients);

router.delete("/clients/:id", ClientsController.deleteClient);


router.get("/active-clients", ClientsController.getActiveClients);

router.get("/clients/:id", ClientsController.getClient);




router.get("*", (req, res) => {
    res.redirect("/not-found");
});

module.exports = router;
