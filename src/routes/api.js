import express from "express";
import {home, movie, comment, user, auth, category, country} from "../controllers";
import initPassportLocal from "../controllers/passportController/local";

let router = express.Router();

initPassportLocal();

/**
 * Initial Routes
 * @param {express app} app
 */
let initRoutes = app => {
    router.get("/", home.getHomePage);

    router.get("/category/get-all", category.getAllCategories);

    router.get("/country/get-all", country.getAllCountries);

    router.get("/movie/new-movies", movie.getNewMovies);
    router.get("/movie/movies", movie.getMovies);
    router.get("/movie/series", movie.getSeries)
    router.get("/movie/info/:movieId", movie.getMovieInfo);
    router.get("/movie/category/:categoryId", movie.getMoviesByCategoryId);
    router.get("/movie/country/:countryId", movie.getMoviesByCountryId);
    router.get("/movie/search", movie.getMoviesByKeyword);

    router.get("/comment/:movieId", comment.getMovieComments);
    router.post("/comment/add-new", comment.addNewComment);

    router.post("/register", user.addNewUser);
    router.post("/login", auth.passportAuth);
    router.get("/logout", auth.getLogout);

    router.get("/get-log-in-status", auth.getLoginStatus);

    return app.use('/', router);
}

module.exports = initRoutes;