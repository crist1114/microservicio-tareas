

function index(req, res) {
  req.getConnection((err, conn) => {
    console.log(req.params.id)
    conn.query('SELECT * FROM tasks WHERE idProyecto = ?', [req.params.id], (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.send(tasks);
    });
  });
}

function getTarea(req, res){

  req.getConnection((err, conn) => {

    conn.query('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, task) => {
      if(err) {
        res.json(err);
      }
      console.log('las tarea es ',task)
      res.send(task);
    });
  });
}

function getTareasPorEstado(req, res){
  console.log('entrando a consultar ')
  req.getConnection((err, conn) => {

    conn.query('SELECT * FROM tasks where estado = ?',[req.params.estado], (err, task) => {
      if(err) {
        res.json(err);
      }
      console.log('las f son ',task)
      res.send(task);
    });
  });

}

function getTareasEst(req, res) {
    req.getConnection((err, conn) => {
    console.log(req.params.id)
    conn.query('SELECT * FROM tasks WHERE idUsuario = ?', [req.params.id], (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.send(tasks);
    });
  });
}

function create(req, res) {
  res.render('tasks/create');
}

function store(req, res) {
  const data = req.body;
  console.log('se insertara la tarea: ',data);
  req.getConnection((err, conn) => {
    conn.query('INSERT INTO tasks SET ?', [data], (err, rows) => {
      if(err) {
        console.log('hubo un error')
        res.json(err);
      }
      console.log('se creo');
      res.json({estado: 'se creo'});
    });
  });
}

function destroy(req, res) {
  console.log(req);
  const id = req.params.id;

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM tasks WHERE id = ?', [id], (err, rows) => {
      if(err) {
        res.json(err);
      }
      res.json({estado: 'se eliminó'});
    });
  })
}

function destroyPorProyecto(req, res) {
  console.log(req);
  const id = req.params.id;

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM tasks WHERE idProyecto = ?', [id], (err, rows) => {
      if(err) {
        res.json(err);
      }
      res.json({estado: 'se eliminó'});
    });
  })
}

function edit(req, res) {
  const id = req.params.id;
  console.log('entrando')
  req.getConnection((err, conn) => {
    console.log('el id es ',id)
    conn.query('SELECT * FROM tasks WHERE id = ?', [id], (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/edit', { tasks });
    });
  });
}

function update(req, res) {
  const data = req.body;
  console.log('la d',data)
  req.getConnection((err, conn) => {
    conn.query('UPDATE tasks SET estado = ?, observaciones = ?, fecha_fin = ? WHERE id = ?', [data.estado, data.observaciones, data.fecha_fin, data.id], (err, rows) => {
      if(err) {
        res.json(err);
      }
      res.send({
        mensaje: "se edito",
      });
    });
  });
}

function editEstado(req, res) {
  const id = req.params.id;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tasks WHERE id = ?', [id], (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/editEstado');
    });
  });
}

function updateEstado(req, res) {
  const id = req.params.id;
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query('UPDATE tasks SET ? WHERE id = ?', [data, id], (err, rows) => {
      if(err) {
        res.json(err);
      }
      res.send({
        mensaje: "se eedito el estado",
      });
    });
  });
}

module.exports = {
  index: index,
  create: create,
  store: store,
  destroy: destroy,
  edit: edit,
  update: update,
  editEstado: editEstado,
  updateEstado: updateEstado,
  getTareasEst: getTareasEst,
  getTarea: getTarea,
  getTareasPorEstado: getTareasPorEstado,
  destroyPorProyecto: destroyPorProyecto,
}