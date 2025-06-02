import { verifyResponse } from "./utils/authtoken.js"
import { getUser } from "./db/functions/user.js";

export function asyncWrapper (func) {
	return function(req, res, next) {
		Promise
			.resolve(func(req, res, next))
			.catch(next);
	}
}

export async function authUser (req, res, next) {
	const authToken = req.headers["authorization"].split(' ')

	if (!authToken) {
		return res.status(401).json({
			status: 'Failed',
			message: 'Authorization header missing'
		})
	}

	let token;
	if (authToken[1].at(authToken[1].length - 1) == ';') {
		token = authToken[1].slice(0, authToken[1].length - 1)
	} else {
		token = authToken[1]
	}
	const verify = verifyResponse(token)

	if (!verify) {
		return res.status(401).json({
			status: 'Failed',
			message: 'Invalid token Credentials'
		})
	}

	const confirmUser = await getUser(verify.emails[0].value)

	res.user = confirmUser;
	
	if (!confirmUser) {
		return res.status(401).json({
			status: "Failed",
			message: "Unauthorized user"
		})
	}

	next();
}

export function catchUnknownRoute (req, res, next) {

	return res.status(404).json({
		error: "Not found",
		message: `Cannot ${req.method} ${req.originalUrl}`
	})
}

export function errorHandler (err, req, res, next) {	
	console.log(err.stack)
	
	return res.status(500).json({
		status: 'Failed',
		message: err.message
	})
}
