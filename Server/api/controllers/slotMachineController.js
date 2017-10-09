'use strict';
const SlotMachineModel = require('../models/slotMachineModel');
const SlotMachineTexts = require('../constants/slotMachineTexts');
const BonusChance = .99;

exports.get_spin = function(req, res) {
  res.json(GetSpin());
};

exports.activate_bonus = function (req, res){
  res.json(ActivateBonus());
};


/* End Points */
function GetSpin(){
  let spin = new SlotMachineModel();
  spin.spin1 = Math.floor(Math.random() * 5) + 1;
  spin.spin2 = Math.floor(Math.random() * 5) + 1;
  spin.spin3 = Math.floor(Math.random() * 5) + 1;
  spin = GetResultOfSpin(spin);
  spin.bonus = GetBonus();
  return spin;
}

/* Activate Bonus */
function ActivateBonus(){
  /* Do something with the users account?
     I'm guessing this would be something about giving
     the user extra spins or crediting spins to their account
  */
  return true;
}

/* Utility Functions*/

function GetBonus(){
  let d = Math.random();
  if (d < BonusChance){
      // Chance of winning based on const
      //Not sure what the standard is for casinos
      console.log("Triggered");
      return true;
  }
  return false;
}

function GetResultOfSpin(spin){
  //Determine the outcome of the spin (No Win, Small Win, Big Win)

  //Big Win, No need to go further
  if (spin.spin1 == spin.spin2 && spin.spin1 == spin.spin3){
    spin.result = SlotMachineTexts.constants.BIG_WIN_TEXT;
    return spin;
  }

  //Small Win
  if (spin.spin1 == spin.spin2 || spin.spin1 == spin.spin3 || spin.spin2 == spin.spin3){
    spin.result = SlotMachineTexts.constants.SMALL_WIN_TEXT;
    return spin;
  }

  //No Win
  spin.result = SlotMachineTexts.constants.NO_WIN_TEXT;
  return spin;

}
