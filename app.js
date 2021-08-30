let mysql = require('mysql2');

let mysqlcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

//пусть самым злостным читателем считается тот, кто на данный момент держит на руках больше всего книг

let query = (sqlquery, handleresult) => {
  mysqlcon.query(sqlquery, function (err, result) {
    if (err) throw err;
    if (handleresult)
      handleresult(result);
    else
      console.log(result);
  });
}

mysqlcon.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  query("USE library", (result) => { });
  //самая популярная книга
  query("SELECT authors.name FROM borrows, bookcase, books, authors WHERE borrows.bookcase_id = bookcase.id and bookcase.book_id=books.id and books.authors_id = authors.id and YEAR(borrows.borrowed)=2021 GROUP BY authors.name ORDER BY COUNT(*) DESC LIMIT 1;");
  //самый злостный читатель
  query("SELECT students.Name FROM borrows, students WHERE borrows.student_id = students.id and borrows.returned IS NULL GROUP BY students.Name ORDER BY COUNT(*) DESC LIMIT 1;", (result) => { console.log(result[0].name) });
});