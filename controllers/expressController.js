const errorConfig = require("../utils/error.config");
const ExpressSchema = require("../models/events");

class ExpressController {
  create = async (req, res, next) => {
    try {
      const gameData = {
        ...req.body,
      };

      const express = await ExpressSchema.create(gameData);
      res.json(express);
    } catch (err) {
      next(err);
    }
  };

  getSingle = async (req, res, next) => {
    try {
      const express = await ExpressSchema.findOne({
        _id: req.params.id,
      });
      if (!express) throw errorConfig.gameNotFound;
      res.json(express.toObject());
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const express = await ExpressSchema.findOne({
        _id: req.params.id,
      });
      if (!express) throw errorConfig.gameNotFound;

      const { games, totalCoeff, status } = req.body;
      games && (express.games = games);
      totalCoeff && (express.totalCoeff = totalCoeff);
      status && (express.status = status);

      await express.save();
      res.json(express.toObject());
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const express = await ExpressSchema.findOneAndDelete({
        _id: req.params.id,
      });

      if (!express) throw errorConfig.gameNotFound;
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  getBatch = async (req, res, next) => {
    try {
      const { userId } = res.locals,
        { query } = req;

      const dbQuery = {
        //fixme
        // owner: userId
      };

      const { status } = query;
      if (status && /^win$|^loose$|^returned|^pending$/gi.test(status)) {
        dbQuery.status = status;
      }

      if (query.search) {
        const searchReg = new RegExp(query.search, "ig");
        dbQuery.$or = [{ totalCoeff: searchReg }];
      }

      if (query.create_lte || query.create_gte) {
        const createdAtQuery = {};
        query.create_lte && (createdAtQuery.$lte = new Date(query.create_lte));
        query.create_gte && (createdAtQuery.$gte = new Date(query.create_gte));
        dbQuery.created_at = createdAtQuery;
      }

      if (query.complete_lte || query.complete_gte) {
        const dateQuery = {};
        query.complete_lte && (dateQuery.$lte = new Date(query.complete_lte));
        query.complete_gte && (dateQuery.$gte = new Date(query.complete_gte));
        dbQuery.date = dateQuery;
      }

      const sort = {};
      if (query.sort) {
        switch (query.sort) {
          case "a-z":
            sort.totalCoeff = 1;
            break;
          case "z-a":
            sort.totalCoeff = -1;
            break;
          case "creation_date_oldest":
            sort.created_at = 1;
            break;
          case "creation_date_newest":
            sort.created_at = -1;
            break;
          case "completion_date_oldest":
            sort.date = 1;
            break;
          case "completion_date_newest":
            sort.date = -1;
        }
      }

      const express = await ExpressSchema.find(dbQuery).sort(sort).exec();
      if (!express) throw errorConfig.gameNotFound;

      res.json(express);
    } catch (err) {
      next(err);
    }
  };

  getBatchActual = async (req, res, next) => {
    try {
      const { query } = req;

      const dbQuery = {};

      const { status } = query;
      if (status && /^win$|^loose$|^returned|^pending$/gi.test(status)) {
        dbQuery.status = status;
      }

      if (query.search) {
        const searchReg = new RegExp(query.search, "ig");
        dbQuery.$or = [{ totalCoeff: searchReg }];
      }

      if (query.create_lte || query.create_gte) {
        const createdAtQuery = {};
        query.create_lte && (createdAtQuery.$lte = new Date(query.create_lte));
        query.create_gte && (createdAtQuery.$gte = new Date(query.create_gte));
        dbQuery.created_at = createdAtQuery;
      }

      const dateQuery = {};
      dateQuery.$gte = new Date();
      dbQuery.date = dateQuery;

      const sort = {};
      if (query.sort) {
        switch (query.sort) {
          case "a-z":
            sort.totalCoeff = 1;
            break;
          case "z-a":
            sort.totalCoeff = -1;
            break;
          case "creation_date_oldest":
            sort.created_at = 1;
            break;
          case "creation_date_newest":
            sort.created_at = -1;
            break;
          case "completion_date_oldest":
            sort.date = 1;
            break;
          case "completion_date_newest":
            sort.date = -1;
        }
      }

      const express = await ExpressSchema.find(dbQuery).sort(sort).exec();
      if (!express) throw errorConfig.gameNotFound;

      res.json(express);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new ExpressController();
