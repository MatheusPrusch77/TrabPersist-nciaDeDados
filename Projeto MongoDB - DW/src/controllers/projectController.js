var Project = require('../models/projectModel');

// Método para listar todos os projetos
exports.getProject = async function (req, res) {
    try {
        const result = await Project.find().populate('assignedTo'); // Popula o campo assignedTo com dados relacionados
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Método para criar um projeto
exports.create = function (req, res) {
    let project = new Project({
        title: req.body.title,
        description: req.body.description,
        assignedTo: req.body.assignedTo
    });

    project.save()
        .then(() => {
            res.status(201).send(project.toJSON());  // Envia a resposta após salvar o projeto
        })
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar projeto.` });
        });
};

// Método para atualizar um projeto
exports.updateProject = async function (req, res) {
    try {
        const { id } = req.params; 
        const { title, description, assignedTo } = req.body; 

        // Verifica se todos os campos obrigatórios foram fornecidos
        if (!title || !description || !assignedTo) {
            return res.status(400).send({ message: 'Os campos "title", "description" e "assignedTo" são obrigatórios para atualização.' });
        }

        // Atualiza o projeto e retorna os dados atualizados
        const updatedProject = await Project.findByIdAndUpdate(id, { title, description, assignedTo }, { new: true });

        if (!updatedProject) {
            return res.status(404).send({ message: 'Projeto não encontrado.' });
        }

        return res.status(200).json(updatedProject); 
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao atualizar o projeto.` });
    }
};

// Método para deletar um projeto
exports.deleteProject = async function (req, res) {
    try {
        const { id } = req.params; 

        // Deleta o projeto com o ID fornecido
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).send({ message: 'Projeto não encontrado.' });
        }

        return res.status(200).send({ message: 'Projeto deletado com sucesso.' });
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao deletar o projeto.` });
    }
};

// Método para obter detalhes de um projeto pelo ID
exports.details = async function (req, res) {
    try {
        const result = await Project.findById(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};
