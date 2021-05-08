const express = require("express");
const router = express.Router();
const itemsProduced = require("../models/ItemsProduced/itemsProduced");

router.post("", (req, res, next) => {
  const itemsProduced = new itemsProduced({
    RecipeId: req.body.RecipeId,
    quantity: req.body.quantity,
    productionDate: req.body.productionDate,
    expirationDate: req.body.expirationDate,
    costValue: req.body.costValue,
    totalValue: req.body.totalValue,
  });
  itemsProduced.save().then((additemsProduced) => {
    res.status(201).json({
      message: "Added items Produced",
      id: additemsProduced.id,
    });
  });
});

router.get("", (req, res, next) => {
    itemsProduced.find().then((documents) => {
    res.status(200).json({
      message: "All right",
      itemsProduced: documents,
    });
  });
});

router.delete("/:id", (req, res, next) => {
    itemsProduced.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Deleted Items Produced" });
  });
});

module.exports = router;
