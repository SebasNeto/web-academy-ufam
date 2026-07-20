import { Router } from 'express';
import mainController from '../controllers/main';
import productController from '../controllers/product';

const router = Router();

router.get('/', mainController.index);
router.get('/lorem/:paragraphs', mainController.lorem);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

router.get('/produto', productController.index);
router.all('/produto/create', productController.create);
router.all('/produto/update/:id', productController.update);
router.get('/produto/:id', productController.read);
router.post('/produto/:id', productController.remove);

router.get('/product', productController.index);
router.all('/product/create', productController.create);
router.all('/product/update/:id', productController.update);
router.get('/product/:id', productController.read);
router.post('/product/:id', productController.remove);

export default router;
