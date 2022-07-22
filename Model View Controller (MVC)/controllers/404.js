exports.getNotFound = (req, res, next) => {
    res.status(404).render("404", { docTitle: "Not Found", path: null });  //bu status veya set headeri her aksiyonda kullanabilrisin.
};