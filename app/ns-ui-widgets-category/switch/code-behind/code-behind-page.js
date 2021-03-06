const observableModule = require("tns-core-modules/data/observable");
// >> switch-require
const switchModule = require("tns-core-modules/ui/switch");
// << switch-require


function onPageLoaded(args) {
    const page = args.object;
    const vm = new observableModule.Observable();
    vm.set("swResult", "false");
    const stackLayout = page.getViewById("stackLayoutId");

    // >> creating-switch-code
    // creating new Switch and binding the checked property
    const mySwitch = new switchModule.Switch();
    const options = {
        sourceProperty: "isChecked",
        targetProperty: "checked"
    };
    mySwitch.bind(options, vm);
    mySwitch.on("checkedChange", (args) => {
        console.log(args.object.checked);
        // >> (hide)
        vm.set("swResult", args.object.checked);
        // << (hide)
    });

    // setting up mySwitch.checked to true via binding
    vm.set("isChecked", true);

    // The above code is equivalent to binding via the XML
    /*
        <Switch checked="{{ isChecked }}">
    */

    // adding the created element to already existing layout
    stackLayout.addChild(mySwitch);
    // << creating-switch-code
    page.bindingContext = vm;
}
exports.onPageLoaded = onPageLoaded;
