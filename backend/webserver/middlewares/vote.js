'use strict';

module.exports = function(dependencies) {

  const logger = dependencies('logger');

  return {
    canVote
  };

  function canVote(req, res, next) {
    const link = req.link;

    logger.debug('Check the message vote link', link);

    if (!req.user._id.equals(link.source.id)) {
      return res.status(400).json({error: {code: 400, message: 'Bad Request', details: 'You can not vote for someone else'}});
    }

    // TODO: Check that the target exists
    // TODO: Check that the link does not already exists
    // TODO: Check permission to see if current user have rights to vote on resource

    req.linkable = true;
    next();
  }
};
