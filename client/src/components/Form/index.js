import AlertSuccess from './AlertSuccess/AlertSuccess';
import CheckBox from './CheckBox';
import Csrf from './Csrf';
import Form from './Form';
import Group from './Group';
import HelpBlock from './HelpBlock/HelpBlock';
import Label from './Label';

const SubModules = {
    AlertSuccess,
    CheckBox,
    Csrf,
    Form,
    Group,
    HelpBlock,
    Label,
};

Object
    .keys(SubModules)
    .map((module_name) => {
        const SubModule = SubModules[module_name];

        Form[module_name] = SubModule;

        module.exports[module_name] = SubModule;

        return null;
    })
;

export default Form;
