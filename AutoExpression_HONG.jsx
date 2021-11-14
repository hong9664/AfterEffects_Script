var mainWindow = new Window("palette", "Expression Injector", undefined);
mainWindow.ondeviceorientation = "column";

var groupOne = mainWindow.add("group", undefined, "groupOne");
groupOne.orientation = "row";
groupOne.alignment = "left";
var dropDown1 = groupOne.add("dropdownlist", undefined, [
  "Position",
  "Scale",
  "Opacity",
]);
dropDown1.selection = 0;

var groupTwo = mainWindow.add("group", undefined, "groupTwo");
groupTwo.orientation = "row";
var dropDown2 = groupTwo.add("dropdownlist", undefined, [
  'loopOut("cycle")',
  'loopOut("pingpong")',
  "wiggle(10,20)",
]);
dropDown2.selection = 0;

dropDown1.size = [200, 30];
dropDown2.size = [200, 30];

var groupThree = mainWindow.add("group", undefined, "groupThree");
groupThree.orientation = "row";
groupThree.alignment = "right";
var applyButton = groupThree.add("button", undefined, "Apply Expression");

mainWindow.center();
mainWindow.show();

applyButton.onClick = function () {
  if (app.project.activeItem.selectedLayers.length < 1) {
    alert("익스프레션 넣고 싶은 레이어 선택 ㄱㄱ", "");
    return false;
  } else {
    app.beginUndoGroup("Expression Injection");
    injectExpression(app.project.activeItem.selectedLayers);
    app.endUndoGroup();
  }
};

function injectExpression(layerArray) {
  for (var i = 0; i < layerArray.length; i++) {
    layerArray[i].property(getPropertyName()).expression = getPropertyValue();
  }
  alert("성공함. 확인해봐");
}

function getPropertyName() {
  switch (dropDown1.selection.index) {
    case 0:
      return "Position";
      break;
    case 1:
      return "Scale";
      break;
    case 2:
      return "Opacity";
      break;
  }
}

function getPropertyValue() {
  switch (dropDown2.selection.index) {
    case 0:
      return 'loopOut("cycle")';
      break;
    case 1:
      return 'loopOut("pingpong")';
      break;
    case 2:
      return "wiggle(10,20)";
      break;
  }
}
