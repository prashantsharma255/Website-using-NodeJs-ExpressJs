const { response } = require('express');
const express = require('express');

const { check, validationResult } = require('express-validator');
const { request } = require('pandas/lib/flickr');

const router = express.Router();

const validations = [
  check('name').trim().isLength({ min: 3 }).escape().withMessage('A Name Is Required'),
  check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('A Valid E-Mail Address Is Required'),
  check('title').trim().isLength({ min: 3 }).escape().withMessage('A Title Is Required'),
  check('message').trim().isLength({ min: 5 }).escape().withMessage('A Message Is Required'),
];

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const feedback = await feedbackService.getList();

      const errors = request.session.feedback ? request.session.feedback.errors : false;

      const successMessage = request.session.feedback ? request.session.feedback.message : false;

      request.session.feedback = {};

      return response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedback,
        errors,
        successMessage,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(),
        };
        return response.redirect('/feedback');
      }

      const { name, email, title, message } = request.body;
      await feedbackService.addEntry(name, email, title, message);
      request.session.feedback = {
        message: 'Thank You For Your Feedback!',
      };

      return response.redirect('/feedback');
    } catch (err) {
      return next(err);
    }
  });

  router.post('/api', validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.json({ errors: errors.array() });
      }
      const { name, email, title, message } = request.body;
      await feedbackService.addEntry(name, email, title, message);
      const feedback = await feedbackService.getList();
      return response.json({ feedback, successMessage: 'Thank You For Your Feedback!' });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
