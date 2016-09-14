import Csrf from './Csrf';
import Field from './Field/Field';

const SubModules = {
    Csrf,
    Field,
};

Object
    .keys(SubModules)
    .map((module_name) => {
        const SubModule = SubModules[module_name];

        Csrf[module_name] = SubModule;

        module.exports[module_name] = SubModule;

        return null;
    })
;

export default Csrf;
