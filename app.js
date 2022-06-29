const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Clean", "Cook Food"];
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

/**
 * * GET request to the HOME route of client web page
 * * renders a list with stored items placed by client using EJS
 */
app.get("/", (req, res) => {
	let today = new Date();

	let options = {
		weekday: "long",
		day: "numeric",
		month: "long",
	};

	let day = today.toLocaleDateString("en-US", options);

	res.render("list", { listTitle: day, newListItems: items });
});

/**
 * * POST request to the WORK route of the client web page
 * * retrieves data inputed by client and stores it into item variable
 * * stores that same variable into workitems array then redirects to the HOME route
 */
app.post("/", (req, res) => {
	let item = req.body.newItem;

	/**
	 * * Using logic to determine which web route the client is on
	 * * if statement determines is client is on the work template by checking the value of button tag
	 * * in list.ejs file. if true then the value stored in variable item will be pushed to workItems array
	 */

	if (req.body.list === "Work") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);

		res.redirect("/");
	}
});

/**
 * * GET request to the WORK route of client web page
 * * renders a list with stored items placed by client using EJS
 */
app.get("/work", (req, res) => {
	res.render("list", { listTitle: "Work List", newListItems: workItems });
});

/**
 * * POST request to the WORK route of the client web page
 * * retrieves data inputed by client and stores it into item variable
 * * stores that same variable into workitems array then redirects to the WORK route
 */
app.post("/work", (req, res) => {
	let item = req.body.newItem;

	workItems.push(item);
	res.redirect("/work");
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.listen(8080, () => {
	console.log("Listening on port 8080");
});
