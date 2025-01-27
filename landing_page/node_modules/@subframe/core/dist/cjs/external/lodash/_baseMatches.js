'use strict';

var _baseIsMatch = require('./_baseIsMatch.js');
var _getMatchData = require('./_getMatchData.js');
var _matchesStrictComparable = require('./_matchesStrictComparable.js');

var baseIsMatch = _baseIsMatch._baseIsMatch,
    getMatchData = _getMatchData._getMatchData,
    matchesStrictComparable = _matchesStrictComparable._matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;

exports._baseMatches = _baseMatches;
