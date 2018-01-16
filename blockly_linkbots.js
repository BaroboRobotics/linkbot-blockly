var GhostFieldVariable = function(name) {
    var v = new Blockly.FieldVariable(name);
    v.typeInfo = 'None';
    return v;
};

if (Blockly.Ch === undefined) {
    Blockly.Ch = {};
}

if (Blockly.Cpp === undefined) {
    Blockly.Cpp = {};
}

Blockly.Blocks['linkbotjs_new_linkbot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("New Unconnected Linkbot");
    this.setOutput(true, "Linkbot");
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['linkbotjs_new_linkbot'] = function(block) {
    //var code = 'new Linkbot()';
    //return [code, Blockly.JavaScript.ORDER_ATOMIC];
    var code = 'Linkbots.acquire(1).robots[0]';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.Python['linkbotjs_new_linkbot'] = function(block) {
  // Get the ID of the next robot
  var robots = Linkbots.getRobots();
  // Try and find the first connected robot
  var robot = { "id": "ABCD" };
  for(var i = 0; i < robots.length; i++) {
    if( robots[i].status === "ready" ) {
      robot = robots[i];
      break;
    }
  }
  var code = 'linkbot.Linkbot("'+robot.id+'")\n';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Ch['linkbotjs_new_linkbot'] = function(block) {
  // Get the ID of the next robot
      var code = 'BLOCKLY_NO_SET';
  return [code, Blockly.Ch.ORDER_ATOMIC];
};

Blockly.Blocks['linkbotjs_connect'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Connect");
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setColour(210);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_connect'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = 
value_linkbot + ` = ( function() {
    var robots = Linkbots.acquire(1);
    if ( robots.robots.length < 1 ) {
        throw 'Not enough connected robots in robot manager.';
    }
    return robots.robots[0];
})();

`;
    return code;
};

Blockly.Python['linkbotjs_connect'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.close()\n';
    return code;
};

Blockly.Ch['linkbotjs_connect'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.disconnect();\n';
    return code;
};

Blockly.Cpp['linkbotjs_connect'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.disconnect();\n';
    return code;
};

Blockly.Blocks['linkbotjs_connect_dropdown'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(GhostFieldVariable("robot"), "ROBOT")
        .appendField("Connect to ID:")
        .appendField(new Blockly.FieldDropdown(function() {
                var robots = Linkbots.getOrderedRobots();
                var robotlist = [];
                for(var i = 0; i < robots.length; i++) {
                    robotlist.push([robots[i], robots[i]]);
                }
                robotlist.push(['NONE']);
                return robotlist;
            }), "ROBOT_ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['linkbotjs_connect_dropdown'] = function(block) {
    var variable_robot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
    var text_robot_id = block.getFieldValue('ROBOT_ID').toUpperCase();
    var code = variable_robot+' = await ( async function() {\n' +
               '    var __daemon = await getDaemon();\n' + 
               '    var __robot = await __daemon.getRobot(\''+text_robot_id+'\');\n' + 
               '    __robot.wheelDiameter = 3.5;\n' + 
               '    __robot.trackWidth = 3.7;\n' + 
               '    simulator.proxyRobot(__robot, simulator.operations.getRobot("' + text_robot_id + '"));\n' +
               '    return __robot;\n';
    code +=    '})();\n';
    return code;
};

Blockly.Python['linkbotjs_connect_dropdown'] = function(block) {
    var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
    var text_linkbot_id = block.getFieldValue('ROBOT_ID');
    var code = variable_robot + ' = linkbot.Linkbot("'+text_linkbot_id+'")\n' + 
               variable_robot + '.wheelDiameter = 3.5\n' + 
               variable_robot + '.trackWidth = 3.7\n';
    
    return code;
};

Blockly.Blocks['linkbotjs_sleep'] = {
    init: function() {
        this.appendValueInput("Sleep")
            .setCheck("Number")
            .appendField("sleep(");
        this.appendDummyInput()
            .appendField("seconds)");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_sleep'] = function(block) {
    var value_wait = Blockly.JavaScript.valueToCode(block, 'Sleep', Blockly.JavaScript.ORDER_ATOMIC);
    if (!value_wait) {
        return '';
    }
    var code = 'await __sleep('+value_wait+');\n';
    return code;
};

Blockly.Python['linkbotjs_sleep'] = function(block) {
    var value_wait = Blockly.Python.valueToCode(block, 'Sleep', Blockly.JavaScript.ORDER_ATOMIC);
    if (!value_wait) {
        return '';
    }
    var code = 'time.sleep(' + value_wait + ')\n';
    return code;
};

Blockly.Ch['linkbotjs_sleep'] = function(block) {
    var value_wait = Blockly.Ch.valueToCode(block, 'Sleep', Blockly.JavaScript.ORDER_ATOMIC);
    if (!value_wait) {
        return '';
    }
    var code = 'sleep(' + value_wait + ');\n';
    return code;
};

Blockly.Cpp['linkbotjs_sleep'] = function(block) {
    var value_wait = Blockly.Cpp.valueToCode(block, 'Sleep', Blockly.JavaScript.ORDER_ATOMIC);
    if (!value_wait) {
        return '';
    }
    var code = 'usleep(' + value_wait + '*1000000);\n';
    return code;
};

Blockly.Blocks['linkbotjs_delay'] = {
  init: function() {
    this.appendValueInput("DELAY_SECONDS")
        .setCheck("Number")
        .appendField("Delay (seconds)");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['linkbotjs_delay'] = function(block) {
  var value_delay_seconds = Blockly.JavaScript.valueToCode(block, 'DELAY_SECONDS', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'await __sleep('+value_delay_seconds*1000+');\n';
  return code;
};

Blockly.Python['linkbotjs_delay'] = function(block) {
  var value_delay_seconds = Blockly.Python.valueToCode(block, 'DELAY_SECONDS', Blockly.Python.ORDER_ATOMIC);
  var code = 'time.sleep('+value_delay_seconds+')\n';
  return code;
};

Blockly.Ch['linkbotjs_delay'] = function(block) {
  var value_delay_seconds = Blockly.Ch.valueToCode(block, 'DELAY_SECONDS', Blockly.Ch.ORDER_ATOMIC);
  var code = 'sleep('+value_delay_seconds+');\n';
  return code;
};

Blockly.Cpp['linkbotjs_delay'] = function(block) {
  var value_delay_seconds = Blockly.Cpp.valueToCode(block, 'DELAY_SECONDS', Blockly.Cpp.ORDER_ATOMIC);
  var code = 'usleep('+value_delay_seconds+'*1000000);\n';
  return code;
};

Blockly.Blocks['linkbotjs_settimeout'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("delay");
        this.appendValueInput("DELAY")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("seconds");
        this.appendStatementInput("VALUE")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};


Blockly.JavaScript['linkbotjs_settimeout'] = function(block) {
    var value_delay = Blockly.JavaScript.valueToCode(block, 'DELAY', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_value = Blockly.JavaScript.statementToCode(block, 'VALUE');
    if (value_delay) {
        value_delay *= 1000;
    } else {
        value_delay = 1000;
    }
    var code = 'setTimeout(function() {\n' + statements_value + ' }, ' + value_delay + ');\n';
    return code;
};

Blockly.Python['linkbotjs_settimeout'] = function(block) {
    var value_delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_value = Blockly.Python.statementToCode(block, 'VALUE');
    if (!value_delay) {
        value_delay = 1;
    }
    var code = 'time.sleep(' + value_delay + ')\n';
    // Get rid of the indents
    code += statements_value.replace(/^[\s]*/m, '');
    return code;
};

Blockly.Ch['linkbotjs_settimeout'] = function(block) {
    var value_delay = Blockly.Ch.valueToCode(block, 'DELAY', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_value = Blockly.Ch.statementToCode(block, 'VALUE');
    if (!value_delay) {
        value_delay = 1;
    }
    var code = 'sleep(' + value_delay + ');\n';
    // Get rid of the indents
    code += statements_value.replace(/^[\s]*/m, '');
    return code;
};

Blockly.Blocks['linkbotjs_color'] = {
    init: function() {
        this.appendValueInput("COLOR")
            .setCheck("Colour")
            //.setAlign(Blockly.ALIGN_RIGHT)
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("LED Color");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip('Change a Linkbot\'s LED color');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_color'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_color = Blockly.JavaScript.valueToCode(block, 'COLOR', Blockly.JavaScript.ORDER_ATOMIC);
    var block = 
          'await (function() {\n'
        + '    var color = ' + value_color + ';\n'
        + '    var red = parseInt(color.substring(1,3), 16);\n'
        + '    var green = parseInt(color.substring(3,5), 16);\n'
        + '    var blue = parseInt(color.substring(5,7), 16);\n'
        + '    return '+value_linkbot+'.setLedColor(red, green, blue);\n'
        + '})();\n';
    //code = value_linkbot + '.color(' + red + ', ' + green + ', ' + blue + ');\n';
    code = block;
    return code;
};

Blockly.Python['linkbotjs_color'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    code = value_linkbot + '.set_led_color_rgb(' + value_color + ');\n';
    return code;
};

Blockly.Ch['linkbotjs_color'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_color = Blockly.Ch.valueToCode(block, 'COLOR', Blockly.Ch.ORDER_ATOMIC);
    var red = parseInt(value_color.substring(2,4), 16);
    var green = parseInt(value_color.substring(4,6), 16);
    var blue = parseInt(value_color.substring(6,8), 16);
    code = value_linkbot + '.setLEDColorRGB(' + red + ', ' + green + ', ' + blue + ');\n';
    return code;
};

Blockly.Cpp['linkbotjs_color'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_color = Blockly.Cpp.valueToCode(block, 'COLOR', Blockly.Cpp.ORDER_ATOMIC);
    var red = parseInt(value_color.substring(2,4), 16);
    var green = parseInt(value_color.substring(4,6), 16);
    var blue = parseInt(value_color.substring(6,8), 16);
    code = value_linkbot + '.setLEDColorRGB(' + red + ', ' + green + ', ' + blue + ');\n';
    return code;
};

Blockly.Blocks['linkbotjs_connect_id'] = {
  init: function() {
    var robotField = new Blockly.FieldVariable("robot");
    robotField.typeInfo = 'None';
    this.appendDummyInput()
        .appendField(robotField, "ROBOT")
        .appendField("Connect to ID:")
        .appendField(new Blockly.FieldTextInput("ABCD"), "ROBOT_ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Connect to a Linkbot');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['linkbotjs_connect_id'] = function(block) {
    var variable_robot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
    var text_robot_id = block.getFieldValue('ROBOT_ID').toUpperCase();
    var code = variable_robot + ` =
await (async function() {
    var daemon = await getDaemon();
    return daemon.getRobot(`+text_robot_id+`);
})();
__robots.push(`+variable_robot+`);
`;
/*
    var code = 'var __daemon = await getDaemon();\n';
    code +=     variable_robot+ ' = await __daemon.getRobot("'+text_robot_id+'");\n';
    code +=    '__robots.push('+variable_robot+');\n';
*/
    return code;
};

Blockly.Python['linkbotjs_connect_id'] = function(block) {
    var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
    var text_linkbot_id = block.getFieldValue('ROBOT_ID');
    var code = variable_robot + ' = linkbot.Linkbot("'+text_linkbot_id+'")\n' + 
               variable_robot + '.wheel_diameter = 3.5\n' + 
               variable_robot + '.track_width = 3.7\n';
    
    return code;
};

Blockly.Ch['linkbotjs_connect_id'] = function(block) {
    var variable_robot = Blockly.Ch.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
    var text_linkbot_id = block.getFieldValue('ROBOT_ID');
    var code = 'CLinkbotI ' + variable_robot + ' = CLinkbotI("'+text_linkbot_id+'");\n' +
               'double ' + variable_robot + '_wheelDiameter = 3.5;\n' + 
               'double ' + variable_robot + '_trackWidth = 3.7;\n';
    
    return [code, Blockly.Ch.ORDER_ATOMIC];
};

Blockly.Cpp['linkbotjs_connect_id'] = function(block) {
    var variable_robot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
    var text_linkbot_id = block.getFieldValue('ROBOT_ID');
    var code = 'CLinkbot ' + variable_robot + '{"'+text_linkbot_id+'"};\n' + 
               'auto ' + variable_robot + '_wheelDiameter = 3.5;\n' + 
               'auto ' + variable_robot + '_trackWidth = 3.7;\n';
    
    return [code, Blockly.Cpp.ORDER_ATOMIC];
};

Blockly.Blocks['linkbotjs_disconnect'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Disconnect");
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setColour(210);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_disconnect'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = '.then( function() {\n' + 
               '    return ' + value_linkbot + '.disconnect();\n' +
               '})\n';
    return code;
};

Blockly.Python['linkbotjs_disconnect'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.close()\n';
    return code;
};

Blockly.Ch['linkbotjs_disconnect'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.disconnect();\n';
    return code;
};

Blockly.Cpp['linkbotjs_disconnect'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.disconnect();\n';
    return code;
};

Blockly.Blocks['linkbotjs_buzzer'] = {
    init: function() {
        this.appendValueInput("FREQ")
            .setCheck("Number")
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Buzzer frequency (hz)");
        this.setColour(210);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_buzzer'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.JavaScript.valueToCode(block, 'FREQ', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'await '+value_linkbot+'.setBuzzerFrequency('+value_name+');\n';
    return code;
};

Blockly.Python['linkbotjs_buzzer'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Python.valueToCode(block, 'FREQ', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.set_buzer_frequency(' + value_name + ')\n';
    return code;
};

Blockly.Ch['linkbotjs_buzzer'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Ch.valueToCode(block, 'FREQ', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.setBuzzerFrequencyOn(' + value_name + ');\n';
    return code;
};

Blockly.Cpp['linkbotjs_buzzer'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Cpp.valueToCode(block, 'FREQ', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.setBuzzerFrequencyOn(' + value_name + ');\n';
    return code;
};

Blockly.Blocks['linkbotjs_buzzer_time'] = {
    init: function() {
        this.appendValueInput("FREQ")
            .setCheck("Number")
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Buzzer frequency (hz)");
        this.appendValueInput("TIME")
            .setCheck("Number")
            .appendField("Buzzer time (seconds)");
        this.setColour(210);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_buzzer_time'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.JavaScript.valueToCode(block, 'FREQ', Blockly.JavaScript.ORDER_ATOMIC);
    var value_time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'await '+value_linkbot+'.setBuzzerFrequency('+value_name+');\n';
    code +=    'await __sleep('+value_time+'*1000);\n';
    code +=    'await '+value_linkbot+'.setBuzzerFrequency(0);\n';
    return code;
};

Blockly.Python['linkbotjs_buzzer_time'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Python.valueToCode(block, 'FREQ', Blockly.JavaScript.ORDER_ATOMIC);
    var value_time= Blockly.Python.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.set_buzzer_frequency(' + value_name + ')\n' + 
               'time.sleep('+value_time+')\n' + 
               value_linkbot + '.set_buzzer_frequency(0)\n';
    return code;
};

Blockly.Ch['linkbotjs_buzzer_time'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Ch.valueToCode(block, 'FREQ', Blockly.JavaScript.ORDER_ATOMIC);
    var value_time= Blockly.Ch.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.setBuzzerFrequency(' + value_name + ', '+value_time+');\n';
    return code;
};

Blockly.Cpp['linkbotjs_buzzer_time'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Cpp.valueToCode(block, 'FREQ', Blockly.JavaScript.ORDER_ATOMIC);
    var value_time= Blockly.Cpp.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.setBuzzerFrequency(' + value_name + ', '+value_time+');\n';
    return code;
};

Blockly.Blocks['linkbotjs_zero'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Reset to zero");
        this.setColour(210);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Move a Linkbot\'s motors to their zero positions');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_zero'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = 'await '+value_linkbot+'.resetToZero();\n';
    return code;
};

Blockly.Python['linkbotjs_zero'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.reset_to_zero()\n';
    return code;
};

Blockly.Ch['linkbotjs_zero'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    code = value_linkbot + '.resetToZero();\n';
    return code;
};

Blockly.Cpp['linkbotjs_zero'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    code = value_linkbot + '.resetToZero();\n';
    return code;
};

Blockly.Blocks['linkbotjs_zero_nb'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Reset to zero (NB)");
        this.setColour(210);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_zero_nb'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = 'await '+value_linkbot+'.resetToZeroNB();\n';
    return code;
};

Blockly.Python['linkbotjs_zero_nb'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.reset_to_zero_nb()\n';
    return code;
};

Blockly.Ch['linkbotjs_zero_nb'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    code = value_linkbot + '.resetToZeroNB();\n';
    return code;
};

Blockly.Cpp['linkbotjs_zero_nb'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    code = value_linkbot + '.resetToZeroNB();\n';
    return code;
};

Blockly.Blocks['linkbotjs_stop'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Stop");
        this.setColour(210);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Stop a Linkbot\'s motors');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_stop'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = 'await '+value_linkbot+'.stop(0x07);\n';
    return code;
};

Blockly.Python['linkbotjs_stop'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.stop()\n';
    return code;
};

Blockly.Ch['linkbotjs_stop'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.stop();\n';
    return code;
};

Blockly.Cpp['linkbotjs_stop'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.stop();\n';
    return code;
};

Blockly.Blocks['linkbotjs_move_wait'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("MoveWait");
        this.setColour(210);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Wait until all of a Linkbot\'s motors stop moving');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_move_wait'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = 'await '+value_linkbot+'.moveWait(0x07);\n';
    return code;
};

Blockly.Python['linkbotjs_move_wait'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.move_wait()\n';
    return code;
};

Blockly.Ch['linkbotjs_move_wait'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.moveWait();\n';
    return code;
};

Blockly.Cpp['linkbotjs_move_wait'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.moveWait();\n';
    return code;
};

Blockly.Blocks['linkbotjs_moveright'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Begin turn right");
        this.setColour(210);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_moveright'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = 'await '+value_linkbot+'.setJointStates(1, 0, 1, 0x05);\n';
    return code;
};

Blockly.Python['linkbotjs_moveright'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.begin_move(wait=False)\n';
    return code;
};

Blockly.Ch['linkbotjs_moveright'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.setMovementStateNB(ROBOT_FORWARD, 0, ROBOT_BACKWARD);\n';
    return code;
};

Blockly.Cpp['linkbotjs_moveright'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.setMovementStateNB(LINKBOT_FORWARD, LINKBOT_NEUTRAL, LINKBOT_BACKWARD);\n';
    return code;
};

Blockly.Blocks['linkbotjs_moveleft'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Begin turn left");
        this.setColour(210);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_moveleft'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = 'await '+value_linkbot+'.setJointStates(-1, 0, -1, 0x05);\n';
    return code;
};

Blockly.Python['linkbotjs_moveleft'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.begin_move(forward=(False, False, False), wait=False)\n';
    return code;
};

Blockly.Ch['linkbotjs_moveleft'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.setMovementStateNB(ROBOT_BACKWARD, 0, ROBOT_FORWARD);\n';
    return code;
};

Blockly.Cpp['linkbotjs_moveleft'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.setMovementStateNB(LINKBOT_BACKWARD, LINKBOT_NEUTRAL, LINKBOT_FORWARD);\n';
    return code;
};

Blockly.Blocks['linkbotjs_movebackward'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Begin move backward");
        this.setColour(210);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_movebackward'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = 'await '+value_linkbot+'.setJointStates(-1, 0, 1, 0x05);\n';
    return code;
};

Blockly.Python['linkbotjs_movebackward'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.begin_move(forward=(False, False, True), wait=False)\n';
    return code;
};

Blockly.Ch['linkbotjs_movebackward'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.setMovementStateNB(ROBOT_BACKWARD, 0, ROBOT_BACKWARD);\n';
    return code;
};

Blockly.Cpp['linkbotjs_movebackward'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.setMovementStateNB(LINKBOT_BACKWARD, LINKBOT_NEUTRAL, LINKBOT_BACKWARD);\n';
    return code;
};

Blockly.Blocks['linkbotjs_moveforward'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Begin move forward");
        this.setColour(210);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_moveforward'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = 'await '+value_linkbot+'.setJointStates(1, 0, -1, 0x05);\n';
    return code;
};

Blockly.Python['linkbotjs_moveforward'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.begin_move(forward=(True, True, False), wait=False)\n';
    return code;
};

Blockly.Ch['linkbotjs_moveforward'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.setMovementStateNB(ROBOT_FORWARD, 0, ROBOT_FORWARD);\n';
    return code;
};

Blockly.Cpp['linkbotjs_moveforward'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.setMovementStateNB(LINKBOT_FORWARD, LINKBOT_NEUTRAL, LINKBOT_FORWARD);\n';
    return code;
};

Blockly.Blocks['linkbotjs_move_to'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Move to (");
        this.appendValueInput("1")
            .setCheck("Number");
        this.appendValueInput("2")
            .setCheck("Number")
            .appendField("\xB0,");
        this.appendValueInput("3")
            .setCheck("Number")
            .appendField("\xB0,");
        this.appendDummyInput()
            .appendField("\xB0 )");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('Move a Linkbot\'s motors to absolute positions');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_move_to'] = function(block) {
    var variable_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.JavaScript.valueToCode(block, '1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_2 = Blockly.JavaScript.valueToCode(block, '2', Blockly.JavaScript.ORDER_ATOMIC);
    var value_3 = Blockly.JavaScript.valueToCode(block, '3', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'await '+variable_linkbot+'.moveTo(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n'
    return code;
};

Blockly.Python['linkbotjs_move_to'] = function(block) {
    var variable_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Python.valueToCode(block, '1', Blockly.Python.ORDER_ATOMIC);
    var value_2 = Blockly.Python.valueToCode(block, '2', Blockly.Python.ORDER_ATOMIC);
    var value_3 = Blockly.Python.valueToCode(block, '3', Blockly.Python.ORDER_ATOMIC);
    var code = variable_linkbot + '.move_to(' + value_1 + ', ' + value_2 + ', ' + value_3 + ')\n';
    return code;
};

Blockly.Ch['linkbotjs_move_to'] = function(block) {
    var variable_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Ch.valueToCode(block, '1', Blockly.Ch.ORDER_ATOMIC);
    var value_2 = Blockly.Ch.valueToCode(block, '2', Blockly.Ch.ORDER_ATOMIC);
    var value_3 = Blockly.Ch.valueToCode(block, '3', Blockly.Ch.ORDER_ATOMIC);
    var code = variable_linkbot + '.moveTo(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n';
    return code;
};

Blockly.Cpp['linkbotjs_move_to'] = function(block) {
    var variable_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Cpp.valueToCode(block, '1', Blockly.Cpp.ORDER_ATOMIC);
    var value_2 = Blockly.Cpp.valueToCode(block, '2', Blockly.Cpp.ORDER_ATOMIC);
    var value_3 = Blockly.Cpp.valueToCode(block, '3', Blockly.Cpp.ORDER_ATOMIC);
    var code = variable_linkbot + '.moveTo(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n';
    return code;
};

Blockly.Blocks['linkbotjs_move_to_nb'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Move to (NB)(");
        this.appendValueInput("1")
            .setCheck("Number");
        this.appendValueInput("2")
            .setCheck("Number")
            .appendField("\xB0,");
        this.appendValueInput("3")
            .setCheck("Number")
            .appendField("\xB0,");
        this.appendDummyInput()
            .appendField("\xB0 )");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_move_to_nb'] = function(block) {
    var variable_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.JavaScript.valueToCode(block, '1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_2 = Blockly.JavaScript.valueToCode(block, '2', Blockly.JavaScript.ORDER_ATOMIC);
    var value_3 = Blockly.JavaScript.valueToCode(block, '3', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'await '+variable_linkbot+'.moveToNB(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n'
    return code;
};

Blockly.Python['linkbotjs_move_to_nb'] = function(block) {
    var variable_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Python.valueToCode(block, '1', Blockly.Python.ORDER_ATOMIC);
    var value_2 = Blockly.Python.valueToCode(block, '2', Blockly.Python.ORDER_ATOMIC);
    var value_3 = Blockly.Python.valueToCode(block, '3', Blockly.Python.ORDER_ATOMIC);
    var code = variable_linkbot + '.move_to_nb(' + value_1 + ', ' + value_2 + ', ' + value_3 + ')\n';
    return code;
};

Blockly.Ch['linkbotjs_move_to_nb'] = function(block) {
    var variable_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Ch.valueToCode(block, '1', Blockly.Ch.ORDER_ATOMIC);
    var value_2 = Blockly.Ch.valueToCode(block, '2', Blockly.Ch.ORDER_ATOMIC);
    var value_3 = Blockly.Ch.valueToCode(block, '3', Blockly.Ch.ORDER_ATOMIC);
    var code = variable_linkbot + '.moveToNB(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n';
    return code;
};

Blockly.Cpp['linkbotjs_move_to_nb'] = function(block) {
    var variable_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Cpp.valueToCode(block, '1', Blockly.Cpp.ORDER_ATOMIC);
    var value_2 = Blockly.Cpp.valueToCode(block, '2', Blockly.Cpp.ORDER_ATOMIC);
    var value_3 = Blockly.Cpp.valueToCode(block, '3', Blockly.Cpp.ORDER_ATOMIC);
    var code = variable_linkbot + '.moveToNB(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n';
    return code;
};

Blockly.Blocks['linkbotjs_move'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Move (");
        this.appendValueInput("1")
            .setCheck("Number");
        this.appendValueInput("2")
            .setCheck("Number")
            .appendField("\xB0,");
        this.appendValueInput("3")
            .setCheck("Number")
            .appendField("\xB0,");
        this.appendDummyInput()
            .appendField("\xB0 )");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('Move a Linkbot\'s motors from their current positions');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_move'] = function(block) {
    var variable_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.JavaScript.valueToCode(block, '1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_2 = Blockly.JavaScript.valueToCode(block, '2', Blockly.JavaScript.ORDER_ATOMIC);
    var value_3 = Blockly.JavaScript.valueToCode(block, '3', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'await '+variable_linkbot+'.move(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n'
    return code;
};

Blockly.Python['linkbotjs_move'] = function(block) {
    var variable_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Python.valueToCode(block, '1', Blockly.Python.ORDER_ATOMIC);
    var value_2 = Blockly.Python.valueToCode(block, '2', Blockly.Python.ORDER_ATOMIC);
    var value_3 = Blockly.Python.valueToCode(block, '3', Blockly.Python.ORDER_ATOMIC);
    var code = variable_linkbot + '.move(' + value_1 + ', ' + value_2 + ', ' + value_3 + ')\n';
    return code;
};

Blockly.Ch['linkbotjs_move'] = function(block) {
    var variable_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Ch.valueToCode(block, '1', Blockly.Ch.ORDER_ATOMIC);
    var value_2 = Blockly.Ch.valueToCode(block, '2', Blockly.Ch.ORDER_ATOMIC);
    var value_3 = Blockly.Ch.valueToCode(block, '3', Blockly.Ch.ORDER_ATOMIC);
    var code = variable_linkbot + '.move(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n';
    return code;
};

Blockly.Cpp['linkbotjs_move'] = function(block) {
    var variable_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Cpp.valueToCode(block, '1', Blockly.Cpp.ORDER_ATOMIC);
    var value_2 = Blockly.Cpp.valueToCode(block, '2', Blockly.Cpp.ORDER_ATOMIC);
    var value_3 = Blockly.Cpp.valueToCode(block, '3', Blockly.Cpp.ORDER_ATOMIC);
    var code = variable_linkbot + '.move(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n';
    return code;
};

Blockly.Blocks['linkbotjs_move_nb'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Move (NB) (");
        this.appendValueInput("1")
            .setCheck("Number");
        this.appendValueInput("2")
            .setCheck("Number")
            .appendField("\xB0,");
        this.appendValueInput("3")
            .setCheck("Number")
            .appendField("\xB0,");
        this.appendDummyInput()
            .appendField("\xB0 )");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_move_nb'] = function(block) {
    var variable_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.JavaScript.valueToCode(block, '1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_2 = Blockly.JavaScript.valueToCode(block, '2', Blockly.JavaScript.ORDER_ATOMIC);
    var value_3 = Blockly.JavaScript.valueToCode(block, '3', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'await '+variable_linkbot+'.moveNB(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n'
    return code;
};

Blockly.Python['linkbotjs_move_nb'] = function(block) {
    var variable_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Python.valueToCode(block, '1', Blockly.Python.ORDER_ATOMIC);
    var value_2 = Blockly.Python.valueToCode(block, '2', Blockly.Python.ORDER_ATOMIC);
    var value_3 = Blockly.Python.valueToCode(block, '3', Blockly.Python.ORDER_ATOMIC);
    var code = variable_linkbot + '.move_nb(' + value_1 + ', ' + value_2 + ', ' + value_3 + ')\n';
    return code;
};

Blockly.Ch['linkbotjs_move_nb'] = function(block) {
    var variable_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Ch.valueToCode(block, '1', Blockly.Ch.ORDER_ATOMIC);
    var value_2 = Blockly.Ch.valueToCode(block, '2', Blockly.Ch.ORDER_ATOMIC);
    var value_3 = Blockly.Ch.valueToCode(block, '3', Blockly.Ch.ORDER_ATOMIC);
    var code = variable_linkbot + '.moveNB(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n';
    return code;
};

Blockly.Cpp['linkbotjs_move_nb'] = function(block) {
    var variable_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Cpp.valueToCode(block, '1', Blockly.Cpp.ORDER_ATOMIC);
    var value_2 = Blockly.Cpp.valueToCode(block, '2', Blockly.Cpp.ORDER_ATOMIC);
    var value_3 = Blockly.Cpp.valueToCode(block, '3', Blockly.Cpp.ORDER_ATOMIC);
    var code = variable_linkbot + '.moveNB(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n';
    return code;
};

Blockly.Blocks['linkbotjs_angular_speed'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Hub Speed (");
        this.appendValueInput("1").setCheck("Number");
        this.appendValueInput("2").setCheck("Number").appendField('\xB0/s, ');
        this.appendValueInput("3").setCheck("Number").appendField('\xB0/s, ');
        this.appendDummyInput().appendField("\xB0/s)");
        this.setInputsInline(true);
        this.setColour(210);
        this.setTooltip('Set a Linkbot\'s motor speeds');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setHelpUrl('http://www.example.com/');
    }
};


Blockly.JavaScript['linkbotjs_angular_speed'] = function(block) {
    var angle_x = Blockly.JavaScript.valueToCode(block, '1', Blockly.JavaScript.ORDER_ATOMIC);
    var angle_y = Blockly.JavaScript.valueToCode(block, '2', Blockly.JavaScript.ORDER_ATOMIC);
    var angle_z = Blockly.JavaScript.valueToCode(block, '3', Blockly.JavaScript.ORDER_ATOMIC);
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = 'await '+value_linkbot+'.setMotorSpeeds('+angle_x+', '+angle_y+', '+angle_z+');\n';
    return code;
};

Blockly.Python['linkbotjs_angular_speed'] = function(block) {
    var value_1 = Blockly.Python.valueToCode(block, '1', Blockly.Python.ORDER_ATOMIC);
    var value_2 = Blockly.Python.valueToCode(block, '2', Blockly.Python.ORDER_ATOMIC);
    var value_3 = Blockly.Python.valueToCode(block, '3', Blockly.Python.ORDER_ATOMIC);
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.set_joint_speeds(' + value_1 + ', '+value_2+', '+value_3+')\n';
    return code;
};

Blockly.Ch['linkbotjs_angular_speed'] = function(block) {
    var angle_x = Blockly.Ch.valueToCode(block, '1', Blockly.Ch.ORDER_ATOMIC);
    var angle_y = Blockly.Ch.valueToCode(block, '2', Blockly.Ch.ORDER_ATOMIC);
    var angle_z = Blockly.Ch.valueToCode(block, '3', Blockly.Ch.ORDER_ATOMIC);
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.setJointSpeeds('+angle_x+', '+angle_y+', '+angle_z+');\n';
    return code;
};

Blockly.Cpp['linkbotjs_angular_speed'] = function(block) {
    var angle_x = Blockly.Cpp.valueToCode(block, '1', Blockly.Cpp.ORDER_ATOMIC);
    var angle_y = Blockly.Cpp.valueToCode(block, '2', Blockly.Cpp.ORDER_ATOMIC);
    var angle_z = Blockly.Cpp.valueToCode(block, '3', Blockly.Cpp.ORDER_ATOMIC);
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var code = value_linkbot + '.setJointSpeeds('+angle_x+', '+angle_y+', '+angle_z+');\n';
    return code;
};

Blockly.Blocks['linkbotjs_move_joint'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Move")
            .appendField(new Blockly.FieldDropdown([["joint 1", "0"], ["joint 2", "1"], ["joint 3", "2"]]), "JOINT");
        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField("value (deg)");
        this.setColour(210);
        this.setTooltip('Move a single Linkbot motor');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_move_joint'] = function(block) {
    var dropdown_name = block.getFieldValue('JOINT');
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'await '+value_linkbot+'.move('+value_name+', '+value_name+', '+value_name+', 1<<'+dropdown_name+');\n';
    return code;
};


Blockly.Python['linkbotjs_move_joint'] = function(block) {
    var dropdown_name = block.getFieldValue('JOINT');
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    var moveValue = value_name;
    var code = value_linkbot + '.move_joint('+dropdown_name+', '+moveValue+')\n';
    return code
};

Blockly.Ch['linkbotjs_move_joint'] = function(block) {
    var dropdown_name = block.getFieldValue('JOINT');
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Ch.valueToCode(block, 'NAME', Blockly.Ch.ORDER_ATOMIC);
    var moveValue = value_name;
    var code = value_linkbot + '.moveJoint('+dropdown_name+', '+moveValue+');\n';
    return code
};

Blockly.Cpp['linkbotjs_move_joint'] = function(block) {
    var dropdown_name = block.getFieldValue('JOINT');
    var joint_names = {'0':'LINKBOT_JOINT_ONE', '1':'LINKBOT_JOINT_TWO', '2':'LINKBOT_JOINT_THREE'};
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Cpp.valueToCode(block, 'NAME', Blockly.Cpp.ORDER_ATOMIC);
    var moveValue = value_name;
    var code = value_linkbot + '.moveJoint('+joint_names[dropdown_name]+', '+moveValue+');\n';
    return code
};

Blockly.Blocks['linkbotjs_move_joint_nb'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Move (NB) ")
            .appendField(new Blockly.FieldDropdown([["joint 1", "0"], ["joint 2", "1"], ["joint 3", "2"]]), "JOINT");
        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField("value (deg)");
        this.setColour(210);
        this.setTooltip('');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_move_joint_nb'] = function(block) {
    var dropdown_name = block.getFieldValue('JOINT');
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'await '+value_linkbot+'.moveNB('+value_name+', '+value_name+', '+value_name+', 1<<'+dropdown_name+');\n';
    return code;
};


Blockly.Python['linkbotjs_move_joint_nb'] = function(block) {
    var dropdown_name = block.getFieldValue('JOINT');
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    var moveValue = value_name;
    var code = value_linkbot + '.move_joint_nb('+dropdown_name+', '+moveValue+')\n';
    return code
};

Blockly.Ch['linkbotjs_move_joint_nb'] = function(block) {
    var dropdown_name = block.getFieldValue('JOINT');
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Ch.valueToCode(block, 'NAME', Blockly.Ch.ORDER_ATOMIC);
    var moveValue = value_name;
    var code = value_linkbot + '.moveJointNB('+dropdown_name+', '+moveValue+');\n';
    return code
};

Blockly.Cpp['linkbotjs_move_joint_nb'] = function(block) {
    var dropdown_name = block.getFieldValue('JOINT');
    var joint_names = {'0':'LINKBOT_JOINT_ONE', '1':'LINKBOT_JOINT_TWO', '2':'LINKBOT_JOINT_THREE'};
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Cpp.valueToCode(block, 'NAME', Blockly.Cpp.ORDER_ATOMIC);
    var moveValue = value_name;
    var code = value_linkbot + '.moveJointNB('+joint_names[dropdown_name]+', '+moveValue+');\n';
    return code
};

Blockly.Blocks['linkbotjs_motor_power'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Power (-255, 255) (");
        this.appendValueInput("1")
            .setCheck("Number");
        this.appendValueInput("2")
            .setCheck("Number");
        this.appendValueInput("3")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_motor_power'] = function(block) {
    var variable_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.JavaScript.valueToCode(block, '1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_2 = Blockly.JavaScript.valueToCode(block, '2', Blockly.JavaScript.ORDER_ATOMIC);
    var value_3 = Blockly.JavaScript.valueToCode(block, '3', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'await ' + variable_linkbot + '.setMotorPowers(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n';
    return code;
};

Blockly.Python['linkbotjs_motor_power'] = function(block) {
    var variable_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Python.valueToCode(block, '1', Blockly.Python.ORDER_ATOMIC);
    var value_2 = Blockly.Python.valueToCode(block, '2', Blockly.Python.ORDER_ATOMIC);
    var value_3 = Blockly.Python.valueToCode(block, '3', Blockly.Python.ORDER_ATOMIC);
    var code = variable_linkbot + '.set_motor_powers(' + value_1 + ', ' + value_2 + ', ' + value_3 + ')\n';
    return code;
};

Blockly.Ch['linkbotjs_motor_power'] = function(block) {
    var variable_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Ch.valueToCode(block, '1', Blockly.Ch.ORDER_ATOMIC);
    var value_2 = Blockly.Ch.valueToCode(block, '2', Blockly.Ch.ORDER_ATOMIC);
    var value_3 = Blockly.Ch.valueToCode(block, '3', Blockly.Ch.ORDER_ATOMIC);
    var code = variable_linkbot + '.setMotorPowers(' + value_1 + '/255.0, ' + value_2 + '/255.0, ' + value_3 + '/255.0);\n';
    return code;
};

Blockly.Cpp['linkbotjs_motor_power'] = function(block) {
    var variable_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.Cpp.valueToCode(block, '1', Blockly.Cpp.ORDER_ATOMIC);
    var value_2 = Blockly.Cpp.valueToCode(block, '2', Blockly.Cpp.ORDER_ATOMIC);
    var value_3 = Blockly.Cpp.valueToCode(block, '3', Blockly.Cpp.ORDER_ATOMIC);
    var code = variable_linkbot + '.setMotorPowers(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n';
    return code;
};

Blockly.Blocks['linkbotjs_repeat_loop_delay'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("repeat");
        this.appendValueInput("TIMES")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField("times, delay");
        this.appendValueInput("DELAY")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("second(s)");
        this.appendStatementInput("INPUT")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_repeat_loop_delay'] = function(block) {
    var value_times = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
    var value_delay = Blockly.JavaScript.valueToCode(block, 'DELAY', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_input = Blockly.JavaScript.statementToCode(block, 'INPUT');
    var indent = Blockly.JavaScript.INDENT;
    var code = '(function() {\n'
        + indent + 'var t = ' + value_times + ';\n'
        + indent + 'function f() {\n'
        + indent + statements_input + '\n'
        + indent + indent + 't--;\n'
        + indent + indent + 'if (t > 0) { setTimeout(f, ' + (value_delay * 1000) + '); }\n'
        + indent +'}\n'
        + indent + 'setTimeout(f, ' + (value_delay * 1000) + ');\n'
        + '})();\n';
    return code;
};

Blockly.Python['linkbotjs_repeat_loop_delay'] = function(block) {
    var value_times = Blockly.Python.valueToCode(block, 'TIMES', Blockly.Python.ORDER_ATOMIC);
    var value_delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.Python.ORDER_ATOMIC);
    var statements_input = Blockly.Python.statementToCode(block, 'INPUT');
    var code = "for count in range (" + value_times + "):\n";
    code += statements_input;
    code += Blockly.Python.INDENT + 'time.sleep(' + value_delay + ')\n';
    return code;
};

Blockly.Ch['linkbotjs_repeat_loop_delay'] = function(block) {
    var value_times = Blockly.Ch.valueToCode(block, 'TIMES', Blockly.Ch.ORDER_ATOMIC);
    var value_delay = Blockly.Ch.valueToCode(block, 'DELAY', Blockly.Ch.ORDER_ATOMIC);
    var statements_input = Blockly.Ch.statementToCode(block, 'INPUT');
    var code = "for count in range (" + value_times + "):\n";
    code += statements_input;
    code += Blockly.Ch.INDENT + 'time.sleep(' + value_delay + ')\n';
    return code;
};

Blockly.Cpp['linkbotjs_repeat_loop_delay'] = function(block) {
    var value_times = Blockly.Cpp.valueToCode(block, 'TIMES', Blockly.Cpp.ORDER_ATOMIC);
    var value_delay = Blockly.Cpp.valueToCode(block, 'DELAY', Blockly.Cpp.ORDER_ATOMIC);
    var statements_input = Blockly.Cpp.statementToCode(block, 'INPUT');
    var code = "for count in range (" + value_times + "):\n";
    code += statements_input;
    code += Blockly.Cpp.INDENT + 'time.sleep(' + value_delay + ')\n';
    return code;
};

Blockly.Blocks['linkbotjs_while_loop_delay'] = {
    init: function() {
        this.appendValueInput("LOOP")
            .setCheck("Boolean")
            .appendField("repeat")
            .appendField(new Blockly.ieldDropdown([["while", "WHILE"], ["until", "UNTIL"]]), "TYPE");
        this.appendValueInput("DELAY")
            .setCheck("Number")
            .appendField("delay (seconds)");
        this.appendStatementInput("DO")
            .setCheck(null)
            .appendField("do");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_while_loop_delay'] = function(block) {
    var dropdown_type = block.getFieldValue('TYPE');
    var value_loop = Blockly.JavaScript.valueToCode(block, 'LOOP', Blockly.JavaScript.ORDER_ATOMIC);
    var value_delay = Blockly.JavaScript.valueToCode(block, 'DELAY', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
    var indent = Blockly.JavaScript.INDENT;
    if (typeof value_loop === 'undefined' || value_loop === null || value_loop === '') {
        value_loop = 'false';
    }
    var evalStatement = (dropdown_type === 'WHILE') ? 'if (' + value_loop + ') { ' : 'if (!' + value_loop + ') { ';
    evalStatement += 'setTimeout(f, ' + (value_delay * 1000) + '); }\n';
    var code = '(function() {\n'
        + indent + 'function f() {\n'
        + indent + statements_do + '\n'
        + indent + indent + evalStatement
        + indent +'}\n'
        + indent + 'setTimeout(f, ' + (value_delay * 1000) + ');\n'
        + '})();\n';
    return code;
};

Blockly.Python['linkbotjs_while_loop_delay'] = function(block) {
    var dropdown_type = block.getFieldValue('TYPE');
    var value_loop = Blockly.Python.valueToCode(block, 'LOOP', Blockly.Python.ORDER_ATOMIC);
    var value_delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.Python.ORDER_ATOMIC);
    var statements_do = Blockly.Python.statementToCode(block, 'DO');
    // TODO: Assemble Python into code variable.
    if (typeof value_loop === 'undefined' || value_loop === null || value_loop === '') {
        value_loop = 'False';
    }
    var loopType = (dropdown_type === 'WHILE') ? 'while' : 'while not';
    var code = loopType + ' ' + value_loop +':\n';
    code += statements_do;
    code += Blockly.Python.INDENT + 'time.sleep(' + value_delay + ')\n';
    return code;
};

Blockly.Ch['linkbotjs_while_loop_delay'] = function(block) {
    var dropdown_type = block.getFieldValue('TYPE');
    var value_loop = Blockly.Ch.valueToCode(block, 'LOOP', Blockly.Ch.ORDER_ATOMIC);
    var value_delay = Blockly.Ch.valueToCode(block, 'DELAY', Blockly.Ch.ORDER_ATOMIC);
    var statements_do = Blockly.Ch.statementToCode(block, 'DO');
    // TODO: Assemble Ch into code variable.
    if (typeof value_loop === 'undefined' || value_loop === null || value_loop === '') {
        value_loop = 'False';
    }
    var loopType = (dropdown_type === 'WHILE') ? 'while' : 'while not';
    var code = loopType + ' ' + value_loop +':\n';
    code += statements_do;
    code += Blockly.Ch.INDENT + 'time.sleep(' + value_delay + ')\n';
    return code;
};

Blockly.Cpp['linkbotjs_while_loop_delay'] = function(block) {
    var dropdown_type = block.getFieldValue('TYPE');
    var value_loop = Blockly.Cpp.valueToCode(block, 'LOOP', Blockly.Cpp.ORDER_ATOMIC);
    var value_delay = Blockly.Cpp.valueToCode(block, 'DELAY', Blockly.Cpp.ORDER_ATOMIC);
    var statements_do = Blockly.Cpp.statementToCode(block, 'DO');
    // TODO: Assemble Cpp into code variable.
    if (typeof value_loop === 'undefined' || value_loop === null || value_loop === '') {
        value_loop = 'False';
    }
    var loopType = (dropdown_type === 'WHILE') ? 'while' : 'while not';
    var code = loopType + ' ' + value_loop +':\n';
    code += statements_do;
    code += Blockly.Cpp.INDENT + 'time.sleep(' + value_delay + ')\n';
    return code;
};

Blockly.Blocks['linkbotjs_get_joint_angle'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Get angle:")
            .appendField(new Blockly.FieldDropdown([["joint 1", "0"], ["joint 2", "1"], ["joint 3", "2"]]), "JOINT");
        this.setColour(210);
        this.setTooltip('');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setHelpUrl('http://www.example.com/');
        this.setOutput(true, 'Number');
    }
};

Blockly.JavaScript['linkbotjs_get_joint_angle'] = function(block) {
    var variable_robot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var text_joint_id = block.getFieldValue('JOINT');
    var code = 'await '+variable_robot+'.getJointAngle('+text_joint_id+')';
    //var code = variable_robot + '.getJointAngles().then( function(_angles) { return Promise.resolve(_angles['+text_joint_id+']); })';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Python['linkbotjs_get_joint_angle'] = function(block) {
    var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var text_joint_id = block.getFieldValue('JOINT');
    var code = variable_robot + '.get_joint_angle('+text_joint_id+')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Cpp['linkbotjs_get_joint_angle'] = function(block) {
    return ['0; // Warning: Blockly is unable to generate C++ code for "getJointAngles()"', Blockly.Cpp.ORDER_ATOMIC];
};

Blockly.Ch['linkbotjs_get_joint_angle'] = function(block) {
    return ['0; // Warning: Blockly is unable to generate Ch code for "getJointAngles()"', Blockly.Ch.ORDER_ATOMIC];
};

Blockly.Blocks['linkbotjs_get_accelerometer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Get Accelerometer Data:")
            .appendField(new Blockly.FieldDropdown([["X axis", "0"], ["Y Axis", "1"], ["Z Axis", "2"]]), "AXIS");
        this.setColour(210);
        this.setTooltip('');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setHelpUrl('http://www.example.com/');
        this.setOutput(true, 'Number');
    }
};

Blockly.JavaScript['linkbotjs_get_accelerometer'] = function(block) {
    var variable_robot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var text_axis = block.getFieldValue('AXIS');
    //var code = variable_robot + '.getAccelerometer().then( function(_accels) { return Promise.resolve(_accels['+text_axis+']); })';
    var code = '(await '+variable_robot+'.getAccelerometer())['+text_axis+']';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Python['linkbotjs_get_accelerometer'] = function(block) {
    var variable_robot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var text_axis = block.getFieldValue('AXIS');
    var code = variable_robot + '.get_accelerometer()['+text_axis+']';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Cpp['linkbotjs_get_accelerometer'] = function(block) {
    return ['0; // Warning: Blockly is unable to generate C++ code for "getAccelerometer()"', Blockly.Cpp.ORDER_ATOMIC];
};

Blockly.Ch['linkbotjs_get_accelerometer'] = function(block) {
    return ['0; // Warning: Blockly is unable to generate Ch code for "getAccelerometer()"', Blockly.Ch.ORDER_ATOMIC];
};

Blockly.Blocks['linkbotjs_button_events'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("On button event");
        var button = new Blockly.FieldVariable("button");
        button.typeInfo = 'Integer';
        this.appendDummyInput()
            .appendField("Button #:")
            .appendField(button, "BUTTON")
            .setAlign(Blockly.ALIGN_RIGHT);
        var state = new Blockly.FieldVariable("state");
        state.typeInfo = 'Integer';
        this.appendDummyInput()
            .appendField("Button state (up or down):")
            .appendField(state, "STATE")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendStatementInput("STATEMENTS")
            .setCheck(null)
            .appendField("onEvent");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_button_events'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_button = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('BUTTON'), Blockly.Variables.NAME_TYPE);
    var value_state = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('STATE'), Blockly.Variables.NAME_TYPE);
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.JavaScript.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    
    var code = 'await '+value_linkbot+'.setButtonHandler( async function(__button, __state, __timestamp) {\n';
    if (typeof value_button !== "undefined" && value_button !== null && value_button !== '') {
        code += indent + value_button + ' = __button;\n';
    }
    if (typeof value_state !== "undefined" && value_state !== null && value_state !== '') {
        code += indent + value_state + ' = __state;\n';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        code += statements_statements ;
    }
    code += '});\n';

    return code;
};

Blockly.Python['linkbotjs_button_events'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_button = Blockly.Python.variableDB_.getName(block.getFieldValue('BUTTON'), Blockly.Variables.NAME_TYPE);
    var value_state = Blockly.Python.variableDB_.getName(block.getFieldValue('STATE'), Blockly.Variables.NAME_TYPE);
    var statements_statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.Python.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var definition = '\ndef button_event_callback(n_cb,state_cb,timestamp_cb):\n';
    var body = '';
    var callbackdef = indent + 'global ';
    var code = value_linkbot + '.buttons.set_event_handler(button_event_callback)\n';
    if (typeof value_button !== "undefined" && value_button !== null && value_button !== '') {
        body += indent + value_button + ' = n_cb\n';
        callbackdef += value_button + ',';
    }
    if (typeof value_state !== "undefined" && value_state !== null && value_state !== '') {
        body += indent + value_state + ' = state_cb\n';
        callbackdef += value_state + ',';
    }
    if (callbackdef === indent + 'global ') {
        return '';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        body += statements_statements;
    }
    code = definition + callbackdef.substring(0, callbackdef.length - 1) + '\n' + body + '\n' + code;
    return code;
};

Blockly.Ch['linkbotjs_button_events'] = function(block) {
    return "// FIXME: Ch does not currently support button events.\n";
}

Blockly.Cpp['linkbotjs_button_events'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_button = Blockly.Cpp.variableDB_.getName(block.getFieldValue('BUTTON'), Blockly.Variables.NAME_TYPE);
    var value_state = Blockly.Cpp.variableDB_.getName(block.getFieldValue('STATE'), Blockly.Variables.NAME_TYPE);
    var statements_statements = Blockly.Cpp.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.Cpp.INDENT;

    var code = value_linkbot + '.setButtonEventCallback( [&] (LinkbotButton _button, LinkbotButtonState _state, int _timestamp) {\n';
    if (typeof value_button !== "undefined" && value_button !== null && value_button !== '') {
        code += indent + value_button + ' = int(_button);\n';
    }
    if (typeof value_state !== "undefined" && value_state !== null && value_state !== '') {
        code += indent + value_state + ' = int(_state);\n';
    }
    code += statements_statements;
    code += '});\n';
    return code;
}

Blockly.Blocks['linkbotjs_encoder_events'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("On encoder event");
        this.appendDummyInput()
            .appendField("Encoder #:")
            .appendField(new Blockly.FieldVariable("encoder"), "ENCODER")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField("angle (deg):")
            .appendField(new Blockly.FieldVariable("angle"), "ANGLE")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField("timestamp (s):")
            .appendField(new Blockly.FieldVariable("timestamp"), "TIMESTAMP")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendStatementInput("STATEMENTS")
            .setCheck(null)
            .appendField("onEvent");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_encoder_events'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_encoder = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ENCODER'), Blockly.Variables.NAME_TYPE);
    var value_angle = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ANGLE'), Blockly.Variables.NAME_TYPE);
    var value_timestamp = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TIMESTAMP'), Blockly.Variables.NAME_TYPE);
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.JavaScript.INDENT;

    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var code = '.then( function() { return '+value_linkbot+'.on(\'encoderEvent\', function(event) {\n';
    if (typeof value_encoder !== "undefined" && value_encoder !== null && value_encoder !== '') {
        code += indent + value_encoder + ' = event.encoder;\n';
    }
    if (typeof value_angle !== "undefined" && value_angle !== null && value_angle !== '') {
        code += indent + value_angle + ' = event.value * (180/Math.PI);\n';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        code += indent + value_timestamp + ' = event.timestamp / 1000;\n';
    }
    code += indent + 'Promise.resolve()\n';
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        code += statements_statements + '\n';
    }
    code += indent + '.catch(function(err) { console.log(err); });\n';
    code += '}) })\n';
    return code;
};

Blockly.Python['linkbotjs_encoder_events'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_encoder = Blockly.Python.variableDB_.getName(block.getFieldValue('ENCODER'), Blockly.Variables.NAME_TYPE);
    var value_angle = Blockly.Python.variableDB_.getName(block.getFieldValue('ANGLE'), Blockly.Variables.NAME_TYPE);
    var value_timestamp = Blockly.Python.variableDB_.getName(block.getFieldValue('TIMESTAMP'), Blockly.Variables.NAME_TYPE);
    var statements_statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.Python.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var definition = '\ndef encoder_event_callback(encoder_cb,angle_cb,timestamp_cb):\n';
    var body = '';
    var code = value_linkbot + '.motors.set_event_handler(encoder_event_callback)\n';
    if (typeof value_encoder !== "undefined" && value_encoder !== null && value_encoder !== '') {
        body += indent + value_encoder + ' = encoder_cb\n';
    }
    if (typeof value_angle !== "undefined" && value_angle !== null && value_angle !== '') {
        body += indent + value_angle + ' = angle_cb\n';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        body += indent + value_timestamp + ' = timestamp_cb\n';
    }
    // First, add a 'global' statement for every variable that is assigned.
    // Taken from blockly/generators/python/procedures.js
    var globals = Blockly.Variables.allVariables(block);
    for (var i = globals.length - 1; i >= 0; i--) {
      var varName = globals[i];
        globals[i] = Blockly.Python.variableDB_.getName(varName,
            Blockly.Variables.NAME_TYPE);
    }
    globals = globals.length ? indent + 'global ' + globals.join(', ') + '\n' : '';

    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        body += statements_statements;
    }
    code = definition + '\n' + globals + '\n' + body + '\n' + code;
    return code;
};

Blockly.Ch['linkbotjs_encoder_events'] = function(block) {
    return "// FIXME: Ch does not currently support encoder events.\n";
}

Blockly.Cpp['linkbotjs_encoder_events'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_encoder = Blockly.Cpp.variableDB_.getName(block.getFieldValue('ENCODER'), Blockly.Variables.NAME_TYPE);
    var value_angle = Blockly.Cpp.variableDB_.getName(block.getFieldValue('ANGLE'), Blockly.Variables.NAME_TYPE);
    var value_timestamp = Blockly.Cpp.variableDB_.getName(block.getFieldValue('TIMESTAMP'), Blockly.Variables.NAME_TYPE);
    var statements_statements = Blockly.Cpp.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.Cpp.INDENT;

    var code = value_linkbot + '.setEncoderEventCallback( [&] (int _joint, double _angle, int _timestamp) {\n';
    if (typeof value_encoder !== "undefined" && value_encoder !== null && value_encoder !== '') {
        code += indent + value_encoder + ' = _joint;\n';
    }
    if (typeof value_angle !== "undefined" && value_angle !== null && value_angle !== '') {
        code += indent + value_angle + ' = _angle;\n';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        code += indent + value_timestamp + ' = _timestamp;\n';
    }
    code += statements_statements;
    code += '\n}, 2.0);\n';
    return code;
}

Blockly.Blocks['linkbotjs_accelerometer_events'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("On accelerometer event");
        this.appendDummyInput()
            .appendField("x (G's)")
            .appendField(new Blockly.FieldVariable("x"), "X")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField("y (G's)")
            .appendField(new Blockly.FieldVariable("y"), "Y")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField("z (G's)")
            .appendField(new Blockly.FieldVariable("z"), "Z")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField("timestamp (s)")
            .appendField(new Blockly.FieldVariable("timestamp"), "TIMESTAMP")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendStatementInput("STATEMENTS")
            .setCheck(null)
            .appendField("onEvent");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_accelerometer_events'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_x = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('X'), Blockly.Variables.NAME_TYPE);
    var value_y = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('Y'), Blockly.Variables.NAME_TYPE);
    var value_z = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('Z'), Blockly.Variables.NAME_TYPE);
    var value_timestamp = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TIMESTAMP'), Blockly.Variables.NAME_TYPE);
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.JavaScript.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    
    var code = 'await '+value_linkbot+'.setAccelerometerHandler( async function(__x, __y, __z, __timestamp) {\n';
    if (typeof value_x !== "undefined" && value_x !== null && value_x !== '') {
        code += indent + value_x + ' = __x;\n';
    }
    if (typeof value_y !== "undefined" && value_y !== null && value_y !== '') {
        code += indent + value_y + ' = __y;\n';
    }
    if (typeof value_z !== "undefined" && value_z !== null && value_z !== '') {
        code += indent + value_z + ' = __z;\n';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        code += indent + value_timestamp + ' = __timestamp;\n';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        code += statements_statements + '\n';
    }
    code += '});\n';

/*
    var code = '.then( function() { return '+ value_linkbot + '.on(\'accelerometerEvent\', function(event) {\n';
    if (typeof value_x !== "undefined" && value_x !== null && value_x !== '') {
        code += indent + value_x + ' = event.x;\n';
    }
    if (typeof value_y !== "undefined" && value_y !== null && value_y !== '') {
        code += indent + value_y + ' = event.y;\n';
    }
    if (typeof value_z !== "undefined" && value_z !== null && value_z !== '') {
        code += indent + value_z + ' = event.z;\n';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        code += indent + value_timestamp + ' = event.timestamp;\n';
    }
    code += indent + 'Promise.resolve()\n';
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        code += statements_statements + '\n';
    }
    code += indent + '.catch(function(err) { console.log(err); });\n';
    code += '}) })\n';
    */
    return code;
};

Blockly.Python['linkbotjs_accelerometer_events'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_x = Blockly.Python.variableDB_.getName(block.getFieldValue('X'), Blockly.Variables.NAME_TYPE);
    var value_y = Blockly.Python.variableDB_.getName(block.getFieldValue('Y'), Blockly.Variables.NAME_TYPE);
    var value_z = Blockly.Python.variableDB_.getName(block.getFieldValue('Z'), Blockly.Variables.NAME_TYPE);
    var value_timestamp = Blockly.Python.variableDB_.getName(block.getFieldValue('TIMESTAMP'), Blockly.Variables.NAME_TYPE);
    var statements_statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.Python.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var definition = '\ndef accelerometer_event_callback(x_cb,y_cb,z_cb,timestamp_cb):\n';
    var body = '';
    var callbackdef = indent + 'global ';
    var code = value_linkbot + '.accelerometer.set_event_handler(accelerometer_event_callback)\n';
    if (typeof value_x !== "undefined" && value_x !== null && value_x !== '') {
        body += indent + value_x + ' = x_cb\n';
        callbackdef += value_x + ',';
    }
    if (typeof value_y !== "undefined" && value_y !== null && value_y !== '') {
        body += indent + value_y + ' = y_cb\n';
        callbackdef += value_y + ',';
    }
    if (typeof value_z !== "undefined" && value_z !== null && value_z !== '') {
        body += indent + value_z + ' = z_cb\n';
        callbackdef += value_z + ',';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        body += indent + value_timestamp + ' = timestamp_cb\n';
        callbackdef += value_timestamp + ',';
    }
    if (callbackdef === indent + 'global ') {
        return '';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        body += statements_statements;
    }
    code = definition + callbackdef.substring(0, callbackdef.length - 1) + '\n' + body + '\n' + code;
    return code;
};

Blockly.Ch['linkbotjs_accelerometer_events'] = function(block) {
    return "// FIXME: Ch does not currently support accelerometer events.\n";
};

Blockly.Cpp['linkbotjs_accelerometer_events'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_x = Blockly.Cpp.variableDB_.getName(block.getFieldValue('X'), Blockly.Variables.NAME_TYPE);
    var value_y = Blockly.Cpp.variableDB_.getName(block.getFieldValue('Y'), Blockly.Variables.NAME_TYPE);
    var value_z = Blockly.Cpp.variableDB_.getName(block.getFieldValue('Z'), Blockly.Variables.NAME_TYPE);
    var value_timestamp = Blockly.Cpp.valueToCode(block, 'TIMESTAMP', Blockly.Cpp.ORDER_ATOMIC);
    var statements_statements = Blockly.Cpp.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.Cpp.INDENT;

    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var code = value_linkbot + '.setAccelerometerEventCallback( [&] (double _x, double _y, double _z, int _timestamp) {\n';

    if (typeof value_x !== "undefined" && value_x !== null && value_x !== '') {
        code += value_x + ' = _x;\n';
    }

    if (typeof value_y !== "undefined" && value_y !== null && value_y !== '') {
        code += value_y + ' = _y;\n';
    }

    if (typeof value_z !== "undefined" && value_z !== null && value_z !== '') {
        code += value_z + ' = _z;\n';
    }

    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        code += value_timestamp + ' = _timestamp;\n';
    }

    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        code += statements_statements;
    }
    code += '\n});';
    return code;
};

Blockly.Blocks['linkbotjs_joint_events'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("joint event");
        this.appendValueInput("LINKBOT")
            .setCheck(null)
            .appendField("linkbot");
        this.appendValueInput("JOINT")
            .setCheck("Number")
            .appendField("joint #");
        this.appendValueInput("STATE")
            .setCheck("Number")
            .appendField("state");
        this.appendValueInput("TIMESTAMP")
            .setCheck("Number")
            .appendField("timestamp");
        this.appendStatementInput("STATEMENTS")
            .setCheck(null)
            .appendField("onEvent");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(false);
        this.setColour(30);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_joint_events'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_joint = Blockly.JavaScript.valueToCode(block, 'JOINT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_state = Blockly.JavaScript.valueToCode(block, 'STATE', Blockly.JavaScript.ORDER_ATOMIC);
    var value_timestamp = Blockly.JavaScript.valueToCode(block, 'TIMESTAMP', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.JavaScript.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var code = value_linkbot + '.on(\'jointEvent\', function(event) {\n';
    if (typeof value_joint !== "undefined" && value_joint !== null && value_joint !== '') {
        code += indent + value_joint + ' = event.joint;\n';
    }
    if (typeof value_state !== "undefined" && value_state !== null && value_state !== '') {
        code += indent + value_state + ' = event.state;\n';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        code += indent + value_timestamp + ' = event.timestamp;\n';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        code += statements_statements + '\n';
    }
    code += '});\n';
    return code;
};

Blockly.Python['linkbotjs_joint_events'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var value_joint = Blockly.Python.valueToCode(block, 'JOINT', Blockly.Python.ORDER_ATOMIC);
    var value_state = Blockly.Python.valueToCode(block, 'STATE', Blockly.Python.ORDER_ATOMIC);
    var value_timestamp = Blockly.Python.valueToCode(block, 'TIMESTAMP', Blockly.Python.ORDER_ATOMIC);
    var statements_statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.Python.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var definition = 'def joint_event_callback(encoder_cb,angle_cb,timestamp_cb):\n';
    var body = '';
    var callbackdef = indent + 'global ';
    var code = value_linkbot + '.enable_joint_events(joint_event_callback)\n';
    if (typeof value_joint !== "undefined" && value_joint !== null && value_joint !== '') {
        body += indent + value_joint + ' = encoder_cb\n';
        callbackdef += value_joint + ',';
    }
    if (typeof value_state !== "undefined" && value_state !== null && value_state !== '') {
        body += indent + value_state + ' = angle_cb\n';
        callbackdef += value_state + ',';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        body += indent + value_timestamp + ' = timestamp_cb\n';
        callbackdef += value_state + ',';
    }
    if (callbackdef === indent + 'global ') {
        return '';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        body += statements_statements;
    }
    code = definition + callbackdef.substring(0, callbackdef.length - 1) + '\n' + body + '\n' + code;
    return code;
};


Blockly.Blocks['simulator_setlocation'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField(".setPosition(");
        this.appendValueInput("X")
            .appendField("x");
        this.appendValueInput("Y")
            .appendField(", y");
        this.appendDummyInput()
            .appendField(", ")
            .appendField(new Blockly.FieldAngle(90), "ROTATION")
            .appendField(")");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(345);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['simulator_setlocation'] = function(block) {
    var variable_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    var angle_rotation = block.getFieldValue('ROTATION');
    var code = variable_linkbot + '.setPosition(' + value_x + ', ' + value_y + ', ' + angle_rotation + ');\n';

    var code = '.then( function() { \n' +
        '    return ' + variable_linkbot + '.setPosition(' + value_x + ', ' + value_y + ', ' + angle_rotation + ');\n' +
        '})\n';

    return code;
};

Blockly.Python['simulator_setlocation'] = function(block) {
    return '';
};

Blockly.Blocks['simulator_resetlines'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("reset simulator lines");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(345);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['simulator_resetlines'] = function(block) {
    var code = '.then( function() { return simulator.resetLines(); })\n';
    return code;
};
Blockly.Python['simulator_resetlines'] = function(block) {
    return '';
};
// 2WD Category Functions

Blockly.Blocks['linkbotjs_drive_distance'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Drive distance");
        this.appendValueInput("DISTANCE")
            .setCheck("Number")
            .appendField("Distance");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_drive_distance'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);

    var moveValue = value_distance + '*(Math.PI/180) / ('+value_linkbot+'.wheelDiameter/2)';
    var negMoveValue = '-1*'+value_distance + '*(Math.PI/180) / ('+value_linkbot+'.wheelDiameter/2)';
    var code = 'await '+value_linkbot+'.driveDistance('+value_distance+');\n';
    return code;
};

Blockly.Python['linkbotjs_drive_distance'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_distance = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.drive_distance('+value_distance+', '+value_linkbot+'.wheel_diameter/2.0)\n';
    return code;
};

Blockly.Ch['linkbotjs_drive_distance'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_distance = Blockly.Ch.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.driveDistance('+value_distance+', '+value_linkbot+'_wheelDiameter/2.0);\n';
    return code;
};

Blockly.Cpp['linkbotjs_drive_distance'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_distance = Blockly.Cpp.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.driveDistance('+value_distance+', '+value_linkbot+'_wheelDiameter/2.0);\n';
    return code;
};

Blockly.Blocks['linkbotjs_drive_distance_nb'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Drive distance (NB)");
        this.appendValueInput("DISTANCE")
            .setCheck("Number")
            .appendField("Distance");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_drive_distance_nb'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'await '+value_linkbot+'.driveDistanceNB('+value_distance+');\n';
    return code;
};

Blockly.Python['linkbotjs_drive_distance_nb'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_distance = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.drive_distance_nb('+value_distance+', '+value_linkbot+'.wheel_diameter/2.0)\n';

    return code;
};

Blockly.Ch['linkbotjs_drive_distance_nb'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_distance = Blockly.Ch.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.driveDistanceNB('+value_distance+', '+value_linkbot+'_wheelDiameter/2.0);\n';
    return code;
};

Blockly.Cpp['linkbotjs_drive_distance_nb'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_distance = Blockly.Cpp.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.driveDistanceNB('+value_distance+', '+value_linkbot+'_wheelDiameter/2.0);\n';
    return code;
};

Blockly.Blocks['linkbotjs_set_wheel_diameter'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Set wheel diameter");
        this.appendValueInput("DIAMETER")
            .setCheck("Number")
            .appendField("Diameter");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('Units should match units used for "Drive distance".');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_set_wheel_diameter'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_diameter = Blockly.JavaScript.valueToCode(block, 'DIAMETER', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot+'.wheelDiameter = '+value_diameter+';\n';
    return code;
};

Blockly.Python['linkbotjs_set_wheel_diameter'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_diameter = Blockly.Python.valueToCode(block, 'DIAMETER', Blockly.JavaScript.ORDER_ATOMIC);

    var code = value_linkbot + '.wheel_diameter = ' + value_diameter + '\n';
    return code;
};

Blockly.Ch['linkbotjs_set_wheel_diameter'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_diameter = Blockly.Ch.valueToCode(block, 'DIAMETER', Blockly.JavaScript.ORDER_ATOMIC);

    var code = value_linkbot + '_wheelDiameter = ' + value_diameter + ';\n';
    return code;
};

Blockly.Cpp['linkbotjs_set_wheel_diameter'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_diameter = Blockly.Cpp.valueToCode(block, 'DIAMETER', Blockly.JavaScript.ORDER_ATOMIC);

    var code = value_linkbot + '_wheelDiameter = ' + value_diameter + ';\n';
    return code;
};

// Turn a 2WD Linkbot X number of degrees (to the left)
Blockly.Blocks['linkbotjs_turn_2wd'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Turn angle");
        this.appendValueInput("DEGREES")
            .setCheck("Number")
            .appendField("Degrees");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_turn_2wd'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'await '+value_linkbot+'.turnAngle('+value_degrees+');\n';
    return code;
};

Blockly.Python['linkbotjs_turn_2wd'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_degrees = Blockly.Python.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.turn_angle('+value_degrees+', '+value_linkbot+'.wheel_diameter/2.0, '+value_linkbot+'.track_width)\n';
    return code;
};

Blockly.Ch['linkbotjs_turn_2wd'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_degrees = Blockly.Ch.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);

    var moveValue = value_linkbot+'.trackWidth*-1*'+value_degrees+'*(math.pi/180)/'+value_linkbot+'.wheelDiameter';
    var m3moveValue = value_linkbot+'.trackWidth*-1*'+value_degrees+'*(math.pi/180)/'+value_linkbot+'.wheelDiameter';
    var code = value_linkbot + '.move(\n' + 
               '    ' + moveValue + ',\n' + 
               '    0,\n' + 
               '    ' + m3moveValue + ')\n';
    var code = value_linkbot + '.turnLeft('+value_degrees+', '+value_linkbot+'_wheelDiameter/2.0, '+value_linkbot+'_trackWidth);\n';
    return code;
};

Blockly.Cpp['linkbotjs_turn_2wd'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_degrees = Blockly.Cpp.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);

    var moveValue = value_linkbot+'.trackWidth*-1*'+value_degrees+'*(math.pi/180)/'+value_linkbot+'.wheelDiameter';
    var m3moveValue = value_linkbot+'.trackWidth*-1*'+value_degrees+'*(math.pi/180)/'+value_linkbot+'.wheelDiameter';
    var code = value_linkbot + '.move(\n' + 
               '    ' + moveValue + ',\n' + 
               '    0,\n' + 
               '    ' + m3moveValue + ')\n';
    var code = value_linkbot + '.turnLeft('+value_degrees+', '+value_linkbot+'_wheelDiameter/2.0, '+value_linkbot+'_trackWidth);\n';
    return code;
};


Blockly.Blocks['linkbotjs_turn_2wd_nb'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Turn angle (NB)");
        this.appendValueInput("DEGREES")
            .setCheck("Number")
            .appendField("Degrees");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_turn_2wd_nb'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);

    var moveValue = value_linkbot+'.trackWidth*-1*'+value_degrees+'*(Math.PI/180)/'+value_linkbot+'.wheelDiameter';
    var code = 'await '+value_linkbot+'.turnAngleNB('+value_degrees+');\n';
    return code;
};

Blockly.Python['linkbotjs_turn_2wd_nb'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_degrees = Blockly.Python.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.turn_angle_nb('+value_degrees+', '+value_linkbot+'.wheel_diameter/2.0, '+value_linkbot+'.track_width)\n';
    return code;
};

Blockly.Ch['linkbotjs_turn_2wd_nb'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_degrees = Blockly.Ch.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);

    var moveValue = value_linkbot+'.trackWidth*-1*'+value_degrees+'*(math.pi/180)/'+value_linkbot+'.wheelDiameter';
    var m3moveValue = value_linkbot+'.trackWidth*-1*'+value_degrees+'*(math.pi/180)/'+value_linkbot+'.wheelDiameter';
    var code = value_linkbot + '.turnLeftNB('+value_degrees+', '+value_linkbot+'_wheelDiameter/2.0, '+value_linkbot+'_trackWidth);\n';
    return code;
};

Blockly.Cpp['linkbotjs_turn_2wd_nb'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_degrees = Blockly.Cpp.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);

    var moveValue = value_linkbot+'.trackWidth*-1*'+value_degrees+'*(math.pi/180)/'+value_linkbot+'.wheelDiameter';
    var m3moveValue = value_linkbot+'.trackWidth*-1*'+value_degrees+'*(math.pi/180)/'+value_linkbot+'.wheelDiameter';
    var code = value_linkbot + '.turnLeftNB('+value_degrees+', '+value_linkbot+'_wheelDiameter/2.0, '+value_linkbot+'_trackWidth);\n';
    return code;
};

Blockly.Blocks['linkbotjs_set_track_width'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(GhostFieldVariable("robot"), "LINKBOT")
            .appendField("Set track width");
        this.appendValueInput("WIDTH")
            .setCheck("Number")
            .appendField("Width");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(210);
        this.setTooltip('Units should match units used for "Drive distance".');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_set_track_width'] = function(block) {
    var value_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_width = Blockly.JavaScript.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot+'.trackWidth = ' + value_width + ';\n';
    return code;
};

Blockly.Python['linkbotjs_set_track_width'] = function(block) {
    var value_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_width = Blockly.Python.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC);

    var code = value_linkbot + '.track_width= ' + value_width+ '\n';
    return code;
};

Blockly.Ch['linkbotjs_set_track_width'] = function(block) {
    var value_linkbot = Blockly.Ch.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_width = Blockly.Ch.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC);

    var code = value_linkbot + '_trackWidth= ' + value_width+ ';\n';
    return code;
};

Blockly.Cpp['linkbotjs_set_track_width'] = function(block) {
    var value_linkbot = Blockly.Cpp.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_width = Blockly.Cpp.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC);

    var code = value_linkbot + '_trackWidth= ' + value_width+ ';\n';
    return code;
};

Blockly.Blocks['linkbotjs_scatter_plot'] = {
    init: function() {
        this.appendValueInput("Xs")
            .setCheck("Array")
            .appendField("Scatter Plot: X values");
        this.appendValueInput("Ys")
            .setCheck("Array")
            .appendField("Y values")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setColour(210);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_scatter_plot'] = function(block) {
    var value_xs = Blockly.JavaScript.valueToCode(block, 'Xs', Blockly.JavaScript.ORDER_ATOMIC);
    var value_ys = Blockly.JavaScript.valueToCode(block, 'Ys', Blockly.JavaScript.ORDER_ATOMIC);
    var code = '.then( function() { return new Promise( function(resolve, reject) {\n' +
               '    var plotDiv = document.getElementById("plotly_plot");\n' +
               '    var trace = { x: '+value_xs+', y: '+value_ys+', type: \'scatter\'};\n' +
               '    Plotly.newPlot(plotDiv, [trace]);\n' + 
               '    resolve();\n' + 
               '})})\n';
    return code;
};

Blockly.Python['linkbotjs_scatter_plot'] = function(block) {
    var value_xs = Blockly.Python.valueToCode(block, 'Xs', Blockly.Cpp.ORDER_ATOMIC);
    var value_ys = Blockly.Python.valueToCode(block, 'Ys', Blockly.Cpp.ORDER_ATOMIC);
    var code = 'linkbot.scatter_plot('+value_xs+', '+value_ys+')\n';
    return code;
};

Blockly.Cpp['linkbotjs_scatter_plot'] = function(block) {
    var value_xs = Blockly.Cpp.valueToCode(block, 'Xs', Blockly.Cpp.ORDER_ATOMIC);
    var value_ys = Blockly.Cpp.valueToCode(block, 'Ys', Blockly.Cpp.ORDER_ATOMIC);
    var code = 'barobo::scatterPlot('+value_xs+', '+value_ys+');\n';
    return code;
};

Blockly.Blocks['linkbotjs_text_print'] = {
  /**
   * Block for print statement.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.TEXT_PRINT_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.texts.HUE,
      "tooltip": Blockly.Msg.TEXT_PRINT_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_PRINT_HELPURL
    });
  }
};

Blockly.JavaScript['linkbotjs_text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  //return 'window.alert(' + msg + ');\n';
  return 'consoleInputHandler.print('+msg+');\n';
};

Blockly.Python['linkbotjs_text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.Python.valueToCode(block, 'TEXT',
      Blockly.Python.ORDER_NONE) || '\'\'';
  return 'print(' + msg + ')\n';
};

Blockly.Blocks['linkbotjs_text_prompt_ext'] = {
  /**
   * Block for prompt function (external message).
   * @this Blockly.Block
   */
  init: function() {
    var TYPES = [
      [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, 'TEXT'],
      [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']
    ];
    this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    var dropdown = new Blockly.FieldDropdown(TYPES, function(newOp) {
      thisBlock.updateType_(newOp);
    });
    this.appendValueInput('TEXT')
        .appendField(dropdown, 'TYPE');
    this.setOutput(true, 'String');
    this.setTooltip(function() {
      return (thisBlock.getFieldValue('TYPE') == 'TEXT') ?
          Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT :
          Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER;
    });
  },
  /**
   * Modify this block to have the correct output type.
   * @param {string} newOp Either 'TEXT' or 'NUMBER'.
   * @private
   * @this Blockly.Block
   */
  updateType_: function(newOp) {
    this.outputConnection.setCheck(newOp == 'NUMBER' ? 'Number' : 'String');
  },
  /**
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('type', this.getFieldValue('TYPE'));
    return container;
  },
  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.updateType_(xmlElement.getAttribute('type'));
  }
};

Blockly.JavaScript['linkbotjs_text_prompt_ext'] = function(block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
  }
  var code = 'await (async function() {\n';
  code +=    'consoleInputHandler.print(' + msg + ');\n';
  code +=    'var input = await consoleInputHandler.getNextInput()\n';
  code +=    'return input;\n';
  code +=    '})()';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'parseFloat(' + code + ')';
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['linkbotjs_text_prompt'] = {
  /**
   * Block for prompt function (internal message).
   * The 'text_prompt_ext' block is preferred as it is more flexible.
   * @this Blockly.Block
   */
  init: function() {
    this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
    var TYPES = [
      [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, 'TEXT'],
      [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']
    ];

    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    var dropdown = new Blockly.FieldDropdown(TYPES, function(newOp) {
      thisBlock.updateType_(newOp);
    });
    this.appendDummyInput()
        .appendField(dropdown, 'TYPE')
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField(this.newQuote_(false));
    this.setOutput(true, 'String');
    this.setTooltip(function() {
      return (thisBlock.getFieldValue('TYPE') == 'TEXT') ?
          Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT :
          Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER;
    });
  },
  updateType_: Blockly.Blocks['text_prompt_ext'].updateType_,
  mutationToDom: Blockly.Blocks['text_prompt_ext'].mutationToDom,
  domToMutation: Blockly.Blocks['text_prompt_ext'].domToMutation
};

Blockly.JavaScript['linkbotjs_text_prompt'] = Blockly.JavaScript['linkbotjs_text_prompt_ext'];
