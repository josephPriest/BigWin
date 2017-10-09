'use strict';

module.exports = function(app) {
	var slotMachine = require('../controllers/slotMachineController');

  // bigWin Routes
  app.route('/spin')
    .get(slotMachine.get_spin);
	app.route('/bonus')
    .get(slotMachine.activate_bonus);
};
