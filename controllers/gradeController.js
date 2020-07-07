import { gradeModel } from '../db/grade.js'
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  try {
    const grade = new gradeModel(req.body)
    await grade.save()
    res.status(201).send(grade)
    logger.info(`POST /grade - ${JSON.stringify(grade)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  // const name = req.query.name;
  //condicao para o filtro no findAll
  // var condition = name
  //   ? { name: { $regex: new RegExp(name), $options: 'i' } }
  //   : {};

  try {
    const grades = await gradeModel.find({})
    res.status(200).send(grades)
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const grade = await gradeModel.findOne({_id: id})
    if(!grade) {
      res.status(404).send(`Grade with ID ${id} was not found!`)
    } else {
      res.status(200).send(grade)
    }
    logger.info(`GET /grade/:id - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade/:id - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const grade = await gradeModel.findOneAndUpdate({_id: id}, req.body, {new: true})
    res.status(200).send(grade)
    logger.info(`PUT /grade/:id - ${id} - ${JSON.stringify(grade)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade/:id - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const grade = await gradeModel.findOneAndDelete({_id: id})
    
    res.status(200).send(id)
    logger.info(`DELETE /grade/:id - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade/:id - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {
    const grades = await gradeModel.deleteMany({})

    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };