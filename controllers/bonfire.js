var _ = require('lodash'),
    debug = require('debug')('freecc:cntr:bonfires'),
    Bonfire = require('./../models/Bonfire');

/**
 * Bonfire controller
 */

var highestBonfireNumber = 1;

exports.index = function(req, res) {
    res.render('bonfire/bonfire.jade', {
        title: 'Learn to code with Bonfire'
    });

    Bonfire.find({}, null, { sort: { bonfireNumber: 1 } }, function(err, c) {
        if (err) {
            debug('bonfire err: ', err);
            next(err);
        }
    });
};

exports.returnBonfire = function(req, res, next) {
    var bonfireNumber = parseInt(req.params.bonfireNumber) || 0;
    var verbs = [
        'ACED',
        'NAILED',
        'ROCKED',
        'SCORCHED',
        'DEVASTATED',
        'OWNED',
        'CRUSHED',
        'CONQUERED',
        'KILLED',
        'SHREDDED',
        'ANNIHILATED',
        'NUKED'
    ];
    var phrases = [
        "Shout it from on top of a mountain",
        "Tell everyone and their dogs",
        "Show them. Show them all!",
        "Inspire your friends",
        "Tell the world of your greatness",
        "Look accomplished on social media",
        "Share news of your grand endeavor",
        "Establish your alibi for the past two hours",
        "Prove to mom that computers aren't just for games"
    ];

    if (bonfireNumber > highestBonfireNumber) { bonfireNumber = 0; }
    Bonfire.find({}, null, { sort: { bonfireNumber: 1 } }, function(err, bonfire) {
        debug(bonfire[bonfireNumber].challengeEntryPoint);
        if (err) {
            debug('bonfire err: ', err);
            next(err);
        }
        res.render('bonfire/show', {
            title: bonfire[bonfireNumber].name,
            name: bonfire[bonfireNumber].name,
            number: bonfire[bonfireNumber].bonfireNumber,
            difficulty: bonfire[bonfireNumber].difficulty,
            description: bonfire[bonfireNumber].description,
            tests:  bonfire[bonfireNumber].tests,
            challengeSeed:  bonfire[bonfireNumber].challengeSeed,
            challengeEntryPoint: bonfire[bonfireNumber].challengeEntryPoint,
            cc: req.user ? req.user.bonfiresHash : undefined,
            points: req.user ? req.user.points : undefined,
            verb: verbs[Math.floor(Math.random() * verbs.length)],
            phrase: phrases[Math.floor(Math.random() * phrases.length)],
            bonfires: bonfire
        });
    });
};