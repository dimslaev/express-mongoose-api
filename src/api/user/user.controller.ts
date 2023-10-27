import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";

async function getAll(req: Request, res: Response, next: NextFunction) {
	try {
		const results = await userService.getAll();
		res.json(results);
	} catch (err) {
		next(err);
	}
}

async function get(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await userService.get(req.params.id);
		res.json(result);
	} catch (err) {
		next(err);
	}
}

async function create(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await userService.create(req.body);
		res.status(201).json(result);
	} catch (err) {
		next(err);
	}
}

async function update(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await userService.update(req.params.id, req.body);
		res.json(result);
	} catch (err) {
		next(err);
	}
}

async function remove(req: Request, res: Response, next: NextFunction) {
	try {
		const result = await userService.remove(req.params.id);
		res.json(result);
	} catch (err) {
		next(err);
	}
}

export { getAll, get, create, update, remove };
