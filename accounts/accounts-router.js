const express = require("express");
const db = require("./accounts-model.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  let accounts;
  if (req.query && Object.keys(req.query).length > 0) {
    accounts = await db.getByQuery(req.query);
    if (accounts) {
      res.status(200).json(accounts);
    } else {
      next({
        status: 500,
        message: "The accounts could not be retrieved."
      });
    }
  } else {
    accounts = await db.get();
    if (accounts) {
      res.status(200).json(accounts);
    } else {
      next({
        status: 500,
        message: "The accounts could not be retrieved."
      });
    }
  }
});

router.post("/", validateAccount, async (req, res) => {
  const account = await db.insert(req.body);
  if (account) {
    res.status(200).json(account);
  } else {
    next({
      status: 500,
      message: "The account could not be added."
    });
  }
});

router.get("/:id", validateAccountId, (req, res) => {
  res.status(200).json(req.account);
});

router.delete("/:id", validateAccountId, async (req, res) => {
  const deletedAccount = await db.delete(req.params.id);
  if (deletedAccount) {
    res.status(200).json(req.account);
  } else {
    next({
      status: 500,
      message: "The account could not be removed."
    });
  }
});

router.put("/:id", validateAccountId, validateAccount, async (req, res) => {
  const updatedAccount = await db.update(req.params.id, req.body);
  if (updatedAccount) {
    res.status(200).json(updatedAccount);
  } else {
    next({
      status: 500,
      message: "The account information could not be updated."
    });
  }
});

async function validateAccountId(req, res, next) {
  try {
    const { id } = req.params;
    const account = await db.get(id);
    if (account) {
      req.account = account;
      next();
    } else {
      next({
        status: 404,
        message: "The account with the specified ID does not exist."
      });
    }
  } catch {
    next({
      status: 500,
      message: "The account information could not be retrieved."
    });
  }
}

function validateAccount(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    if (req.body.name && req.body.budget) {
      next();
    } else {
      next({
        status: 400,
        message: "missing name and/or budget field(s)"
      });
    }
  } else {
    next({
      status: 400,
      message: "missing account data"
    });
  }
}

module.exports = router;
