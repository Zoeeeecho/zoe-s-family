import { nav } from '../core/nav.js';
import { OrderView } from '../views/orderView.js';
import { OrderController } from '../controllers/orderController.js';
nav();
const root=document.body.appendChild(document.createElement('main')); root.className='container';
const v=new OrderView(root); const c=new OrderController(v); c.refresh();