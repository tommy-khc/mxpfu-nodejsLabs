const express = require("express");
const router = express.Router();

let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  // Copy the code here
  res.send(JSON.stringify({ users }, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/email", (req, res) => {
  // Copy the code here
  const user = users.find((user) => user.email === req.body.email);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send("User not found");
  }
});

// GET by a particular Last Name request: retrieve all users with a last name
router.get("/lastName", (req, res) => {
  const lastName = req.body.lastName;
  const filtered_users = users.filter((user) => user.lastName === lastName);
  if (filtered_users.length > 0) {
    res.send(JSON.stringify({ filtered_users }, null, 4));
  } else {
    res.status(404).send(`No users have '${lastName}' as their last name.`);
  }
});

// Get quest: retrieve users sorted by date of birth from earliest to lastest
function createDate(DOB) {
  const [day, month, year] = DOB.split("-");
  return new Date(year, month, day);
}

router.get("/dob", (req, res) => {
  const sorted_users = users.sort((a, b) => {
    const dateA = createDate(a.DOB);
    const dateB = createDate(b.DOB);
    return dateA - dateB;
  });
  res.send(JSON.stringify({ sorted_users }, null, 4));
});

// POST request: Create a new user
router.post("/new", (req, res) => {
  // Copy the code here
  const user = req.body;
  users.push(user);
  res.send("The user " + user.firstName + " has been added.");
});

// PATCH request: Update a specific field of a user by email ID
router.patch("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented"); //This line is to be replaced with actual return value
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  const user = users.find((user) => user.email === email);
  if (user) {
    const DOB = req.query.DOB;
    if (DOB) {
      user.DOB = DOB;
    }
    // Include code here similar to the one above for other attributes
    const firstName = req.query.firstName;
    if (firstName) {
      user.firstName = firstName;
    }
    const lastName = req.query.lastName;
    if (lastName) {
      user.lastName = lastName;
    }
    users = users.filter((user) => user.email !== email);
    users.push(user);
    res.send(`User with the email  ${email} updated.`);
  } else {
    res.send("User with email ${email} not found");
  }
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email !== email);
  res.send(`User with the email  ${email} deleted.`);
});

module.exports = router;
