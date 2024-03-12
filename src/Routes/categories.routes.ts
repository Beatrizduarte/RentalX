import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../Modules/Cars/useCases/createCategory/CreateCategoryController"
import { ImportCategoryController } from "../Modules/Cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../Modules/Cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle);

export { categoriesRoutes };
