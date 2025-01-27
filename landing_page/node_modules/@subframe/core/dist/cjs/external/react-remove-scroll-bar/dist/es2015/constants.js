'use strict';

var zeroRightClassName = 'right-scroll-bar-position';
var fullWidthClassName = 'width-before-scroll-bar';
var noScrollbarsClassName = 'with-scroll-bars-hidden';
/**
 * Name of a CSS variable containing the amount of "hidden" scrollbar
 * ! might be undefined ! use will fallback!
 */
var removedBarSizeVariable = '--removed-body-scroll-bar-size';

exports.fullWidthClassName = fullWidthClassName;
exports.noScrollbarsClassName = noScrollbarsClassName;
exports.removedBarSizeVariable = removedBarSizeVariable;
exports.zeroRightClassName = zeroRightClassName;
