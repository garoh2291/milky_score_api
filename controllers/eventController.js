const errorConfig = require("../utils/error.config");
const ExpressSchema = require("../models/events");

class eventController {
  getBatchActual = async (req, res, next) => {
    try {
      const { query } = req;
      const { finalDate } = req.body;
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
      dateQuery.$gte = finalDate;
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

  getBatchUser = async (req, res, next) => {
    try {
      const { query } = req;
      const { pId } = req;

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
      dateQuery.$gte = new Date(pId);
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

module.exports = new eventController();
