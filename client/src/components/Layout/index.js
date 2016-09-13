import Container from './Container';
import Layout from './Layout';

const SubModules = {
    Container,
};

Object
    .keys(SubModules)
    .map((module_name) => {
        const SubModule = SubModules[module_name];

        Layout[module_name] = SubModule;

        module.exports[module_name] = SubModule;

        return null;
    })
;

export default Layout;
