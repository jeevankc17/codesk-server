"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
// 404 Not Found handler
const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource does not exist',
    });
};
exports.notFoundHandler = notFoundHandler;
// Global error handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        status: err.status || 500,
    });
};
exports.errorHandler = errorHandler;
