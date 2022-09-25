import { Router } from "express"
import UserController from "../controllers/user-controller"
import {errorMiddleware} from "../middleware/error-middleware";
import {validationRequestBody} from "../middleware/validationRequestBody";

const router = Router()

router.post("/login", UserController.login)
router.post("/register", validationRequestBody, UserController.register)
router.get("/logout", UserController.logout)
router.get("/refresh", UserController.refreshToken)

router.use(errorMiddleware)

export default router
