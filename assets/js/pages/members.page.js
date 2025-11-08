import { nav } from '../core/nav.js';
import { MembersView } from '../views/membersView.js';
import { MembersController } from '../controllers/membersController.js';
nav();
const root = document.body.appendChild(document.createElement('main')); root.className='container';
const view = new MembersView(root); const ctrl = new MembersController(view); ctrl.refresh();