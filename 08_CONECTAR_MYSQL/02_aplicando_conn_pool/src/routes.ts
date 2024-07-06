import express, { Request, Response, Router } from 'express';
import { pool } from './connection';

const router = Router();

//????????????????????????????????????????????????????????????????? configuracoes
router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());
//????????????????????????????????????????????????????????????????? configuracoes

router.get('/', (req: Request, res: Response) => {
  res.render('home');
});

//! SELECT
router.get('/books', (req: Request, res: Response) => {
  const sql = `SELECT * FROM books`;

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const books = data;

    //console.log(books);
    res.render('books', { books });
  });
});

//! SELECT COM WHERE
router.get('/books/:id', (req: Request, res: Response) => {
  //const { id } = req.params; //uma forma de fazer
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    }

    const book = data[0];
    if (book)
      res.render('book', { book });
    else
      res.redirect('/books');
  });
});

//! SELECT COM WHERE 2 - para editar (muda nada na consulta, só pra direcionar para outro html)
router.get('/books/edit/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const sql = `SELECT * FROM books WHERE id = ${id}`;
  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    }

    const book = data[0];
    if (book)
      res.render('editbook', { book });
    else
      res.redirect('/');
  });
});

//! INSERT
router.post('/books/insertbook', (req: Request, res: Response) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', ${pageqty})`;

  pool.query(sql, err => {
    if (err) {
      console.log(err);
    }

    res.redirect('/books');
  });
});

//! UPDATE
router.post('/books/updatebook', (req: Request, res: Response) => {
  const { id, title, pageqty } = req.body;

  const sql = `UPDATE books SET title = '${title}', pageqty = ${pageqty} WHERE id = ${id}`;

  pool.query(sql, err => {
    if (err) {
      console.log(err);
    }

    res.redirect('/books');
  });
});

//! DELETE
router.post('/books/remove/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const sql = `DELETE FROM books WHERE id = ${id}`;

  pool.query(sql, err => {
    if (err) {
      console.log(err);
    }

    res.redirect('/books');
  });
});

export default router;