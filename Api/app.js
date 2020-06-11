var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./swagger.json");
var bcrypt = require("bcryptjs");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var requestsRouter = require("./routes/requests");
var authRouter = require("./routes/auth");
var statsRouter = require("./routes/stats");

var User = require("./models/user");

var app = express();

app.use(cors());

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/Covid19")
  .then(async () => {
    console.log("Connected to the database");
    const adminUser = await User.findOne({ role: "Admin" }).select("+password");
    if (!adminUser) {
      console.log("creating admin user");
      var hashedPassword = bcrypt.hashSync("admin12345", 8);
      const adminUser = await new User({
        cartaoCidadao: "00000000",
        password: hashedPassword,
        sexo: "Masculino",
        idade: 21,
        faixaEtaria: "Adolescente",
        estado: "Suspeito",
        role: "Admin",
      })
        .save()
        .catch(console.error);

      if (adminUser) {
        console.log("Admin created");
        console.table([adminUser.toJSON()]);
      }
    } else {
      console.log("Admin:");
      console.table([adminUser.toJSON()]);
    }
  })
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);*/
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", indexRouter);
app.use("/api/v1", usersRouter);
app.use("/api/v1", requestsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/stats", statsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
