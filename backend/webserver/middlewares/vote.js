'use strict';

module.exports = function(dependencies) {

  const logger = dependencies('logger');
  const resourceLink = dependencies('resource-link');

  return {
    canVote
  };

  function canVote(req, res, next) {
    const link = req.link;

    logger.debug('Check the message vote link', link);

    if (!req.user._id.equals(link.source.id)) {
      return res.status(400).json({error: {code: 400, message: 'Bad Request', details: 'You can not vote for someone else'}});
    }

    resourceLink.exists({source: link.source, target: link.target, type: link.type}).then(exists => {
      if (exists) {
        return res.status(400).json({error: {code: 400, message: 'Bad Request', details: 'You can not vote several times'}});
      }

      req.linkable = true;
      next();
    }, err => {
      logger.error(err);
      res.status(500).json({error: {code: 500, message: 'Server Error', details: 'Can not check is vote already exists'}});
    });
  }
};
