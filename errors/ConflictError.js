class ConflictError extends Error {
  constructor(message) {
	super(message);
	this.statusCode = 409;
	this.name = this.constructor.name;
  }
}

module.exports = ConflictError;
