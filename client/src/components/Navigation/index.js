import Bar from './Bar/Bar';
import Navigation from './Navigation';

const SubModules = {
    Bar,
    Navigation,
};

Object
    .keys(SubModules)
    .map((module_name) => {
        const SubModule = SubModules[module_name];

        Navigation[module_name] = SubModule;

        module.exports[module_name] = SubModule;

        return null;
    })
;

export default Navigation;
