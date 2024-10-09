import { Request, Response, Router } from "express";

const testControllerRouter = Router();

testControllerRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

testControllerRouter.post("/", (req: Request, res: Response) => {
  res.status(201).send("Post is used for create a new item!");
});

testControllerRouter.put("/", (req: Request, res: Response) => {
  res.send("Put is used for update an existing item in full!");
});

testControllerRouter.delete("/", (req: Request, res: Response) => {
  res.send("Delete is used for delete an existing item!");
});

testControllerRouter.patch("/", (req: Request, res: Response) => {
  res.status(206).send("Patch is used for update an existing item in partial!");
});

export default testControllerRouter;