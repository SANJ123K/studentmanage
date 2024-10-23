const mongoose = require('mongoose');
const StudentArticals = require('../models/studentDetails.models.js')


// add the student data into database
const addArtical = async (req, res) =>{
    try{
        const {studentId,article } = req.body;
        const newStudent = new StudentArticals({
            studentId,
            article
        });

        await newStudent.save();
        res.status(201).json({
            status:" sucessfull",
            message:`New artical add successfully `});        
    }
    catch (error){
        return res.status(400).json({
            status:" fail",
            message:`Error create Artical ${error} `});   
    }

}

// get the articles
const getStudentArticles = async (req, res) => {
    const { id } = req.params; 

    try {
        if (id) {
            const article = await StudentArticals.findById(id)
                .populate('studentId', 'name'); 

            if (!article) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Article not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                data: article,
            });
        } else {
            const articles = await StudentArticals.find()
                .populate('studentId', 'name');

            return res.status(200).json({
                status: 'success',
                results: articles.length,
                data: articles,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: `Error fetching articles: ${error.message}`,
        });
    }
};

// now update the articals
const updateStudentArticle = async (req, res) => {
    const { id } = req.params;
    const { article } = req.body;
    try {

        const updatedArticle = await StudentArticals.findByIdAndUpdate(id, { article }, {
            new: true,
            runValidators: true,
        })
        if (!updatedArticle) {
            return res.status(404).json({
                status: 'fail',
                message: 'Article not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: updatedArticle,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: `Error updating article: ${error.message}`,
        });
    }
};


// delete student article by ID
const deleteStudentArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedArticle = await StudentArticals.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).json({
                status: 'fail',
                message: 'Article not found',
            });
        }
        res.status(201).json({
            status: 'success',
            message: 'Article successfully deleted',
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: `Error deleting article: ${error.message}`,
        });
    }
};


module.exports = {addArtical, getStudentArticles, updateStudentArticle, deleteStudentArticle};